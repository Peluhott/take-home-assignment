<?php

namespace App\Http\Controllers;

use App\Services\GameService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GameController
{
    protected $gameService;

    public function __construct(GameService $gameService)
    {
        $this->gameService = $gameService;
    }

    public function createGame(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'rating' => 'nullable|integer|min:1|max:10',
            'image' => 'nullable|image|max:2048',
        ]);

        return $this->gameService->createGame($data['title'], Auth::id(), $data['rating'] ?? null, $data['image'] ?? null);
    }

    public function getGames()
    {
        return $this->gameService->getGamesByUserId(Auth::id());
    }

    public function updateGame(Request $request, int $game_id)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'rating' => 'nullable|integer|min:1|max:10',
            'image' => 'nullable|image|max:2048',
        ]);

        return $this->gameService->updateGame($game_id, $data['title'], Auth::id(), $data['rating'] ?? null, $data['image'] ?? null);
    }

    public function getGame(int $game_id)
    {
        return $this->gameService->getGame($game_id, Auth::id());
    }


    public function searchGames(Request $request)
    {
        $data = $request->validate([
            'searchTerm' => 'required|string|max:255',
        ]);

        return $this->gameService->searchGames($data['searchTerm'], Auth::id());
    }

    public function deleteGame(int $game_id)
    {
        return $this->gameService->deleteGame($game_id, Auth::id());
    }

    public function searchGamesByPlatform(Request $request)
    {
        $data = $request->validate([
            'platform_name' => 'required|string|max:255',
        ]);

        return $this->gameService->searchGamesByPlatform($data['platform_name'], Auth::id());
    }

    public function searchGamesByTag(Request $request)
    {
        $data = $request->validate([
            'game_tag' => 'required|string|max:255',
        ]);

        return $this->gameService->searchGamesByTag($data['game_tag'], Auth::id());
    }
}
