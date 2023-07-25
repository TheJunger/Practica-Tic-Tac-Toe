const div0 = document.querySelector(".funo");
const div1 = document.querySelector(".fdos");
const div2 = document.querySelector(".ftres");
const div3 = document.querySelector(".suno");
const div4 = document.querySelector(".sdos");
const div5 = document.querySelector(".stres");
const div6 = document.querySelector(".tuno");
const div7 = document.querySelector(".tdos");
const div8 = document.querySelector(".ttres");

let cuadricula = [div0, div1, div2, div3, div4, div5, div6, div7, div8];
let cuadriculasUsadas = []
let turno = 1;
let cuadriculasPlayer = []
let cuadriculasCpu = []

const IDBrequest = indexedDB.open("ticTacToe",1)

IDBrequest.addEventListener("upgradeneeded", ()=>{
  const db = IDBrequest.result;
  db.createObjectStore("player",{
      autoIncrement: true
  })
  db.createObjectStore("cpu",{
      autoIncrement: true
  })
})

IDBrequest.addEventListener("success", ()=>{
  console.log("La base de datos se ha creado correctamente")
  firstPlay()
})

const addVictoriasPlayer = objeto =>{
  const db = IDBrequest.result;
  const IDBtransaccion = db.transaction("player","readwrite")
  const objectStore = IDBtransaccion.objectStore("player")
  objectStore.add(objeto)
  IDBtransaccion.addEventListener("complete", ()=>{
      console.log("Victorias Player agregado Correctamente")
  })
}

const addVictoriasCpu = objeto =>{
  const db = IDBrequest.result;
  const IDBtransaccion = db.transaction("cpu","readwrite")
  const objectStore = IDBtransaccion.objectStore("cpu")
  objectStore.add(objeto)
  IDBtransaccion.addEventListener("complete", ()=>{
      console.log("Victorias CPU agregado Correctamente")
  })
}

let firstPlay = () =>{
  const db = IDBrequest.result;
  let IDBtransactionPlayer = db.transaction("player", "readonly");
  let IDBtransactionCpu = db.transaction("cpu", "readonly");
  let objectStorePlayer = IDBtransactionPlayer.objectStore("player"); 
  let objectStoreCpu = IDBtransactionCpu.objectStore("cpu");
  let Playercount = objectStorePlayer.count();
  let CpuCount = objectStoreCpu.count();

  Playercount.onsuccess = () =>{
    if (Playercount.result < 1){
        addVictoriasPlayer({player : 0})
        console.log(Playercount.result);
    }
  }
  CpuCount.onsuccess = () =>{
    if (CpuCount.result < 1){
        addVictoriasCpu({cpu : 0})
        console.log(CpuCount.result);
    }
  }
  leerVictorias()
}

const leerVictorias = () =>{
  const db = IDBrequest.result; 
  const IDBtransactionPlayer = db.transaction("player","readonly");
  const IDBtransactionCpu = db.transaction("cpu","readonly");
  const objectStorePlayer = IDBtransactionPlayer.objectStore("player")
  const objectStoreCpu = IDBtransactionCpu.objectStore("cpu")
  const cursorPlayer = objectStorePlayer.openCursor();
  const cursorCpu = objectStoreCpu.openCursor();
  cursorPlayer.addEventListener("success", () =>{
      if(cursorPlayer.result) {
          console.log(cursorPlayer.result.key);
          if (cursorPlayer.result.key == 1){
              let vicPlayer = document.querySelector(".vplayer")
              let playerWins = parseInt(cursorPlayer.result.value.player);
              vicPlayer.textContent = playerWins;
              console.log(playerWins)
              console.log("texto title leido")
          }
          cursorPlayer.result.continue();
        }
      else {
          console.log("todos los datos tipo player fueron leidos")
      }
  })
  cursorCpu.addEventListener("success", () =>{
    if(cursorCpu.result) {
      console.log(cursorCpu.result.key);
      if (cursorCpu.result.key == 1){
          let vicCpu = document.querySelector(".vcpu")
          let cpuWins = parseInt(cursorCpu.result.value.cpu);
          vicCpu.textContent = cpuWins;
          console.log(cpuWins)
          console.log("texto title leido")
      }
      cursorCpu.result.continue();
    }
  else {
      console.log("todos los datos tipo cpu fueron leidos")
  }
  })
}

