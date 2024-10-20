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
     * A list of error messages
     *
     * @var array<int, string>
     */
    protected $messages = [
        404 => 'Not found',
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
    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $e)
    {
        $response = parent::render($request, $e);

        $status = $response->getStatusCode();

        if (!array_key_exists($status, $this->messages)) {
            return $response;
        }

        return inertia('errors/' . $status, [
            'status' => $status,
            'message' => $this->messages[$status],
        ])
            ->toResponse($request)
            ->setStatusCode($status);
    }
}
