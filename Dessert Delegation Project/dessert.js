/* 
TICKET VARIABLE

*/
let ticket;

/*
CREATE A NEW FUNCTION

GENERATE A RANDOM NUMBER

ASSIGN A TICKET

CALL THE FUNCTION

*/
function ticketDistributor() {
    let randomNumber = Math.floor(Math.random() * 11)
    console.log(randomNumber);
    
    if (randomNumber <= 3) {
        ticket = "red ticket";
        return ticket;
    } else if (randomNumber >= 4 && randomNumber <= 7) {
        ticket = "green ticket";
        return ticket;
    } else {
        ticket = "blue ticket";
        return ticket;
    }
}
console.log(ticketDistributor());

/* 
ASSIGN THE DESSERT

*/

if (ticket == 'red ticket') {
    alert("You get a cookie!") 
} else if (ticket == 'green ticket') {
    alert("You get a brownie!") 
} else {
    alert("You get a ice cream cake!")
}