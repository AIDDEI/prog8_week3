// Initialize the Image Classifier method with MobileNet
const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);
const classifier = featureExtractor.classification(document.getElementById('output'));

// When the model is loaded
function modelLoaded() {
    console.log('Model Loaded!');
}

featureExtractor.load("lego.json");

const image = document.getElementById('output')
const fileButton = document.querySelector("#file")

fileButton.addEventListener("change", (event)=>{
    image.src = URL.createObjectURL(event.target.files[0])
})

image.addEventListener('load', () => userImageUploaded())

function userImageUploaded(){
    console.log("The image is now visible in the DOM")
    // Make a prediction with a selected image
    classifier.classify(document.getElementById('output'), (err, results) => {
    console.log(results)
    speak(results[0].label)
  });
}

let synth = window.speechSynthesis

function speak(text) {
    if (synth.speaking) {
        console.log('still speaking...')
        return
    }
    if (text !== '') {
        let utterThis = new SpeechSynthesisUtterance(text)
        synth.speak(utterThis)
    }
}