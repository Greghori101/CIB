<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PatientController extends Controller
{
    public function index()
    {
        return Patient::all();
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'nationality' => 'required',
            'blood_group' => 'required',
            'family_situation' => 'required',
            'person_contact' => 'required',
            'person_contact_phone' => 'required',
            'person_contact_wilaya' => 'required',
            'height' => 'required',
            'user_id' => 'required',
            'weight' => 'required',
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $patient = Patient::create($request->all());
        return $patient;
    }

    public function show($id)
    {
        return Patient::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'nationality' => 'required',
            'family_situation' => 'required',
            'blood_group' => 'required',
            'person_contact' => 'required',
            'person_contact_phone' => 'required',
            'person_contact_wilaya' => 'required',
            'height' => 'required',
            'user_id' => 'required',
            'name' => 'required',
            'weight' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $patient = Patient::findOrFail($id);
        $patient->update($request->all());
        return $patient;
    }

    public function destroy($id)
    {
        return Patient::destroy($id);
    }
}
