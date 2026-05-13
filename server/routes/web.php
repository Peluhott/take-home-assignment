<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GameController;


//crud routes for both games and users
//search routes for games
Route::get('/user', [UserController::class, 'getUser']);
Route::post('/user/register', [UserController::class, 'createUser']);
Route::post('/user/logout', [UserController::class, 'logout']);
Route::post('/user/login', [UserController::class, 'login']);


//protected routes for games
Route::middleware('auth')->group(function () {
    Route::post('/game', [GameController::class, 'createGame']);
    Route::get('/game', [GameController::class, 'getGames']);
    Route::put('/game/{game_id}', [GameController::class, 'updateGame']);
    Route::get('/game/{game_id}', [GameController::class, 'getGame']);
    Route::delete('/game/{game_id}', [GameController::class, 'deleteGame']);
    Route::get('/search', [GameController::class, 'searchGames']);
    Route::get('/search/tag/{tag}', [GameController::class, 'searchGamesByTag']);
    Route::get('/search/platform/{platform}', [GameController::class, 'searchGamesByPlatform']);
});
