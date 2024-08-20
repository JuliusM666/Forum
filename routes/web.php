<?php
use App\Http\Controllers\ThemeController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ReplyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use \App\Models\Topic;
use \App\Models\Theme;

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

Route::get('/', function () {
    return Inertia::render('main', [
        'breadcrumbs' => [0 => ["name" => "Home", "route" => route('home')]],
        'user' => Auth::user(),
        'topics' => TopicController::index()->get(),

    ]);
})->name('home');

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

Route::get('/topic/{topic}/{theme}', [ThemeController::class, 'show'])->name('theme');
Route::get('/topic/{topic}/{theme}/{post}', [PostController::class, 'show'])->name('post');

Route::post('/post', [PostController::class, 'store'])->middleware('auth', 'verified');
Route::post('/reply', [ReplyController::class, 'store'])->middleware('auth', 'verified');
Route::post('/login', [UserController::class, 'login']);
Route::resource('/user', UserController::class)->only(['store', 'show']);
Route::post('/logout', [UserController::class, 'logout']);







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
    return Inertia::render('main', [
        'breadcrumbs' => [
            0 => ["name" => "Home", "route" => route('home')],

        ],
        'isEmailVerify' => true
    ]);
})->middleware('auth')->name('verification.notice');
