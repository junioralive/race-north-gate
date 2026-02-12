
import React, { useState, useEffect, useRef } from 'react';

interface HeroProps {
  onStart: () => void;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef<any>(null);
  const videoContainerId = "hero-video-player";

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }

    function initPlayer() {
      playerRef.current = new window.YT.Player(videoContainerId, {
        videoId: 'AS4R3iZg3os',
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          loop: 1,
          playlist: 'AS4R3iZg3os',
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
          }
        }
      });
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-white">
      <div className="container mx-auto max-w-[1100px] px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center md:text-left order-2 md:order-1">
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">
              Spin & <span className="text-race-orange">Win</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Fill the form to participate and get an instant reward for RACE programs in AI, Cybersecurity, Business Analytics, and Cloud.
            </p>
            <button 
              onClick={onStart}
              className="bg-gray-900 text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-black transition shadow-2xl active:scale-95 transform hover:-translate-y-1"
            >
              Start Now
            </button>
          </div>
          
          <div className="flex-1 w-full max-w-md mx-auto relative order-1 md:order-2">
             <div className="absolute -z-10 w-80 h-80 bg-orange-100 rounded-full blur-3xl -top-10 -right-10 opacity-60 animate-pulse"></div>
             <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
               <div className="relative aspect-video rounded-3xl overflow-hidden bg-black group">
                 <div id={videoContainerId} className="absolute top-0 left-0 w-full h-full pointer-events-none scale-110"></div>
                 
                 {/* Custom Overlay Controls */}
                 <button 
                   onClick={toggleMute}
                   className="absolute bottom-4 right-4 z-20 bg-black/60 backdrop-blur-md text-white p-3 rounded-full hover:bg-black transition border border-white/20 active:scale-90"
                   aria-label={isMuted ? "Unmute" : "Mute"}
                 >
                   {isMuted ? (
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                   ) : (
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                   )}
                 </button>
               </div>
               
               <div className="mt-5 px-3 pb-2 flex items-center justify-between">
                 <div>
                   <p className="text-[10px] text-race-orange uppercase font-black tracking-[0.2em] mb-1">Meet RIA</p>
                   <p className="font-extrabold text-gray-900 text-lg">REVA Intelligent Assistant</p>
                 </div>
                 <div className="bg-orange-50 p-2.5 rounded-2xl">
                   <div className="w-6 h-6 rounded-full bg-race-orange animate-pulse"></div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
