<?php


use App\Http\Controllers\DoctorController;
use App\Http\Controllers\PatientController;
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

Route::middleware(['check-api-token'])->group(function () {
    Route::group(['prefix' => 'doctors'], function () {
        Route::get('/', [DoctorController::class, 'index']);
        Route::post('/', [DoctorController::class, 'store']);
        Route::get('/{id}', [DoctorController::class, 'show']);
        Route::put('/{id}', [DoctorController::class, 'update']);
        Route::delete('/{id}', [DoctorController::class, 'destroy']);
    });

    Route::group(['prefix' => 'patients'], function () {
        Route::get('/', [PatientController::class, 'index']);
        Route::post('/', [PatientController::class, 'store']);
        Route::get('/{id}', [PatientController::class, 'show']);
        Route::put('/{id}', [PatientController::class, 'update']);
        Route::delete('/{id}', [PatientController::class, 'destroy']);
    });

});
