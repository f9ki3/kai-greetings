import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const greetings = [
    "All hail Queen Kai! On this most sacred of days, the realm rejoices!",
    "The bells of King’s Landing ring out, the dragons light up the skies, and even the Night King sends his icy regards.",
    "Kai, you are no mere mortal—you are the breaker of chains, the bringer of joy, and the ruler of hearts.",
    "Your wit is sharper than Arya’s Needle, your strength rivals that of Brienne of Tarth, and your grace could make even Daenerys jealous.",
    "May your nameday be filled with laughter louder than a Dothraki horde, feasts fit for the Great Hall of Winterfell, and a cake so magnificent it could sit upon the Iron Throne itself.",
    "Winter may be coming, but today, it’s all sunshine and celebration in honor of you, our one true queen.",
    "Raise your goblet, claim your crown, and let the festivities begin!",
    "Happy Nameday, Kai! May your reign be long, your days bright, and your legacy as unforgettable as the tales of Old Valyria.",
    "Forever your loyal subject and friend, f9ki3 - click the profile picture",
  ];

  const [currentLine, setCurrentLine] = useState(0);
  const [showVideo, setShowVideo] = useState(false); // State to control video visibility
  const [videoSrc, setVideoSrc] = useState("/src/assets/videos/greetings.mp4"); // Initial video source

  const select = new Audio("/src/assets/sounds/select.mp3");

  const nextLine = () => {
    if (currentLine < greetings.length - 1) {
      setCurrentLine(currentLine + 1);
      select.play(); // Play sound with 30% volume
    } else if (currentLine === greetings.length - 1) {
      setShowVideo(false); // Initially set video to not show
      select.play();

      // Delay showing the video for 2 seconds after the last line is reached
      setTimeout(() => {
        setShowVideo(true); // Show the video after the delay
      }, 2000);
    }
  };

  const prevLine = () => {
    if (currentLine > 0) setCurrentLine(currentLine - 1);
    if (showVideo) setShowVideo(false); // Hide video if going back before reaching last line
    select.play();
  };

  const restart = () => {
    setCurrentLine(0);
    setShowVideo(false); // Hide video when restarting
    setVideoSrc("/src/assets/videos/greetings.mp4"); // Reset the video source
    select.play();
  };

  const handleImageClick = () => {
    setShowVideo(true); // Show video when the image is clicked
    setCurrentLine(greetings.length - 1); // Skip directly to the last greeting
    const videoElement = document.querySelector("video");
    if (videoElement) {
      videoElement.volume = 1; // Set video volume to 100%
    }
  };
  

  useEffect(() => {
    const balloonContainer = document.getElementById("balloon-container");

    for (let i = 0; i < 30; i++) {
      const balloon = document.createElement("div");
      balloon.classList.add("balloon");

      // Random position for horizontal spread
      balloon.style.left = `${Math.random() * 100}%`;

      // Random animation delay
      balloon.style.animationDelay = `${Math.random() * 2}s`;

      // Random color between two golden shades
      const randomGold = Math.random() > 0.5 ? '#ffcc00' : '#ffd700';
      balloon.style.background = `radial-gradient(circle at bottom, ${randomGold}, transparent 60%)`;

      balloonContainer.appendChild(balloon);
    }

    // Clean up balloons after animation
    setTimeout(() => {
      balloonContainer.innerHTML = "";
    }, 7000);

    // Change video source after 9 seconds
    if (showVideo) {
      setTimeout(() => {
        setVideoSrc("https://www.youtube.com/embed/jtKJGtn7Zxo?autoplay=1&controls=0"); // Embed the YouTube link
      }, 9000); // 9 seconds delay
    }
  }, [showVideo]);

  return (
    <div className="app">
      <div id="balloon-container"></div>
      <div className="content-wrapper">
        <div className="greetings">
          <div className="profile-wrapper">
            {/* Show profile image until the last line or when clicked */}
            {!showVideo && (
              <img 
                className="profile-img" 
                src="/src/assets/img/kai.jpg" 
                alt="Profile" 
                onClick={handleImageClick} 
              />
            )}
          </div>
          {/* Only display greetings if showVideo is false */}
          {!showVideo && greetings[currentLine]}
          
          {/* Show additional greeting above video */}
          {showVideo && (
            <div className="video-greeting">
              <p>Happy Birthday Karl Nicolai.</p>
            </div>
          )}

          {/* Embed YouTube video after 9 seconds */}
          {showVideo && videoSrc && (
            <div className="video-wrapper">
              <iframe
                src={videoSrc}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

        </div>
        <div className="buttons">
          <button onClick={prevLine} disabled={currentLine === 0}>
            Previous
          </button>
          <button onClick={restart}>Restart</button>
          <button onClick={nextLine} disabled={currentLine === greetings.length - 1}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
