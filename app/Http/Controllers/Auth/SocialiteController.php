<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
class SocialiteController extends Controller
{
    public function loginSocial(Request $request, string $provider): RedirectResponse
    {
        $this->validateProvider($request);

        return Socialite::driver($provider)->redirect();
    }

    public function callbackSocial(Request $request, string $provider)
    {
        $this->validateProvider($request);

        $response = Socialite::driver($provider)->user();

        $user = User::where("email", $response->getEmail())->orWhere($provider . '_id', $response->getId())->first();
        if ($user == null) {
            $user = User::create([
                'email' => $response->getEmail(),
                'name' => $response->getName(),
                'user_img' => $response->getAvatar(),
                'password' => Str::password(),
            ]);
        }
        $user[$provider . '_id'] = $response->getId();
        $user->email_verified_at = now();
        $user->save();
        Auth::login($user);
        return redirect()->route('home');
    }

    protected function validateProvider(Request $request): array
    {
        return $this->getValidationFactory()->make(
            $request->route()->parameters(),
            ['provider' => 'in:facebook,google,linkedin']
        )->validate();
    }
}