<?php

namespace App\Http\Controllers;
use Illuminate\Validation\Rules\Password;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
class UserController extends Controller
{
    public function __construct()
    {

        $this->middleware(['auth', 'verified'], [
            'only' => [
                'update'
            ]
        ]);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|string|min:3|max:10|unique:App\Models\User,name',
            'email' => 'required|email|unique:App\Models\User,email',
            'password' => ['required', 'confirmed', Password::min(8)->letters()->mixedCase()->numbers()->symbols()],
            'password_confirmation' => 'required',

        ]);
        $user = User::create([
            'name' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        event(new Registered($user));
        Auth::login($user);
    }
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);
        if (Auth::attempt(['name' => $request->username, 'password' => $request->password], $request->remember)) {
            $request->session()->regenerate();

            return redirect()->route('home');
        }
        return back()->withErrors([
            'username' => 'The provided credentials do not match our records.',
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $replies = $user->replies()->get()->map(fn($reply) => [
            'id' => $reply->id,
            'message' => $reply->message,
            'title' => $reply->post->title,
            'topic' => $reply->post->theme->topic->id,
            'theme' => $reply->post->theme,
            'replies' => $reply->loadCount('replies'),
            'created_at' => $reply->created_at,
            'post' => $reply->post->id,
            'is_post' => false,

        ]);
        $posts = $user->posts()->get()->map(fn($post) => [
            'id' => $post->id,
            'message' => $post->message,
            'title' => $post->title,
            'topic' => $post->theme->topic->id,
            'theme' => $post->theme,
            'replies' => $post->loadCount('replies'),
            'created_at' => $post->created_at,
            'post' => $post->id,
            'is_post' => true,

        ]);

        return Inertia::render('user', [
            'breadcrumbs' => [
                0 => ["name" => "Home", "route" => route('home')],
                1 => ["name" => $user->name, "route" => route('user.show', $user)]
            ],
            'user' => Auth::user(),
            'userProfile' => $user->loadCount('replies')->loadCount('posts')->loadCount('points'),
            'pagination' => collect()->merge($replies)->merge($posts)->sortDesc()->paginate(10),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        if (Auth::user()->id != $user->id) {
            return back()->with('error', 'Error');
        }
        $request->validate([
            'user_img' => 'required_without:banner_img|nullable|sometimes|mimes:jpg,bmp,png,webp|max:1000',
            'banner_img' => 'required_without:user_img|nullable|sometimes|mimes:jpg,bmp,png,webp|max:1000'
        ]);
        if ($request->file('user_img') != null) {
            $user_img = '/' . $request->file('user_img')->store('public/user_profile_pictures');
            $user->update(['user_img' => $user_img]);
        }
        if ($request->file('banner_img') != null) {
            $banner_img = '/' . $request->file('banner_img')->store('public/user_banners');
            $user->update(['banner_img' => $banner_img]);
        }


        return back()->with('error', 'File upload failed');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
    public function logout()
    {
        Auth::logout();
    }
}
