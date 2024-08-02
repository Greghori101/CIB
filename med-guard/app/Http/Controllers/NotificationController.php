<?php

namespace App\Http\Controllers;

use App\Console\Commands\WebSocketServer;
use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = Notification::all();
        return response()->json($notifications);
    }

    public function show($id)
    {
        $notification = Notification::findOrFail($id);
        return response()->json($notification);
    }

    public function store(Request $request)
    {
        $validator = $request->validate( [
            'type' => 'required',
            'title' => 'required',
            'content' => 'required',
            'displayed' => 'required|boolean',
            'to' => 'required|exists:users,id',
        ]);


        $notification = Notification::create([
            'type' => $request->input('type'),
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'displayed' => $request->input('displayed'),
        ]);

        // Associate the notification with the user
        $user = User::findOrFail($request->input('to'));
        $notification->to()->associate($user);
        $notification->save();

        $websocket =  new WebSocketController();
        $websocket->broadcastToUser($user->id, "new notification");

        return response()->json($notification, 201);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->only([
            'type',
            'title',
            'content',
            'displayed',
            'to',
        ]), [
            'type' => 'required',
            'title' => 'required',
            'content' => 'required',
            'displayed' => 'required|boolean',
            'to' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $notification = Notification::findOrFail($id);
        $notification->update([
            'type' => $request->input('type'),
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'displayed' => $request->input('displayed'),
        ]);

        // Associate the notification with the user
        $user = User::findOrFail($request->input('to'));
        $notification->to()->associate($user);
        $notification->save();

        return response()->json($notification, 200);
    }

    public function destroy($id)
    {
        $notification = Notification::findOrFail($id);
        $notification->delete();

        return response()->json(null, 204);
    }
}
