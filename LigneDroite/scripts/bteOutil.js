


const tailleInput = 75

const zoneBteOutil = document.createElement("aside")
zoneBteOutil.style.dispaly = "block"
zoneBteOutil.style.position = "absolute"
zoneBteOutil.style.left = 15+"px"
zoneBteOutil.style.height = 80+"vh"
zoneBteOutil.style.width = 20+"vw"
zoneBteOutil.style.top = 10+"vh"
zoneBteOutil.style.backgroundColor = "rgba(150,70,50,1)"
zoneBteOutil.style.borderRadius = 15+"px"
zoneBteOutil.style.display ="flex"
zoneBteOutil.style.flexDirection = "column"
document.body.appendChild(zoneBteOutil)

// Backg Color
const bgColDiv = document.createElement("div")
bgColDiv.style.display = "flex"
bgColDiv.style.flexDirection = "row"
bgColDiv.style.justifyContent = "start"
bgColDiv.style.alignItems = "center"
bgColDiv.style.margin = 10+"px"
zoneBteOutil.appendChild(bgColDiv)

const bgColInput = document.createElement("input")
bgColInput.style.display ="bloc"
bgColInput.style.width = tailleInput+"px"
bgColInput.name ="bgColInput"
bgColInput.type = "color"
bgColInput.value =  rgbaToHex(couleurs[0])
bgColDiv.appendChild(bgColInput)
bgColInput.addEventListener("change",()=>{
    couleurs[0]=hexToRgba(bgColInput.value)
    zoneNiveau.style.backgroundColor = couleurs[0]
    document.body.style.backgroundColor = couleurs[0]
})

const bgColLabel = document.createElement("label")
bgColLabel.for = "bgColInput"
bgColLabel.innerHTML = "Couleur du fond d'écran"
bgColLabel.style.marginLeft = 10+"px"
bgColDiv.appendChild(bgColLabel)



//Ring Color
const ringColDiv = document.createElement("div")
ringColDiv.style.display = "flex"
ringColDiv.style.flexDirection = "row"
ringColDiv.style.justifyContent = "start"
ringColDiv.style.alignItems = "center"
ringColDiv.style.margin = 10+"px"
zoneBteOutil.appendChild(ringColDiv)

const ringColInput = document.createElement("input")
ringColInput.style.display ="bloc"
ringColInput.style.width = tailleInput+"px"
ringColInput.type = "color"
ringColInput.value = rgbaToHex(couleurs[1])
ringColDiv.appendChild(ringColInput)
ringColInput.addEventListener("change",()=>{
    couleurs[0]=hexToRgba(ringColInput.value)
    zoneNiveau.style.backgroundColor = couleurs[1]
    document.body.style.backgroundColor = couleurs[1]
})

const ringColLabel = document.createElement("label")
ringColLabel.for = "ringColLabel"
ringColLabel.innerHTML = "Couleur des anneaux"
ringColLabel.style.marginLeft = 10+"px"
ringColDiv.appendChild(ringColLabel)

//nombre d'anneaux
const nbRingDiv = document.createElement("div")
nbRingDiv.style.display = "flex"
nbRingDiv.style.flexDirection = "row"
nbRingDiv.style.justifyContent = "start"
nbRingDiv.style.alignItems = "center"
nbRingDiv.style.margin = 10+"px"
zoneBteOutil.appendChild(nbRingDiv)

const nbRingInput = document.createElement("input")
nbRingInput.style.display ="bloc"
nbRingInput.style.width = tailleInput-10+"px"
nbRingInput.type = "number"
nbRingInput.value = nbWave
nbRingDiv.appendChild(nbRingInput)
nbRingInput.addEventListener("change",()=>{
    nbWave=nbRingInput.value
})

const nbRingLabel = document.createElement("label")
nbRingLabel.for = "ringColLabel"
nbRingLabel.innerHTML = "Nombre d'anneaux"
nbRingLabel.style.marginLeft = 10+"px"
nbRingDiv.appendChild(nbRingLabel)


//vitesse d'anneaux
const fqRingDiv = document.createElement("div")
fqRingDiv.style.display = "flex"
fqRingDiv.style.flexDirection = "row"
fqRingDiv.style.justifyContent = "start"
fqRingDiv.style.alignItems = "center"
fqRingDiv.style.margin = 10+"px"
zoneBteOutil.appendChild(fqRingDiv)

const fqRingInput = document.createElement("input")
fqRingInput.style.display ="bloc"
fqRingInput.style.width = tailleInput-10+"px"
fqRingInput.type = "number"
fqRingInput.value = espaceWave
fqRingDiv.appendChild(fqRingInput)
fqRingInput.addEventListener("change",()=>{
    espaceWave=fqRingInput.value
})

const fqRingLabel = document.createElement("label")
fqRingLabel.for = "ringColLabel"
fqRingLabel.innerHTML = "Vitesse des anneaux"
fqRingLabel.style.marginLeft = 10+"px"
fqRingDiv.appendChild(fqRingLabel)

//reset
const reset = document.createElement("input")
reset.style.display ="bloc"
reset.style.position = "absolute"
reset.style.left = zoneBteOutil.style.width+"px"
reset.style.top = zoneBteOutil.style.height+"px"
reset.style.width = tailleInput-10+"px"
reset.type = "button"
reset.value = espaceWave
zoneBteOutil.appendChild(reset)



// transforme les couleurs
function rgbaToHex(rgbaColor) {
    const rgbaValues = rgbaColor.match(/\d+/g);
    if (!rgbaValues || rgbaValues.length !== 4) {
        return null; // Invalid input format
    }

    const [r, g, b, a] = rgbaValues.map(Number);

    // Convert the RGB values to hexadecimal format
    const rgbHex = ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase();

    // Convert the alpha value to a hexadecimal format
    const aHex = Math.round(a * 255).toString(16).toUpperCase().padStart(2, '0');

    // Combine the RGB and alpha values to form the hex color
    console.log("rgba :"+rgbaColor+" res:"+`#${rgbHex}`)
    return `#${rgbHex}`;
}

function hexToRgba(hexColor){
    // Remove the "#" symbol if it's included in the input
    hexColor = hexColor.replace(/^#/, '');

    // Convert the hex values to decimal (base 10)
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);

    // Ensure that the alpha value is within the valid range (0 to 1)
    alpha = 1

    // Construct the RGBA string
    console.log("hex :"+hexColor+" res:"+`rgba(${r}, ${g}, ${b}, ${alpha})`)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}