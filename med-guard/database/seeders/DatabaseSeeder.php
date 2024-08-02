<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\File;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        $user = User::create([
            'national_id'=>"20030324",
            'email'=>'admin@cib.com',
            'password'=> bcrypt('admin'),
            'firstname' =>'admin',
            'lastname' =>'cib',
            'birth_date' =>'2000-01-01',
            'birth_place' => 'batna',
            'phone_number' => '0798989487',
            'role' => strtolower('admin'),
            'gender'=>'male',
        ]);
        $content = Storage::get('public/default-profile-picture.jpeg');
        $extension = 'jpeg';
        $name = "profile picture";

        $user->profile_picture()->save(new File([
            'name' => $name,
            'content' => base64_encode($content),
            'extension' => $extension,
        ]));
        $user->address()->create([
            'daira'=>'batna',
            'state' => 'batna',
            'city' => 'batna',
            'street' => 'bouzerane',
        ]);
    }
}
