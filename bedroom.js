modelStatus = false

function setup() {
    canvas = createCanvas(600, 400)
    canvas.center()
    bedroomImage.resize(600, 400)

    objectDetected = ml5.objectDetector("cocossd", modelLoaded)
    objectDetected.detect(bedroomImage, gotResult)
}

function modelLoaded() {
    console.log("Modelo Carregado")
    modelStatus = true
}

function preload() {
    bedroomImage = loadImage("bedroom.jpg")
}

object = []
function gotResult(error, result) {
    if (error) {
        console.log(error)
    }
    else {
        console.log(result)
        object = result
    }
}

function draw() {
    image(bedroomImage, 0, 0, 600, 400)

    if (modelStatus) {
        for (i = 0; i < object.length; i++) {
            noFill()
            rect(object[i].x, object[i].y, object[i].width, object[i].height)
            stroke("red")
            fill("black")
            percent = object[i].confidence.toFixed(2) * 100
            text(object[i].label + ": " + percent + "%", object[i].x, object[i].y)
            document.getElementById("objects").innerHTML = "Objetos Detectados: Dentre os 3 objetos grandes, na imagem, o modelo CocoSSD detectou " + object.length + " deles"
        }

        if (object.length == 0) {
            document.getElementById("objects").innerHTML = "Objetos Detectados: Dentre os 3 objetos grandes, na imagem, o modelo CocoSSD detectou 0 deles"
        }
    }
}