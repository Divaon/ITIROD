let allMusic = [
  {
    name: "Лего",
    artist: "Ваня дмитриенко",
    img: "DQBBAtuUEAIcZuL.jpg",
    src: "1"
  },
  {
      name: "XAGI VAGI",
      artist: "Jason Swann, Eugene Demuckiy",
      img: "DQBBAtuUEAIcZuL.jpg",
      src: "2"
  },

  {
      name: "ХЛОПАЙ",
      artist: "INSTASAMKA",
      img: "DQBBAtuUEAIcZuL.jpg",
      src: "3"
  },
];

const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
isMusicPaused = true;
login = false;


let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);

window.addEventListener("load", ()=>{
  loadMusic(musicIndex);
  // playingSong(); 
});

function loadMusic(indexNumb){
  console.log(allMusic[indexNumb - 1].name);
  // console.log(docs );
  // console.log(docs1 );
  console.log(musicName );
  console.log(musicArtist );
  musicName.innerHTML = allMusic[indexNumb - 1].name;
  musicArtist.innerHTML = allMusic[indexNumb - 1].artist;
  // mainAudio.src = `songs/${allMusic[indexNumb - 1].srlkjhgfc}.mp3`;
}