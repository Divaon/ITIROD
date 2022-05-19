musiclist=wrapper.querySelector(".music-list")
listmusicbtn=wrapper.querySelector("#more-music");
hidemusicbtn=musiclist.querySelector("#close")



listmusicbtn.addEventListener("click", ()=>{
    musiclist.classList.toggle("show");
});

hidemusicbtn.addEventListener("click", ()=>{
    listmusicbtn.click();
});



  const ulTag = wrapper.querySelector("ul");
  for (let i = 0; i < allMusic.length; i++) {
    let liTag = `<li li-index="${i + 1}">
                  <div class="row">
                    <span>${allMusic[i].name}</span>
                    <p>${allMusic[i].artist}</p>
                  </div>
                  <span id="${allMusic[i].src}"> </span>
                  <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
                </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);
  }


  const allLiTag = ulTag.querySelectorAll("li");
  console.log(allLiTag);
  for (let j = 0; j < allLiTag.length; j++) {
      
    if(allLiTag[j].classList.contains("playing")){
      allLiTag[j].classList.remove("playing");
    }
    allLiTag[j].setAttribute("onclick", "clicked(this)");
  }

  function clicked(element){
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex; 
    loadMusic(musicIndex);
    playMusic();
    listmusicbtn.click();
  }