<?php

namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserService
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function createUser(string $name, string $email, string $password)
    {
        // hash password here
        //lowercase the email
        $password = Hash::make($password);
        $email = strtolower($email);
        return $this->userRepository->createUser($name, $email, $password);
    }

    public function getUser(int $user_id)
    {
        return $this->userRepository->getUser($user_id);
    }

    public function updateUser(int $user_id, string $name, string $email, string $password)
    {
        $password = Hash::make($password);
        $email = strtolower($email);
        return $this->userRepository->updateUser($user_id, $name, $email, $password);
    }

    public function deleteUser(int $user_id)
    {
        return $this->userRepository->deleteUser($user_id);
    }
}
