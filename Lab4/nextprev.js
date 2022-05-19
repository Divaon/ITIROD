prevbtn=wrapper.querySelector(".controls .prev"),
nextbtn=wrapper.querySelector(".controls .next");
// repeat
repeatbtn=wrapper.querySelector(".controls .repeat");

let circle=false;

function prevMusic()
{
    musicIndex--;
    if (musicIndex < 1)
    {
        musicIndex=allMusic.length;
    }
    loadMusic(musicIndex);
    playMusic();
}
function nextMusic()
{
    musicIndex++;
    if (musicIndex > allMusic.length)
    {
        musicIndex=1;
    }

    loadMusic(musicIndex);
    playMusic(); 
}


prevbtn.addEventListener("click", ()=>{
    prevMusic();
  });
nextbtn.addEventListener("click", ()=>{
    nextMusic();
  });



musicAudio.addEventListener("ended", ()=>{
    if (circle == false)
    {
        nextMusic(); 
    }
    else
    {
        playMusic();
    }
});

repeatbtn.addEventListener("click", ()=>{
    circle = !circle;
});