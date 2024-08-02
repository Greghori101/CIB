<?php

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

Route::group(['prefix' => 'services'], function () {
    Route::get('/', [AdminController::class, 'service_index']);
    Route::get('/{id}', [AdminController::class, 'service_show']);
});

Route::middleware(['check-api-token'])->group(function () {
    Route::group(['prefix' => 'services'], function () {
        Route::post('/', [AdminController::class, 'service_store']);
        Route::put('/{id}', [AdminController::class, 'service_update']);
        Route::delete('/{id}', [AdminController::class, 'service_destroy']);
    });
    Route::prefix('discharges')->group(function () {
        Route::prefix('doctors')->group(function () {
            Route::get('/', [AdminController::class, 'discharge_by_doctor_index']);
            Route::post('/', [AdminController::class, 'discharge_by_doctor_store']);
            Route::get('/{id}', [AdminController::class, 'discharge_by_doctor_show']);
            Route::put('/{id}', [AdminController::class, 'discharge_by_doctor_update']);
            Route::delete('/{id}', [AdminController::class, 'discharge_by_doctor_destroy']);
        });
        Route::prefix('admins')->group(function () {
            Route::get('/', [AdminController::class, 'discharge_by_admin_index']);
            Route::post('/', [AdminController::class, 'discharge_by_admin_store']);
            Route::get('/{id}', [AdminController::class, 'discharge_by_admin_show']);
            Route::put('/{id}', [AdminController::class, 'discharge_by_admin_update']);
            Route::delete('/{id}', [AdminController::class, 'discharge_by_admin_destroy']);
        });
        Route::get('/', [AdminController::class, 'discharge_index']);
        Route::post('/', [AdminController::class, 'discharge_store']);
        Route::get('/{id}', [AdminController::class, 'discharge_show']);
        Route::put('/{id}', [AdminController::class, 'discharge_update']);
        Route::delete('/{id}', [AdminController::class, 'discharge_destroy']);
        
    });
    Route::prefix('beds')->group(function () {
        Route::get('/', [AdminController::class, 'bed_index']);
        Route::post('/', [AdminController::class, 'bed_store']);
        Route::get('/{id}', [AdminController::class, 'bed_show']);
        Route::put('/{id}', [AdminController::class, 'bed_update']);
        Route::delete('/{id}', [AdminController::class, 'bed_destroy']);
    });
    Route::prefix('rooms')->group(function () {
        Route::get('/', [AdminController::class, 'room_index']);
        Route::post('/', [AdminController::class, 'room_store']);
        Route::get('/{id}', [AdminController::class, 'room_show']);
        Route::put('/{id}', [AdminController::class, 'room_update']);
        Route::delete('/{id}', [AdminController::class, 'room_destroy']);
    });
    Route::prefix('doctors')->group(function () {
        Route::get('/', [AdminController::class, 'doctor_index']);
        Route::post('/', [AdminController::class, 'doctor_store']);
        Route::get('/{id}', [AdminController::class, 'doctor_show']);
        Route::put('/{id}', [AdminController::class, 'docotr_update']);
        Route::delete('/{id}', [AdminController::class, 'doctor_destroy']);
    });
    Route::prefix('nurses')->group(function () {
        Route::get('/', [AdminController::class, 'nurse_index']);
        Route::post('/', [AdminController::class, 'nurse_store']);
        Route::get('/{id}', [AdminController::class, 'nurse_show']);
        Route::put('/{id}', [AdminController::class, 'nurse_update']);
        Route::delete('/{id}', [AdminController::class, 'nurse_destroy']);
    });
    Route::prefix('prescriptions')->group(function () {
        Route::get('/', [AdminController::class, 'prescription_index']);
        Route::post('/', [AdminController::class, 'prescription_store']);
        Route::get('/{id}', [AdminController::class, 'prescription_show']);
        Route::put('/{id}', [AdminController::class, 'prescription_update']);
        Route::delete('/{id}', [AdminController::class, 'prescription_destroy']);
    });
    Route::prefix('medications')->group(function () {
        Route::get('/', [AdminController::class, 'medication_index']);
        Route::post('/', [AdminController::class, 'medication_store']);
        Route::get('/{id}', [AdminController::class, 'medication_show']);
        Route::put('/{id}', [AdminController::class, 'medication_update']);
        Route::delete('/{id}', [AdminController::class, 'medication_destroy']);
    });
    Route::prefix('orders')->group(function () {
        Route::get('/', [AdminController::class, 'order_index']);
        Route::post('/', [AdminController::class, 'order_store']);
        Route::get('/{id}', [AdminController::class, 'order_show']);
        Route::put('/{id}', [AdminController::class, 'order_update']);
        Route::delete('/{id}', [AdminController::class, 'order_destroy']);
    });
    Route::prefix('reports')->group(function () {
        Route::get('/', [AdminController::class, 'report_index']);
        Route::post('/', [AdminController::class, 'report_store']);
        Route::get('/{id}', [AdminController::class, 'report_show']);
        Route::put('/{id}', [AdminController::class, 'report_update']);
        Route::delete('/{id}', [AdminController::class, 'report_destroy']);
    });
    Route::prefix('medications')->group(function () {
        Route::get('/', [AdminController::class, 'medication_index']);
        Route::post('/', [AdminController::class, 'medication_store']);
        Route::get('/{id}', [AdminController::class, 'medication_show']);
        Route::put('/{id}', [AdminController::class, 'medication_update']);
        Route::delete('/{id}', [AdminController::class, 'medication_destroy']);
    });
    Route::prefix('tests')->group(function () {
        Route::get('/', [AdminController::class, 'test_index']);
        Route::post('/', [AdminController::class, 'test_store']);
        Route::get('/{id}', [AdminController::class, 'test_show']);
        Route::put('/{id}', [AdminController::class, 'test_update']);
        Route::delete('/{id}', [AdminController::class, 'test_destroy']);
        Route::prefix('requests')->group(function () {
            Route::get('/', [AdminController::class, 'test_request_index']);
            Route::post('/', [AdminController::class, 'test_request_store']);
            Route::get('/{id}', [AdminController::class, 'test_request_show']);
            Route::put('/{id}', [AdminController::class, 'test_request_update']);
            Route::delete('/{id}', [AdminController::class, 'test_request_destroy']);
        });
        Route::prefix('results')->group(function () {
            Route::get('/', [AdminController::class, 'test_result_index']);
            Route::post('/', [AdminController::class, 'test_result_store']);
            Route::get('/{id}', [AdminController::class, 'test_result_show']);
            Route::put('/{id}', [AdminController::class, 'test_result_update']);
            Route::delete('/{id}', [AdminController::class, 'test_result_destroy']);
        });
    });
    Route::prefix('hospitalizations')->group(function () {Route::prefix('requests')->group(function () {
            Route::get('/', [AdminController::class, 'hospitalization_request_index']);
            Route::post('/', [AdminController::class, 'hospitalization_request_store']);
            Route::get('/{id}', [AdminController::class, 'hospitalization_request_show']);
            Route::put('/{id}', [AdminController::class, 'hospitalization_request_update']);
            Route::delete('/{id}', [AdminController::class, 'hospitalization_request_destroy']);
        });
        Route::get('/', [AdminController::class, 'hospitalization_index']);
        Route::post('/', [AdminController::class, 'hospitalization_store']);
        Route::get('/{id}', [AdminController::class, 'hospitalization_show']);
        Route::put('/{id}', [AdminController::class, 'hospitalization_update']);
        Route::delete('/{id}', [AdminController::class, 'hospitalization_destroy']);
        
    });

    Route::prefix('admissions')->group(function () {
        Route::get('/', [AdminController::class, 'admission_index']);
        Route::post('/', [AdminController::class, 'admission_store']);
        Route::get('/{id}', [AdminController::class, 'admission_show']);
        Route::put('/{id}', [AdminController::class, 'admission_update']);
        Route::delete('/{id}', [AdminController::class, 'admission_destroy']);
    });

    Route::prefix('rooms/tickets')->group(function () {
        Route::get('/', [AdminController::class, 'room_ticket_index']);
        Route::post('/', [AdminController::class, 'room_ticket_store']);
        Route::get('/{id}', [AdminController::class, 'room_ticket_show']);
        Route::put('/{id}', [AdminController::class, 'room_ticket_update']);
        Route::delete('/{id}', [AdminController::class, 'room_ticket_destroy']);
    });
    Route::prefix('shuttle-sheets')->group(function () {
        Route::get('/', [AdminController::class, 'shuttle_sheet_index']);
        Route::post('/', [AdminController::class, 'shuttle_sheet_store']);
        Route::get('/{id}', [AdminController::class, 'shuttle_sheet_show']);
        Route::put('/{id}', [AdminController::class, 'shuttle_sheet_update']);
        Route::delete('/{id}', [AdminController::class, 'shuttle_sheet_destroy']);
    });
    Route::prefix('tasks')->group(function () {
        Route::get('/', [AdminController::class, 'task_index']);
        Route::post('/', [AdminController::class, 'task_store']);
        Route::get('/{id}', [AdminController::class, 'task_show']);
        Route::put('/{id}', [AdminController::class, 'task_update']);
        Route::delete('/{id}', [AdminController::class, 'task_destroy']);
    });

    Route::prefix('transfers')->group(function () {
        Route::get('/', [AdminController::class, 'transfer_index']);
        Route::post('/', [AdminController::class, 'transfer_store']);
        Route::get('/{id}', [AdminController::class, 'transfer_show']);
        Route::put('/{id}', [AdminController::class, 'transfer_update']);
        Route::delete('/{id}', [AdminController::class, 'transfer_destroy']);
        Route::prefix('requests')->group(function () {
            Route::get('/', [AdminController::class, 'transfer_request_index']);
            Route::post('/', [AdminController::class, 'transfer_request_store']);
            Route::get('/{id}', [AdminController::class, 'transfer_request_show']);
            Route::put('/{id}', [AdminController::class, 'transfer_request_update']);
            Route::delete('/{id}', [AdminController::class, 'transfer_request_destroy']);
        });
    });

    Route::prefix('invoices')->group(function () {
        Route::get('/', [AdminController::class, 'invoice_index']);
        Route::post('/', [AdminController::class, 'invoice_store']);
        Route::get('/{id}', [AdminController::class, 'invoice_show']);
        Route::put('/{id}', [AdminController::class, 'invoice_update']);
        Route::delete('/{id}', [AdminController::class, 'invoice_destroy']);
    });

    Route::prefix('patients')->group(function () {
        Route::get('/', [AdminController::class, 'patient_index']);
        Route::post('/', [AdminController::class, 'patient_store']);
        Route::get('/{id}', [AdminController::class, 'patient_show']);
        Route::put('/{id}', [AdminController::class, 'patient_update']);
        Route::delete('/{id}', [AdminController::class, 'patient_destroy']);
    });
});
