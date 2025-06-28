import React from "react";
import VoiceCall from "../components/Calls/voiceCall";

const CallPage = () => {
  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/40 flex items-center justify-center">
      <VoiceCall />
    </div>
  );
};

export default CallPage;
