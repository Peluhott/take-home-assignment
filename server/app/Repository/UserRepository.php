<?php

namespace App\Repository;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserRepository
{
    public function createUser(string $name, string $email, string $password)
    {
        return DB::insert('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [$name, $email, Hash::make($password)]);
    }

    public function getUser(int $user_id)
    {
        return DB::select('SELECT * FROM users where id = ?', [$user_id]);
    }

    public function updateUser(int $user_id, string $name, string $email, string $password)
    {
        return DB::update('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', [$name, $email, Hash::make($password), $user_id]);
    }

    public function deleteUser(int $user_id)
    {
        return DB::delete('DELETE FROM users WHERE id = ?', [$user_id]);
    }
}
