let isGrabbing = false
let isGrabbed = ""

function load() {
    nvxCtxt.clearRect(0,0,canvasNiveau.width,canvasNiveau.height)
    const pts = [
        [canvasNiveau.width/2,canvasNiveau.height/2,"p1"],
        [canvasNiveau.width/3,canvasNiveau.height/3,"p2"],
        [canvasNiveau.width/2,2*canvasNiveau.height/3,"p3"]
    ]
    // drawPoint([20,20],"rgba(0,255,0,1)")
    pts.forEach(element => {
        drawPoint(element,"rgba(0,255,0,1)")
    });
    drawPoligone(pts,"rgba(0,255,255,1)")
}

function drawPoligone(pts,col){
    nvxCtxt.beginPath()
    nvxCtxt.moveTo(pts[0][0], pts[0][1])
    
    for (let i = 1; i < pts.length; i++) {
        nvxCtxt.lineTo(pts[i][0], pts[i][1]);
    }

    nvxCtxt.closePath()
    nvxCtxt.strokeStyle = col
    nvxCtxt.lineWidth = 2
    nvxCtxt.stroke()
}


function redrawPolygone() {
    nvxCtxt.clearRect(0,0,canvasNiveau.width,canvasNiveau.height)
    let pts = document.getElementsByClassName("point")
    let pts2=[]

    for (let i=0; i<pts.length;i++){
        pts2[i] = []
        pts2[i][0]= parseInt(pts[i].style.left)
        pts2[i][1]= parseInt(pts[i].style.top)
        pts2[i][2] = pts[i].id
    }
    drawPoligone(pts2,"rgba(0,255,255,1)")
}

function drawPoint(x,col){
    let point = document.createElement("div")
    point.className = "point"
    point.id = x[2]
    point.style.left = x[0]+"px"
    point.style.top = x[1]+"px"
    point.style.backgroundColor = col
    zoneNiveau.appendChild(point)
    point.style.zIndex = "1"
    point.addEventListener("mousedown",(event)=>grab(event,point))
    point.addEventListener("mouseup",(event)=>grab(event,point))
    
}

document.addEventListener("mouseup",grab)

function grab(event,point) {

    if(event.type == "mousedown"){
        isGrabbing = true;
        isGrabbed = point
        document.addEventListener("mousemove", (event)=>movePoint(event,isGrabbed))
    }else{
        isGrabbing=false;
        document.removeEventListener("mousemove",(event)=> movePoint(event,isGrabbed))
    }    
}

function movePoint(event,isGrabbed) {
    if(isGrabbing){
        isGrabbed.style.left = parseFloat(event.clientX)+"px"
        isGrabbed.style.top = parseFloat(event.clientY)+"px"
        redrawPolygone()
    }else{

    }
}


