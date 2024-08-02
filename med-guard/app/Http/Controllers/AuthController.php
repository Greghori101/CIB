<?php

namespace App\Http\Controllers;

use App\Mail\Resetpassword;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;


class AuthController extends Controller
{

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user  = User::where('email', $request->email)->with(['profile_picture'])->first();
            return response()->json([
                'user' => $user,
                'token' => $user->createToken('Api Token')->accessToken
            ]);
        }

        return abort([
            'success' => false,
            'message' => 'Invalid credentials'
        ],401);
    }

    public function profile($id)
    {
        $user = User::with(['profile_picture','address'])->find($id);
        return response()->json(200, $user);
    }
    public function logout()
    {

        $user = Auth::user();
        $user = User::find($user->id);
        if (Auth::check($user)) {
            $user->tokens()->delete();
            return response(200);
        } else {
            abort(403);
        }
    }
    public function change_password(Request $request, $id)
    {
        $user = User::find($id);
        $data = $request->validate([
            'old_password' => 'required|max:255',
            'password' => 'required|confirmed',
        ]);
        if (Hash::check($data['old_password'], $user->password)) {
            $user->password = Hash::make($data['password']);
            $message = 'password changed successfuly';
        } else {
            $message = 'the old password you had entered is wrong';
        }

        return response()->json(200, $message);
    }

    public function forgotpassword(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email',
        ]);
        $user = User::where('email', $data['email'])->first();
        $code = Str::upper(Str::random(6));
        try {
            //code...
            $data = [
                'email' => $user->email,
                'password' => $code,
            ];
            $user->password = bcrypt($code);
            Mail::to($user)->send(new Resetpassword($data));
            $user->save();
        } catch (\Throwable $th) {
            //throw $th;
            //abort(400);
        }

        return response()->json(200);
    }
}
