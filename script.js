// TIME
updateTime()
function updateTime () {
    let time = new Date().toLocaleString()
    let timeTag = document.getElementById('time')
    timeTag.innerHTML = time
}
setInterval(updateTime, 1000)

// FAIRE GLISSER LA FENÊTRE

// let welcomeWindow = document.getElementById("welcome")
// let notepadWindow = document.getElementById("notepad")
// let projectsWindow = document.getElementById("project")
// let vaultWindow = document.getElementById('vault')
// let browserWindow = document.getElementById("browser")

let notepadCreateNoteWindow = document.getElementById("notepad-create-note")



// Make the DIV element draggable:

for (bal of document.querySelectorAll(".window")) {
  dragElement(bal)
}

// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// OUVRIR ET FERMER LES FENÊTRES
function closeWindow (element) {
    element.style.display = "none"
}

function openWindow (element) {
    element.style.display = ""
    biggestIndex += 1
    element.style.zIndex = biggestIndex
}

// APPLICATIONS POUR OUVRIR LES FENÊTRES
let selectedIcon = null

function selectIcon (element) {
    if (selectedIcon) {
      deselectIcon(selectedIcon)
    }
    element.classList.add("selected")
    selectedIcon = element
}

function deselectIcon (element) {
  element.classList.remove("selected")
  selectedIcon = null
}

function handleIconTap (element, window) {
  if (element.classList.contains("selected")) {
    deselectIcon(element)
    openWindow(window)
  }
  else {
    selectIcon(element)
  }
}

// EVITER LE CHEVAUCHEMENT DES FENÊTRES
let biggestIndex = 1
function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () => {
    handleWindowTap(element)
  })
}

function handleWindowTap (element) {
  biggestIndex += 1
  element.style.zIndex = biggestIndex
}


for (bal of document.querySelectorAll(".window")) {
  addWindowTapHandling(bal)
}

// NOTEPAD NOTES
let notes =  [
  {
    title: "Welcome note",
    content: `A note left here just meant to say hi. \n\n\n\n\n\n\n\nHi.\nTask completed, let's eat cookies...`,
  },
  {
    title: "About me",
    content: `I'm not going to introduce myself so just keep browsing the notes and maybe something will catch your attention ❤`,
  },
  {
    title: "I used to f$:*^£% hate CSS",
    content: `Now it just became<em>annoying</em>... \n<a href="https://flukeout.github.io/" target="_blank">CSS Dinner</a>`,
  },
  {
    title: "Fonts",
    content:`<span>I love fonts, <span id="s-i-l-t">Shadows Into Light Two</span>just perfectly matches with <span id="silk">Silkscreen.</span>\n
Let's just put all my favorite fonts here...\n<ul><li><span id="indie">Indie Flower</span></li>
<li><span id="tange">Tangerine</span></li>
<li><span id="shant">Shantel Sans</span></li>
<li><span id="couri">Courier New</span></li>
</ul></span>
`
  }, 
  {
    title: "(Untitled-1)",
    content: `REMEMBER TO STAY HYDRATED`,
  },
  {
    title: "(Untitled-2)",
    content: `Bip bop bip bop`,
  },
  {
    title: "(Untitled-3) 🔒",
    content: `This project is awesome because around 98% of this website is made of divs, 
and 100% of this website is made with ❤\n Well... maybe not a<a href="https://jams.hackclub.com/batch/webOS" target="_blank">100%</a>!`,
    funct: () =>  {
        document.getElementById("note-content").contentEditable = false
    } ,
  },
  {
    title: "Relax 🔒",
    content: `I remember when I was around 9 or 10 watching TV when Mika's song "Relax" played on TV, I loved this song because the vibe 
was crazy, I mean everytime I could hear it since this day I would stop, dance a bit and keep doing my business. Later, I knew Mika wrote
 this song because the subway was evacuated due to an attack, and he felt affraid and confused...\n
Today, I ask myself if listenning to this song can help people relax and focus on things that matters, because it does help me.\n
In my opinion, taking a 4 minutes break to relax is way better use of time than panicking and losing control, so relax ❤`,
  funct: () =>  {
    document.getElementById("note-content").contentEditable = false
  } ,
  },
]

function displayNote (note) {
  document.getElementById("note-title").innerHTML = note.title
  document.getElementById("note-content").innerHTML = note.content
  if (note.funct) {
    note.funct()
  }
  else {
    document.getElementById("note-content").contentEditable = true
  }
}

