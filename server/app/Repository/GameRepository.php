<?php

namespace App\Repository;

use Illuminate\Support\Facades\DB;

class GameRepository
{
    // implement methods for creating game, updating game, deleting game
    //implement methods for retrieving games by name, by tags, by platform
    public function createGame(string $title, int $user_id, ?int $rating = null, ?string $image_url = null)
    {
        return DB::insert('INSERT INTO games (title, rating, image_url, user_id) VALUES (?, ?, ?, ?)', [$title, $rating, $image_url, $user_id]);
    }
    public function getGamesByUserId(int $user_id)
    {
        return DB::select('SELECT * FROM games where user_id = ?', [$user_id]);
    }
    public function getGamesByName(string $title, int $user_id)
    {
        return DB::select('SELECT * FROM games WHERE title LIKE ? and user_id = ?', ['%' . $title . '%', $user_id]);
    }

    public function getGamesByPlatform(string $platform_name, int $user_id)
    {
        return DB::select('SELECT g.* FROM games g JOIN platform_games pg ON g.id = pg.game_id JOIN platforms p ON pg.platform_id = p.id WHERE p.name LIKE ? AND g.user_id = ?', ['%' . $platform_name . '%', $user_id]);
    }
    public function getGamesByTag(string $game_tag, int $user_id)
    {
        return DB::select('SELECT g.* FROM games g JOIN game_tags gt ON g.id = gt.game_id JOIN tags t on gt.tag_id = t.id WHERE t.name LIKE ? AND g.user_id = ?', ['%' . $game_tag . '%', $user_id]);
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
