"use client"
import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-quality-levels";
import "videojs-http-source-selector";
import {
  BookOpen,
  CheckCircle,
  PlayCircle,
  Clock,
  ChevronRight,
  
} from "lucide-react";



// Mock course data
const mockCourse = {
  id: 1,
  title: "React Masterclass",
  description: "Comprehensive React course covering hooks, state, and more.",
  chapters: [
    {
      id: 1,
      title: "Introduction to React",
      videoUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      duration: 320, // seconds
    },
    {
      id: 2,
      title: "JSX & Components",
      videoUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      duration: 320,
    },
    {
      id: 3,
      title: "State & Props",
      videoUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      duration: 320,
    },
    {
      id: 4,
      title: "Hooks Deep Dive",
      videoUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      duration: 320,
    },
    {
      id: 5,
      title: "Project: Todo App",
      videoUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      duration: 320,
    },
  ],
};

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

const playbackRates = [0.5, 1, 1.25, 1.5, 2];

export default function CoursePlayerPage() {
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [progress, setProgress] = useState<{ [chapterId: number]: number }>({});
  const [isPlaying, setIsPlaying] = useState(false);
 
  const [loading, setLoading] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const videoNode = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<typeof videojs.players | null>(null);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);


  const currentChapter = mockCourse.chapters[currentChapterIdx];

  // Initialize player ONCE

useEffect(() => {
  if (!videoNode.current) return;

  if (!playerRef.current) {
    playerRef.current = videojs(videoNode.current, {
      controls: true,
      autoplay: true,
      preload: "auto",
      fluid: true,
      playbackRates,
      poster: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    });

    // Attach events ONCE
    playerRef.current.on("play", () => setIsPlaying(true));
    playerRef.current.on("pause", () => setIsPlaying(false));

    playerRef.current.on("error", () => {
      setVideoError("Video playback error. Please try again.");
      setLoading(false);
    });
  }

  const storedProgress = localStorage?.getItem("lms-progress");
    if (storedProgress) {
      setProgress(JSON.parse(storedProgress));
    }

    const storedCompleted = localStorage.getItem("lms-completed");
    if (storedCompleted) {
      setCompletedChapters(JSON.parse(storedCompleted));
    }
  return () => {
    if (playerRef.current) {
      playerRef.current.dispose();
      playerRef.current = null;
    }
  };
}, []);





  // On chapter change, update source and quality levels
  // useEffect(() => {
  //   if (!playerRef.current) return;
  
  //   playerRef.current.src({
  //     src: currentChapter.videoUrl,
  //     type: "application/x-mpegURL",
  //   });
  
  //   const last = progress[currentChapter.id] || 0;
  //   playerRef.current.currentTime(last);
  
  //   const onTimeUpdate = () => {
  //     setProgress((prev) => ({
  //       ...prev,
  //       [currentChapter.id]: typeof playerRef.current.currentTime() === "number"
  //         ? playerRef.current.currentTime()
  //         : 0,
  //     }));
  //   };
  
  //   const onLoadedMetadata = () => {
  //     const actualDuration = playerRef.current.duration();
  //     setProgress((prev) => ({
  //       ...prev,
  //       [currentChapter.id]: Math.min(prev[currentChapter.id] || 0, actualDuration),
  //     }));
  //   };
  
  //   const onEnded = () => {
  //     const actualDuration = playerRef.current.duration();
  //     // setProgress((prev) => ({
  //     //   ...prev,
  //     //   [currentChapter.id]: actualDuration,
  //     // }));

  //     setProgress((prev) => {
  //       const updated = {
  //         ...prev,
  //         [currentChapter.id]: actualDuration,
  //       };
  //       localStorage.setItem("lms-progress", JSON.stringify(updated));
  //       return updated;
  //     });
  
  //     if (currentChapterIdx < mockCourse.chapters.length - 1) {
  //       setTimeout(() => setCurrentChapterIdx((idx) => idx + 1), 1000);
  //     }
  //   };
  
  //   playerRef.current.on("timeupdate", onTimeUpdate);
  //   playerRef.current.on("loadedmetadata", onLoadedMetadata);
  //   playerRef.current.on("ended", onEnded);
  
  //   return () => {
  //     // Clean up listeners
  //     playerRef.current.off("timeupdate", onTimeUpdate);
  //     playerRef.current.off("loadedmetadata", onLoadedMetadata);
  //     playerRef.current.off("ended", onEnded);
  //   };
  // }, [currentChapterIdx]);
  
  useEffect(() => {
    if (!playerRef.current) return;
  
    
  
    playerRef.current.src({
      src: currentChapter.videoUrl,
      type: "application/x-mpegURL",
    });

    const chapterId = currentChapter.id;
    const lastProgress = progress[chapterId] || 0;
    const duration = currentChapter.duration;
  
    const alreadyCompleted = lastProgress >= duration - 2;
  console.log("already completed",alreadyCompleted)
    // ✅ If already completed → restart from beginning for replay
    playerRef.current.ready(() => {
      playerRef.current.currentTime(alreadyCompleted ? 0 : lastProgress);
    });
  
    const onTimeUpdate = () => {
      const current = playerRef.current.currentTime();
      console.log("alreadycompleted",alreadyCompleted)
      
    
      setProgress((prev) => {
        const updated = {
          ...prev,
          [chapterId]: current,
        };
        localStorage.setItem("lms-progress", JSON.stringify(updated));
        return updated;
      });
    };
    
  
    const onLoadedMetadata = () => {
      const actualDuration = playerRef.current.duration();
      
  
      setProgress((prev) => ({
        ...prev,
        [chapterId]: Math.min(prev[chapterId] || 0, actualDuration),
      }));
    };
  
    const onEnded = () => {
      const actualDuration = playerRef.current.duration();
  
      setProgress((prev) => {
        const updated = {
          ...prev,
          [chapterId]: actualDuration,
        };
        localStorage.setItem("lms-progress", JSON.stringify(updated));
        return updated;
      });

      setCompletedChapters((prev) => {
        const updated = prev.includes(chapterId) ? prev : [...prev, chapterId];
        localStorage.setItem("lms-completed", JSON.stringify(updated));
        return updated;
      });
  
      if (currentChapterIdx < mockCourse.chapters.length - 1) {
        setTimeout(() => setCurrentChapterIdx((idx) => idx + 1), 2000);
      }
    };
  
    playerRef.current.on("timeupdate", onTimeUpdate);
    playerRef.current.on("loadedmetadata", onLoadedMetadata);
    playerRef.current.on("ended", onEnded);
  
    return () => {
      playerRef.current.off("timeupdate", onTimeUpdate);
      playerRef.current.off("loadedmetadata", onLoadedMetadata);
      playerRef.current.off("ended", onEnded);
    };
  }, [currentChapterIdx]);
  


  // Compute current time and duration for accurate progress bar