displayNote(notes[0])

// CREER NOTES
function createNote() {
  notepadCreateNoteWindow.style.display = ""
  biggestIndex += 1
  notepadCreateNoteWindow.style.zIndex = biggestIndex
}

function saveNote(event) {
  event.preventDefault()
  let title = document.getElementById("title").value
  let note = document.getElementById("note-textarea").value
  if (title == "") {
    title = "Untitled"
  }
  if (note == "") {
    note = "No content here"
  }
  notes.push(
    {
      title: title,
      content: note,
    }
  )
  let noteIndex = notes.length - 1
  let fileDiv = document.getElementById("files")
  let element = document.createElement("p")
  element.classList.add("note-file")
  element.onclick = () => {displayNote(notes[noteIndex])}
  element.innerText = title
  fileDiv.appendChild(element)
  
  closeWindow(notepadCreateNoteWindow)
}

// BROWSER
function search() {
  let search = document.getElementById('search').value
  if (search == "") {
    search = "Who is JSON ?"
  }
  window.open(`https://www.google.com/search?q=${search}`, "_blank")
}


// VAULT

function pinCodeCheck () {
  let pin = document.getElementById('input-code-pin').value
  if (pin === "1234") {
    document.getElementById('vault-access').style.display = "none"
    document.getElementById('vault-inside').style.display = ""
  }
  else {
    if (document.getElementById('pin-hint').style.visibility === "visible") {
      document.getElementById('input-code-pin').value = "1234"
    }
    else {
      document.getElementById('pin-hint').style.visibility = "visible"
    }
  }
}

// PIANO.EXE
Tone.start()


const synth = new Tone.Synth().toDestination();

const piano = document.getElementById("piano")
const table_notes = [261, 277, 311, 329, 349, 369, 415, 440, 466, 493]
const table_notes_name = ['do', 're', 'mi', 'fa', 'sol', 'la', 'si', 'do_', 're_', 'l']
const touches_notes = {
    "Q": 0,
    "S": 1,
    "D": 2,
    "F": 3,
    "G": 4,
    "H": 5,
    "J": 6,
    "K": 7,
    "L": 8,
    "M": 9
}

play_functions = []
stop_functions = []

for (let i=0; i < table_notes.length;i++) {
    let element = document.createElement("div")
    element.classList = "tile"
    element.id = `tile${i+1}`
    element.innerHTML = `Tile ${i+1}`
    let play_tile = function () {
        synth.triggerAttack(table_notes[i])
        element.style.backgroundColor = "#547951"
    }
    let stop = function () {
        synth.triggerRelease()
        element.style.backgroundColor = "#7cff70ad"
    }

    play_functions.push(play_tile)
    stop_functions.push(stop)
    
    element.addEventListener("pointerdown", play_tile)
    element.addEventListener("pointerup", stop)
    

    piano.appendChild(element)
}

let key_down = function (event) {
    e = event.key.toUpperCase()
    if (!touches_notes[e] && !(touches_notes[e] === 0)) {return}
    if (e) {
        synth.triggerAttack(table_notes[touches_notes[e]])
        element = document.getElementById(`tile${touches_notes[e]+1}`)
        element.style.backgroundColor = "#547951"
    }

}

let key_up = function (event) {
    synth.triggerRelease()
    e = event.key.toUpperCase()
    if (touches_notes[e] || touches_notes[e] === 0) {
        element = document.getElementById(`tile${touches_notes[e]+1}`)
        element.style.backgroundColor = "#7cff70ad"
    }
    
}
let idKeyDown
let idKeyUp

function addKeysEventListener () {
  idKeyDown = document.body.addEventListener("keydown", key_down)
  idKeyUp = document.body.addEventListener("keyup", key_up)
}

function removeKeysEventListener () {
  document.body.removeEventListener("keydown", key_down)
  document.body.removeEventListener("keyup", key_up)
}

// MODIFIER LA NOTE 
let list_tiles = piano.children

