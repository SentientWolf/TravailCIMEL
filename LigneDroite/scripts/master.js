const scripts = ["./scripts/dialogue0.js","./scripts/niveau0.js","./scripts/bteOutil.js"]
const styles = ["./styles/dialogue.css","./styles/niveau.css"]
const couleurs = ["rgba(180, 230, 255,1)","rgba(100,150,160,1)"] //background, ring

//démarrage
loadStyle("./styles/dialogue.css")
loadScript(scripts[0],()=>{question0()})
loadScript(scripts[2])



function loadScript(url, callback) {
    const script = document.createElement('script')
    script.src = url
    script.defer = true
    script.onload = callback
    document.head.appendChild(script)
}

function loadStyle(url, callback) {
    const style= document.createElement('link')
    style.href = url
    style.rel = "stylesheet"
    style.onload = callback;

    document.head.appendChild(style)
}



// Paramétrage body
document.body.style.backgroundColor = couleurs[0]

// Paramétrage dialogues
const Tps = 0;
const zoneDialogue = document.createElement("div")
zoneDialogue.className ="zoneDialogue"
zoneDialogue.style.width = 75+"vw"
zoneDialogue.style.height = 75+"vh"
document.body.appendChild(zoneDialogue)

// Paramétrage niveaux


const zoneNiveau = document.createElement("div")
zoneNiveau.style.display="none"
zoneNiveau.className = "zoneNiveau"
zoneNiveau.style.position = "absolute"
zoneNiveau.style.top = 0
zoneNiveau.style.left = 0
zoneNiveau.style.width = window.innerWidth
zoneNiveau.style.height = window.innerHeight
document.body.appendChild(zoneNiveau)
zoneNiveau.style.display = "block"

const canvasNiveau = document.createElement("canvas")
canvasNiveau.className = ("canvasNiveau")
const nvxCtxt = canvasNiveau.getContext("2d")
canvasNiveau.width = window.innerWidth 
canvasNiveau.height = window.innerHeight
// canvasNiveau.style.backgroundColor = couleurs[1]
zoneNiveau.appendChild(canvasNiveau)
zoneNiveau.style.display = "none"






// Gestion des dialogues
function questioner(reponses,questions,event,fonction){

    if(!boolBlocQst[etape]){  
        boolBlocQst[etape] = true;

        let blocQuestion = document.createElement("div")
        blocQuestion.className = "blocText"
    
        let question = document.createElement("div")
        question.className ="bteDialogue"

        zoneDialogue.appendChild(blocQuestion)
        blocQuestion.appendChild(question)

        for(let i=0;i<reponses.length;i++){
            switch(event.target.innerHTML){
                case reponses[i] : question.innerHTML = questions[i]
                break
            }
        }

        fonction(event)
    }else{

    }

}

function repondre(reponses,fonction) { 
    const blocReponse = document.createElement("div")
    blocReponse.className = "blocText"
    zoneDialogue.appendChild(blocReponse)

    for (let i=0;i<reponses.length;i++){
        const rep = document.createElement("div")
        rep.className = "bteDialogue btnReponse"
        rep.innerHTML = reponses[i]
        rep.addEventListener('click',(event)=>fonction(event))
        blocReponse.appendChild(rep)
    }
}

// Création d'un niveau
let nbWave = 5
function createLvl(){
    zoneDialogue.style.display ="none"
    zoneNiveau.style.display = "block"
    createWaves(couleurs[0],couleurs[1],0,nbWave)
}

