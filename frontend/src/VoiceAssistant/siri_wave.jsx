import { useEffect, useRef } from "react";

function SiriWaveComponent({ isSpeaking }) {
  const waveRef = useRef(null);
  const siriRef = useRef(null);

  useEffect(() => {
    if (window.SiriWave) {
      siriRef.current = new window.SiriWave({
        container: waveRef.current,
        width: 600,
        height: 200,
        style: "ios9",
        speed: 0.2,
        amplitude: 0,
        autostart: true,
      });
    }

    return () => {
      siriRef.current?.stop();
    };
  }, []);

  useEffect(() => {
    if (siriRef.current) {
      siriRef.current.setAmplitude(isSpeaking ? 1 : 0);
    }
  }, [isSpeaking]);

  return (
    <div className="flex items-center justify-center">
    <div
      id="siri-container"
      ref={waveRef}
      style={{ width: "100%", height: "150px" }}
    />
    </div>
  );
}

export default SiriWaveComponent;
