<?php

namespace App\Http\Controllers;

use App\Mail\AppointmentSchedule;
use App\Models\Appointment;
use App\Models\Prescription;
use App\Models\Visit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class AppointmentController extends Controller
{
    public function index()
    {
        return Appointment::with('prescription')->get();
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstname' => 'required',
            'lastname' => 'required',
            'email' => 'required|email',
            'phone_number' => 'required',
            'message' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        $file = $request->file('prescription');
        unset($request['prescription']);

        $name = $file->getClientOriginalName(); // Get the original name of the file
        $content = file_get_contents($file->getRealPath()); // Get the content of the file
        $extension = $file->getClientOriginalExtension(); // Get the extension of the file


        $appointment = Appointment::create($request->all());
        $appointment->prescription()->save(new Prescription([
            'name' => $name,
            'content' => base64_encode($content),
            'extension' => $extension,
        ]));
        $appointment->save();

        return $appointment;
    }

    public function show($id)
    {
        return Appointment::with('prescription')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'firstname' => 'required',
            'lastname' => 'required',
            'email' => 'required|email',
            'phone_number' => 'required',
            'message' => 'required',
            'patient_id' => 'exists:patients,id',
            'prescription_id' => 'exists:prescriptions,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $appointment = Appointment::findOrFail($id);
        $appointment->update($request->all());
        $appointment->patient()->associate($request->input('patient_id'));
        $appointment->save();
        return $appointment;
    }

    public function destroy($id)
    {
        return Appointment::destroy($id);
    }
}
