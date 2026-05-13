<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function createUser(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        return $this->userService->createUser($data['name'], $data['email'], $data['password']);
    }

    public function getUser()
    {
        return $this->userService->getUserById(Auth::id());
    }

    public function updateUser(Request $request, int $user_id)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user_id,
            'password' => 'required|string|min:8',
        ]);

        return $this->userService->updateUser($user_id, $data['name'], $data['email'], $data['password']);
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
        ]);
        if (Auth::attempt([
            'email' => $data['email'],
            'password' => $data['password']
        ])) {
            $request->session()->regenerate();
            return response()->json(['message' => 'Login successful']);
        } else {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'Logout successful']);
    }
}
