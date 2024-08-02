<?php

namespace App\Http\Controllers;

use App\Models\ConsultationReport;
use App\Models\PrescriptionMedication;
use App\Models\Visit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ConsultationReportController extends Controller
{
    public function index()
    {
        $reports = ConsultationReport::all();
        return response()->json($reports);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'date' => 'required',
            'symptoms' => 'required',
            'diagnosis' => 'required',
            'patient_id' => 'required|exists:patients,id',
            'visit_id' => 'required|exists:visits,id',
            'medications' => 'required|array',
            'medications.*.dosage' => 'required',
            'medications.*.quantity' => 'required',
            'medications.*.duration' => 'required',
            'medications.*.drug_route' => 'required',
            'medications.*.note' => 'nullable',
        ]);

        $visit= Visit::find($request->visit_id);

        $doctor = $visit->doctor;
        $report = ConsultationReport::create($validatedData);
        $report->doctor()->associate($doctor);

        if ($request->has('medications')) {
            foreach ($request->medications as $medication_data) {
                $medication = new PrescriptionMedication([
                    'dosage' => $medication_data['dosage'],
                    'quantity' => $medication_data['quantity'],
                    'duration' => $medication_data['duration'],
                    'drug_route' => $medication_data['drug_route'],
                    'note' => $medication_data['note'],
                ]);

                $report->medications()->save($medication);
            }
        }

        return response()->json($report, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ConsultationReport  $consultationReport
     * @return \Illuminate\Http\Response
     */
    public function show(ConsultationReport $consultationReport)
    {
        return response()->json($consultationReport);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ConsultationReport  $consultationReport
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ConsultationReport $consultationReport)
    {
        $validatedData = $request->validate([
            'date' => 'required',
            'symptoms' => 'required',
            'diagnosis' => 'required',
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'medications' => 'required|array',
            'medications.*.dosage' => 'required',
            'medications.*.quantity' => 'required',
            'medications.*.duration' => 'required',
            'medications.*.drug_route' => 'required',
            'medications.*.note' => 'nullable',
        ]);

        $consultationReport->update($validatedData);

        // Delete existing medications
        $consultationReport->medications()->delete();

        if ($request->has('medications')) {
            foreach ($request->medications as $medication_data) {
                $medication = new PrescriptionMedication([
                    'dosage' => $medication_data['dosage'],
                    'quantity' => $medication_data['quantity'],
                    'duration' => $medication_data['duration'],
                    'drug_route' => $medication_data['drug_route'],
                    'note' => $medication_data['note'],
                ]);

                $consultationReport->medications()->save($medication);
            }
        }

        return response()->json($consultationReport);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ConsultationReport  $consultationReport
     * @return \Illuminate\Http\Response
     */
    public function destroy(ConsultationReport $consultationReport)
    {
        $consultationReport->delete();
        return response()->json(null, 204);
    }
}
