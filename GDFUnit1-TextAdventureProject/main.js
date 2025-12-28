/*
Enter the name of your game into the string assigned to the gameName variable. 
Enter your name and the name of any collaborators into the string assigned to the creator variable. 
*/
let gameName = "Completed Example";
let creator = "Student's Work";

/*
The lines below display your game name and creator 
in the HTML if those elements exist. 
Do not edit these lines.
*/
let gameNameContainer = document.getElementById("gameNameContainer");
gameNameContainer.textContent += gameName;

let NameContainer = document.getElementById("NameContainer");
NameContainer.textContent += creator;

/* --------------------------------------------------------
STEP 1 – Create a new variable that will contain a new instance 
of the Text Game Engine. 
This is what makes your game run.
Example: const ng = new TextGameEngine();
--------------------------------------------------------- */
const ng = new TextGameEngine();


/* --------------------------------------------------------
STEP 2 – Create a function named Start that will run 
when the player starts the game.

Inside this function:
1. Set your text speed: ng.characterDelay = 25;
2. Display your opening text with ng.setText("...");
3. (Optional) Add an image with ng.setImage("...");
4. (Optional) Add music or sound with ng.setAudio("...");
5. Add at least one GameOption to lead to your first Scene:
   ng.setOptions([ new GameOption("BEGIN", () => ng.setScene(FirstScene)) ]);
--------------------------------------------------------- */
let Start = function() {
  ng.characterDelay = 25;
  ng.setText("You walk in to a abandoned mall. It was filled with lost in touch and broken structure. It has became forgotten.");
  ng.setImage("Images/AbandonedMallImages/cloverleaf-mall-trees-inside.jpg");
  ng.setAudio("Audio/Music/l4d2deadcenterambience.mp3");
  ng.setOptions([
    new GameOption("EXPLORE INSIDE THE ABANDONED BUILDING", () => ng.setScene(AbandonedMall)),
    
  ]);
};
  


/* --------------------------------------------------------
STEP 3 – Add to the game by creating new Scenes. 

Each scene follows this format:
let SceneName = new Scene({
  text: "Describe what happens here.",
  image: "Images/example.png",
  audio: "Audio/Music/example.mp3",
  options: [
    new GameOption("Choice text", () => ng.setScene(NextScene))
  ]
});

Each ending must have a restart option:
new GameOption("START OVER", () => Start());
--------------------------------------------------------- */
let AbandonedMall = new Scene({
  text: "Inside of the abandoned mall, you see some of the lights are turned on. You see a room that is very dark, empty and blood coming out...?",
  image: "Images/AbandonedMallImages/door.png",
  audio: "Audio/Music/14 - Ghost House.mp3",
  options: [
    new GameOption("INVESTIGATE", () => ng.setScene(AbandonedMallTricked)),
    new GameOption("IGNORE IT.", () => ng.setScene(AbandonedMallSafe))
  ]
});
  
let AbandonedMallSafe = new Scene({
  text: "You completely ignore it because it could be a trap or someone could be dead in there. You dont care about the room leaking blood out because it smells so bad and rotten.",
  options: [
    new GameOption("FIND A WAY TO ESCAPE TO FLEE EVIDENCE", () => ng.setScene(AbandonedMallGoodEnding)),
  ]
});

let AbandonedMallTricked = new Scene({
  text: "You encountered The Slasher. He saw you coming in and gets angry. You have to defend yourself or flee.",
  audio: "Audio/Music/19 - King Boo.mp3",
  image: "Images/AbandonedMallImages/scary.png",
  options: [
    new GameOption("FIGHT AND DEFEND YOURSELF", () => ng.setScene(AbandonedMallBadEnding)),
    new GameOption("FLEE", () => ng.setScene (AbandonedMallConflict))
  ]
});

let AbandonedMallConflict = new Scene({
  text: "You are running away from the slasher. The slasher is unable to catch up to you. You have to escape to find the way out.",
  options: [
    new GameOption("ESCAPE WHERE YOU CAME FROM", () => ng.setScene(AbandonedMallGoodEnding)),
  ]
});

let AbandonedMallGoodEnding = new Scene({
  text: "You have made it out and never go to abandoned buildings ever again...",
  audio:"Audio/Music/54 - World 4 - Pumpkin Boneyard.mp3",
  image: "Images/AbandonedMallImages/darkoutside.png",
  options: [
  new GameOption("START OVER", () => Start())
  ]
});

let AbandonedMallBadEnding = new Scene({
  text: "You died by the slasher and your last thought is... I regretted it",
  options: [
  new GameOption("START OVER", () => Start())
  ]
});
/* --------------------------------------------------------
DO NOT REMOVE OR EDIT ANY CODE BELOW THIS COMMENT!
The game is run by calling the Start function. +
--------------------------------------------------------- */
Start();