<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Serviceplan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ServiceController extends Controller
{
    public function index()
    {
        return Service::all();
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id'=>'required',
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $service = Service::create($request->all());
        return $service;
    }

    public function show($id)
    {
        return Service::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'id'=>'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $service = Service::findOrFail($id);
        $service->update($request->all());
        return $service;
    }

    public function destroy($id)
    {
        return Service::destroy($id);
    }

    public function storeServicePlan(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'ends_at' => 'required',
            'starts_at' => 'required',
            'doctor_id' => 'required|exists:doctors,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $servicePlan = Serviceplan::create($request->all());
        $servicePlan->doctor()->associate($request->input('doctor_id'));
        $servicePlan->save();
        return $servicePlan;
    }

    public function updateServicePlan(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'ends_at' => 'required',
            'starts_at' => 'required',
            'doctor_id' => 'exists:doctors,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $servicePlan = Serviceplan::findOrFail($id);
        $servicePlan->update($request->all());
        $servicePlan->doctor()->associate($request->input('doctor_id'));
        $servicePlan->save();
        return $servicePlan;
    }

    public function destroyServicePlan($id)
    {
        return Serviceplan::destroy($id);
    }
}
