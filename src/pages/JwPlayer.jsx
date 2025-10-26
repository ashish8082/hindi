import { useEffect, useRef } from "react";

const JwPlayer=({ file })=>{
      const playerRef = useRef(null);
       useEffect(() => {
    if (window.jwplayer && playerRef.current) 
      {
        window.jwplayer(playerRef.current).setup({
        file: file,
        width: "100%",
        aspectratio: "16:9",
        autoplay: true,
         type: "hls"
      });
    }
  }, [file]);

   return (
    <div>
        <div id="my-player" ref={playerRef}></div>
    </div>
  );
}
export default JwPlayer;