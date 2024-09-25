<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\Rules\Password as PasswordValidation;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Http\Controllers\TopicController;
class ResetPasswordController extends Controller
{

    private $topicController;
    public function __construct()
    {
        $this->topicController = new TopicController();
    }
    public function showEmailForm()
    {

        return $this->topicController->index(['isPasswordResetEmail' => true,]);


    }
    public function handleEmailForm(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? back()->with('message', 'Password reset link sent!')
            : back()->withErrors(['email' => __($status)]);
    }
    public function showPasswordForm(string $token)
    {
        return $this->topicController->index(['token' => $token]);
    }
    public function handlePasswordForm(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => ['required', 'confirmed', PasswordValidation::min(8)->letters()->mixedCase()->numbers()->symbols()],
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? redirect()->route('home')->with('message', 'Password changed successfully!')
            : back()->withErrors(['email' => [__($status)]]);
    }
}
