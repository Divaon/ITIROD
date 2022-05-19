playpausebtn = wrapper.querySelector(".controls .play");
isMusicPaused = true;






function playMusic()
{
  wrapper.classList.add("paused");
  musicAudio.play();
}

function pauseMusic()
{
  wrapper.classList.remove("paused");
  musicAudio.pause();
}


playpausebtn.addEventListener("click", ()=>{
  const isMusicPaused=wrapper.classList.contains("paused");
  isMusicPaused ? pauseMusic() : playMusic();
});



