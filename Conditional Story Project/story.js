/*
INTRO
Underneath this comment create an alert method to define the start of the story.
The story should begin by defining how our player ended up stuck in the castle.
Limit this intro to 1 or 2 sentences.
*/
alert("The player's luck was getting worse by the minute. It seems they've gotten lost in the enemies castle.");

/*PLAYER CLASS
Define a variable to represent the player's fighting class. 
For example, they could be a warrior, sorcerer, healer, etc.
Then create a conditional statement that tests for a minimum of 2 different classes. (Minimum 1 else if statement)
Based on the character's class use alert methods to define unique weapons for the player. 
Finally, create an else statement to define a default weapon for the player. 
*/
let playerClass = "warrior"

if (playerClass == "warrior") {
    alert("At least the player's strength and mighty axe would protect them!")
} else if (playerClass == "sorcerer") {
    alert("At least the player's knowledge in magic and powerful staff would protect them!")
} else {
    alert("At least the player still had their frying pan from breakfast!")
}

/*PLAYER ABILITY
Define a variable to represent a unique player ability. 
For example, they could have a fireball, a healing spell, wind blast, etc.
Then create a conditional statement with a minimum of 3 conditions that test for the player's
class and their ability. (Minimum 2 else if statement)
Based on the character's class and ability use alert methods to define how they'll defeat their enemy. 
Finally, create an else statement to define a default method for the player to defeat the enemy. 
*/
let playerAbility = "fire ball"

if (playerClass == "warrior" && playerAbility == "fireball") {
    alert("The player was also confident that their powerful fire attacks would assure victory!")
} else if (playerClass == "sorcerer" && playerAbility == "fireball") {
    alert("The player was also confident that their skilled fire magic would assure victory!")
} else if (playerClass == "sorcerer" && playerAbility == "wind blast") {
    alert("The player was also confident that their skilled wind magic would assure victory!")
} else {
    alert("At least the player still had their frying pan from breakfast!")
}

/*THE BOSS FIGHT
Define a variable to represent the boss enemy. 
For example, they could be fighting a fire breathing dragon, a water monster, a living tree, etc.
Then create a conditional statement with a minimum of 3 conditions that test for the player's
class, their ability, and the boss. (Minimum 2 else if statement)
Based on the character's class, ability, and the monster use alert methods to 
define how the fight will go and if the player wins or loses. 
Finally, create an else statement to define a default monster for the player to face.
*/
let bossEnemy = "water dragon"

if (playerClass == "warrior" && playerAbility == "fireball" && bossEnemy == "water dragon") {
    alert ("The player wasn't expecting a dragon...made of water?! They tried their best but ultimately was bested...")
    alert ("Sorry...Game Over")
} else if (playerClass == "sorcerer" && playerAbility == "fireball" && bossEnemy == "water dragon") {
    alert ("The player wasn't expecting a dragon...made of water?! But their magic allowed them to overcome the beast!")
    alert ("The player escapes victoriously!")
} else if (playerClass == "sorcerer" && playerAbility == "wind blast" && bossEnemy == "fire dragon") {
    alert ("The player wasn't expecting a fire breathing dragon! And unfortunately their wind magic only powered the beast!")
    alert ("Sorry...Game Over")
} else {
    alert ("Turns out the player got lost and ended up fighting a random slime then stumbling out the castle...")
    alert ("The player felt only slightly victoriously though...")
}