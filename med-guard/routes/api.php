<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NotificationController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


//Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgotpassword', [AuthController::class, 'forgotpassword']);
Route::get('posts/{id?}', [AdminController::class, 'posts']);

Route::middleware(['auth:api'])->group(function () {

    Route::get('tokens/check', function (Request $request) {
        return response()->json(200);
    });
    Route::get('logout', [AuthController::class, 'logout']);
    Route::get('profile/{id}', [AuthController::class, 'profile']);
    Route::post('profile/{id}/password/change', [AuthController::class, 'profile']);


    Route::get('users/{id?}', [AdminController::class, 'users']);
    Route::post('users', [AdminController::class, 'create_user']);
    Route::delete('users/{id}', [AdminController::class, 'delete_user']);
    Route::put('users', [AdminController::class, 'update_user']);

    Route::get('contact/messages/{id?}', [AdminController::class, 'messages']);
    Route::post('contact/messages', [AdminController::class, 'create_message']);
    Route::delete('contact/messages/{id}/respond', [AdminController::class, 'respond']);

    Route::group(['prefix' => 'notifications'], function () {
        Route::get('/', [NotificationController::class, 'index']);
        Route::post('/', [NotificationController::class, 'store']);
        Route::get('/{id}', [NotificationController::class, 'show']);
        Route::delete('/{id}', [NotificationController::class, 'destroy']);
    });

    Route::post('/users/all', function (Request $request) {
        $data = $request->input('data', []);

        $users = [];
        foreach ($data as $element) {
            $user = User::find($element['user_id']);
            $element['user'] = $user;
            $users[] = $element;
        }

        return response()->json($users);
    });

    Route::post('/user/all', function (Request $request) {
        $data = $request->input('data', []);
        $user = User::with(['address', 'profile_picture'])->find($data['user_id']);
        $data['user'] = $user;
        return response()->json($data);
    });

    Route::post('posts/create', [AdminController::class, 'create_post']);
    Route::delete('psots/{id}/delete', [AdminController::class, 'delete_post']);
    Route::put('psots/update', [AdminController::class, 'update_post']);
});
