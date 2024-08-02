<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DoctorController extends Controller
{
    public function index()
    {
        return Doctor::with(['service'])->get();
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id'=>'required',
            'specialization' => 'required',
            'user_id'=>'required',
            'name'=>'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $doctor = Doctor::create($request->all());
        $doctor->service()->associate($request->input('service_id'));
        $doctor->save();
        return $doctor;
    }

    public function show($id)
    {
        return Doctor::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'id'=>'required',
            'specialization' => 'required',
            'name'=>'required',

            'user_id'=>'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $doctor = Doctor::findOrFail($id);
        $doctor->update($request->all());
        $doctor->service()->associate($request->input('service_id'));
        $doctor->save();
        return $doctor;
    }

    public function destroy($id)
    {
        return Doctor::destroy($id);
    }
}
