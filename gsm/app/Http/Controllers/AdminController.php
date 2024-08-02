<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use App\Models\Admission;
use App\Models\InvoiceServices;
use App\Models\ServiceActivity;
use App\Models\ServiceOutlook;
use App\Models\Bed;
use App\Models\PrescriptionMedication;
use App\Models\ReportDiagnosticTest;
use App\Models\Discharge;
use App\Models\DischargeByAdmin;
use App\Models\DischargeByDoctor;
use App\Models\Doctor;
use App\Models\Hospitalization;
use App\Models\HospitalizationRequest;
use App\Models\ServiceImages;
use App\Models\Invoice;
use App\Models\Reciept;
use App\Models\Medication;
use App\Models\Nurse;
use App\Models\Room;
use App\Models\RoomTicket;
use App\Models\Service;
use App\Models\ServiceMainPhoto;
use App\Models\ServiceRecord;
use App\Models\ShuttleSheet;
use App\Models\Task;
use App\Models\Test;
use App\Models\TestResult;
use App\Models\Transfer;
use App\Models\TransferRequest;
use App\Models\Patient;
use App\Models\PharmacyOrder;
use App\Models\Prescription;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{

    public function room_index()
    {
        $rooms = Room::with(['beds'])->get();
        return response()->json($rooms);
    }

    public function room_show($id)
    {
        $room = Room::with(['beds'])->findOrFail($id);
        return response()->json($room);
    }

    public function room_store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'number' => 'required',
            'nb_bed' => 'required|integer',
            'name' => 'required',
            'beds' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $room = Room::create($request->all());

        foreach ($request->beds as $bed) {
            $room->beds()->save(new Bed(['bed_id' => $bed]));
        }

        return response()->json($room, 201);
    }

    public function room_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'number' => 'required',
            'nb_bed' => 'required|integer',
            'name' => 'required',
            'beds' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $room = Room::findOrFail($id);
        $room->update($request->all());
        $room->beds()->dissociate();
        foreach ($request->beds as $bed) {
            $room->beds()->save(new Bed(['bed_id' => $bed]));
        }
        return response()->json($room);
    }

    public function room_destroy($id)
    {
        $room = Room::findOrFail($id);
        $room->delete();

        return response()->json(['message' => 'Room deleted successfully']);
    }

    public function room_ticket_index()
    {
        $roomTickets = RoomTicket::with(['bed', 'room'])->get();
        return response()->json($roomTickets);
    }

    public function room_ticket_show($id)
    {
        $roomTicket = RoomTicket::with(['bed', 'room'])->findOrFail($id);
        return response()->json($roomTicket);
    }

    public function room_ticket_store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'bed_id' => 'required|exists:beds,id',
            'room_id' => 'required|exists:rooms,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $bed = Bed::find($request->input('bed_id'));
        $room = Room::find($request->input('room_id'));

        $roomTicketData = $request->all();
        unset($roomTicketData['bed_id']);
        unset($roomTicketData['room_id']);

        $roomTicket = RoomTicket::create($roomTicketData);

        $roomTicket->bed()->associate($bed);
        $roomTicket->room()->associate($room);

        return response()->json($roomTicket, 201);
    }

    public function room_ticket_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'bed_id' => 'required|exists:beds,id',
            'room_id' => 'required|exists:rooms,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $bed = Bed::find($request->input('bed_id'));
        $room = Room::find($request->input('room_id'));

        $roomTicketData = $request->all();
        unset($roomTicketData['bed_id']);
        unset($roomTicketData['room_id']);

        $roomTicket = RoomTicket::findOrFail($id);
        $roomTicket->update($roomTicketData);

        $roomTicket->bed()->associate($bed);
        $roomTicket->room()->associate($room);

        return response()->json($roomTicket, 200);
    }


    public function room_ticket_destroy($id)
    {
        $roomTicket = RoomTicket::findOrFail($id);
        $roomTicket->delete();

        return response()->json(['message' => 'Room ticket deleted successfully']);
    }

    public function service_index()
    {
        $services = Service::with(['main_photo', 'outlooks', 'activities', 'images'])->get();
        return response()->json($services);
    }

    public function service_show($id)
    {
        $service = Service::with(['main_photo', 'outlooks', 'activities', 'images'])->findOrFail($id);
        return response()->json($service);
    }

    public function service_store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'medical_staff' => 'required',
            'paramedical_staff' => 'required',
            'bed_capacity' => 'required',
            'name' => 'required',
            'fax' => 'required',
            'phone_number' => 'required',
            'email' => 'required',
            'outlooks' => 'required',
            'activities' => 'required',
        ]);

        $file = $request->file('main_photo');
        $name = $file->getClientOriginalName();
        $content = file_get_contents($file->getRealPath());
        $extension = $file->getClientOriginalExtension();

        $service = Service::create($request->all());


        $service->main_photo()->save(new ServiceMainPhoto([
            'name' => $name,
            'content' => base64_encode($content),
            'extension' => $extension,
        ]));

        $files = $request->file('uploaded_images');

        foreach ($files as $file) {
            # code...
            $name = $file->getClientOriginalName(); // Get the original name of the file
            $content = file_get_contents($file->getRealPath()); // Get the content of the file
            $extension = $file->getClientOriginalExtension(); // Get the extension of the file

            $service->images()->save(new ServiceImages([
                'name' => $name,
                'content' => base64_encode($content),
                'extension' => $extension,
            ]));
        }

        foreach ($request->activities as $activity) {

            $service->activities()->save(new ServiceActivity([
                'content' => $activity,
            ]));
        }
        foreach ($request->outlooks as $outlook) {

            $service->activities()->save(new ServiceOutlook([
                'content' => $outlook,
            ]));
        }
        // Handle the response


        $response =  Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $request->bearerToken(),
        ])->post(env('GRDV_SERVER') . '/api/services', $service);

        // Handle the response
        if (!$response->successful()) {
            // Failed to send the notification
            return $response;
        }

        return response()->json($service, 201);
    }

    public function service_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'medical_staff' => 'required',
            'paramedical_staff' => 'required',
            'bed_capacity' => 'required',
            'name' => 'required',
            'fax' => 'required',
            'phone_number' => 'required',
            'email' => 'required',
        ]);

        $file = $request->file('file');
        $name = $file->getClientOriginalName();
        $content = file_get_contents($file->getRealPath());
        $extension = $file->getClientOriginalExtension();

        $service = Service::create($request->all());


        $service->main_photo(new ServiceMainPhoto([
            'name' => $name,
            '$content' => $content,
            'extension' => $extension,
        ]));

        $files = $request->file('uploaded_images');

        foreach ($files as $file) {
            # code...
            $name = $file->getClientOriginalName(); // Get the original name of the file
            $content = file_get_contents($file->getRealPath()); // Get the content of the file
            $extension = $file->getClientOriginalExtension(); // Get the extension of the file

            $service->images()->save(new ServiceImages([
                'name' => $name,
                'content' => base64_encode($content),
                'extension' => $extension,
            ]));
        }
        // Handle the response


        $response =  Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $request->bearerToken(),
        ])->put(env('GRDV_SERVER') . '/api/services/' . $request->service_id, $service);

        // Handle the response
        if (!$response->successful()) {
            // Failed to send the notification
            return $response;
        }

        return response()->json($service, 201);
    }

    public function service_destroy($id)
    {
        $service = Service::findOrFail($id);
        $service->delete();

        return response()->json(['message' => 'Service deleted successfully']);
    }

    public function shuttle_sheet_index()
    {
        $shuttle_sheets = ShuttleSheet::with(['patient', 'admission', 'hospitalization'])->all();
        return response()->json($shuttle_sheets);
    }

    public function shuttle_sheet_show($id)
    {
        $shuttle_sheet = ShuttleSheet::with(['admission', 'hospitalization', 'patient', 'transfers'])->findOrFail($id);
        return response()->json($shuttle_sheet);
    }

    public function shuttle_sheet_store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'admission_id' => 'required|exists:admissions,id',
            'hospitalization_id' => 'required|exists:hospitalizations,id',
            'patient_id' => 'required|exists:patients,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $admission = Admission::find($request->input('admission_id'));
        $hospitalization = Hospitalization::find($request->input('hospitalization_id'));
        $patient = Patient::find($request->input('patient_id'));

        $shuttle_sheetData = $request->all();
        unset($shuttle_sheetData['admission_id']);
        unset($shuttle_sheetData['hospitalization_id']);
        unset($shuttle_sheetData['patient_id']);

        $shuttle_sheet = ShuttleSheet::create($shuttle_sheetData);

        $shuttle_sheet->admission()->associate($admission);
        $shuttle_sheet->hospitalization()->associate($hospitalization);
        $shuttle_sheet->patient()->associate($patient);

        return response()->json($shuttle_sheet, 201);
    }

    public function shuttle_sheet_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'admission_id' => 'required|exists:admissions,id',
            'hospitalization_id' => 'required|exists:hospitalizations,id',
            'patient_id' => 'required|exists:patients,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $admission = Admission::find($request->input('admission_id'));
        $hospitalization = Hospitalization::find($request->input('hospitalization_id'));
        $patient = Patient::find($request->input('patient_id'));

        $shuttle_sheetData = $request->all();
        unset($shuttle_sheetData['admission_id']);
        unset($shuttle_sheetData['hospitalization_id']);
        unset($shuttle_sheetData['patient_id']);

        $shuttle_sheet = ShuttleSheet::findOrFail($id);
        $shuttle_sheet->update($shuttle_sheetData);

        $shuttle_sheet->admission()->associate($admission);
        $shuttle_sheet->hospitalization()->associate($hospitalization);
        $shuttle_sheet->patient()->associate($patient);

        return response()->json($shuttle_sheet, 200);
    }

    public function shuttle_sheet_destroy($id)
    {
        $shuttle_sheet = ShuttleSheet::findOrFail($id);
        $shuttle_sheet->delete();

        return response()->json(['message' => 'Shuttle sheet deleted successfully']);
    }

    public function task_index()
    {
        $tasks = Task::with(['nurse'])->get();
        return response()->json($tasks);
    }

    public function task_show($id)
    {
        $task = Task::with(['doctor', 'nurse'])->findOrFail($id);
        return response()->json($task);
    }

    public function task_store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'content' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $task = Task::create($request->all());

        return response()->json($task, 201);
    }

    public function task_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'content' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $task = Task::findOrFail($id);
        $task->update($request->all());

        return response()->json($task);
    }

    public function task_destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json(['message' => 'Task deleted successfully']);
    }

    public function test_index()
    {
        $tests = Test::with(['doctor', 'patient', 'service', 'notes'])->get();
        return response()->json($tests);
    }

    public function test_show($id)
    {
        $test = Test::with(['doctor', 'service', 'patient', 'notes'])->findOrFail($id);
        return response()->json($test);
    }

    public function test_store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'type' => 'required',
            'status' => 'required',
            'request_date' => 'required',
            'expected_result_date' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $test = Test::create($request->all());

        return response()->json($test, 201);
    }

    public function test_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'type' => 'required',
            'status' => 'required',
            'request_date' => 'required',
            'expected_result_date' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $test = Test::findOrFail($id);
        $test->update($request->all());

        return response()->json($test);
    }

    public function test_destroy($id)
    {
        $test = Test::findOrFail($id);
        $test->delete();

        return response()->json(['message' => 'Test deleted successfully']);
    }



    public function test_result_index()
    {
        $testResults = TestResult::with(['results', 'doctor', 'service'])->get();
        return response()->json($testResults);
    }

    public function test_result_show($id)
    {
        $testResult = TestResult::with(['doctor', 'service', 'test', 'notes', 'results'])->findOrFail($id);
        return response()->json($testResult);
    }

    public function test_result_store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'type' => 'required',
            'summary' => 'required',
            'details' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $testResult = TestResult::create($request->all());

        return response()->json($testResult, 201);
    }

    public function test_result_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'type' => 'required',
            'summary' => 'required',
            'details' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $testResult = TestResult::findOrFail($id);
        $testResult->update($request->all());

        return response()->json($testResult);
    }

    public function test_result_destroy($id)
    {
        $testResult = TestResult::findOrFail($id);
        $testResult->delete();

        return response()->json(['message' => 'Test result deleted successfully']);
    }

    public function transfer_index()
    {
        $transfers = Transfer::with(['docotr', 'service'])->get();
        return response()->json($transfers);
    }

    public function transfer_show($id)
    {
        $transfer = Transfer::with(['bed', 'doctor', 'service', 'request', 'shuttle_sheet'])->findOrFail($id);
        return response()->json($transfer);
    }

    public function transfer_create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'enter_date' => 'required',
            'enter_time' => 'required',
            'bed_id' => 'required|exists:beds,id',
            'doctor_id' => 'required|exists:doctors,id',
            'service_id' => 'required|exists:services,id',
            'shuttle_sheet_id' => 'required|exists:shuttle_sheets,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $transfer = Transfer::create([
            'enter_date' => $request->input('enter_date'),
            'enter_time' => $request->input('enter_time'),
            'bed_id' => $request->input('bed_id'),
            'doctor_id' => $request->input('doctor_id'),
            'service_id' => $request->input('service_id'),
            'shuttle_sheet_id' => $request->input('shuttle_sheet_id'),
        ]);

        return response()->json($transfer, 201);
    }


    public function transfer_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'enter_date' => 'required',
            'enter_time' => 'required',
            'bed_id' => 'required|exists:beds,id',
            'doctor_id' => 'required|exists:doctors,id',
            'service_id' => 'required|exists:services,id',
            'shuttle_sheet_id' => 'required|exists:shuttle_sheets,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $transfer = Transfer::findOrFail($id);
        $transfer->enter_date = $request->input('enter_date');
        $transfer->enter_time = $request->input('enter_time');
        $transfer->bed_id = $request->input('bed_id');
        $transfer->doctor_id = $request->input('doctor_id');
        $transfer->service_id = $request->input('service_id');
        $transfer->shuttle_sheet_id = $request->input('shuttle_sheet_id');
        $transfer->save();

        return response()->json($transfer, 200);
    }

    public function transfer_destroy($id)
    {
        $transfer = Transfer::findOrFail($id);
        $transfer->delete();

        return response()->json(['message' => 'Transfer deleted successfully']);
    }


    public function transfer_request_index()
    {
        $transferRequests = TransferRequest::with(['service_source', 'service_destination'])->all();
        return response()->json($transferRequests);
    }

    public function transfer_request_show($id)
    {
        $transferRequest = TransferRequest::with(['doctor', 'service_source', 'service_destination', 'transfer'])->findOrFail($id);
        return response()->json($transferRequest);
    }

    public function transfer_request_store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'reason' => 'required',
            'request_date' => 'required|date',
            'transfer_date' => 'required|date',
            'type' => 'required',
            'doctor_id' => 'required|exists:doctors,id',
            'patient_id' => 'required|exists:patients,id',
            'service_source_id' => 'required|exists:services,id',
            'service_destination_id' => 'required|exists:services,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $transferRequest = TransferRequest::create($request->all());
        $doctor = Doctor::find($request->input('doctor_id'));
        $patient = Patient::find($request->input('patient_id'));
        $serviceSource = Service::find($request->input('service_source_id'));
        $serviceDestination = Service::find($request->input('service_destination_id'));

        $transferRequest->doctor()->associate($doctor);
        $transferRequest->patient()->associate($patient);
        $transferRequest->service_source()->associate($serviceSource);
        $transferRequest->service_destination()->associate($serviceDestination);

        return response()->json($transferRequest, 201);
    }

    public function transfer_request_update(Request $request, TransferRequest $transferRequest)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'reason' => 'required',
            'request_date' => 'required|date',
            'transfer_date' => 'required|date',
            'patient_id' => 'required|exists:patients,id',
            'type' => 'required',
            'doctor_id' => 'required|exists:doctors,id',
            'service_source_id' => 'required|exists:services,id',
            'service_destination_id' => 'required|exists:services,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $transferRequest->update($request->all());
        $patient = Patient::find($request->input('patient_id'));
        $doctor = Doctor::find($request->input('doctor_id'));
        $serviceSource = Service::find($request->input('service_source_id'));
        $serviceDestination = Service::find($request->input('service_destination_id'));

        $transferRequest->doctor()->associate($doctor);
        $transferRequest->service_source()->associate($serviceSource);
        $transferRequest->service_destination()->associate($serviceDestination);
        $transferRequest->patient()->associate($patient);

        return response()->json($transferRequest, 200);
    }

    public function transfer_request_response(Request $request, $transferRequestId)
    {
        $validator = Validator::make($request->all(), [
            'response' => 'required',
            'status' => 'required|in:validated,rejected',
            'enter_date' => 'required|date',
            'enter_time' => 'required',
            'bed_id' => 'required|exists:beds,id',
            'doctor_id' => 'required|exists:doctors,id',
            'service_id' => 'required|exists:services,id',
            'shuttle_sheet_id' => 'required|exists:shuttle_sheets,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $response = $request->input('response');
        $status = $request->input('status');
        $enterDate = $request->input('enter_date');
        $enterTime = $request->input('enter_time');
        $bedId = $request->input('bed_id');
        $doctorId = $request->input('doctor_id');
        $shuttleSheetId = $request->input('shuttle_sheet_id');

        $transferRequest = TransferRequest::find($transferRequestId);

        if (!$transferRequest) {
            return response()->json(['error' => 'Transfer request not found'], 404);
        }

        if (!empty($response)) {
            $transferRequest->response = $response;
            $transferRequest->status = $status;
            $transferRequest->save();

            // Create a new transfer
            $transfer = new Transfer();
            $transfer->enter_date = $enterDate;
            $transfer->enter_time = $enterTime;
            $transfer->transfer_request_id = $transferRequest->id;
            $transfer->bed_id = $bedId;
            $transfer->doctor_id = $doctorId;
            $transfer->service_id = $transferRequest->service_destination_id;
            $transfer->shuttle_sheet_id = $shuttleSheetId;
            $transfer->save();

            return response()->json($transferRequest, 200);
        }

        return response()->json(['error' => 'Invalid response value'], 400);
    }


    public function transfer_request_destroy($id)
    {
        $transferRequest = TransferRequest::findOrFail($id);
        $transferRequest->delete();

        return response()->json(['message' => 'Transfer request deleted successfully']);
    }




    public function admission_index()
    {
        $admissions = Admission::with(['shuttle_sheet', 'patient', 'hospitalization'])->all();
        return response()->json($admissions);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function admission_store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'admission_id' => 'required',
            'date' => 'required|date',
            'insurance_id' => 'required',
            'profession' => 'required',
            'profession_code' => 'required',
            'number_support' => 'required',
            'affiliate_fund' => 'required',
            'insurance_address_country' => 'required',
            'insurance_address_state' => 'required',
            'insurance_address_city' => 'required',
            'insurance_address_daira' => 'required',
            'insurance_address_street' => 'required',
            'patient_id' => 'required|exists:patients,id',
            'hospitalization_id' => 'required|exists:hospitalization_requests,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        $patient = Patient::find($request->input('patient_id'));
        $hospitalization_request = HospitalizationRequest::find($request->input('hospitalization_id'));

        $hospitalization = Hospitalization::create($hospitalization_request->toArray());
        $patient->service_id = $hospitalization->service_id;
        $patient->save();
        $admissionData = $request->all();

        $admission = Admission::create($admissionData);
        $admission->insurance_address()->create([
            'city' => $request->insurance_address_city,
            'daira' => $request->insurance_address_daira,
            'state' => $request->insurance_address_state,
            'street' => $request->insurance_address_street,
        ]);

        $admission->patient()->associate($patient);
        $admission->hospitalization()->associate($hospitalization);
        $shuttle_sheet =  ShuttleSheet::create();

        $shuttle_sheet->admission()->associate($admission);
        $shuttle_sheet->hospitalization()->associate($hospitalization);
        $shuttle_sheet->patient()->associate($patient);
        
        $admission->save();
        $shuttle_sheet->save();
        return response()->json($admission, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function admission_show($id)
    {
        $admission = Admission::with(['shuttle_sheet', 'patient', 'hospitalization'])->findOrFail($id);
        return response()->json($admission);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function admission_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'admission_id' => 'required',
            'date' => 'required|date',
            'insurance_id' => 'required',
            'profession' => 'required',
            'profession_code' => 'required',
            'number_support' => 'required',
            'affiliate_fund' => 'required',
            'insurance_address_country' => 'required',
            'insurance_address_state' => 'required',
            'insurance_address_city' => 'required',
            'insurance_address_daira' => 'required',
            'insurance_address_street' => 'required',
            'patient_id' => 'required|exists:patients,id',
            'hospitalization_id' => 'required|exists:hospitalizations,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $patient = Patient::find($request->input('patient_id'));
        $hospitalization = Hospitalization::find($request->input('hospitalization_id'));

        $admissionData = $request->all();
        unset($admissionData['insurance_address_city']);
        unset($admissionData['insurance_address_street']);
        unset($admissionData['insurance_address_daira']);
        unset($admissionData['insurance_address_state']);

        $admission = Admission::findOrFail($id);
        $admission->update($admissionData);

        $admission->insurance_address()->update([
            'insurance_address_city' => $request->insurance_address_city,
            'insurance_address_daira' => $request->insurance_address_daira,
            'insurance_address_state' => $request->insurance_address_state,
            'insurance_address_street' => $request->insurance_address_street,
        ]);

        $shuttle_sheet = $admission->shuttle_sheet;

        $shuttle_sheet->hospitalization()->associate($hospitalization);
        $shuttle_sheet->patient()->associate($patient);
        $admission->patient()->associate($patient);
        $admission->hospitalization()->associate($hospitalization);

        return response()->json($admission, 200);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function admission_destroy($id)
    {
        $admission = Admission::findOrFail($id);
        $admission->delete();

        return response()->json(['message' => 'Admission deleted successfully']);
    }

    public function discharge_index()
    {
        $discharges = Discharge::with(['patient', 'discharge_by_admin', 'discharge_by_doctor'])->get();

        return response()->json($discharges);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function discharge_store(Request $request)
    {
        $request->validate([
            'patient_id' => 'required|exists:patients,id',
        ]);

        $discharge = Discharge::create($request->all());

        return response()->json($discharge, 201);
    }

    public function discharge_show($id)
    {
        $discharge = Discharge::with(['patient', 'discharge_by_admin', 'discharge_by_doctor'])->findOrFail($id);

        return response()->json($discharge);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */
    public function discharge_update(Request $request, $id)
    {
        $request->validate([
            'patient_id' => 'required|exists:patients,id',
        ]);

        $discharge = Discharge::findOrFail($id);
        $discharge->update($request->all());

        return response()->json($discharge);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */
    public function discharge_destroy($id)
    {
        $discharge = Discharge::findOrFail($id);
        $discharge->delete();

        return response()->json(null, 204);
    }

    public function discharge_by_admin_index()
    {
        $dischargesByAdmin = DischargeByAdmin::all();
        return response()->json($dischargesByAdmin);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function discharge_by_admin_store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'discharge_document_type' => 'required',
            'accompanied_on_leaving_by' => 'required',
            'patient_id' => 'required|exists:patients,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $patient = Patient::find($request->patient_id);

        $discharge = $patient->discharge;

        $dischargeByAdmin = DischargeByAdmin::create($request->all());

        $discharge->update(['discharge_by_admin_id' => $dischargeByAdmin->id]);

        return response()->json($dischargeByAdmin, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function discharge_by_admin_show($id)
    {
        $dischargeByAdmin = DischargeByAdmin::findOrFail($id);
        return response()->json($dischargeByAdmin);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function discharge_by_admin_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'discharge_document_type' => 'required',
            'accompanied_on_leaving_by' => 'required',
            'patient_id' => 'required|exists:patients,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $dischargeByAdmin = DischargeByAdmin::findOrFail($id);
        $dischargeByAdmin->update($request->all());

        return response()->json($dischargeByAdmin, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function discharge_by_admin_destroy($id)
    {
        $dischargeByAdmin = DischargeByAdmin::findOrFail($id);
        $dischargeByAdmin->delete();

        return response()->json(['message' => 'DischargeByAdmin deleted successfully']);
    }


    public function discharge_by_doctor_index()
    {
        $dischargesByDoctor = DischargeByDoctor::all();
        return response()->json($dischargesByDoctor);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function discharge_by_doctor_store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'time' => 'required',
            'discharge_mode' => 'required',
            'enter_reason' => 'required',
            'discharge_diagnosis' => 'required',
            'patient_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }



        $dischargeByDoctor = DischargeByDoctor::create($request->all());


        Discharge::create([
            'patient_id' => $request->patient_id,
            'discharge_by_doctor_id' => $dischargeByDoctor->id,
        ]);



        return response()->json($dischargeByDoctor, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function discharge_by_doctor_show($id)
    {
        $dischargeByDoctor = DischargeByDoctor::findOrFail($id);
        return response()->json($dischargeByDoctor);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function discharge_by_doctor_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'time' => 'required',
            'discharge_mode' => 'required',
            'enter_reason' => 'required',
            'discharge_diagnosis' => 'required',
            'patient_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $dischargeByDoctor = DischargeByDoctor::findOrFail($id);
        $dischargeByDoctor->update($request->all());

        return response()->json($dischargeByDoctor, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function discharge_by_doctor_destroy($id)
    {
        $dischargeByDoctor = DischargeByDoctor::findOrFail($id);
        $dischargeByDoctor->delete();

        return response()->json(['message' => 'DischargeByDoctor deleted successfully']);
    }

    public function doctor_index(Request $request)
    {
        $doctors = Doctor::all();
        $response =  Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $request->bearerToken(),
        ])->post(env('AUTH_SERVER') . '/api/users/all', ["data" => $doctors]);
        return $response;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function doctor_store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'specialization' => 'required',
            'service_id' => 'required|exists:services,id',
            'chief' => 'required',
            'firstname' => 'required',
            'lastname' => 'required',
            'national_id' => 'required',
            'phone_number' => 'required',
            'gender' => 'required',
            'birth_date' => 'required',
            'birth_place' => 'required',
            'state' => 'required',
            'daira' => 'required',
            'city' => 'required',
            'street' => 'required',
            'email' => 'required|email',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        $data = [
            'role' => 'doctor',
            'email' => $request->email,
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'birth_date' => $request->birth_date,
            'birth_place' => $request->birth_place,
            'daira' => $request->daira,
            'state' => $request->state,
            'city' => $request->city,
            'street' => $request->street,
            'national_id' => $request->national_id,
            'gender' => $request->gender,
            'phone_number' => $request->phone_number,
        ];

        $response =  Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $request->bearerToken(),
        ])->post(env('AUTH_SERVER') . '/api/users', $data);

        // Handle the response
        $user_data = [];
        if ($response->successful()) {
            $user_data = $response->json();
        } else {
            // Failed to send the notification
            return $response;
        }

        $doctor = Doctor::create([
            'specialization' => $request->specialization,
            'chief' => $request->chief,
            'name' => $request->lastname . " " . $request->firstname,

            'user_id' => $user_data['id'],
        ]);

        $service = Service::find($request->service_id);

        $service->doctors()->save($doctor);

        $response =  Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $request->bearerToken(),
        ])->post(env('GRDV_SERVER') . '/api/doctors', $doctor);

        // Handle the response
        if (!$response->successful()) {
            // Failed to send the notification
            return $response;
        }

        $response =  Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $request->bearerToken(),
        ])->post(env('GDME_SERVER') . '/api/doctors', $doctor);

        // Handle the response
        if (!$response->successful()) {
            // Failed to send the notification
            return $response;
        }



        return response()->json($doctor, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function doctor_show(Request $request, $id)
    {
        $doctor = Doctor::findOrFail($id);
        $response =  Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $request->bearerToken(),
        ])->post(env('AUTH_SERVER') . '/api/user/all', ["data" => $doctor]);
        return $response;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function doctor_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'specialization' => 'required',
            'service_id' => 'required|exists:services,id',
            'chief' => 'required',
            'firstname' => 'required',
            'lastname' => 'required',
            'natinal_id' => 'required',
            'phone_number' => 'required',
            'gender' => 'required',
            'birth_date' => 'required',
            'birth_place' => 'required',
            'state' => 'required',
            'daira' => 'required',
            'city' => 'required',
            'street' => 'required',
        ]);

        $data = [
            'role' => 'doctor',
            'email' => $request->email,
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'daira' => $request->daira,
            'state' => $request->state,
            'city' => $request->city,
            'street' => $request->street,
            'birth_date' => $request->birth_date,
            'birth_place' => $request->birth_place,
            'phone_number' => $request->phone_number,
            'national_id' => $request->national_id,
            'role' => 'patient',
            'gender' => $request->gender,
        ];
        $doctor = Doctor::find($id)->update([
            'specialization' => $request->specialization,
            'chief' => $request->chief,
            'name' => $request->lastname . " " . $request->firstname,

        ]);


        $response =  Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $request->bearerToken(),
        ])->put(env('AUTH_SERVER') . '/api/users', $data);

        // Handle the response
        if ($response->successful()) { // Failed to send the notification
            return $response;
        }


        $service = Service::find($request->service_id);

        $doctor->service()->associate($service);

        $response =  Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $request->bearerToken(),
        ])->put(env('GRDV_SERVER') . '/api/doctors', $doctor);

        // Handle the response
        if (!$response->successful()) {
            // Failed to send the notification
            return $response;
        }

        $response =  Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $request->bearerToken(),
        ])->put(env('GDME_SERVER') . '/api/doctors', $doctor);

        // Handle the response
        if (!$response->successful()) {
            // Failed to send the notification
            return $response;
        }
        return response()->json($doctor, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function doctor_destroy($id)
    {
        $doctor = Doctor::findOrFail($id);
        $doctor->delete();

        return response()->json(['message' => 'Doctor deleted successfully']);
    }

    public function bed_index()
    {
        $beds = Bed::with(['room'])->get();
        return response()->json($beds);
    }

    public function hospitalization_index()
    {
        $hospitalizations = Hospitalization::with(['doctor', 'service', 'patient', 'bed'])->get();
        return response()->json($hospitalizations);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function hospitalization_store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'time' => 'required',
            'service_id' => 'required|exists:services,id',
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'nurse_id' => 'required|exists:nurses,id',
            'bed_id' => 'required|exists:beds,id',
        ]);


        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $hospitalization = Hospitalization::create($request->all());

        $patient = Patient::find($request->patient_id);
        $patient->service_id = $request->service_id;

        $patient->save();

        return response()->json($hospitalization, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function hospitalization_show($id)
    {
        $hospitalization = Hospitalization::with(['doctor', 'service', 'patient', 'bed'])->findOrFail($id);
        return response()->json($hospitalization);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function hospitalization_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'time' => 'required',
            'service_id' => 'required|exists:services,id',
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'nurse_id' => 'required|exists:nurses,id',
            'bed_id' => 'required|exists:beds,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $hospitalization = Hospitalization::findOrFail($id);
        $hospitalization->update($request->all());

        return response()->json($hospitalization, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function hospitalization_destroy($id)
    {
        $hospitalization = Hospitalization::findOrFail($id);
        $hospitalization->delete();

        return response()->json(['message' => 'Hospitalization deleted successfully']);
    }


    public function hospitalization_request_index()
    {
        $requests = HospitalizationRequest::with(['doctor', 'patient', 'service'])->get();
        return response()->json($requests);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function hospitalization_request_store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'time' => 'required',
            'service_id' => 'required|exists:services,id',
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'nurse_id' => 'required|exists:nurses,id',
            'bed_id' => 'required|exists:beds,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        $service = Service::find($request->service_id);
        $patient = Patient::find($request->patient_id);
        $doctor = Doctor::find($request->doctor_id);
        $nurse = Nurse::find($request->nurse_id);
        $bed = Bed::find($request->bed_id);

        $hospitalization_request = HospitalizationRequest::create($request->all());
        $hospitalization_request->service()->associate($service);
        $hospitalization_request->patient()->associate($patient);
        $hospitalization_request->doctor()->associate($doctor);
        $hospitalization_request->nurse()->associate($nurse);
        $hospitalization_request->bed()->associate($bed);
        $data = [
            'type' => 'hospitalization_request',
            'title' => 'New Hospitalization Request',
            'content' => 'A new hospitalization request has been submitted.',
            'displayed' => false,
            'to' => env('ADMIN'), // Replace $adminId with the ID of the admin user
        ];

        $data = [
            'type' => 'visit',
            'title' => 'New Visit Scheduled',
            'content' => 'A new visit has been scheduled with you.',
            'displayed' => false,
            'to' => env('ADMIN'),
        ];
        $response =  Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $request->bearerToken(),
        ])->post(env('AUTH_SERVER') . '/api/notifications', $data);

        // Handle the response
        if (!$response->successful()) {
            // Failed to send the notification
            return $response;
        }
        return response()->json($hospitalization_request, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function hospitalization_request_show($id)
    {
        $request = HospitalizationRequest::with(['doctor', 'patient', 'service'])->findOrFail($id);
        return response()->json($request);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function hospitalization_request_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'time' => 'required',
            'status' => 'required',
            'response' => 'required',
            'service_id' => 'required|exists:services,id',
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'nurse_id' => 'required|exists:nurses,id',
            'bed_id' => 'required|exists:beds,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $request = HospitalizationRequest::findOrFail($id);
        $request->update($request->all());

        return response()->json($request, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function hospitalization_request_destroy($id)
    {
        $request = HospitalizationRequest::findOrFail($id);
        $request->delete();

        return response()->json(['message' => 'Hospitalization request deleted successfully']);
    }

    public function invoice_index()
    {
        $invoices = Invoice::all();
        return response()->json($invoices);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function invoice_store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'type' => 'required',
            'tax' => 'required',
            'total' => 'required',
            'total_amount' => 'required',
            'patient_id' => 'required',
            'services' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $patient = Patient::find($request->patient_id);

        $invoice = Invoice::create($request->all());
        $reciept = Reciept::create(["total_amount" => $request->total_amount]);

        $patient->discharge->discharge_by_admin->invoice()->associate($invoice);
        $invoice->reciept()->save($reciept);

        foreach ($request->services as $service) {
            $service = InvoiceServices::create(['price' => $service['price'], 'description' => $service['description']]);
            $invoice->services()->save($service);
        }

        return response()->json($invoice, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function invoice_show($id)
    {
        $invoice = Invoice::with(['patient', 'services'])->findOrFail($id);
        return response()->json($invoice);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function invoice_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'type' => 'required',
            'tax' => 'required',
            'total' => 'required',
            'total_amount' => 'required',
            'patient_id' => 'required|exists:patients,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $invoice = Invoice::findOrFail($id);
        $invoice->update($request->all());

        return response()->json($invoice, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function invoice_destroy($id)
    {
        $invoice = Invoice::findOrFail($id);
        $invoice->delete();

        return response()->json(['message' => 'Invoice deleted successfully']);
    }



    public function medication_index()
    {
        $medications = Medication::all();
        return response()->json($medications);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function medication_store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'class_pharmacological' => 'required',
            'class_therapeutic' => 'required',
            'generic' => 'required',
            'commercial_name' => 'required',
            'dosage' => 'required',
            'form' => 'required',
            'quantity' => 'required',
            'conditioning' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $medication = Medication::create($request->all());

        return response()->json($medication, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function medication_show($id)
    {
        $medication = Medication::findOrFail($id);
        return response()->json($medication);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function medication_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'class_pharmacological' => 'required',
            'class_therapeutic' => 'required',
            'generic' => 'required',
            'commercial_name' => 'required',
            'dosage' => 'required',
            'form' => 'required',
            'conditioning' => 'required',
            'quantity' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $medication = Medication::findOrFail($id);
        $medication->update($request->all());

        return response()->json($medication, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function medication_destroy($id)
    {
        $medication = Medication::findOrFail($id);
        $medication->delete();

        return response()->json(['message' => 'Medication deleted successfully']);
    }

    public function nurse_index(Request $request)
    {
        $nurses = Nurse::all();
        $response =  Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $request->bearerToken(),
        ])->post(env('AUTH_SERVER') . '/api/users/all', ["data" => $nurses]);
        return $response;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function nurse_store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstname' => 'required',
            'lastname' => 'required',
            'national_id' => 'required',
            'phone_number' => 'required',
            'gender' => 'required',
            'birth_date' => 'required',
            'birth_place' => 'required',
            'email' => 'required',
            'service_id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $data = [
            'role' => 'nurse',
            'email' => $request->email,
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'birth_date' => $request->birth_date,
            'birth_place' => $request->birth_place,
            'daira' => $request->daira,
            'state' => $request->state,
            'city' => $request->city,
            'street' => $request->street,
            'national_id' => $request->national_id,
            'gender' => $request->gender,
            'phone_number' => $request->phone_number,
        ];

        $response =  Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $request->bearerToken(),
        ])->post(env('AUTH_SERVER') . '/api/users', $data);

        // Handle the response
        $user_data = [];
        if ($response->successful()) {
            $user_data = $response->json();
        } else {
            // Failed to send the notification
            return $response;
        }

        $nurse = Nurse::create([
            'user_id' => $user_data['id'],
            'name' => $request->lastname . " " . $request->firstname,

        ]);

        $service = Service::find($request->service_id);

        $nurse->service()->associate($service);

        return response()->json($nurse, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function nurse_show(Request $request, $id)
    {
        $nurse = Nurse::findOrFail($id);
        $response =  Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $request->bearerToken(),
        ])->post(env('AUTH_SERVER') . '/api/user/all', ["data" => $nurse]);
        return $response;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function nurse_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'firstname' => 'required',
            'lastname' => 'required',
            'national_id' => 'required',
            'phone_number' => 'required',
            'gender' => 'required',
            'birth_date' => 'required',
            'birth_place' => 'required',
            'email' => 'required',
            'service_id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        $nurse = Nurse::find($id);
        $nurse->update([
            'name' => $request->lastname . " " . $request->firstname,

        ]);
        $data = [
            'role' => 'nurse',
            'email' => $request->email,
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'birth_date' => $request->birth_date,
            'birth_place' => $request->birth_place,
            'daira' => $request->daira,
            'state' => $request->state,
            'city' => $request->city,
            'street' => $request->street,
            'national_id' => $request->national_id,
            'gender' => $request->gender,
            'phone_number' => $request->phone_number,
        ];

        $response =  Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $request->bearerToken(),
        ])->put(env('AUTH_SERVER') . '/api/users/' . $nurse->user_id, $data);

        // Handle the response
        if (!$response->successful()) {
            // Failed to send the notification
            return $response;
        }

        $service = Service::find($request->service_id);

        $nurse->service()->associate($service);

        return response()->json($nurse, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function nurse_destroy($id)
    {
        $nurse = Nurse::findOrFail($id);
        $nurse->delete();

        return response()->json(['message' => 'Nurse deleted successfully']);
    }

    public function patient_index(Request $request)
    {
        $patients = Patient::all();
        $response =  Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $request->bearerToken(),
        ])->post(env('AUTH_SERVER') . '/api/users/all', ["data" => $patients]);
        return $response;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function patient_store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstname' => 'required',
            'lastname' => 'required',
            'national_id' => 'required',
            'nationality' => 'required',
            'blood_group' => 'required',
            'phone_number' => 'required',
            'gender' => 'required',
            'birth_date' => 'required',
            'birth_place' => 'required',
            'family_situation' => 'required',
            'person_contact' => 'required',
            'person_contact_p hone' => 'required',
            'person_contact_wilaya' => 'required',
            'height' => 'required',
            'weight' => 'required',
            'state' => 'required',
            'daira' => 'required',
            'city' => 'required',
            'email' => 'required',
            'street' => 'required',
        ]);

        $data = [
            'role' => 'patient',
            'email' => $request->email,
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'birth_date' => $request->birth_date,
            'birth_place' => $request->birth_place,
            'daira' => $request->daira,
            'state' => $request->state,
            'city' => $request->city,
            'street' => $request->street,
            'national_id' => $request->national_id,
            'gender' => $request->gender,
            'phone_number' => $request->phone_number,
        ];

        $response =  Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $request->bearerToken(),
        ])->post(env('AUTH_SERVER') . '/api/users', $data);


        // Handle the response
        $user_data = [];
        if ($response->successful()) {
            $user_data = $response->json();
        } else {
            // Failed to send the notification
            return $response;
        }

        $patient = Patient::create([
            'blood_group' => $request->blood_group,
            'person_contact' => $request->person_contact,
            'person_contact_phone' => $request->person_contact_phone,
            'person_contact_wilaya' => $request->person_contact_wilaya,
            'height' => $request->height,
            'weight' => $request->weight,
            'user_id' => $user_data['id'],
            'nationality' => $request->nationality,
            'family_situation' => $request->family_situation,
            'name' => $request->lastname . " " . $request->firstname,
        ]);

        $response =  Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $request->bearerToken(),
        ])->post(env('GRDV_SERVER') . '/api/patients', $patient);

        // Handle the response
        if (!$response->successful()) {
            // Failed to send the notification
            return $response;
        }

        $response =  Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $request->bearerToken(),
        ])->post(env('GDME_SERVER') . '/api/patients', $patient);

        // Handle the response
        if (!$response->successful()) {
            // Failed to send the notification
            return $response;
        }


        return response()->json($patient, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function patient_show(Request $request, $id)
    {
        $patient = Patient::with(['service', 'admission.insurance_address', 'hospitalization', 'invoice', 'shuttle_sheet'])->findOrFail($id);
        $response =  Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $request->bearerToken(),
        ])->post(env('AUTH_SERVER') . '/api/user/all', ["data" => $patient]);
        return $response;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function patient_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'firstname' => 'required',
            'lastname' => 'required',
            'natinal_id' => 'required',
            'natonality' => 'required',
            'blood_group' => 'required',
            'phone_number' => 'required',
            'gender' => 'required',
            'birth_date' => 'required',
            'birth_place' => 'required',
            'family_situation' => 'required',
            'person_contact' => 'required',
            'person_contact_phone' => 'required',
            'person_contact_wilaya' => 'required',
            'height' => 'required',
            'weight' => 'required',
            'state' => 'required',
            'daira' => 'required',
            'city' => 'required',
            'street' => 'required',
        ]);

        $data = [
            'role' => 'patient',
            'email' => $request->email,
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'daira' => $request->daira,
            'state' => $request->state,
            'city' => $request->city,
            'street' => $request->street,
            'birth_date' => $request->birth_date,
            'birth_place' => $request->birth_place,
            'phone_number' => $request->phone_number,
            'national_id' => $request->national_id,
            'role' => 'patient',
            'gender' => $request->gender,
        ];

        $patient = Patient::findOrFail($id);
        $response =  Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $request->bearerToken(),
        ])->put(env('AUTH_SERVER') . '/api/users', $data);

        // Handle the response
        $user_data = [];
        if ($response->successful()) {
            $user_data = $response->json();
        } else {
            // Failed to send the notification
            return $response;
        }

        $patient = Patient::find($id)->update([
            'nationality' => $request->email,
            'blood_group' => $request->firstname,
            'person_contact' => $request->lastname,
            'person_contact_phone' => $request->daira,
            'person_contact_wilaya' => $request->state,
            'height' => $request->city,
            'weight' => $request->street,
            'name' => $request->lastname . " " . $request->firstname,

        ]);

        $response =  Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $request->bearerToken(),
        ])->put(env('GRDV_SERVER') . '/api/patients', $patient);

        // Handle the response
        if (!$response->successful()) {
            // Failed to send the notification
            return $response;
        }

        $response =  Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $request->bearerToken(),
        ])->put(env('GDME_SERVER') . '/api/patients', $patient);

        // Handle the response
        if (!$response->successful()) {
            // Failed to send the notification
            return $response;
        }

        return response()->json($patient, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function patient_destroy($id)
    {
        $patient = Patient::findOrFail($id);
        $patient->delete();

        return response()->json(['message' => 'Patient deleted successfully']);
    }



    public function order_index()
    {
        $pharmacyOrders = PharmacyOrder::all();
        return response()->json($pharmacyOrders);
    }

    public function order_show($id)
    {
        $pharmacyOrder = PharmacyOrder::findOrFail($id);
        return response()->json($pharmacyOrder);
    }

    public function order_store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'order_date' => 'required',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $pharmacyOrder = PharmacyOrder::create($request->all());

        return response()->json($pharmacyOrder, 201);
    }

    public function order_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'order_date' => 'required',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $pharmacyOrder = PharmacyOrder::findOrFail($id);
        $pharmacyOrder->update($request->all());

        return response()->json($pharmacyOrder);
    }

    public function order_destroy($id)
    {
        $pharmacyOrder = PharmacyOrder::findOrFail($id);
        $pharmacyOrder->delete();

        return response()->json(['message' => 'Pharmacy order deleted successfully']);
    }

    public function prescription_index()
    {
        $prescriptions = Prescription::with(['doctor', 'patient'])->get();
        return response()->json($prescriptions);
    }

    public function prescription_show($id)
    {
        $prescription = Prescription::with(['doctor', 'patient', 'medications'])->findOrFail($id);
        return response()->json($prescription);
    }

    public function prescription_store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required|exists:doctors,id',
            'patient_id' => 'required|exists:patients,id',
            'date' => 'required|date',
            'medications.*.dosage' => 'required|string',
            'medications.*.quantity' => 'required|string',
            'medications.*.duration' => 'required|string',
            'medications.*.drug_route' => 'nullable|string',
            'medications.*.note' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $prescriptionData = $request->only(['doctor_id', 'patient_id', 'date']);
        $prescription = Prescription::create($prescriptionData);

        if ($request->has('medications')) {
            $medications = $request->input('medications');
            $medicationsData = [];

            foreach ($medications as $medication) {
                $medicationsData[] = new PrescriptionMedication([
                    'dosage' => $medication['dosage'],
                    'quantity' => $medication['quantity'],
                    'duration' => $medication['duration'],
                    'drug_route' => $medication['drug_route'] ?? null,
                    'note' => $medication['note'] ?? null,
                ]);
            }

            $prescription->medications()->saveMany($medicationsData);
        }

        return response()->json($prescription, 201);
    }


    public function prescription_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required|exists:doctors,id',
            'patient_id' => 'required|exists:patients,id',
            'date' => 'required|date',
            'medications.*.dosage' => 'required|string',
            'medications.*.quantity' => 'required|string',
            'medications.*.duration' => 'required|string',
            'medications.*.drug_route' => 'nullable|string',
            'medications.*.note' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $prescription = Prescription::findOrFail($id);

        $prescriptionData = $request->only(['doctor_id', 'patient_id', 'date']);
        $prescription->update($prescriptionData);

        // Delete existing medications
        $prescription->medications()->delete();

        // Create new medications
        if ($request->has('medications')) {
            $medications = $request->input('medications');
            $medicationsData = [];

            foreach ($medications as $medication) {
                $medicationsData[] = new PrescriptionMedication([
                    'dosage' => $medication['dosage'],
                    'quantity' => $medication['quantity'],
                    'duration' => $medication['duration'],
                    'drug_route' => $medication['drug_route'] ?? null,
                    'note' => $medication['note'] ?? null,
                ]);
            }

            $prescription->medications()->saveMany($medicationsData);
        }

        return response()->json($prescription, 200);
    }


    public function prescription_destroy($id)
    {
        $prescription = Prescription::findOrFail($id);
        $prescription->delete();

        return response()->json(['message' => 'Prescription deleted successfully']);
    }

    public function report_index()
    {
        $reports = Report::with(['patient', 'doctor', 'diagnostic_tests'])->get();
        return response()->json($reports);
    }

    public function report_show($id)
    {
        $report = Report::with(['patient', 'doctor', 'diagnostic_tests'])->findOrFail($id);
        return response()->json($report);
    }

    public function report_create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'chief_complaint' => 'required',
            'hpi' => 'required',
            'pmh' => 'required',
            'ros' => 'required',
            'physical_examination' => 'required',
            'ad' => 'required',
            'date' => 'required|date',
            'conclusion' => 'required',
            'treatment_plan' => 'required',
            'diagnostic_tests.*.description' => 'nullable|string',
            'diagnostic_tests.*.title' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $reportData = $request->except('diagnostic_tests');
        $report = Report::create($reportData);

        if ($request->has('diagnostic_tests')) {
            $diagnosticTests = $request->input('diagnostic_tests');
            $diagnosticTestsData = [];

            foreach ($diagnosticTests as $diagnosticTest) {
                $diagnosticTestsData[] = new ReportDiagnosticTest([
                    'description' => $diagnosticTest['description'],
                    'title' => $diagnosticTest['title'],
                ]);
            }

            $report->diagnostic_tests()->saveMany($diagnosticTestsData);
        }

        return response()->json($report, 201);
    }

    public function report_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'chief_complaint' => 'required',
            'hpi' => 'required',
            'pmh' => 'required',
            'ros' => 'required',
            'physical_examination' => 'required',
            'ad' => 'required',
            'date' => 'required|date',
            'conclusion' => 'required',
            'treatment_plan' => 'required',
            'diagnostic_tests.*.description' => 'nullable|string',
            'diagnostic_tests.*.title' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $report = Report::findOrFail($id);
        $reportData = $request->except('diagnostic_tests');
        $report->update($reportData);

        if ($request->has('diagnostic_tests')) {
            $diagnosticTests = $request->input('diagnostic_tests');
            $diagnosticTestsData = [];

            foreach ($diagnosticTests as $diagnosticTest) {
                $diagnosticTestsData[] = new ReportDiagnosticTest([
                    'description' => $diagnosticTest['description'],
                    'title' => $diagnosticTest['title'],
                ]);
            }

            $report->diagnostic_tests()->delete();
            $report->diagnostic_tests()->saveMany($diagnosticTestsData);
        }

        return response()->json($report, 200);
    }

    public function report_destroy($id)
    {
        $report = Report::findOrFail($id);
        $report->delete();

        return response()->json(['message' => 'Report deleted successfully']);
    }

    public function service_record_index()
    {
        $records = ServiceRecord::all();
        return response()->json($records);
    }

    public function service_record_show($id)
    {
        $record = ServiceRecord::findOrFail($id);
        return response()->json($record);
    }

    public function service_record_store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'time' => 'required',
            'date' => 'required',
            'title' => 'required',
            'summary' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $record = ServiceRecord::create($request->all());

        return response()->json($record, 201);
    }

    public function service_record_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'time' => 'required',
            'date' => 'required',
            'title' => 'required',
            'summary' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $record = ServiceRecord::findOrFail($id);
        $record->update($request->all());

        return response()->json($record);
    }

    public function service_record_destroy($id)
    {
        $record = ServiceRecord::findOrFail($id);
        $record->delete();

        return response()->json(['message' => 'Service record deleted successfully']);
    }
}