function change_note() {
    for (let i=0; i<list_tiles.length; i++) {
        child = list_tiles[i]
        child.removeEventListener("pointerdown", play_functions[i])
        child.removeEventListener("pointerup", stop_functions[i])
        
        let play_tile = function () {
            synth.triggerAttack(table_notes[i])
            list_tiles[i].style.backgroundColor = "#547951"
        }
        let stop = function () {
            synth.triggerRelease()
            list_tiles[i].style.backgroundColor = "#7cff70ad"
        }

        child.addEventListener("pointerdown", play_tile)
        child.addEventListener("pointerup", stop)

        play_functions[i] = play_tile
        stop_functions[i] = stop
    }
    document.body.removeEventListener("keydown", key_down)
    document.body.removeEventListener("keyup", key_up)

    key_down = function (event) {
        e = event.key.toUpperCase()
        if (touches_notes[e] || touches_notes[e] == 0) {
            synth.triggerAttack(table_notes[touches_notes[e]])
            element = document.getElementById(`tile${touches_notes[e]+1}`)
            element.style.backgroundColor = "#547951"
        }
    }

    key_up = function (event) {
        synth.triggerRelease()
        e = event.key.toUpperCase()
        if (touches_notes[e] || touches_notes[e] == 0) {
            element = document.getElementById(`tile${touches_notes[e]+1}`)
            element.style.backgroundColor = "#7cff70ad"
        }
    }
    document.body.addEventListener("keydown", key_down)
    document.body.addEventListener("keyup", key_up)
}

let clock
let hoursInput = document.getElementById("hours")
let minutesInput = document.getElementById("minutes")

hoursInput.addEventListener("input", () => {
  if (hoursInput.value > 12) {
    hoursInput.value = 12
  }
})

minutesInput.addEventListener("input", () => {
  if (minutesInput.value > 59) {
    minutesInput.value = 59
  }
})

function createFocusTimer () {
  clearInterval(clock)
  
  let minutes = minutesInput.value
  let hours = hoursInput.value
  let seconds = "00"
  
  for (let b of document.querySelectorAll(".setting-timer")) {
    b.style.display = "none"
  }
  document.getElementById("running-timer").style.display = ""
  
  document.getElementById("hour-timer").innerHTML = hours
  document.getElementById("minute-timer").innerHTML = minutes
  document.getElementById("second-timer").innerHTML = seconds

  clock = setInterval(() => {
    if (seconds > 0) {
      seconds--
    }
    else if (minutes > 0) {
      minutes--
      seconds = 59
    }
    else if (hours > 0) {
        hours--
        minutes = 59
        seconds = 59
    }
    else {
      timeIsUp()
      document.getElementById('time-is-up').showModal()
      clearInterval(clock)
    }
    if (hours < 10 && hours.length < 1) {
      document.getElementById("hour-timer").innerHTML = `0${hours}`
    } else {
      document.getElementById("hour-timer").innerHTML = hours
    }
    
    if (minutes < 10 && minutes.length < 1) {
      document.getElementById("minute-timer").innerHTML = `0${minutes}`
    } else {
      document.getElementById("minute-timer").innerHTML = minutes
    }

    if (seconds < 10) {
      document.getElementById("second-timer").innerHTML = `0${seconds}`
    } else {
          document.getElementById("second-timer").innerHTML = seconds
    }
  }, 1000) // TOUTES LES 60 SECONDES = 60 000 millisecondes
}

function timeIsUp () {
  console.log("Time's up !")
  resetTimer()
}

function resetTimer () {
  clearInterval(clock)
  document.getElementById("running-timer").style.display = "none"
  for (let b of document.querySelectorAll(".setting-timer")) {
    b.style.display = ""
  }
}

// CLOCK

const secondHand = document.querySelector(".second-hand");
const minHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");

function setDate() {
 	const currentTime = new Date();

	const seconds = currentTime.getSeconds();
	const secondDeg = ((seconds / 60) * 360) + 90;
	secondHand.style.transform = `rotate(${secondDeg}deg)`;

	const mins = currentTime.getMinutes();
	const minsDeg = ((mins / 60) * 360) + 90;
	minHand.style.transform = `rotate(${minsDeg}deg)`;

	const hours = currentTime.getHours();
	const hoursDeg = ((hours / 12) * 360) + 90;
	hourHand.style.transform = `rotate(${hoursDeg}deg)`;

	if(seconds == 0){
		secondHand.style.transitionDuration = '0s';
		minHand.style.transitionDuration = '0s';
		hourHand.style.transitionDuration = '0s';
	} else {
		secondHand.style.transitionDuration = '0.05s';
		minHand.style.transitionDuration = '0.05s';
		hourHand.style.transitionDuration = '0.05s';
	}
	
	requestAnimationFrame(setDate);
}

setDate()
