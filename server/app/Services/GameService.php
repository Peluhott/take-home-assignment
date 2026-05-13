<?php

namespace App\Services;

use App\Repositories\GameRepository;
use Cloudinary\Cloudinary;

class GameService
{
    protected $gameRepository;
    protected $cloudinary;

    public function __construct(GameRepository $gameRepository)
    {
        $this->gameRepository = $gameRepository;

        $this->cloudinary = new Cloudinary(
            env('CLOUDINARY_URL')
        );
    }

    public function createGame(string $title, int $user_id, ?int $rating = null, $image = null)
    {
        $image_url = null;
        $public_id = null;
        if ($image) {
            $uploadResult = $this->cloudinary->uploadApi()->upload($image->getRealPath(), [
                'folder' => 'game_images',

                'resource_type' => 'image'
            ]);
            $image_url = $uploadResult['secure_url'];
            $public_id = $uploadResult['public_id'];
        }
        return $this->gameRepository->createGame($title, $user_id, $rating, $image_url, $public_id);
    }

    public function getGame(int $game_id, int $user_id)
    {
        return $this->gameRepository->getGame($game_id, $user_id);
    }

    public function updateGame(int $game_id, string $title, int $user_id, ?int $rating = null, $image = null)
    {
        $game = $this->gameRepository->getGame($game_id, $user_id);
        if (!$game) {
            throw new \Exception('Game not found or access denied');
        }
        $image_url = $game->image_url;
        $public_id = $game->public_id;
        if ($image) {
            $uploadResult = $this->cloudinary->uploadApi()->upload($image->getRealPath(), [
                'folder' => 'game_images',
                'resource_type' => 'image'
            ]);
            $image_url = $uploadResult['secure_url'];
            $public_id = $uploadResult['public_id'];
        }
        return $this->gameRepository->updateGame($game_id, $title, $user_id, $rating, $image_url, $public_id);
    }

    public function deleteGame(int $game_id, int $user_id)
    {
        $game = $this->gameRepository->getGame($game_id, $user_id);
        if (!$game) {
            throw new \Exception('Game not found or access denied');
        }
        if ($game->public_id) {
            $this->cloudinary->uploadApi()->destroy($game->public_id, [
                'resource_type' => 'image'
            ]);
        }
        return $this->gameRepository->deleteGame($game_id, $user_id);
    }
}
