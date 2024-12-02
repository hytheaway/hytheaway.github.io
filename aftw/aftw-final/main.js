
// insanely convoluted code for drag and drop
const instrument_buttons = document.querySelectorAll('.draggable_instrument');
instrument_buttons.forEach(draggable_instrument => {
    draggable_instrument.addEventListener('dragstart', drag);
    draggable_instrument.addEventListener('dragend', dragEnd);
});

const circleButtons = document.querySelectorAll('.circle-button');
circleButtons.forEach(button => {
    button.addEventListener('dragover', allowDrop);
    button.addEventListener('drop', drop);
});

function dragEnd(event){
    console.log("dragging removed");
    event.target.classList.remove('dragging');
};

function allowDrop(event){
    event.preventDefault();
};

function drag(event){
    const dragData = event.target.textContent;
    event.dataTransfer.setData('text/plain', dragData);
    console.log("drag data set:", dragData);
    event.target.classList.add('dragging');
};

function drop(event){
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    console.log("Drop data received:", data);

    if (event.currentTarget.classList.contains('circle-button')){
        event.currentTarget.textContent = data;
    }

    const draggedInstrument = document.querySelector('.draggable_instrument.dragging');
    if(draggedInstrument){
        draggedInstrument.classList.remove('dragging');
        console.log("dragged instrument:", draggedInstrument.innerText)
        console.log("dragged instrument full:", draggedInstrument)
        draggedInstrument.setAttribute("draggable", 0);
        draggedInstrument.setAttribute("style", "opacity: 0.5");
    }
};

function resetDragged(){
    location.reload();
}
// audio playing code
function startPlaying(){
    var drums = document.getElementById("drums");
    var bass = document.getElementById("bass");
    var piano = document.getElementById("piano");
    var sax = document.getElementById("sax");
    drums.play();
    bass.play();
    piano.play();
    sax.play();
}

function pausePlaying(){
    var drums = document.getElementById("drums");
    var bass = document.getElementById("bass");
    var piano = document.getElementById("piano");
    var sax = document.getElementById("sax");
    drums.pause();
    bass.pause();
    piano.pause();
    sax.pause();
}

function stopPlaying(){
    var drums = document.getElementById("drums");
    var bass = document.getElementById("bass");
    var piano = document.getElementById("piano");
    var sax = document.getElementById("sax");
    drums.pause();
    drums.currentTime = 0;
    bass.pause();
    bass.currentTime = 0;
    piano.pause();
    piano.currentTime = 0;
    sax.pause();
    sax.currentTime = 0;
}
// audio processing code
// let audioCtx = new window.AudioContext();
// async function convolve90L(){
//     let convolver = audioCtx.createConvolver();

//     let response = await fetch("audio/impulse_responses/L0e090a.wav");
//     let arraybuffer = await response.arrayBuffer();
//     convolver.buffer = await audioCtx.decodeAudioData(arraybuffer);

//     return convolver;
// }

// async function convolve90R(){
//     let convolver = audioCtx.createConvolver();

//     let response = await fetch("audio/impulse_responses/R0e090a.wav");
//     let arraybuffer = await response.arrayBuffer();
//     convolver.buffer = await audioCtx.decodeAudioData(arraybuffer);

//     return convolver;
// }

// let convolved90L = await convolve90L();
// let convolved90R = await convolve90R();

// convolved90L.connect(convolved90R);
// convolved90R.connect(audioCtx.destination);
async function convolve90(){
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const sourceNode = audioContext.createBufferSource();
    const splitterNode = audioContext.createChannelSplitter(2);
    const mergerNode = audioContext.createChannelMerger(2);
    const leftConvolver = audioContext.createConvolver();
    const rightConvolver = audioContext.createConvolver();

    async function loadAudioBuffer(url){
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        return await audioContext.decodeAudioData(arrayBuffer);
    }

    const [monoBuffer, leftIR, rightIR] = await Promise.all([
        loadAudioBuffer('./audio/Drums.wav'),
        loadAudioBuffer('./audio/impulse_responses/L0e090a.wav'),
        loadAudioBuffer('./audio/impulse_responses/R0e090a.wav')
    ]);

    sourceNode.buffer = monoBuffer;
    leftConvolver.buffer = leftIR;
    rightConvolver.buffer = rightIR;

    sourceNode.connect(splitterNode);
    splitterNode.connect(leftConvolver, 0);
    splitterNode.connect(rightConvolver, 0);
    leftConvolver.connect(mergerNode, 0, 0);
    rightConvolver.connect(mergerNode, 0, 1);
    mergerNode.connect(audioContext.destination);

    sourceNode.start();
}