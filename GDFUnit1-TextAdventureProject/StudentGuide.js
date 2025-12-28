/*
===========================================================
🎮  Unit 1 Create Project – Text Adventure Game
Game Development & Design – HARTS High School
===========================================================

INTRODUCTION
-----------------------------------------------------------
We’ve been learning how to use the Text Game Engine by studying 
the Disco Adventure and Haunted House demo games.

In this project, you’ll build your own original text adventure 
game using JavaScript and the Mastery Coding Text Game Engine.

Use your story and flowchart from the Narrative Storytelling 
Project as the foundation for your game.


PROJECT GOAL
-----------------------------------------------------------
Create a playable interactive story with your own scenes, images, 
sounds, and branching choices. By the end, players should be 
able to start the game, make choices, reach different endings, 
and restart to play again.


SETUP STEPS
-----------------------------------------------------------

1. OPEN THE TEMPLATE FILES
   - Open start.html in Chrome or Edge.
   - Keep your code editor and browser open together.
   - Refresh often to test your work.

2. ADD GAME AND CREATOR NAMES
   In your code find:
       let gameName = "";
       let creator = "";
   Fill in your game title and your name(s).

3. CREATE THE GAME ENGINE INSTANCE
   Add this under the comment:
   "Create a new variable that will contain a new instance of the Text Game Engine"
       const ng = new TextGameEngine();

4. WRITE THE START FUNCTION
   Under "Create a function named Start":
       let Start = function() {
         ng.characterDelay = 25;
         ng.setText("Your opening line of text goes here!");
         ng.setImage("Images/your-start-image.png");
         ng.setAudio("Audio/Music/your-music.mp3");
         ng.setOptions([
           new GameOption("BEGIN", () => ng.setScene(FirstScene))
         ]);
       };

5. CREATE SCENES
   Each scene is one location or event in your story.
   Use your flowchart to plan how they connect.
   Example:
       let FirstScene = new Scene({
         text: "Describe what’s happening in this part of the story.",
         image: "Images/example.png",
         audio: "Audio/Music/ambient.mp3",
         options: [
           new GameOption("Go left", () => ng.setScene(LeftPath)),
           new GameOption("Go right", () => ng.setScene(RightPath))
         ]
       });

6. ADD ENDINGS
   Every game needs at least two endings and a restart option:
       let Ending_Good = new Scene({
         text: "You made it out safely!",
         options: [
           new GameOption("START OVER", () => Start())
         ]
       });

7. START THE GAME
   Leave the line Start(); at the bottom of the file.
   This runs your game when it loads.


FINISHED GAME CHECKLIST
-----------------------------------------------------------
✅ Game Engine instance created (const ng = new TextGameEngine();)  
✅ A Start() function that sets text, image, audio, and options  
✅ At least 5 scenes with descriptions and choices  
✅ At least 2 different endings that can be reached  
✅ Images and audio play correctly in different scenes  
✅ Game restarts correctly after any ending  
✅ No red errors appear in the browser console  


VIDEO REFERENCE TIME STAMPS
-----------------------------------------------------------
Setup and Text
00:35 – Project Setup Overview
02:25 – Using setText()
03:15 – Changing text speed with characterDelay

Images and Styles
03:50 – Creating URLs for images and audio
05:25 – Editing images in PixilArt
08:00 – Using setImage()
10:00 – Changing text appearance with setStyles()

Selectable Options
12:25 – Creating choices with setOptions() and setScene()
14:15 – Adding options in code

Scenes and Audio
15:55 – Scene structure explained
17:30 – Creating a new Scene
19:35 – Adding audio to a Scene
21:25 – Creating options inside a Scene

Advanced Options
22:55 – Nested GameOptions
24:25 – Building branching paths


METHOD REFERENCE SHEET
-----------------------------------------------------------
ng.characterDelay = 25;       // Controls text speed
ng.setText("You open the door.");  // Displays text on screen
ng.setImage("Images/door.png");    // Shows an image
ng.setAudio("Audio/Music/theme.mp3");  // Plays music or sound
ng.setStyles("darkorange", "Times New Roman"); // Changes text style
ng.setOptions([ new GameOption("Enter", () => ng.setScene(Room)) ]); // Adds choices
let Room = new Scene({ text:"Inside the room", options:[...] }); // Creates a scene


SUBMISSION STEPS
-----------------------------------------------------------
1. Play and Test
   - Refresh to test your game from start to finish.
   - Fix any errors (F12 → Console tab).

2. Save and Zip
   - Right-click your project folder → "Compress" or "Zip".
   - File name: FirstNameLastName_Unit1Create.zip

3. Upload
   - Submit to Google Classroom → Unit 1 Text Adventure Create.


STRETCH GOALS
-----------------------------------------------------------
• Add a secret scene that unlocks from a special choice.
• Make a scene that loops back to the start.
• Add background music that changes with location.
• Create an inventory item that affects choices.
• Add special effects like vibrating or fading text.


REFLECTION QUESTIONS
-----------------------------------------------------------
1. What part of coding your game was most challenging?
2. How did your flowchart help you organize the story?
3. What feature would you add if you had one more day?


✅ Congratulations!
You’ve successfully combined storytelling and programming 
to create your first interactive game.
===========================================================
*/
