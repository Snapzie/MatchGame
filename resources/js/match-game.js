var MatchGame = {};
var flippedArray = [];
/*
Sets up a new game after HTML document has loaded.
Renders a 4x4 board of cards.
*/

/*
Generates and returns an array of matching card values.
*/

MatchGame.generateCardValues = function () {
  var unplacedArray = [];

  for (i = 1; i < 9; i++) {
    for (j = 0; j < 2; j++){
      unplacedArray.push(i);
    }
  }
  var randomArray = [];

  while (unplacedArray.length > 0) {
    var index = Math.floor(Math.random() * unplacedArray.length);
    randomArray.push(unplacedArray[index]);
    unplacedArray.splice(index, 1);
  }
  return randomArray;
};

/*
Converts card values to jQuery card objects and adds them to the supplied game
object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  $($game).empty();
  var colors = ['hsl(25, 85%, 65%)', 'hsl(55, 85%, 65%)', 'hsl(90, 85%, 65%)', 'hsl(160, 85%, 65%)', 'hsl(220, 85%, 65%)', 'hsl(265, 85%, 65%)', 'hsl(310, 85%, 65%)', 'hsl(365, 85%, 65%)'];

  for (var i = 0; i < cardValues.length; i++) {
    var $newCard = $('<div class="col-xs-3 card">' + '</div>');
    $newCard.data('value', cardValues[i]);
    $newCard.data('flipped',  false);
    $newCard.data('color', colors[cardValues[i]-1]);

    $($game).append($newCard);
  }
  $('.card').click(function (){
    MatchGame.flipCard($(this), $game);
  });
};

/*
Flips over a given card and checks to see if two cards are flipped over.
Updates styles on flipped cards depending whether they are a match or not.
*/

MatchGame.flipCard = function($card, $game) {
  $game.data('clicked', flippedArray);
  var flipData = $card.data('flipped');

  if (!flipData) {
    $card.css('background-color', $card.data('color'));
    $card.text($card.data('value'));
    $card.data('flipped', true);
    flippedArray.push($card);

    if (flippedArray.length === 2) {
      var value1 = flippedArray[0].data('value');
      var value2 = flippedArray[1].data('value');
      if (value1 === value2) {
        flippedArray[0].css('background-color', 'rgb(153, 153, 153)');
        flippedArray[1].css('background-color', 'rgb(153, 153, 153)');
      }else {
        console.log('delay');
        for (var i = 0; i < flippedArray.length; i++) {
          Delay(flippedArray, i);
        }
      }
      flippedArray = [];
    }
  }else {
    return;
  }
};

function Delay(flippedArray, i) {
  setTimeout(function () {
    console.log('executed');
    flippedArray[i].css('background-color', 'rgb(32, 64, 86)');
    flippedArray[i].text('');
    flippedArray[i].data('flipped', false);
  }, 350);
}


$(document).ready(function () {
  MatchGame.renderCards(MatchGame.generateCardValues(), $('#game'));
});
