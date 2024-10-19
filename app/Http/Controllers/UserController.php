<?php

namespace App\Http\Controllers;
use Illuminate\Validation\Rules\Password;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Inertia\Inertia;
use Storage;
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
            'user_img' => Storage::url('user_profile_pictures/user.png'),
            'banner_img' => Storage::url('user_banners/banner.jpg'),
        ]);
        event(new Registered($user));
        Auth::login($user);
        return redirect()->route('home');
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
        $replies = $user->replies()->where('is_deleted', false)->get()->map(fn($reply) => [
            'id' => $reply->id,
            'message' => $reply->message,
            'title' => $reply->post->title,
            'topic' => $reply->post->theme->topic->id,
            'theme' => $reply->post->theme,
            'replies' => $reply->loadCount('replies'),
            'created_at' => $reply->created_at,
            'post' => $reply->post->id,
            'is_post' => false,
            'reply_to' => $reply->reply != null ? $reply->reply->user : $reply->post->user,

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
            'reply_to' => null,

        ]);
        $paginator = collect()->merge($replies)->merge($posts)->sortByDesc('created_at')->paginate(10);
        $paginator = $paginator->onEachSide($paginator->lastPage());
        return Inertia::render('user', [
            'breadcrumbs' => [
                0 => ["name" => "Home", "route" => route('home')],
                1 => ["name" => $user->name, "route" => route('user.show', $user)]
            ],
            'userProfile' => $user->loadCount('replies')->loadCount([
                'posts' => fn(Builder $query) => $query->withTrashed()
            ])->loadCount('points'),
            'pagination' => $paginator,
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
        $this->authorize('update', $user);

        $request->validate([
            'user_img' => 'nullable|sometimes|mimes:jpg,bmp,png,webp|max:1000',
            'banner_img' => 'nullable|sometimes|mimes:jpg,bmp,png,webp|max:1000',
            'email_notifications' => 'required|boolean'
        ]);
        if ($request->file('user_img') != null) {
            $user_img = '/' . $request->file('user_img')->store('public/user_profile_pictures');
            $user->update(['user_img' => $user_img]);
        }
        if ($request->file('banner_img') != null) {
            $banner_img = '/' . $request->file('banner_img')->store('public/user_banners');
            $user->update(['banner_img' => $banner_img]);
        }
        $user->update(['email_notifications' => $request->email_notifications]);

        return back()->with('message', 'Settings saved successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
    public function popularUsers()
    {
        return [
            'week' => User::select(['name', 'id', 'user_img'])->withCount([
                'points AS week_points_count' => function (Builder $query) {
                    $query->whereBetween('created_at', [now()->subDays(6), now()]);
                },
                'points'
            ])->orderByDesc('week_points_count')->limit(10)->get(),
            'month' => User::select(['name', 'id', 'user_img'])->withCount([
                'points AS month_points_count' => function (Builder $query) {
                    $query->whereBetween('created_at', [now()->subMonth(), now()]);
                },
                'points'
            ])->orderByDesc('month_points_count')->limit(10)->get(),
            'year' => User::select(['name', 'id', 'user_img'])->withCount([
                'points AS year_points_count' => function (Builder $query) {
                    $query->whereBetween('created_at', [now()->subYear(), now()]);
                },
                'points'
            ])->orderByDesc('year_points_count')->limit(10)->get(),
            'allTime' => User::select(['name', 'id', 'user_img'])->withCount(['points'])->orderByDesc('points_count')->limit(10)->get(),

        ];
    }
    public function logout()
    {
        Auth::logout();
    }
}
