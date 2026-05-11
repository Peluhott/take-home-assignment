<?php

namespace App\Repository;

use Illuminate\Support\Facades\DB;

class GameRepository
{
    public function createGame(string $title, int $user_id, ?int $rating = null, ?string $image_url = null)
    {
        return DB::insert('INSERT INTO games (title, rating, image_url, user_id) VALUES (?, ?, ?, ?)', [$title, $rating, $image_url, $user_id]);
    }
    public function getGamesByUserId(int $user_id)
    {
        return DB::select('SELECT * FROM games where user_id = ?', [$user_id]);
    }
    public function updategame(int $game_id, string $title, int $user_id, ?int $rating = null, ?string $image_url = null)
    {
        return DB::update('UPDATE games SET title = ?, rating = ?, image_url = ? WHERE id = ? AND user_id = ?', [$title, $rating, $image_url, $game_id, $user_id]);
    }

    public function deletegame(int $game_id, int $user_id)
    {
        return DB::delete('DELETE FROM games WHERE id = ? AND user_id = ?', [$game_id, $user_id]);
    }
}
