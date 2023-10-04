const scripts = ["./scripts/dialogue0.js","./scripts/niveau0.js"]
const styles = ["./styles/dialogue.css","./styles/niveau.css"]


//démarrage
loadStyle("./styles/dialogue.css")
loadScript("./scripts/dialogue0.js",()=>{question0()})



function loadScript(url, callback) {
    const script = document.createElement('script')
    script.src = url
    script.defer = true
    script.onload = callback
    console.log("loaded",url)
    document.head.appendChild(script)
}

function loadStyle(url, callback) {
    const style= document.createElement('link')
    style.href = url
    style.rel = "stylesheet"
    style.onload = callback;

    document.head.appendChild(style)
}





// Paramétrage dialogues
const Tps = 0;
const zoneDialogue = document.createElement("div")
zoneDialogue.className ="zoneDialogue"
zoneDialogue.style.width = 75+"vw"
zoneDialogue.style.height = 75+"vh"
document.body.appendChild(zoneDialogue)

// Paramétrage niveaux
const zoneNiveau = document.createElement("canvas")
zoneNiveau.className = ("zoneNiveau")
const nvxCtxt = zoneNiveau.getContext("2d")
zoneNiveau.width = window.innerWidth 
zoneNiveau.height = window.innerHeight
zoneNiveau.style.display="none"
document.body.appendChild(zoneNiveau)


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
function createLvl(){
    zoneDialogue.style.display ="none"
    zoneNiveau.style.display = "block"
    backgroundChange("rgba(255, 255, 255, 1)",0,"rgba(200, 200, 200, 1)")
    

function backgroundChange(bgCol, animationState, ringCol) {
    const animMaxFrame = 50
    document.body.style.backgroundColor = bgCol
    colShadow = getShadowcolor(ringCol,30)
    const centerX = zoneNiveau.width / 2
    const centerY = zoneNiveau.height / 2
    const epRing = 0.1 //1 = zoneNiveau.width/2

    const angShadow = 0//-Math.PI/4 
    let ecartShadow = 0.5 // c'est le décalage; 1 = une épaisseur de Shadow
    const ratioShadow = 1 // c'est la taille; 1 = identique à l'anneau

    let radiusInt = animationState/animMaxFrame*zoneNiveau.width/15 //bien diviser par 3 pour avoir tout l'écran
    let radiusExt = radiusInt + epRing*zoneNiveau.width/2

    console.log("anim"+animationState)

    
    nvxCtxt.globalCompositeOperation = 'source-over';

    nvxCtxt.beginPath() // outerShadow
    nvxCtxt.arc(   
        centerX+ecartShadow*epRing*zoneNiveau.width/2*Math.cos(angShadow), 
        centerY+ecartShadow*epRing*zoneNiveau.width/2*-1*Math.sin(angShadow), 
        radiusExt*ratioShadow, 
        0, 
        2 * Math.PI)
    nvxCtxt.strokeStyle =colShadow
    nvxCtxt.lineWidth = radiusExt*2
    nvxCtxt.stroke();

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
    

    nvxCtxt.beginPath() // remplir le centre avant de reirer les deux quartiers pour former l'ombre
    nvxCtxt.arc(centerX, centerY, 2*radiusInt,  0, 2 * Math.PI)
    nvxCtxt.fillStyle = colShadow
    nvxCtxt.fill()

    //retirer quartier droite
    nvxCtxt.globalCompositeOperation = 'destination-out' 
    nvxCtxt.beginPath()
    nvxCtxt.moveTo(centerX, centerY);
    nvxCtxt.arc(
        centerX, 
        centerY, 
        radiusInt*2, 
        Math.acos(ecartShadow/2), 
        -Math.acos(ecartShadow/2),
        true)  
    nvxCtxt.closePath();
    nvxCtxt.fillStyle = bgCol
    nvxCtxt.fill()
    
    //retirer quartier gauche 
    nvxCtxt.beginPath() 
    nvxCtxt.moveTo(
        centerX+ecartShadow*epRing*zoneNiveau.width/2*Math.cos(angShadow),
        centerY+ecartShadow*epRing*zoneNiveau.width/2*-1*Math.sin(angShadow));
    nvxCtxt.arc(
        centerX+ecartShadow*epRing*zoneNiveau.width/2*Math.cos(angShadow), 
        centerY+ecartShadow*epRing*zoneNiveau.width/2*-1*Math.sin(angShadow), 
        radiusInt*2, 
        Math.acos((-ecartShadow)/2), 
        -Math.acos((-ecartShadow)/2),
        false)      
    nvxCtxt.closePath();
    nvxCtxt.fillStyle = bgCol
    nvxCtxt.fill()
 
    
    animationState += 1

    if (animationState<animMaxFrame){
        requestAnimationFrame(()=>{backgroundChange(bgCol, animationState, ringCol)})
    }

}
}

function getShadowcolor(col,fonceur){
    const match =col.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+(\.\d+)?)\)$/);

    // Extract the RGBA components
    const [, r, g, b, a] = match;

    // Reduce the intensity of each component to make it darker
    const darkenedR = Math.max(0, r - fonceur); 
    const darkenedG = Math.max(0, g - fonceur); 
    const darkenedB = Math.max(0, b - fonceur); 

    const newCol = `rgba(${darkenedR}, ${darkenedG}, ${darkenedB}, ${a})`;
    return newCol
}


// Gestion des niveaux 
function loadNvx(event){
    switch(event.target.innerHTML){
        case "Je vais sonder tes souvenirs" :
            console.log("load")
            createLvl()
            loadScript(scripts[1],()=>{load()})
            break
    }
}




