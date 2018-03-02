<?php

namespace App\Http\Controllers;

use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Facades\Image;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $token = $this->getJWTToken();
        return view('home', compact('token'));
    }


    /**
     * Show the user Profile
     *
     * @return \Illuminate\Http\Response
     */
    public function profile()
    {
        return view('profile', ["user" => Auth::user()]);
    }

    /**
     * Show the user Profile
     *
     * @return \Illuminate\Http\Response
     */
    public function updateAvatar(Request $request)
    {
        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            $filename = time() . '.' . $avatar->getClientOriginalExtension();
            Image::make($avatar)->resize(200, 200)->save(public_path('/uploads/avatars/' . $filename));
            $user = Auth::user();
            $user->avatar = $filename;
            $user->save();
        }

        return view('profile', array('user' => Auth::user()));
    }


    /**
     * Build JWT token from user data
     * @return string JWT token
     */
    private function getJWTToken()
    {
        $key = env("APP_JWT_KEY", "No_key_defined");
        $payload = [
            'user_id' => Auth::id(),
            'user_name' => Auth::user()->name,
            'avatar' => Auth::user()->avatar,
            'exp' => now()->addMinute(10)->timestamp,
        ];
        return JWT::encode($payload, $key);
    }
}
