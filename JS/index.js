
const wrapper = document.querySelector(".wrapper"),
  musicImg = wrapper.querySelector("img"),
  musicName = wrapper.querySelector(".name"),
  musicArtist = wrapper.querySelector(".artist"),
  playPauseBtn = wrapper.querySelector(".play-pause"),
  prevBtn = wrapper.querySelector("#prev"),
  nextBtn = wrapper.querySelector("#next"),
  mainAudio = wrapper.querySelector("#main-audio"),
  progressArea = wrapper.querySelector(".progress-area"),
  progressBar = wrapper.querySelector(".progress-bar");

  let allMusic = [
    {
      name: "Redemption Arc", //Nome da Musica
      artist: "Silva Hound", //Nome do artista
      img: "music-1", //Nome da imagem
      src: "music-1"  //Nome da musica
    },
    {
      name: "Times Like These",
      artist: "Five Finger Death Punch",
      img: "music-2",
      src: "music-2"
    },
    {
      name: "Root of All Evil",
      artist: "Silva Hound",
      img: "music-3",
      src: "music-3"
    },
    {
      name: "Fight Song",
      artist: "Eve",
      img: "music-4",
      src: "music-4"
    },
  
  ];

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
isMusicPaused = true;

window.addEventListener("load", () => {
  loadMusic(musicIndex);

});

function loadMusic(indexNumb) {
  musicName.innerText = allMusic[indexNumb - 1].name;
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  musicImg.src = `Assets/Images/${allMusic[indexNumb - 1].src}.jpg`;
  mainAudio.src = `Assets/Music/${allMusic[indexNumb - 1].src}.mp3`;
}

//função de dar play na musica
function playMusic() {
  wrapper.classList.add("paused");
  musicImg.classList.add('rotate');
  // playPauseBtn.querySelector("i").innerText = "pause";
  playPauseBtn.innerHTML = `<i class="fi fi-sr-pause"></i>`;
  mainAudio.play();
}

//função de pausar a musica
function pauseMusic() {
  musicImg.classList.remove('rotate');
  wrapper.classList.remove("paused");
  //playPauseBtn.querySelector("i").innerText = "play_arrow";
  playPauseBtn.innerHTML = `<i class="fi fi-sr-play"></i>`;
  mainAudio.pause();
}

//função de musica anterior
function prevMusic() {
  musicIndex--; //diminui musicIndex por 1
  //se musicIndex for menos que 1 então musicIndex será a largura variavel, então a ultima musica toca
  musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
}

//função de musica seguinte
function nextMusic() {
  musicIndex++; //aumenta musicIndex por 1
  // se musicIndex é maior que a largura variavel então musicIndex será 1, então a primeira musica toca
  musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
}

// evento do botao de play ou pause
playPauseBtn.addEventListener("click", () => {
  const isMusicPlay = wrapper.classList.contains("paused");
  //se isPlayMusic é verdadeiro então chamara pauseMusic e também playMusic
  isMusicPlay ? pauseMusic() : playMusic();;
});

//evento do botão de musica anterior
prevBtn.addEventListener("click", () => {
  prevMusic();
});

//evento do botão de musica seguinte
nextBtn.addEventListener("click", () => {
  nextMusic();
});

// atualiza a largura da barra de progresso conforme o tempo atual da musica
mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime; // pegando currentTime da musica tocando
  const duration = e.target.duration; //pegando duração total da musica tocando
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = wrapper.querySelector(".current-time"),
    musicDuartion = wrapper.querySelector(".max-duration");
  mainAudio.addEventListener("loadeddata", () => {
    // atualiza a duração total da musica
    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if (totalSec < 10) { //se sec for menos que 10 entao adiciona 0 antes dele
      totalSec = `0${totalSec}`;
    }
    musicDuartion.innerText = `${totalMin}:${totalSec}`;
  });
  //atualiza o tempo atual da musica tocando
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) { //se sec for menos que 10 entao adiciona 0 antes dele
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});




// atualiza o currentTime da musica tocando conforme a largura da barra de progresso
progressArea.addEventListener("click", (e) => {
  let progressWidth = progressArea.clientWidth; //pegando largura da barra de progresso
  let clickedOffsetX = e.offsetX; //pegando valor do offset X
  let songDuration = mainAudio.duration; //pegando duração total da musica

  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic(); //chamando a função playMusic
});



//código do que fazer depois da musica acabar
mainAudio.addEventListener("ended", () => {
  nextMusic();
});


// Animações
gsap.from(" img, .name , .artist, .song-timer, .progress-area, .controls", {
  opacity: 0,
  duration: 2,
  delay: 1.5,
  y: 25,
  ease: "expo.out",
  stagger: 0.2,
});
gsap.from(" header", {
  opacity: 0,
  duration: 1,
  delay: 1.5,
  y: -25,
  ease: "expo.out",
  stagger: 0.2,
});
gsap.from(".p-now", {
  opacity: 0,
  duration: 1.8,
  delay: 1.5,
  y: -25,
  ease: "expo.out",
  stagger: 0.2,
});