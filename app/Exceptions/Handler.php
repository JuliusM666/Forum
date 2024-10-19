<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use App\Models\Post;
class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
    // public function render($request, Throwable $exception)
    // {
    //     if ($request->route()->hasParameter('post') && Post::withTrashed()->find($request->route()->parameter('post'))->trashed()) {

    //         return redirect()->back()->with("message", "The Post is Deleted");
    //     }
    //     return parent::render($request, $exception);
    // }
}
