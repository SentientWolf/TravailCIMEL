
let boolBlocQst = [false]
boolBlocQst[1]=false


function question0(){ 
    const blocQuestion = document.createElement("div")
    blocQuestion.className = "blocText"
    zoneDialogue.appendChild(blocQuestion)

    const question = document.createElement("div")
    question.className ="bteDialogue"
    question.style.width = 350+"px"
    question.innerHTML = "Ô Dieu !"
    blocQuestion.appendChild(question)
    setTimeout(()=>{
        question.innerHTML = "Ô Dieu ! <br><br> Être tout puissant !"
        setTimeout(()=>{
            question.innerHTML = "Ô Dieu ! <br><br> Être tout puissant ! <br><br> J'ai besoin de ton aide."
            setTimeout(()=>{
                reponse0();
            },1100*Tps)
        },750*Tps)
    },1000*Tps)
}

function reponse0(){
    const reponses = ["De quoi as tu besoin ?","Va mourrir"]
    const fonction = question0_1
    etape = 0
    repondre(reponses,fonction)

}

function question0_1(event){
    const reponses = ["De quoi as tu besoin ?","Va mourrir"]
    const questions = ["Je viens de mourrir je crois. <br>J'aimerai me souvenir de qui j'étais sur Terre","Je crois bien que c'est déjà le cas. <br>Et je ne re rappelle pas de qui j'étais."]
    const fonction = reponse0_1
    etape=0
    questioner(reponses,questions,event,fonction)

}

function reponse0_1(){
    const reponses = ["Je vais sonder tes souvenirs"]
    const fonction = loadNvx
    etape = 1
    repondre(reponses,fonction)
}