const newVictoryPlayer = (key,objeto)=>{
  const db = IDBrequest.result; 
  const IDBtransaction = db.transaction("player","readwrite");
  const objectStore = IDBtransaction.objectStore("player")
  const cursor = objectStore.openCursor();
  objectStore.put(objeto,key)
  IDBtransaction.addEventListener("complete", ()=>{
      title = document.querySelector(".vplayer")
      title.textContent = cursor.result.value.player;
      console.log(cursor.result.value.player)
      //history.go()
  })
}

const newVictoryCpu = (key,objeto)=>{
  const db = IDBrequest.result; 
  const IDBtransaction = db.transaction("cpu","readwrite");
  const objectStore = IDBtransaction.objectStore("cpu")
  const cursor = objectStore.openCursor();
  objectStore.put(objeto,key)
  IDBtransaction.addEventListener("complete", ()=>{
      title = document.querySelector(".vcpu")
      title.textContent = cursor.result.value.cpu;
      console.log(cursor.result.value.cpu)
      //history.go()
  })
}

const numeroRandom = () => {
  numRand = Math.random() * 8;
  numRound = Math.round(numRand);
  numFinal = Math.floor(numRound);
};

cuadricula.forEach(
    obj => obj.addEventListener("click", (e)=>{
      if (turno == 1){
        if(e.target.classList[2] == "posible"){
          console.log(e.target.classList[0])
          e.target.innerHTML = '<i class="cross fa-regular fa-x"></i>';
          e.target.classList.remove("posible")
          cuadriculasPlayer.push(e.target.classList[0])
          console.log(cuadriculasPlayer)
          turno--
          nextTurn()
        }
        else{
          console.log("imposible agregar ahi")
        }
      }
      else{
        console.log("Turno no es 1, turno : " + turno)
      }
    })
)

let drawCpu = (num) =>{
  if(turno == 0){
    cuadricula[num].innerHTML = '<i class="circle fa-regular fa-circle"></i>';
    cuadricula[num].classList.remove("posible")
    cuadriculasCpu.push(cuadricula[num].classList[0])
    checkVictory()
    turno++
  }
}
intento = 0
let eventCpu = () =>{
  numeroRandom()
  if (cuadricula[numFinal].classList[2] == "posible"){
    drawCpu(numFinal)
    intento = 0
  }
  else{
    turno = 0
    intento++
    if (intento < 25){
      nextTurn()
      console.log("turno reiniciado")
    }
  }
}

let ganador = (player,n1,n2,n3) =>{
  if(player == "player"){
    console.log("player ha ganado")
    n1.style.backgroundColor = "green"
    n2.style.backgroundColor = "green"
    n3.style.backgroundColor = "green"
    let ptext = document.querySelector(".vplayer").textContent
    let centText = document.querySelector(".centerText")
    centText.style.color = "rgb(58, 218, 58)"
    centText.textContent = "Player Wins"
    turno = "Player Ganador"
    let titleDivAdd = document.querySelector(".titleDiv")
    titleDivAdd.classList.add("titleDivWinPlayer")
    titleDivAdd.addEventListener("mouseenter", (e)=>{
      console.log("mouse enter")
      centText.textContent = "Play Again"
      e.preventDefault()
    })
    titleDivAdd.addEventListener("click", ()=>{
      history.go()
    })
    newVictoryPlayer(1,{player : parseInt(ptext)+1})
  }
  if(player == "cpu"){
    console.log("cpu ha ganado")
    n1.style.backgroundColor = "red"
    n2.style.backgroundColor = "red"
    n3.style.backgroundColor = "red"
    let ctext = document.querySelector(".vcpu").textContent
    let centText = document.querySelector(".centerText")
    centText.style.color = "rgb(250, 103, 103)"
    centText.textContent = "Cpu Wins - Reset"
    turno = "Cpu Ganador"
    let titleDivAdd = document.querySelector(".titleDiv")
    titleDivAdd.classList.add("titleDivWinCpu")
    titleDivAdd.addEventListener("mouseenter", (e)=>{
      console.log("mouse enter")
      centText.textContent = "Play Again"
      e.preventDefault()
    })
    titleDivAdd.addEventListener("click", ()=>{
      history.go()
    })

    newVictoryCpu(1,{cpu : parseInt(ctext)+1})
  }
}