let espaceWave = 500
function createWaves(bgCol,ringCol,repeater,repeatMax){

    if(repeater<repeatMax) {
        
        bgCol=changeCol(bgCol,-100/repeatMax)
        create1Wave(bgCol,0,ringCol)
        ringCol=changeCol(ringCol,30/repeatMax)
        
        setTimeout(()=>{
            repeater+=1
            requestAnimationFrame(()=>createWaves(bgCol,ringCol,repeater,repeatMax))
        },espaceWave)
    }else{
        zoneNiveau.style.backgroundColor=bgCol
    }
    

function create1Wave(bgCol, animationState, ringCol) {
    const animMaxFrame = 100 // gere la vitesse
    // document.body.style.backgroundColor = bgCol
    // colShadow = changeCol(ringCol,30)
    const centerX = canvasNiveau.width / 2
    const centerY = canvasNiveau.height / 2
    const epRing = 0.05 //1 = canvasNiveau.width/2

    const angShadow = 0//-Math.PI/4 
    let ecartShadow = 0.5 // c'est le décalage; 1 = une épaisseur de Shadow
    const ratioShadow = 1 // c'est la taille; 1 = identique à l'anneau

    let radiusInt = animationState/animMaxFrame*canvasNiveau.width/3 //bien diviser par 3 pour avoir tout l'écran
    let radiusExt = radiusInt + epRing*canvasNiveau.width/2

    // console.log("anim"+animationState)

    
    nvxCtxt.globalCompositeOperation = 'source-over';

    // nvxCtxt.beginPath() // outerShadow
    // nvxCtxt.arc(   
    //     centerX+ecartShadow*epRing*canvasNiveau.width/2*Math.cos(angShadow), 
    //     centerY+ecartShadow*epRing*canvasNiveau.width/2*-1*Math.sin(angShadow), 
    //     radiusExt*ratioShadow, 
    //     0, 
    //     2 * Math.PI)
    // nvxCtxt.strokeStyle =colShadow
    // nvxCtxt.lineWidth = radiusExt*2
    // nvxCtxt.stroke();

    nvxCtxt.beginPath() //outerRing
    nvxCtxt.arc(centerX, centerY, radiusExt, 0, 2 * Math.PI)
    nvxCtxt.strokeStyle = ringCol
    nvxCtxt.lineWidth = radiusExt*2
    nvxCtxt.stroke();

    nvxCtxt.beginPath() // innerRing
    nvxCtxt.arc(centerX, centerY, radiusInt, 0, 2 * Math.PI)
    nvxCtxt.strokeStyle = bgCol
    nvxCtxt.lineWidth = radiusInt*2
    nvxCtxt.stroke();
    

    // nvxCtxt.beginPath() // remplir le centre avant de reirer les deux quartiers pour former l'ombre
    // nvxCtxt.arc(centerX, centerY, 2*radiusInt,  0, 2 * Math.PI)
    // nvxCtxt.fillStyle = colShadow
    // nvxCtxt.fill()

    // //retirer quartier droite
    // nvxCtxt.globalCompositeOperation = 'destination-out' 
    // nvxCtxt.beginPath()
    // nvxCtxt.moveTo(centerX, centerY);
    // nvxCtxt.arc(
    //     centerX, 
    //     centerY, 
    //     radiusInt*2, 
    //     Math.acos(ecartShadow/2), 
    //     -Math.acos(ecartShadow/2),
    //     true)  
    // nvxCtxt.closePath();
    // nvxCtxt.fillStyle = bgCol
    // nvxCtxt.fill()
    
    // //retirer quartier gauche 
    // nvxCtxt.beginPath() 
    // nvxCtxt.moveTo(
    //     centerX+ecartShadow*epRing*canvasNiveau.width/2*Math.cos(angShadow),
    //     centerY+ecartShadow*epRing*canvasNiveau.width/2*-1*Math.sin(angShadow));
    // nvxCtxt.arc(
    //     centerX+ecartShadow*epRing*canvasNiveau.width/2*Math.cos(angShadow), 
    //     centerY+ecartShadow*epRing*canvasNiveau.width/2*-1*Math.sin(angShadow), 
    //     radiusInt*2, 
    //     Math.acos((-ecartShadow)/2), 
    //     -Math.acos((-ecartShadow)/2),
    //     false)      
    // nvxCtxt.closePath();
    // nvxCtxt.fillStyle = bgCol
    // nvxCtxt.fill()
 
    
    animationState += 1

    if (animationState<animMaxFrame){
        requestAnimationFrame(()=>{create1Wave(bgCol, animationState, ringCol)})
    }

}
}

function changeCol(col,fonceur){
    let match =col.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+(\.\d+)?)\)$/);
    // Extract the RGBA components
    console.log("col :"+col+"  match :"+match)
    let [, r, g, b, a] = match;
    let newCol=[]

    if(fonceur<0){
        newCol[0] = Math.max(1, r - fonceur) 
        newCol[1] = Math.max(1, g - fonceur) 
        newCol[2] = Math.max(1, b - fonceur) 

    }else{
        newCol[0] = Math.min(255, r - fonceur) 
        newCol[1] = Math.min(255, g - fonceur) 
        newCol[2] = Math.min(255, b - fonceur) 

    }

    const newColf = `rgba(${ newCol[0]}, ${ newCol[1]}, ${ newCol[2]}, ${a})`
    return newColf
}


// Gestion des niveaux 
function loadNvx(event){
    switch(event.target.innerHTML){
        case "Je vais sonder tes souvenirs" :
            createLvl()
            setTimeout(()=>{
                loadStyle(styles[1])
                loadScript(scripts[1],()=>load())
            },1500+nbWave*espaceWave)
            
            break
    }
}




