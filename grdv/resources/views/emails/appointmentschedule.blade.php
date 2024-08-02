<head>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet">
    <style>
        * {
            font-family: 'Open Sans', sans-serif;
        }

        .container {
            max-width: 500px;
            margin: auto;
            padding: 20px;
        }

        img {
            width: 60px;
            height: 60px;
            margin-right: 20px;
            border-radius: 100%;
            margin-bottom: 20px;
            box-shadow: 0px 2px 5px 2px #999999;
        }

        a {
            color: #007bff;
            text-decoration: none;
        }

        .header {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            flex-direction: column;
        }

        .logo {
            font-size: 30px;
            font-weight: 900;
            display: flex;
            align-items: center;
        }

        
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <div class="logo">
                <img src="{{asset('logo.png') }}">Clinic Abdel-Hamid Ibn Badis
            </div>
            <h2>Welcome to Clinic Abdel-Hamid Ibn Badis</h2>
        </div>
        <p >Dear {{$data->email}},</p>

        <p>We would like to inform you that a visit has been scheduled for you at our clinic. Please find the details below:</p>

        <h3>Visit Information:</h3>
        <p><strong>Date:</strong> {{$data->starts_at->format('Y-m-d')}}</p>
        <p><strong>Time:</strong> {{$data->starts_at->format('H:i')}}</p>
        <p><strong>Doctor:</strong> {{$data->doctor->firstname}} {{$data->doctor->lastname}}</p>
        <p><strong>Location:</strong> Clinic Abdel-Hamid Ibn Badis</p>

        <p>If you have any questions or need to reschedule the visit, please feel free to <a href="http://localhost:3000/contact">contact us</a>.</p>

        <p>Best regards,</p>
        <p>The Clinic Abdel-Hamid Ibn Badis Team</p>
    </div>
</body>