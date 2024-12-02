var drums_angle;
var bass_angle;
var piano_angle;
var sax_angle;
var previous_value = 0;
var number_assigned = 0;
var timer = 15;

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
    const draggedInstrument = document.querySelector('.draggable_instrument.dragging');

    if (event.currentTarget.classList.contains('circle-button')){
        previous_value = event.currentTarget.textContent;
        console.log("previous value:", previous_value);
        event.currentTarget.textContent = data;
    }

    if(draggedInstrument){
        draggedInstrument.classList.remove('dragging');
        console.log("dragged instrument:", draggedInstrument.innerText)
        console.log("dragged instrument full:", draggedInstrument)
        draggedInstrument.setAttribute("draggable", 0);
        draggedInstrument.setAttribute("style", "opacity: 0.5");
        number_assigned = number_assigned + 1;
    }

    if (previous_value == 1){
        if (draggedInstrument.innerText == "Drums"){
            drums_angle = '000';
            // console.log("switch drums:", drums_angle);
        }
        if (draggedInstrument.innerText == "Bass"){
            bass_angle = '000';
            // console.log("switch bass:", bass_angle);
        }
        if (draggedInstrument.innerText == 'Piano'){
            piano_angle = '000';
        }
        if (draggedInstrument.innerText == "Saxophone"){
            sax_angle = '000';
        }
    }
    if (previous_value == 2){
        if (draggedInstrument.innerText == "Drums"){
            drums_angle = '315';
            // console.log("switch drums:", drums_angle);
        }
        if (draggedInstrument.innerText == "Bass"){
            bass_angle = '315';
            // console.log("switch bass:", bass_angle);
        }
        if (draggedInstrument.innerText == 'Piano'){
            piano_angle = '315';
        }
        if (draggedInstrument.innerText == "Saxophone"){
            sax_angle = '315';
        }
    }
    if (previous_value == 3){
        if (draggedInstrument.innerText == "Drums"){
            drums_angle = '270';
            // console.log("switch drums:", drums_angle);
        }
        if (draggedInstrument.innerText == "Bass"){
            bass_angle = '270';
            // console.log("switch bass:", bass_angle);
        }
        if (draggedInstrument.innerText == 'Piano'){
            piano_angle = '270';
        }
        if (draggedInstrument.innerText == "Saxophone"){
            sax_angle = '270';
        }
    }
    if (previous_value == 4){
        if (draggedInstrument.innerText == "Drums"){
            drums_angle = '225';
            // console.log("switch drums:", drums_angle);
        }
        if (draggedInstrument.innerText == "Bass"){
            bass_angle = '225';
            // console.log("switch bass:", bass_angle);
        }
        if (draggedInstrument.innerText == 'Piano'){
            piano_angle = '225';
        }
        if (draggedInstrument.innerText == "Saxophone"){
            sax_angle = '225';
        }
    }
    if (previous_value == 5){
        if (draggedInstrument.innerText == "Drums"){
            drums_angle = '180';
            // console.log("switch drums:", drums_angle);
        }
        if (draggedInstrument.innerText == "Bass"){
            bass_angle = '180';
            // console.log("switch bass:", bass_angle);
        }
        if (draggedInstrument.innerText == 'Piano'){
            piano_angle = '180';
        }
        if (draggedInstrument.innerText == "Saxophone"){
            sax_angle = '180';
        }
    }
    if (previous_value == 6){
        if (draggedInstrument.innerText == "Drums"){
            drums_angle = '135';
            // console.log("switch drums:", drums_angle);
        }
        if (draggedInstrument.innerText == "Bass"){
            bass_angle = '135';
            // console.log("switch bass:", bass_angle);
        }
        if (draggedInstrument.innerText == 'Piano'){
            piano_angle = '135';
        }
        if (draggedInstrument.innerText == "Saxophone"){
            sax_angle = '135';
        }
    }
    if (previous_value == 7){
        if (draggedInstrument.innerText == "Drums"){
            drums_angle = '090';
            // console.log("switch drums:", drums_angle);
        }
        if (draggedInstrument.innerText == "Bass"){
            bass_angle = '090';
            // console.log("switch bass:", bass_angle);
        }
        if (draggedInstrument.innerText == 'Piano'){
            piano_angle = '090';
        }
        if (draggedInstrument.innerText == "Saxophone"){
            sax_angle = '090';
        }
    }
    if (previous_value == 8){
        if (draggedInstrument.innerText == "Drums"){
            drums_angle = '045';
            // console.log("switch drums:", drums_angle);
        }
        if (draggedInstrument.innerText == "Bass"){
            bass_angle = '045';
            // console.log("switch bass:", bass_angle);
        }
        if (draggedInstrument.innerText == 'Piano'){
            piano_angle = '045';
        }
        if (draggedInstrument.innerText == "Saxophone"){
            sax_angle = '045';
        }
    }
};

