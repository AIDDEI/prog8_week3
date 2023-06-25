// Initialize the Image Classifier method with MobileNet
const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);
const classifier = featureExtractor.classification(document.getElementById('output'));

let explanationText = document.getElementById("explanation");

// When the model is loaded
function modelLoaded() {
    console.log('Model Loaded!');
}

let p = document.createElement("p");
p.innerHTML = "Upload foto's van LEGO minifiguren! Wanneer je succesvol een LEGO minifiguur heb geladen, krijg je een punt! Maar wanneer je een foto upload van iets anders dan een LEGO minifiguur, gaat er een punt vanaf...";
explanationText.appendChild(p);

let scoreDiv = document.getElementById("score");
let score = 0;
let scoreText = document.createElement("p");
scoreText.innerHTML = score;
scoreDiv.appendChild(scoreText);

featureExtractor.load("model.json");

const image = document.getElementById('output')
const fileButton = document.querySelector("#file")

fileButton.addEventListener("change", (event)=>{
    image.src = URL.createObjectURL(event.target.files[0])
})

image.addEventListener('load', () => userImageUploaded())

function userImageUploaded(){
    console.log("The image is now visible in the DOM");
    // Make a prediction with a selected image
    classifier.classify(document.getElementById('output'), (err, results) => {
    console.log(results);
    speak(results[0].label);
    updateScore(results[0].label);
  });
}

let synth = window.speechSynthesis

speak(p.innerHTML);

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

function updateScore(result) {
    if (result === "Lego Minifigure"){
        score++;

        scoreDiv.removeChild(scoreText);
        scoreText.innerHTML = score;
        scoreDiv.appendChild(scoreText);
    } else {
        if (score === 0){
            score = 0;

            scoreDiv.removeChild(scoreText);
            scoreText.innerHTML = score;
            scoreDiv.appendChild(scoreText);
        } else {
            score--;
            
            scoreDiv.removeChild(scoreText);
            scoreText.innerHTML = score;
            scoreDiv.appendChild(scoreText);
        }
    }
    console.log(score);
}