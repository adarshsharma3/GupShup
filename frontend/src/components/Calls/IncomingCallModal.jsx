import React from "react";
import { Phone, PhoneOff } from "lucide-react";

const IncomingCallModal = ({ callerName, onAccept, onReject }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Background animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1.5 + Math.random() * 1}s`
            }}
          />
        ))}
      </div>

      {/* Main modal */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-red-500/20 rounded-3xl shadow-2xl p-8 w-96 text-center transform animate-pulse">
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-3xl border-2 border-red-500/30 animate-pulse" />
        
        {/* Incoming call indicator */}
        <div className="mb-6">
          <div className="text-red-400 text-sm font-medium tracking-widest uppercase mb-2 opacity-80">
            Incoming Call
          </div>
          <div className="w-2 h-2 bg-red-500 rounded-full mx-auto animate-ping" />
        </div>

        {/* Caller avatar */}
        <div className="relative mb-6">
          {/* Pulsing ring around avatar */}
          <div className="absolute inset-0 rounded-full border-4 border-red-500/30 animate-ping" style={{ 
            width: '120px', 
            height: '120px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            animationDuration: '2s'
          }} />
          
          {/* Avatar */}
          <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-red-400/50 shadow-xl bg-gradient-to-br from-red-600 to-red-800">
            <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-white">
                  {callerName ? callerName.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Caller name */}
        <div className="mb-8 space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-wide">
            {callerName || "Unknown Caller"}
          </h2>
          <p className="text-red-200 text-base opacity-80">
            is calling you...
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center items-center space-x-12">
          {/* Accept button */}
          <button
            onClick={onAccept}
            className="group relative w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 active:scale-95 transition-all duration-200 ring-4 ring-green-400/30 hover:ring-green-400/50"
          >
            <Phone className="w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-200" />
            
            {/* Button label */}
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-green-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              View 
            </span>
          </button>

          {/* Reject button */}
          <button
            onClick={onReject}
            className="group relative w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 active:scale-95 transition-all duration-200 ring-4 ring-red-400/30 hover:ring-red-400/50"
          >
            <PhoneOff className="w-7 h-7 text-white group-hover:-rotate-12 transition-transform duration-200" />
            
            {/* Button label */}
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-red-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Decline
            </span>
          </button>
        </div>

        {/* Subtle animation wave at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/30 to-transparent">
          <div className="h-full bg-gradient-to-r from-red-500/50 to-red-600/50 animate-pulse" />
        </div>
      </div>

      {/* Ripple effect overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-96 h-96 border border-red-500/10 rounded-full animate-ping" style={{ 
          transform: 'translate(-50%, -50%)',
          animationDuration: '3s'
        }} />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 border border-red-400/10 rounded-full animate-ping" style={{ 
          transform: 'translate(-50%, -50%)',
          animationDuration: '2.5s',
          animationDelay: '0.5s'
        }} />
      </div>
    </div>
  );
};

export default IncomingCallModal;