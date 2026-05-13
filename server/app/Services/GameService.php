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
        if ($image) {
            $uploadResult = $this->cloudinary->uploadApi()->upload($image->getRealPath(), [
                'folder' => 'game_images',

                'resource_type' => 'image'
            ]);
            $image_url = $uploadResult['secure_url'];
        }
        return $this->gameRepository->createGame($title, $user_id, $rating, $image_url);
    }
}
