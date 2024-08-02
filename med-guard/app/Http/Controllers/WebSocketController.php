<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\Log;
use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;

class WebSocketController extends Controller implements MessageComponentInterface
{
    protected $clients;

    public function __construct()
    {
        $this->clients = new \SplObjectStorage();
    }

    public function onOpen(ConnectionInterface $conn)
    {
        $conn->userId = null; // Initialize userId property
        
        Log::info("New WebSocket connection: {$conn->resourceId}");
    }

    public function onMessage(ConnectionInterface $from, $message)
    {
        $data = json_decode($message, true);

        // Handle different message types
        switch ($data['type']) {
            case 'register':
                $this->handleRegistration($from, $data['data']);
                break;
            // Add more cases for other message types, if needed
        }
    }

    public function onClose(ConnectionInterface $conn)
    {
        $this->clients->detach($conn);
        Log::info("WebSocket connection closed: {$conn->resourceId}");
    }

    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        Log::error("WebSocket error occurred: {$e->getMessage()}");
        $conn->close();
    }

    public function broadcastToUser($userId, $message)
    {
        foreach ($this->clients as $client) {
            if ($client->userId == $userId) {
                $client->send($message);
                break;
            }
        }
    }

    protected function handleRegistration(ConnectionInterface $conn, $data)
    {
        // Save the client ID in the userId property of the connection
        $conn->userId = $data['clientId'];

        Log::info("Client registered: {$conn->resourceId} with ID: {$conn->userId}");
    }

}
