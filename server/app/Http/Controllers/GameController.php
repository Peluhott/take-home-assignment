<?php

namespace App\Http\Controllers;

use App\Services\GameService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class GameController
{
    protected GameService $gameService;

    public function __construct(GameService $gameService)
    {
        $this->gameService = $gameService;
    }


    public function createGame(Request $request)
    {
        $userId = Auth::id();

        if (!$userId) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'rating' => 'nullable|integer|min:1|max:10',
            'image' => 'nullable|image|max:2048',
            'tagId' => 'nullable|integer|exists:tags,id',
            'platformId' => 'nullable|integer|exists:platforms,id',
        ]);

        $game = DB::transaction(function () use ($data, $request, $userId) {
            $game = $this->gameService->createGame(
                $data['title'],
                $userId,
                $data['rating'] ?? null,
                $request->file('image')
            );

            if (!empty($data['tagId'])) {
                $this->gameService->createGameTag(
                    $game->id,
                    $data['tagId'],
                    $userId
                );
            }

            if (!empty($data['platformId'])) {
                $this->gameService->createPlatformGame(
                    $game->id,
                    $data['platformId']
                );
            }

            return $game;
        });

        return response()->json($game, 201);
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

        return $this->gameService->updateGame(
            $game_id,
            $data['title'],
            Auth::id(),
            $data['rating'] ?? null,
            $request->file('image')
        );
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
    public function deleteGame(int $game_id)
    {
        return $this->gameService->deleteGame($game_id, Auth::id());
    }

    public function getTags()
    {
        return $this->gameService->getTags();
    }

    public function getPlatforms()
    {
        return $this->gameService->getPlatforms();
    }

    public function getUserPlatforms()
    {
        return $this->gameService->getPlatformsByUserId(Auth::id());
    }
}
