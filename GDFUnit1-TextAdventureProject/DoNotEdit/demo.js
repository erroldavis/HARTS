/*
==========================================================
TEACHER SAMPLE – Text Adventure Template Example
Game Development & Design – HARTS High School
==========================================================
This file shows students what their code should look like 
once they fill in all parts of the blank template.
==========================================================
*/

/*
STEP 0 – GAME INFO
Enter the name of your game and the creator names.
*/
let gameName = "The Last Light";
let creator = "Mr. Davis (Sample Game)";

/*
Displays your game name and creator in the HTML (if available).
*/
let gameNameContainer = document.getElementById("gameNameContainer");
if (gameNameContainer) gameNameContainer.textContent += gameName;

let NameContainer = document.getElementById("NameContainer");
if (NameContainer) NameContainer.textContent += creator;


/* --------------------------------------------------------
STEP 1 – Create a new variable that will contain a new instance 
of the Text Game Engine. This activates your game logic.
--------------------------------------------------------- */
const ng = new TextGameEngine();


/* --------------------------------------------------------
STEP 2 – Create a function named Start that will run 
when the player starts the game.

Inside Start():
- Set text speed
- Show opening message, image, and audio
- Add at least one choice (GameOption)
--------------------------------------------------------- */
let Start = function() {
  // Text speed (smaller = faster)
  ng.characterDelay = 25;

  // Opening text
  ng.setText("You wake up at the edge of a dark forest. A faint light flickers in the distance.");

  // Optional visuals and sound
  ng.setImage("Images/forest-start.png");
  ng.setAudio("Audio/Music/forest.mp3");

  // Player choices – each leads to a new scene
  ng.setOptions([
    new GameOption("FOLLOW THE LIGHT", () => ng.setScene(ForestPath)),
    new GameOption("STAY WHERE YOU ARE", () => ng.setScene(Campfire))
  ]);
};


/* --------------------------------------------------------
STEP 3 – Add to the game by creating new Scenes. 
Each scene tells part of your story and connects to the next one.
--------------------------------------------------------- */

// Scene 1 – Forest Path
let ForestPath = new Scene({
  text: "You move deeper into the forest, branches crunching under your feet.",
  image: "Images/forest-path.png",
  audio: "Audio/Music/forest-rumble.mp3",
  options: [
    new GameOption("KEEP WALKING", () => ng.setScene(Cabin)),
    new GameOption("TURN BACK", () => ng.setScene(Campfire))
  ]
});

// Scene 2 – Campfire
let Campfire = new Scene({
  text: "You wait by the campfire. The night grows colder and quieter.",
  image: "Images/campfire.png",
  audio: "Audio/Music/fire.mp3",
  options: [
    new GameOption("SLEEP", () => ng.setScene(BadEnding)),
    new GameOption("CHANGE YOUR MIND", () => ng.setScene(ForestPath))
  ]
});

// Scene 3 – Cabin
let Cabin = new Scene({
  text: "You find a small cabin ahead. The door is slightly open.",
  image: "Images/cabin.png",
  audio: "Audio/Music/cabin-wind.mp3",
  options: [
    new GameOption("ENTER", () => ng.setScene(GoodEnding)),
    new GameOption("RUN AWAY", () => ng.setScene(BadEnding))
  ]
});

// Ending 1 – Good
let GoodEnding = new Scene({
  text: "An old woman opens the door and welcomes you inside. You are safe.",
  image: "Images/cabin-inside.png",
  audio: "Audio/Music/soft-piano.mp3",
  options: [
    new GameOption("START OVER", () => Start())
  ]
});

// Ending 2 – Bad
let BadEnding = new Scene({
  text: "The forest grows silent. You are never seen again.",
  image: "Images/forest-dark.png",
  audio: "Audio/Music/creepy-drones.mp3",
  options: [
    new GameOption("TRY AGAIN", () => Start())
  ]
});


/* --------------------------------------------------------
STEP 4 – Start the game
Do not delete or move these lines.
--------------------------------------------------------- */
Start();
ng.render();

/*
==========================================================
QUICK REFERENCE (TEACHER)
----------------------------------------------------------
✔ TextGameEngine created
✔ Start() function coded
✔ 3 scenes + 2 endings
✔ Restart options working
✔ Example images/audio included
==========================================================
SUGGESTED CLASS FLOW:
1. Show this file line by line on projector.
2. Explain each comment block.
3. Have students fill their blank template step-by-step.
==========================================================
*/
