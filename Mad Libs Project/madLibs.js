// Prompt player for words
let exclamation = prompt('exclamation');
let adverb = prompt('adverb');
let verbPastTense = prompt('verb (past)');
let noun = prompt('noun');
let adjective = prompt('adjective');

// Use string concatentation to combine the words (paying attention to whitespace inside strings)
let story = exclamation + "! she said " + adverb + 
" as she " + verbPastTense + " her motorized " + noun + 
" and drove off with her " + adjective + " cat"; 

// Show finished story as an alert pop-up.
alert(story);