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
use App\Http\Controllers\ThemeFollowerController;
use App\Http\Controllers\PostFollowerController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\MessageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
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


Route::controller(TopicController::class)->group(function () {
    Route::get('/', 'index')->name('home');
    Route::get('/topic/{topic}', 'show')->name('topic');
});
Route::controller(PostController::class)->group(function () {
    Route::get('/topic/{topic}/{theme}/{post}', 'show')->name('post');
    Route::delete('/post/{post}', 'destroy')->name('post.destroy')->middleware('auth', 'verified');
    Route::patch('/post/{post}', 'update')->name('post.update')->middleware('auth', 'verified');
    Route::post('/post', 'store')->middleware('auth', 'verified');
});
Route::controller(ReplyController::class)->group(function () {
    Route::get('/topic/{topic}/{theme}/{post}/{reply}', 'show')->name('reply');
    Route::delete('/reply/{reply}', 'destroy')->name('reply.destroy')->middleware('auth', 'verified');
    Route::patch('/reply/{reply}', 'update')->name('reply.update')->middleware('auth', 'verified');
    Route::post('/reply', 'store')->middleware('auth', 'verified');
});
Route::controller(UserController::class)->group(function () {
    Route::post('/login', 'login')->middleware('guest');
    Route::resource('/user', UserController::class)->only(['store', 'show', 'update']);
    Route::post('/logout', 'logout')->middleware('auth');
});
Route::controller(NotificationController::class)->group(function () {
    Route::delete('/notification/{notification}', 'destroy')->name('notification.destroy');
    Route::delete('/notification', 'destroyAll')->name('notification.destroyAll');
});
Route::controller(MessageController::class)->group(function () {
    Route::get('/chats', 'index')->name("chats.index")->middleware('auth');
    Route::get('/chats/{id}', 'show')->name("chats.show")->middleware('auth');
    Route::post('/chats', 'store')->name("chats.store")->middleware('auth');
    Route::patch('/chats', 'update')->name("chats.update")->middleware('auth');
    Route::delete('/chats', 'destroy')->name("chats.destroy")->middleware('auth');
});

Route::get('search/{query?}', [SearchController::class, 'index'])->name('search');
Route::get('rules', [RulesController::class, 'index'])->name('rules');
Route::get('activity', [ActivityController::class, 'index'])->name('activity');
Route::get('membership', [MembershipController::class, 'index'])->name('membership');
Route::get('/topic/{topic}/{theme}', [ThemeController::class, 'show'])->name('theme');
Route::post('/vote', [PointsController::class, 'store'])->middleware('auth', 'verified');
Route::post('/follow/theme', [ThemeFollowerController::class, 'store'])->middleware('auth', 'verified');
Route::post('/follow/post', [PostFollowerController::class, 'store'])->middleware('auth', 'verified');

# Password reset link request form
Route::controller(ResetPasswordController::class)->group(function () {
    Route::get('/forgot-password', 'showEmailForm')->middleware('guest')->name('password.request');
    Route::post('/forgot-password', 'handleEmailForm')->middleware('guest')->name('password.email');
    Route::get('/reset-password/{token}', 'showPasswordForm')->middleware('guest')->name('password.reset');
    Route::post('/reset-password', 'handlePasswordForm')->middleware('guest')->name('password.update');
});

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

    Route::get('auth/{provider}/redirect', [SocialiteController::class, 'loginSocial'])
        ->name('socialite.auth');

    Route::get('auth/{provider}/callback', [SocialiteController::class, 'callbackSocial'])
        ->name('socialite.callback');
});
