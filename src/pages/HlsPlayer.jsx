import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
const HlsPlayer = ({ src }) => {
  const videoRef = useRef(null);
  useEffect(() => {
    
    if (videoRef.current) {
      if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) 
      {
        videoRef.current.src = src;
      } 
      else if (Hls.isSupported()) 
      {
        const hls = new Hls({
          xhrSetup: (xhr, url) => {
             xhr.withCredentials = false;
          }
        });

        hls.loadSource(src);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.ERROR, (event, data) => 
        {
          console.error("HLS error:", data);
        });

        return () => {
          hls.destroy();
        };
      }
    }
  }, [src]);
  return (
    <video
      ref={videoRef}
      controls 
      autoPlay
      width="100%"
      height="auto"
      playsInline
        style={{
          width: "100%",
          aspectRatio: "16 / 9", 
          background: "black",
        }}
    />
  );
};

export default HlsPlayer;