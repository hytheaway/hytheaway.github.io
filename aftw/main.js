let audioContext;
cajon_audio = document.querySelector(".cajon");
cabasa_audio = document.querySelector(".cabasa");
bass_audio = document.querySelector(".bass");
clav_audio = document.querySelector(".clav");

const playButton = document.querySelector(".play");
const stopButton = document.querySelector(".stop");

const cajonOnButton = document.querySelector(".cajonOnButton");
const cabasaOnButton = document.querySelector(".cabasaOnButton");
const bassOnButton = document.querySelector(".bassOnButton");
const clavOnButton = document.querySelector(".clavOnButton");

const cajonOffButton = document.querySelector(".cajonOffButton");
const cabasaOffButton = document.querySelector(".cabasaOffButton");
const bassOffButton = document.querySelector(".bassOffButton");
const clavOffButton = document.querySelector(".clavOffButton");

playButton.addEventListener("click", () => {
    cajon_audio.play();
    cabasa_audio.play();
    bass_audio.play();
    clav_audio.play();
    cajon_audio.volume=0;
    cabasa_audio.volume=0;
    bass_audio.volume=0;
    clav_audio.volume=0;
})

stopButton.addEventListener("click", () =>{
    cajon_audio.pause();
    cabasa_audio.pause();
    bass_audio.pause();
    clav_audio.pause();
    cajon_audio.currentTime=0;
    cabasa_audio.currentTime=0;
    bass_audio.currentTime=0;
    clav_audio.currentTime=0;
})

cajonOnButton.addEventListener("click", ()=>{
    cajon_audio.volume=1;
})
cabasaOnButton.addEventListener("click", ()=>{
    cabasa_audio.volume=1;
})
bassOnButton.addEventListener("click", ()=>{
    bass_audio.volume=1;
})
clavOnButton.addEventListener("click", ()=>{
    clav_audio.volume=1;
})

cajonOffButton.addEventListener("click", ()=>{
    cajon_audio.volume=0;
})
cabasaOffButton.addEventListener("click", ()=>{
    cabasa_audio.volume=0;
})
bassOffButton.addEventListener("click", ()=>{
    bass_audio.volume=0;
})
clavOffButton.addEventListener("click", ()=>{
    clav_audio.volume=0;
})

