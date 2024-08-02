<?php

namespace App\Http\Controllers;

use App\Mail\AppointmentSchedule;
use App\Models\Visit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class VisitController extends Controller
{
    public function index()
    {
        return Visit::with(['doctor.service', 'patient'])->get();
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ends_at' => 'required',
            'starts_at' => 'required',
            'title' => 'required',
            'doctor_id' => 'required|exists:doctors,id',
            'email' => 'required|email',
        ]);


        $visit = Visit::create($request->all());

        $visit->doctor_id = $request->input('doctor_id');
        $visit->save();
        $visit['doctor'] = $visit->doctor;
        $visit['email'] = $request->email;

        // Send email notification to the patient
        $patient_email = $request->email;
        Mail::to($patient_email)->send(new AppointmentSchedule($visit));
        $data = [
            'type' => 'visit',
            'title' => 'New Visit Scheduled',
            'content' => 'A new visit has been scheduled with you.',
            'displayed' => false,
            'to' => $visit->doctor->user_id,
        ];
        $response =  Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $request->bearerToken(),
        ])->post(env('AUTH_SERVER') . '/api/notifications', $data);

        // Handle the response
        if ($response->successful()) {
            $notification = $response->json();

            // Additional logic after successful notification
        } else {
            // Failed to send the notification
            return response()->json(['error' => $response], $response->status());
        }

        return response()->json(['visit' => $visit, 'notification' => $notification], 201);
    }

    public function show($id)
    {
        return Visit::with(['doctor.service', 'patient'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'ends_at' => 'required',
            'starts_at' => 'required',
            'status' => 'required',
            'title' => 'required',
            'patient_id' => 'exists:patients,id',
            'doctor_id' => 'exists:doctors,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $visit = Visit::findOrFail($id);
        $visit->update($request->all());
        $visit->patient()->associate($request->input('patient_id'));
        $visit->doctor()->associate($request->input('doctor_id'));
        $visit->save();
        return $visit;
    }

    public function destroy($id)
    {
        return Visit::destroy($id);
    }
}
