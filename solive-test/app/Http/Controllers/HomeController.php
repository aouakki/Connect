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


    private function getJWTToken()
    {
        $key = "test";
        $payload = [
            'user_id' => Auth::id(),
            'user_email' => Auth::user()->email,
            'exp' => now()->addMinute(10)->timestamp,
        ];
        return JWT::encode($payload, $key);
    }
}