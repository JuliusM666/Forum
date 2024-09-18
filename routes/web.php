<?php
use App\Http\Controllers\ThemeController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ReplyController;
use App\Http\Controllers\PointsController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\RulesController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\MembershipController;
use App\Http\Controllers\SearchController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use \App\Models\Topic;
use \App\Models\Theme;
use \App\Http\Controllers\Auth\SocialiteController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('/topic/{topic}', function (Topic $topic) {
    return Inertia::render('topic', [
        'breadcrumbs' => [
            0 => ["name" => "Home", "route" => route('home')],
            1 => ["name" => $topic->title, "route" => route('topic', $topic)]
        ],
        'topic' => TopicController::show($topic),
        'user' => Auth::user()
    ]);
})->name('topic');

Route::get('/', [TopicController::class, 'index'])->name('home');
Route::get('search/{query?}', [SearchController::class, 'index'])->name('search');
Route::get('rules', [RulesController::class, 'index'])->name('rules');
Route::get('activity', [ActivityController::class, 'index'])->name('activity');
Route::get('membership', [MembershipController::class, 'index'])->name('membership');
Route::get('/topic/{topic}/{theme}', [ThemeController::class, 'show'])->name('theme');
Route::get('/topic/{topic}/{theme}/{post}', [PostController::class, 'show'])->name('post');
Route::get('/topic/{topic}/{theme}/{post}/{reply}', [ReplyController::class, 'show'])->name('reply');
Route::post('/post', [PostController::class, 'store'])->middleware('auth', 'verified');
Route::post('/reply', [ReplyController::class, 'store'])->middleware('auth', 'verified');
Route::post('/login', [UserController::class, 'login']);
Route::resource('/user', UserController::class)->only(['store', 'show', 'update']);
Route::post('/logout', [UserController::class, 'logout'])->middleware('auth');
Route::post('/vote', [PointsController::class, 'store'])->middleware('auth', 'verified');



# Password reset link request form 
Route::get('/forgot-password', [ResetPasswordController::class, 'showEmailForm'])->middleware('guest')->name('password.request');
Route::post('/forgot-password', [ResetPasswordController::class, 'handleEmailForm'])->middleware('guest')->name('password.email');
Route::get('/reset-password/{token}', [ResetPasswordController::class, 'showPasswordForm'])->middleware('guest')->name('password.reset');
Route::post('/reset-password', [ResetPasswordController::class, 'handlePasswordForm'])->middleware('guest')->name('password.update');

# Verification handler
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    return redirect()->route('home');
})->middleware(['auth', 'signed'])->name('verification.verify');
# Resend Verification email
Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');
# Verify notice
Route::get('/email/verify', function () {
    return Inertia::location(route('home'));
})->middleware('auth')->name('verification.notice');

# Socialite routes
Route::middleware('guest')->group(function () {
    // ...
    Route::get('auth/{provider}/redirect', [SocialiteController::class, 'loginSocial'])
        ->name('socialite.auth');

    Route::get('auth/{provider}/callback', [SocialiteController::class, 'callbackSocial'])
        ->name('socialite.callback');
});
// ...