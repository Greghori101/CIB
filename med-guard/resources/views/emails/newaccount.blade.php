
<html lang="en">

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
                <img src="{{ asset('logo.png') }}" alt="Clinic Logo"> Clinic Abdel-Hamid Ibn Badis
            </div>
            <h2>Welcome to Clinic Abdel-Hamid Ibn Badis</h2>
        </div>
        <p style="text-transform: capitalize;">Dear {{$data['firstname']}} {{$data['lastname']}},</p>

        <p>We are delighted to welcome you to Clinic Abdel-Hamid Ibn Badis. Thank you for choosing our clinic for your medical needs.</p>
        <p>Our team of dedicated healthcare professionals is committed to providing you with the best possible care and support.</p>
        <p>To access your account, please use the following temporary password:</p>
        <h2>{{ $data['password'] }}</h2>
        <p>We recommend changing your password after logging in for the first time to ensure the security of your account.</p>
        <p>If you have any questions or need assistance, please feel free to contact us. We are here to help.</p>
        <p>Once again, welcome to Clinic Abdel-Hamid Ibn Badis. We look forward to serving you.</p>
        <p>Best regards,</p>
        <p>The Clinic Abdel-Hamid Ibn Badis Team</p>
    </div>
</body>

</html>