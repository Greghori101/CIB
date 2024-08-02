import { React, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function WebSocketInit(user_id, fetch_notifications) {
    const url = process.env.REACT_APP_WEBSOCKET_URL;
    const socket = new WebSocket("ws://localhost:8080");

    // Event handler for WebSocket connection open
    socket.onopen = function () {
        console.log("WebSocket connection established");

        const message = {
            type: "register",
            data: {
                clientId: user_id,
            },
        };
        socket.send(JSON.stringify(message));
    };
    socket.onerror = function (error) {
        toast.error("WebSocket connection error");
    };
    socket.onclose = function () {
        console.log("WebSocket connection closed");
    };

    useEffect(() => {
        socket.onmessage = function (event) {
            const message = JSON.parse(event.data);

            switch (message.type) {
                case "notification":
                    const notification = message.data;
                    console.log("Received notification:", notification);
                    fetch_notifications();
                    break;
            }
        };
        return () => {
            socket.close();
        };
    }, []);

    return <></>;
}
