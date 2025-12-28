/*
==========================================================
  TEACHER DEMO – "The Last Light"
  Game Development & Design – HARTS High School
  Demonstration: How to build a 5-scene branching story
==========================================================
  PURPOSE:
  • Show students how each function and scene connects
  • Demonstrate structure, flow, and restart functionality
  • Model good commenting and naming habits
==========================================================
*/

/* --------------------------------------------------------
   STEP 1 – GAME INFORMATION
   --------------------------------------------------------
   The variables below store the game’s name and creator.
   You can display them in your HTML (optional).
--------------------------------------------------------- */

let gameName = "The Last Light";
let creator = "Mr. Davis (Sample Game)";

// OPTIONAL: If your HTML file has spans with these IDs, 
// the next lines will display the info on-screen.
let gameNameContainer = document.getElementById("gameNameContainer");
if (gameNameContainer) gameNameContainer.textContent += gameName;

let NameContainer = document.getElementById("NameContainer");
if (NameContainer) NameContainer.textContent += creator;

/* --------------------------------------------------------
   STEP 2 – CREATE A NEW GAME ENGINE INSTANCE
   --------------------------------------------------------
   This line activates the Mastery Coding Text Game Engine.
   Without it, no text, images, or buttons can appear.
--------------------------------------------------------- */

const ng = new TextGameEngine();

/* --------------------------------------------------------
   STEP 3 – START FUNCTION
   --------------------------------------------------------
   The Start() function controls the very first screen.
   • It displays the opening text, image, and music.
   • It gives the player their first choices.
   • The choices link to other scenes using ng.setScene().
--------------------------------------------------------- */

let Start = function() {

  // Adjust text speed (smaller = faster)
  ng.characterDelay = 25;

  // Optional: change text color and font
  ng.setStyles("white", "Determination");

  // Opening text: short and descriptive
  ng.setText(
    "You wake up at the edge of a silent forest as the sun begins to set. " +
    "A single lantern flickers between the trees."
  );

  // Background image (must be inside your Images folder)
  ng.setImage("Images/forest-edge.png");

  // Background audio (optional, must exist in your Audio folder)
  ng.setAudio("Audio/Music/ambient-forest.mp3");

  // The first choices players see
  // Each choice calls a new Scene using an arrow function.
  ng.setOptions([
    new GameOption("STEP INTO THE TREES", () => ng.setScene(Forest_Path)),
    new GameOption("FOLLOW THE ROAD",     () => ng.setScene(Roadside))
  ]);
};

/* --------------------------------------------------------
   STEP 4 – DEFINE ALL SCENES
   --------------------------------------------------------
   Each scene is an object created with new Scene({ ... })
   Every scene includes:
     • text      – what happens
     • image     – background picture
     • audio     – optional sound/music
     • options[] – buttons that lead to other scenes
--------------------------------------------------------- */

/* ---------- Scene 1: Forest_Path ---------- */
let Forest_Path = new Scene({
  text:
    "Branches crunch under your feet as you step into the forest. " +
    "The lantern light bobs deeper between the trees, just out of reach.",
  image: "Images/forest-path.png",
  audio: "Audio/Music/forest-rumble.mp3",
  options: [
    // Two possible routes: toward cabin or back to road
    new GameOption("CHASE THE LANTERN",     () => ng.setScene(Cabin_Clearing)),
    new GameOption("TURN BACK TO THE ROAD", () => ng.setScene(Roadside))
  ]
});

/* ---------- Scene 2: Cabin_Clearing ---------- */
let Cabin_Clearing = new Scene({
  text:
    "The trees open into a small clearing. A tiny cabin sits ahead, " +
    "its window glowing with warm light. The lantern now rests by the door.",
  image: "Images/cabin-clearing.png",
  audio: "Audio/Music/cabin-wind.mp3",
  options: [
    new GameOption("KNOCK ON THE DOOR", () => ng.setScene(Escape_Ending)),
    new GameOption("HIDE AND WATCH",    () => ng.setScene(Lost_Ending))
  ]
});

/* ---------- Scene 3: Roadside ---------- */
let Roadside = new Scene({
  text:
    "You follow the cracked road. The forest looms on one side, empty fields on the other. " +
    "The lantern’s glow fades behind you.",
  image: "Images/roadside.png",
  audio: "Audio/Music/low-drum.mp3",
  options: [
    new GameOption("GO BACK TO THE FOREST",      () => ng.setScene(Forest_Path)),
    new GameOption("KEEP WALKING INTO THE DARK", () => ng.setScene(Lost_Ending))
  ]
});

/* ---------- Scene 4: Escape_Ending (Good Ending) ---------- */
let Escape_Ending = new Scene({
  text:
    "An old woman opens the door, surprised to see you. She pulls you inside " +
    "just as the wind howls. 'You should not wander here alone,' she says. " +
    "You’re safe… for tonight.",
  image: "Images/cabin-inside.png",
  audio: "Audio/Music/soft-piano.mp3",
  options: [
    // Restart option resets the entire game
    new GameOption("START OVER", () => Start())
  ]
});

/* ---------- Scene 5: Lost_Ending (Bad/Mystery Ending) ---------- */
let Lost_Ending = new Scene({
  text:
    "You wait in the shadows as the lantern flickers out. The forest grows darker, " +
    "the road disappears, and the night presses in. Somewhere in the distance, " +
    "a door closes.",
  image: "Images/forest-dark.png",
  audio: "Audio/Music/creepy-drones.mp3",
  options: [
    // Restart option brings player back to title screen
    new GameOption("START OVER", () => Start())
  ]
});

/* --------------------------------------------------------
   STEP 5 – RUN THE GAME
   --------------------------------------------------------
   These two lines must always stay at the bottom.
   • Start() loads the first screen immediately.
   • ng.render() displays text, images, and options.
--------------------------------------------------------- */

Start();
ng.render();

/* ========================================================
   CHECKLIST – TEACHER REFERENCE
   ========================================================
   ✅ const ng = new TextGameEngine();
   ✅ Start() function sets text, image, audio, and options
   ✅ 5 total scenes (3 active + 2 endings)
   ✅ 2 different endings (good / bad)
   ✅ All scenes connected with logical flow
   ✅ Images & audio (replace paths as needed)
   ✅ Player can restart from either ending
   ✅ No syntax or console errors
===========================================================
   TEACHING NOTE:
   • Each Scene object = one box in their flowchart.
   • Encourage descriptive but concise text (2–3 sentences).
   • Use “START OVER” as required restart logic.
   • Students should check their console for typos in scene names.
===========================================================
*/