function resetDragged(){
    location.reload();
}
// audio processing code
async function convolveInstrument(instrument, angle, useStereoPair = false){
    let strAngle = angle.toString();
    let instrumentPathStart = 'https://hytheaway.github.io/aftw/aftw-final/audio/';
    let instrumentPathEnd = '.wav';
    let leftIRPathStart = 'https://hytheaway.github.io/aftw/aftw-final/audio/impulse_responses/MIT/L0e';
    let rightIRPathStart = 'https://hytheaway.github.io/aftw/aftw-final/audio/impulse_responses/MIT/R0e';
    let stereoIRPathStart = 'https://hytheaway.github.io/aftw/aftw-final/audio/impulse_responses/D1/'
    let IRPathEnd = 'a.wav';

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const sourceNode = audioContext.createBufferSource();
    const splitterNode = audioContext.createChannelSplitter(2);
    const mergerNode = audioContext.createChannelMerger(2);
    const leftConvolver = audioContext.createConvolver();
    const rightConvolver = audioContext.createConvolver();
    leftConvolver.normalize = false;
    rightConvolver.normalize = false;
    

    async function loadAudioBuffer(url){
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        return await audioContext.decodeAudioData(arrayBuffer);
    }

    let monoBuffer, leftIR, rightIR;

    if (useStereoPair){
        [monoBuffer, stereoIR] = await Promise.all([loadAudioBuffer(instrumentPathStart.concat(instrument, instrumentPathEnd)),
            loadAudioBuffer(stereoIRPathStart.concat(strAngle, IRPathEnd))
        ]);

        const stereoConvolver = audioContext.createConvolver();
        stereoConvolver.buffer = stereoIR;
        stereoConvolver.normalize = false;

        sourceNode.buffer = monoBuffer;
        sourceNode.connect(stereoConvolver);
        stereoConvolver.connect(audioContext.destination);
    }
    else{
        [monoBuffer, leftIR, rightIR] = await Promise.all([
            loadAudioBuffer(instrumentPathStart.concat(instrument, instrumentPathEnd)),
            loadAudioBuffer(leftIRPathStart.concat(strAngle, IRPathEnd)),
            loadAudioBuffer(rightIRPathStart.concat(strAngle, IRPathEnd))
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
    }

    sourceNode.start(timer); //takes around 10 seconds for each of the instruments to be cached and ready to go; 15 is safety. 
}

function playTogether(){
    const useStereoPair = document.getElementById('dataset-select').value == 'stereo';
    console.log('is using stereo HRIR?', useStereoPair);
    const statusText = document.getElementById('statusText');
    const stoppedText = 'Not Playing';
    const loadingText = 'Loading...';
    const playingText = 'Playing';
    if (number_assigned != 4){
        statusText.innerText = 'Please drag every instrument to a position around the head.';
        return;
    }
    console.log('Drums:', drums_angle);
    console.log('Bass:', bass_angle);
    console.log('Piano:', piano_angle);
    console.log('Sax:', sax_angle);
    statusText.innerText = loadingText;
    setInterval(() => {
        statusText.innerText = playingText;
    }, (timer * 1000));
    convolveInstrument('Drums', drums_angle, useStereoPair);
    convolveInstrument('Bass', bass_angle, useStereoPair);
    convolveInstrument('Piano', piano_angle, useStereoPair);
    convolveInstrument('Wind', sax_angle, useStereoPair);

}