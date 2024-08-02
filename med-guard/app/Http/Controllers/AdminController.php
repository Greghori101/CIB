<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use App\Mail\Emails;
use App\Mail\NewAccount;
use App\Models\Address;
use App\Models\ContactMessage;
use App\Models\ContactRespond;
use App\Models\File;
use App\Models\Image;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{

    public function users($id = null)
    {
        if ($id) {
            $user = User::with(['profile_picture', 'address'])->find($id);
            return response()->json($user, 200);
        } else {
            $users = User::with(['profile_picture', 'address'])->where('role','!=','admin')->get();
            return response()->json($users, 200);
        }
    }

    public function create_user(Request $request)
    {
        $data = $request->validate([
            'firstname' => 'required|max:255',
            'lastname' => 'required|max:255',
            'birth_date' => 'required|max:255',
            'birth_place' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'daira' => 'required|max:255',
            'state' => 'required|max:255',
            'city' => 'required|max:255',
            'street' => 'required|max:255',
            'national_id' => 'required|max:255',
            'gender' => 'required',
            'phone_number' => 'required',
            'role' => 'required',
        ]);
        $code = Str::upper(Str::random(6));

        $user = User::create([
            'email' => $data['email'],
            'national_id' => $data['national_id'],
            'firstname' => $data['firstname'],
            'lastname' => $data['lastname'],
            'birth_date' => $data['birth_date'],
            'birth_place' => $data['birth_place'],
            'phone_number' => $data['phone_number'],
            'role' => strtolower($data['role']),
            'gender' => $data['gender'],

        ]);
        $address = Address::create([
            'daira' => $data['daira'],
            'state' => $data['state'],
            'city' => $data['city'],
            'street' => $data['street'],
        ]);

        $data = [
            'firstname' => $user->firstname,
            'lastname' => $user->lastname,
            'password' => $code,
        ];
        $user->password = bcrypt($code);
        Mail::to($user)->send(new NewAccount($data));
        $user->save();

        $user->address()->save($address);

        $content = Storage::get('public/default-profile-picture.jpeg');
        $extension = 'jpeg';
        $name = "profile picture";

        $user->profile_picture()->save(new File([
            'name' => $name,
            'content' => base64_encode($content),
            'extension' => $extension,
        ]));

        return response()->json($user, 200);
    }

    public function delete_user($id)
    {
        $user = User::find($id);
        $user->delete();
        return response()->json(200);
    }

    public function update_user(Request $request, $id)
    {
        $user = User::find($id);
        $data = $request->validate([
            'firstname' => 'required|max:255',
            'lastname' => 'required|max:255',
            'role' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'country' => 'required|max:255',
            'state' => 'required|max:255',
            'city' => 'required|max:255',
            'street' => 'required|max:255',
            'national_id' => 'required|max:255',
            'gender' => 'required',

        ]);


        $user->update([
            'email' => $data['email'],
            'natioanl_id' => $data['national_id'],
            'firstname' => $data['firstname'],
            'lastname' => $data['lastname'],
            'birth_date' => $data['birth_date'],
            'birth_place' => $data['birth_place'],
            'phone_number' => $data['phone_number'],
            'gender' => $data['gender'],
            'role' => strtolower($data['role']),
        ]);



        $user->address()->update([
            'country' => $data['country'],
            'state' => $data['state'],
            'city' => $data['city'],
            'street' => $data['street'],
        ]);

        return response()->json($user, 200);
    }

    public function messages($id = null)
    {
        if ($id) {
            $message = ContactMessage::find($id);
            return response()->json(200, $message);
        } else {
            $messages = ContactMessage::all();
            return response()->json(200, $messages);
        }
    }

    public function create_message(Request $request)
    {
        $data = $request->validate([
            'firstname' => 'required|max:255',
            'lastname' => 'required|max:255',
            'email' => 'required|max:255',
            'phone_number' => 'required',
            'message' => 'required',

        ]);

        ContactMessage::create([
            'firstname' => $data['firstname'],
            'lastname' => $data['lastname'],
            'email' => $data['email'],
            'phone_number' => $data['phone_number'],
            'message' => $data['message'],
        ]);



        return response()->json(200);
    }

    public function respond(Request $request, $id)
    {
        $data = $request->validate([
            'message' => 'required',

        ]);


        $message = ContactMessage::find($id);
        $user = User::find('user_id');
        $respond = ContactRespond::create([
            'message' => $data['message'],
        ]);
        $message->respond($respond);
        $user->respond()->save($respond);

        $mail_data = [
            'email' => $message->email,
            'firstname' => $message->firstname,
            'lastname' => $message->lastname,
            'message' => $data['message'],
        ];

        dispatch(new Emails($mail_data));
    }


    public function posts($id = null)
    {
        if ($id) {
            $post = Post::with(['images', 'author.profile_picture'])->find($id);
            return response()->json($post, 200);
        } else {
            $posts = Post::with(['images', 'author.profile_picture'])->get();
            return response()->json($posts, 200);
        }
    }

    public function create_post(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|max:255',
            'summary' => 'required',
            'details' => 'required',
            'uploaded_images' => 'required',
        ]);

        $user = User::find($request->user_id);
        $files = $request->file('uploaded_images');

        $post  = Post::create([
            'title' => $data['title'],
            'summary' => $data['summary'],
            'details' => $data['details'],
        ]);

        $user->posts()->save($post);

        foreach ($files as $file) {
            # code...
            $name = $file->getClientOriginalName(); // Get the original name of the file
            $content = file_get_contents($file->getRealPath()); // Get the content of the file
            $extension = $file->getClientOriginalExtension(); // Get the extension of the file

            $post->images()->save(new Image([
                'name' => $name,
                'content' => base64_encode($content),
                'extension' => $extension,
            ]));
        }



        return response()->json($post, 200);
    }

    public function delete_post($id)
    {
        $post = Post::find($id);
        $post->delete();
        return response()->json(200);
    }

    public function update_post(Request $request, $id)
    {
        $data = $request->validate([
            'title' => 'required|max:255',
            'summary' => 'required',
            'details' => 'required',
            'uploaded_images' => 'required',
        ]);


        $files = $request->file('uploaded_images');

        $post  = Post::find($id)->update([
            'title' => $data['title'],
            'summary' => $data['summary'],
            'details' => $data['details'],
        ]);

        $post->images()->delete();
        foreach ($files as $file) {
            # code...
            $name = $file->getClientOriginalName(); // Get the original name of the file
            $content = file_get_contents($file->getRealPath()); // Get the content of the file
            $extension = $file->getClientOriginalExtension(); // Get the extension of the file

            $post->images()->save(new Image([
                'name' => $name,
                'content' => base64_encode($content),
                'extension' => $extension,
            ]));
        }

        return response()->json($post, 200);
    }
}
