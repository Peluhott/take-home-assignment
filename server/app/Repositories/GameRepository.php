<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class GameRepository
{
    // implement methods for creating game, updating game, deleting game
    //implement methods for retrieving games by name, by tags, by platform
    public function createGame(
        string $title,
        int $user_id,
        ?int $rating = null,
        ?string $image_url = null,
        ?string $public_id = null
    ) {
        DB::insert(
            'INSERT INTO games (
            title,
            rating,
            image_url,
            public_id,
            user_id
        ) VALUES (?, ?, ?, ?, ?)',
            [$title, $rating, $image_url, $public_id, $user_id]
        );

        $id = DB::getPdo()->lastInsertId();

        return DB::selectOne(
            'SELECT * FROM games WHERE id = ?',
            [$id]
        );
    }
    public function getGame(int $game_id, int $user_id)
    {
        return DB::selectOne('SELECT * FROM games where id = ? and user_id = ?', [$game_id, $user_id]);
    }
    public function getGamesByUserId(int $user_id)
    {
        return DB::select('SELECT * FROM games where user_id = ?', [$user_id]);
    }
    // function to search games by title, tags, and platform
    public function searchGames(string $searchTerm, int $user_id)
    {
        return DB::select('SELECT DISTINCT g.* FROM games g LEFT JOIN tags_games tg on g.id = tg.game_id AND tg.user_id = g.user_id LEFT JOIN tags t on tg.tag_id = t.id LEFT JOIN platform_games pg on g.id = pg.game_id LEFT JOIN platforms p on pg.platform_id = p.id WHERE (g.title ILIKE ? OR t.name ILIKE ? OR p.name ILIKE ?) AND g.user_id = ?', ['%' . $searchTerm . '%', '%' . $searchTerm . '%', '%' . $searchTerm . '%', $user_id]);
    }




    public function getGamesByPlatform(string $platform_name, int $user_id)
    {
        return DB::select('SELECT g.* FROM games g JOIN platform_games pg ON g.id = pg.game_id JOIN platforms p ON pg.platform_id = p.id WHERE p.name ILIKE ? AND g.user_id = ?', ['%' . $platform_name . '%', $user_id]);
    }
    public function getGamesByTag(string $game_tag, int $user_id)
    {
        return DB::select('SELECT g.* FROM games g JOIN tags_games tg ON g.id = tg.game_id AND tg.user_id = g.user_id JOIN tags t on tg.tag_id = t.id WHERE t.name ILIKE ? AND g.user_id = ?', ['%' . $game_tag . '%', $user_id]);
    }

    public function updategame(int $game_id, string $title, int $user_id, ?int $rating = null, ?string $image_url = null, ?string $public_id = null)
    {
        return DB::update('UPDATE games SET title = ?, rating = ?, image_url = ?, public_id = ? WHERE id = ? AND user_id = ?', [$title, $rating, $image_url, $public_id, $game_id, $user_id]);
    }

    public function deletegame(int $game_id, int $user_id)
    {
        return DB::delete('DELETE FROM games WHERE id = ? AND user_id = ?', [$game_id, $user_id]);
    }

    public function getTags()
    {
        return DB::select('SELECT * FROM tags');
    }

    public function getPlatforms()
    {
        return DB::select('SELECT * FROM platforms');
    }

    public function getPlatformsByUserId(int $user_id)
    {
        return DB::select(
            'SELECT DISTINCT p.id, p.name, p.image_url
            FROM platforms p
            JOIN platform_games pg ON p.id = pg.platform_id
            JOIN games g ON g.id = pg.game_id
            WHERE g.user_id = ?
            ORDER BY p.name ASC',
            [$user_id]
        );
    }

    public function createGameTag(int $game_id, int $tag_id, int $user_id)
    {
        return DB::insert('INSERT INTO tags_games (game_id, tag_id, user_id) VALUES (?, ?, ?)', [$game_id, $tag_id, $user_id]);
    }

    public function createPlatformGame(int $game_id, int $platform_id)
    {
        return DB::insert('INSERT INTO platform_games (game_id, platform_id) VALUES (?, ?)', [$game_id, $platform_id]);
    }
}
