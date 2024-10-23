<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function logout()
    {
        Auth::guard('web')->logout();

        request()->session->invalidate();
        request()->session()->regenerateToken();
        return to_route('/');
    }
}
