import { Server } from "socket.io";
import http from "http";
import express from 'express';

const app =express();

const server=http.createServer(app);
const io=new Server(server,{
    cors:{
       origin:["http://localhost:3000"],
       methods:["GET","POST"], 
    }
});

export const getReceiverSocketId=(receiverId)=>{
    return userSocketMap[receiverId];
}
const userSocketMap = {}; // { userId: Set of socket ids }

const getSocketsOf = (userId) => userSocketMap[userId] ?? new Set();


io.on("connection", (socket) => {
    console.log("user connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId !== "undefined") {
        if (!userSocketMap[userId]) userSocketMap[userId] = new Set();
        userSocketMap[userId].add(socket.id);
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // ────────────────📞 Voice Call Events ────────────────

    // 1. Caller sends offer to callee
    socket.on("call:user", ({ calleeId, offer }) => {
        getSocketsOf(calleeId).forEach((sid) => {
            io.to(sid).emit("call:incoming", { callerId: userId, offer });
        });
    });

    // 2. Callee sends answer to caller
    socket.on("call:answer", ({ callerId, answer }) => {
        getSocketsOf(callerId).forEach((sid) => {
            io.to(sid).emit("call:answer", { calleeId: userId, answer });
        });
    });

    // 3. ICE candidate exchange
    socket.on("call:ice-candidate", ({ targetId, candidate }) => {
        getSocketsOf(targetId).forEach((sid) => {
            io.to(sid).emit("call:ice-candidate", { from: userId, candidate });
        });
    });

    // 4. Hangup event
    socket.on("call:hangup", ({ targetId }) => {
        getSocketsOf(targetId).forEach((sid) => {
            io.to(sid).emit("call:hangup", { from: userId });
        });
    });

    // 5 Reject call, No pickup .
    socket.on("call:reject", ({ callerId }) => {
        getSocketsOf(callerId).forEach((sid) => {
          io.to(sid).emit("call:rejected", { from: userId });
        });
      });
    // ────────────────🔌 Disconnect cleanup ────────────────
    socket.on("disconnect", () => {
        console.log("user disconnected:", socket.id);
        if (userId) {
            userSocketMap[userId]?.delete(socket.id);
            if (userSocketMap[userId]?.size === 0) {
                delete userSocketMap[userId];
            }
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});


export {app,io,server};