const currentTime = progress[currentChapter.id] || 0;
const actualDuration =
  typeof playerRef.current?.duration === "function"
    ? playerRef.current.duration()
    : currentChapter.duration;

const progressPercent = Math.min((currentTime / actualDuration) * 100, 100);


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">{mockCourse.title}</h1>
        <p className="text-gray-600">{mockCourse.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Player & Info */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fade-in-up flex flex-col">
          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-6 flex items-center justify-center">
            <video
              ref={videoNode}
              className="video-js vjs-big-play-centered w-full h-full bg-black"
              playsInline
            />
            {/* Loading/Errors */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20">
                <div className="text-white text-lg animate-pulse">Loading video...</div>
              </div>
            )}
            {videoError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-30">
                <div className="text-white text-center text-lg">{videoError}</div>
              </div>
            )}
            
           
          </div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-xl font-semibold text-blue-700">{currentChapter.title}</h2>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                <Clock className="w-4 h-4" /> {formatTime(currentChapter.duration)}
              </div>
            </div>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${isPlaying ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-blue-50"}`}
              onClick={() => {
                if (playerRef.current) {
                  if (isPlaying) playerRef.current.pause();
                  else playerRef.current.play();
                }
              }}
            >
              <PlayCircle className="w-5 h-5" /> {isPlaying ? "Pause" : "Play"}
            </button>
          </div>
          {/* Progress bar for current video (current chapter only) */}
          <div className="w-full bg-gray-100 rounded-full h-2 mt-4">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-700"
              style={{width:`${progressPercent}%`}}
            ></div>
          </div>
        </div>

        {/* Chapters List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-blue-700">Chapters</h2>
          </div>
          <ul className="space-y-3">
            {mockCourse.chapters.map((chapter, idx) => {
              
              const completed = completedChapters.includes(chapter.id); // 2s margin
              const isCurrent = idx === currentChapterIdx;
              return (
                <li
                  key={chapter.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${isCurrent ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-100 hover:bg-blue-50 hover:border-blue-200"}`}
                  onClick={() => setCurrentChapterIdx(idx)}
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  <div className="flex-shrink-0">
                    {completed ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-medium truncate ${isCurrent ? "text-blue-700" : "text-blue-700"}`}>{chapter.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <Clock className="w-4 h-4" /> {formatTime(chapter.duration)}
                    </div>
                    {/* Only show the progress bar for the current chapter */}
                    {isCurrent && (
                      <div className="w-full bg-gray-100 rounded-full h-1 mt-2">
                        <div
                          className={`h-1 rounded-full transition-all duration-700 ${completed ? "bg-green-500" : "bg-blue-500"}`}
                          style={{width:`${progressPercent}%`}}
                        ></div>
                      </div>
                    )}
                  </div>
                  {completed && <span className="ml-2 text-xs text-green-600 font-semibold">Completed</span>}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s both;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s both;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
} 