let checkVictory = () =>{
  if(cuadriculasPlayer.includes("funo") && cuadriculasPlayer.includes("fdos") && cuadriculasPlayer.includes("ftres")){
    ganador("player",div0,div1,div2)
  }
  if(cuadriculasPlayer.includes("suno") && cuadriculasPlayer.includes("sdos") && cuadriculasPlayer.includes("stres")){
    ganador("player",div3,div4,div5)
  }
  if(cuadriculasPlayer.includes("tuno") && cuadriculasPlayer.includes("tdos") && cuadriculasPlayer.includes("ttres")){
    ganador("player",div6,div7,div8)
  }
  if(cuadriculasPlayer.includes("funo") && cuadriculasPlayer.includes("suno") && cuadriculasPlayer.includes("tuno")){
    ganador("player",div0,div3,div6)
  }
  if(cuadriculasPlayer.includes("fdos") && cuadriculasPlayer.includes("sdos") && cuadriculasPlayer.includes("tdos")){
    ganador("player",div1,div4,div7)
  }
  if(cuadriculasPlayer.includes("ftres") && cuadriculasPlayer.includes("stres") && cuadriculasPlayer.includes("ttres")){
    ganador("player",div2,div5,div8)
  }
  if(cuadriculasPlayer.includes("funo") && cuadriculasPlayer.includes("sdos") && cuadriculasPlayer.includes("ttres")){
    ganador("player",div0,div4,div8)
  }
  if(cuadriculasPlayer.includes("ftres") && cuadriculasPlayer.includes("sdos") && cuadriculasPlayer.includes("tuno")){
    ganador("player",div2,div4,div6)
  }

  if(cuadriculasCpu.includes("funo") && cuadriculasCpu.includes("fdos") && cuadriculasCpu.includes("ftres")){
    ganador("cpu",div0,div1,div2)
  }
  if(cuadriculasCpu.includes("suno") && cuadriculasCpu.includes("sdos") && cuadriculasCpu.includes("stres")){
    ganador("cpu",div3,div4,div5)
  }
  if(cuadriculasCpu.includes("tuno") && cuadriculasCpu.includes("tdos") && cuadriculasCpu.includes("ttres")){
    ganador("cpu",div6,div7,div8)
  }
  if(cuadriculasCpu.includes("funo") && cuadriculasCpu.includes("suno") && cuadriculasCpu.includes("tuno")){
    ganador("cpu",div0,div3,div6)
  }
  if(cuadriculasCpu.includes("fdos") && cuadriculasCpu.includes("sdos") && cuadriculasCpu.includes("tdos")){
    ganador("cpu",div1,div4,div7)
  }
  if(cuadriculasCpu.includes("ftres") && cuadriculasCpu.includes("stres") && cuadriculasCpu.includes("ttres")){
    ganador("cpu",div2,div5,div8)
  }
  if(cuadriculasCpu.includes("funo") && cuadriculasCpu.includes("sdos") && cuadriculasCpu.includes("ttres")){
    ganador("cpu",div0,div4,div8)
  }
  if(cuadriculasCpu.includes("ftres") && cuadriculasCpu.includes("sdos") && cuadriculasCpu.includes("tuno")){
    ganador("cpu",div2,div4,div6)
  }
}
 
let nextTurn = () =>{
  checkVictory()
  if(turno == 0){
    eventCpu()
  }
}

