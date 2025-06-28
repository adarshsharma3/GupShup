

import { useSocketContext } from "../../Context/SocketContext";
import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { useParams, useNavigate } from "react-router-dom";
import { Phone, PhoneOff, Mic, MicOff, Volume2 } from "lucide-react";

const VoiceCall = () => {
  // Your existing imports and logic would go here
  const { socket } = useSocketContext();
  const { calleeId } = useParams();
  const navigate = useNavigate();
  const calleeName = sessionStorage.getItem("callee-name") || "Unknown";
  /* ────────── refs keep mutable objects without re-rendering ────────── */
  const peerRef   = useRef(null);        // <Peer> instance
  const streamRef = useRef(null);        // local mic stream
  const myAudio   = useRef(null);
  const userAudio = useRef(null);

  /* ────────── one-off flags from sessionStorage ────────── */
  const isCaller       = !!sessionStorage.getItem("outgoing-call");
  const incomingOffer  = JSON.parse(sessionStorage.getItem("incoming-offer") || "null");

  // UI state for enhanced experience
  const [callDuration, setCallDuration] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  
  // Mock data for demo - replace with your actual values
  // const calleeId = "Taha";
  // const socket = null; // Your socket connection

  /* ────────── mic access ────────── */
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((st) => {
      streamRef.current = st;
      if (myAudio.current) myAudio.current.srcObject = st;
    }).catch(err => console.log("Mic access denied"));
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // Call duration timer
  useEffect(() => {
    let interval;
    if (peerRef.current && isConnected) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  /* ────────── helper to wire peer events ────────── */
  const attachPeerEvents = (p) => {
    p.on("stream", (remote) => {
      if (userAudio.current) userAudio.current.srcObject = remote;
      setIsConnected(true);
    });
    /* send ICE (only runs if trickle true; harmless otherwise) */
    p.on("signal", (data) => {
      if (!socket) return;
      if (data?.candidate) {
        socket.emit("call:ice-candidate", {
          targetId: calleeId,
          candidate: data,
        });
      }
    });
  };

  /* ────────── create peer depending on role ────────── */
  const startCall = () => {
    if (!socket || !streamRef.current) return;
    sessionStorage.setItem("outgoing-call", "true");

    const p = new Peer({ initiator: true, trickle: false, stream: streamRef.current });
    p.on("signal", (offer) => socket.emit("call:user", { calleeId, offer }));
    attachPeerEvents(p);
    peerRef.current = p;
  };

  const acceptCall = () => {
    if (!socket || !streamRef.current || !incomingOffer) return;

    const p = new Peer({ initiator: false, trickle: false, stream: streamRef.current });
    p.on("signal", (answer) => socket.emit("call:answer", { callerId: calleeId, answer }));
    p.signal(incomingOffer);
    attachPeerEvents(p);
    peerRef.current = p;
    sessionStorage.removeItem("incoming-offer");
  };

  /* ────────── shared socket listeners (add once) ────────── */
  useEffect(() => {
    if (!socket) return;           // provider not ready

    const handleAnswer  = ({ answer })    => peerRef.current?.signal(answer);
    const handleICE     = ({ candidate }) => peerRef.current?.signal(candidate);
    const handleHangup  = ()               => cleanup("Call ended by other user");
    const handleReject  = ()               => cleanup("Call was rejected");

    socket.on("call:answer",        handleAnswer);
    socket.on("call:ice-candidate", handleICE);
    socket.on("call:hangup",        handleHangup);
    socket.on("call:rejected",      handleReject);

    return () => {
      socket.off("call:answer",        handleAnswer);
      socket.off("call:ice-candidate", handleICE);
      socket.off("call:hangup",        handleHangup);
      socket.off("call:rejected",      handleReject);
    };
  }, [socket, calleeId]);

  /* ────────── cleanup & hang-up ────────── */
  const cleanup = (msg) => {
    peerRef.current?.destroy();
    sessionStorage.removeItem("outgoing-call");
    if (msg) alert(msg);
    navigate("/");
    console.log("Cleanup:", msg);
  };

  const hangUp = () => {
    socket?.emit("call:hangup", { targetId: calleeId });
    // navigate('/');
    cleanup();
  };

  /* ────────── UI ────────── */
  return (
    <div className="h-screen w-full bg-gradient-to-br from-red-900 via-red-800 to-black relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-red-800/20 via-transparent to-black/40" />

      <audio ref={myAudio}   autoPlay muted />
      <audio ref={userAudio} autoPlay />

      <div className="relative z-10 h-full flex flex-col items-center justify-between p-8">
        
        {/* Top status */}
        <div className="text-center space-y-2 mt-8">
          <div className="text-red-300 text-sm font-medium tracking-widest uppercase opacity-80">
            {peerRef.current ? "Connected" : incomingOffer ? "Incoming Call" : "Calling..."}
          </div>
          {isConnected && (
            <div className="text-white text-xl font-mono tracking-wider">
              {formatDuration(callDuration)}
            </div>
          )}
        </div>

        {/* Contact avatar and info */}
        <div className="flex flex-col items-center space-y-8">
          {/* Avatar with dynamic animation */}
          <div className="relative">
            {/* Pulsing rings */}
            <div className={`absolute inset-0 rounded-full border-2 border-red-500/30 ${
              peerRef.current ? 'animate-ping' : 'animate-pulse'
            }`} style={{ 
              width: '200px', 
              height: '200px',
              animationDuration: peerRef.current ? '2s' : '1.5s' 
            }} />
            <div className={`absolute inset-2 rounded-full border border-red-400/20 ${
              peerRef.current ? 'animate-ping' : 'animate-pulse'
            }`} style={{ 
              animationDelay: '0.5s',
              animationDuration: peerRef.current ? '2s' : '1.5s'
            }} />
            
            {/* Main avatar */}
            <div className="relative w-44 h-44 rounded-full overflow-hidden border-4 border-red-400/50 shadow-2xl bg-gradient-to-br from-red-600 to-red-800">
              <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {calleeName ? calleeName.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact name */}
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold text-white tracking-wide">
              {calleeId || "Unknown"}
            </h2>
            <p className="text-red-200 text-lg opacity-80">
              {peerRef.current ? "Voice Call Active" : incomingOffer ? "Incoming Call..." : "Calling"}
            </p>
          </div>
        </div>

        {/* Call controls */}
        <div className="w-full max-w-sm space-y-8">
          
          {/* Start call button */}
          {!peerRef.current && !incomingOffer && isCaller && (
           <div className="flex flex-col items-center space-y-2">
           <p className="text-white text-lg">
            To make a call click the button below.
           </p>
         
           <button 
             onClick={startCall}
             className="group w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 active:scale-95 transition-all duration-200 ring-4 ring-green-400/20"
           >
             <Phone className="w-8 h-8 text-white group-hover:animate-bounce" />
           </button>
         </div>
          )}
          

          {/* Incoming call controls */}
          {incomingOffer && !peerRef.current && (
            <div className="flex justify-center items-center space-x-16">
              <button 
                onClick={acceptCall}
                className="group w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 active:scale-95 transition-all duration-200 ring-4 ring-green-400/30"
              >
                <Phone className="w-8 h-8 text-white group-hover:rotate-12 transition-transform" />
              </button>
              
              <button 
                onClick={() => cleanup("Call rejected")}
                className="group w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 active:scale-95 transition-all duration-200 ring-4 ring-red-400/30"
              >
                <PhoneOff className="w-8 h-8 text-white group-hover:-rotate-12 transition-transform" />
              </button>
            </div>
          )}

          {/* Active call controls */}
          {peerRef.current && (
            <div className="space-y-6">
              {/* Secondary controls */}
              <div className="flex justify-center space-x-8">
                <button className="w-14 h-14 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center border border-white/20 transition-all duration-200 hover:scale-105">
                  <Mic className="w-6 h-6 text-white" />
                </button>
                <button className="w-14 h-14 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center border border-white/20 transition-all duration-200 hover:scale-105">
                  <Volume2 className="w-6 h-6 text-white" />
                </button>
              </div>
              
              {/* Hang up button */}
              <div className="flex justify-center">
                <button 
                  onClick={hangUp}
                  className="group w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 active:scale-95 transition-all duration-200 ring-4 ring-red-400/30"
                >
                  <PhoneOff className="w-8 h-8 text-white group-hover:animate-pulse" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceCall;