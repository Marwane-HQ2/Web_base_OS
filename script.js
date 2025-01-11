// TIME
updateTime()
function updateTime () {
    let time = new Date().toLocaleString()
    let timeTag = document.getElementById('time')
    timeTag.innerHTML = time
}
setInterval(updateTime, 1000)

// FAIRE GLISSER LA FENÊTRE

let welcomeWindow = document.getElementById("welcome")
let notepadWindow = document.getElementById("notepad")
let notepadCreateNoteWindow = document.getElementById("notepad-create-note")
let browserWindow = document.getElementById("browser")
let projectsWindow = document.getElementById("project")
let vaultWindow = document.getElementById('vault')

// Make the DIV element draggable:
// OK
dragElement(welcomeWindow)
dragElement(notepadWindow)
dragElement(notepadCreateNoteWindow)
dragElement(browserWindow)
dragElement(projectsWindow)
dragElement(vaultWindow)

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
    console.log(element)
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


// OK
addWindowTapHandling(welcomeWindow)
addWindowTapHandling(notepadWindow)
addWindowTapHandling(notepadCreateNoteWindow)
addWindowTapHandling(browserWindow)
addWindowTapHandling(projectsWindow)
addWindowTapHandling(vaultWindow)


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
