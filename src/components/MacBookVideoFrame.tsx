import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

interface MacBookVideoFrameProps {
  videoSrc: string;
  title?: string;
}

export const MacBookVideoFrame = ({ videoSrc, title }: MacBookVideoFrameProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-6xl px-2 sm:px-0"
    >
      {/* Browser Window Frame */}
      <div className="relative rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-[0_20px_80px_-15px_rgba(0,0,0,0.25)] border border-black/10">
        {/* macOS Title Bar */}
        <div className="bg-gradient-to-b from-[#e8e6e8] to-[#d4d2d4] px-3 sm:px-4 py-2 sm:py-3 flex items-center relative">
          {/* Traffic Lights */}
          <div className="flex items-center gap-1.5 sm:gap-2 z-10">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#febc2e] border border-[#dea123]" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28c840] border border-[#1aab29]" />
          </div>

          {/* URL Bar - centered */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[11px] sm:text-[13px] text-[#4a4a4a] font-normal tracking-wide">
              agent.obenan.ai
            </span>
          </div>
        </div>

        {/* Video Content */}
        <div className="relative bg-[#1a1a1a] aspect-[16/10]">
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted={isMuted}
            playsInline
          />

          {/* Video Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-5 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center justify-between">
              {title && (
                <span className="text-white/90 text-xs sm:text-sm font-medium">{title}</span>
              )}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={togglePlay}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  ) : (
                    <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white ml-0.5" />
                  )}
                </button>
                <button
                  onClick={toggleMute}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle reflection shadow */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-black/8 blur-2xl rounded-full" />
    </motion.div>
  );
};
