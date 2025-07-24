import { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socketInstance = null;

const useSocket = () => {

    if(!socketInstance){
        socketInstance = io("http://localhost:3000");

        socketInstance.on("connect", () => {
            console.log("connected to socket");
        });
        socketInstance.on("disconnect", () => {
            console.log("disconnected from socket");
        });
    }

    return socketInstance;
}

export default useSocket;