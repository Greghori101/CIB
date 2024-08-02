<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\ConsultationReportController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\VisitController;
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

Route::group(['prefix' => 'appointments'], function () {
    Route::post('/', [AppointmentController::class, 'store']);
});

Route::middleware(['check-api-token'])->group(function () {
    Route::group(['prefix' => 'appointments'], function () {
        Route::get('/', [AppointmentController::class, 'index']);
        Route::get('/{id}', [AppointmentController::class, 'show']);
        Route::put('/{id}', [AppointmentController::class, 'update']);
        Route::delete('/{id}', [AppointmentController::class, 'destroy']);
    });

    Route::group(['prefix' => 'consultation-reports'], function () {
        Route::get('/', [ConsultationReportController::class, 'index']);
        Route::post('/', [ConsultationReportController::class, 'store']);
        Route::get('/{id}', [ConsultationReportController::class, 'show']);
        Route::put('/{id}', [ConsultationReportController::class, 'update']);
        Route::delete('/{id}', [ConsultationReportController::class, 'destroy']);
    });

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

    Route::group(['prefix' => 'prescriptions'], function () {
        Route::get('/', [PrescriptionController::class, 'index']);
        Route::post('/', [PrescriptionController::class, 'store']);
        Route::get('/{id}', [PrescriptionController::class, 'show']);
        Route::put('/{id}', [PrescriptionController::class, 'update']);
        Route::delete('/{id}', [PrescriptionController::class, 'destroy']);
    });

    Route::group(['prefix' => 'services'], function () {
        Route::get('/', [ServiceController::class, 'index']);
        Route::post('/', [ServiceController::class, 'store']);
        Route::get('/{id}', [ServiceController::class, 'show']);
        Route::put('/{id}', [ServiceController::class, 'update']);
        Route::delete('/{id}', [ServiceController::class, 'destroy']);

        Route::post('/{id}/serviceplans', [ServiceController::class, 'storeServicePlan']);
        Route::put('/serviceplans/{id}', [ServiceController::class, 'updateServicePlan']);
        Route::delete('/serviceplans/{id}', [ServiceController::class, 'destroyServicePlan']);
    });

    Route::group(['prefix' => 'visits'], function () {
        Route::get('/', [VisitController::class, 'index']);
        Route::post('/', [VisitController::class, 'store']);
        Route::get('/{id}', [VisitController::class, 'show']);
        Route::put('/{id}', [VisitController::class, 'update']);
        Route::delete('/{id}', [VisitController::class, 'destroy']);
    });
});
