<?php

namespace App\Http\Controllers;

use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
     * Build JWT token from user data
     * @return string JWT token
     */
    private function getJWTToken()
    {
        $key = env("APP_JWT_KEY", "No_key_defined");
        $payload = [
            'user_id' => Auth::id(),
            'user_name' => Auth::user()->name,
            'exp' => now()->addMinute(10)->timestamp,
        ];
        return JWT::encode($payload, $key);
    }
}
