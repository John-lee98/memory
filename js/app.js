var cards = ["fa-apple-alt", "fa-crow", "fa-dove", "fa-fish", 
"fa-frog", "fa-kiwi-bird", "fa-grin-wink", "fa-smile"];
var deck = cards.concat(cards);
var card1,card2;
var currentTurn = 0;
var currentPlayer = 0;
var scores = [0, 0];


    $(document).ready(function() {
  addCards();
}) 
  
function addCards() {
   for(var i = deck.length; i > 0; i--) {
      var randomIndex = Math.floor(Math.random() * deck.length);
      var icon = deck.splice(randomIndex, 1);
      $('#cards').append('<div class="card blank"><i class="fas ' + icon + '"></i></div>');
    }

    $('.card').click(chooseCard);
}

function chooseCard() {
  if(currentTurn === 0) {
    $('.card').addClass('blank');
    $(this).toggleClass('blank');
    $(this).unbind('click');
    card1 = $(this);
    currentTurn++;
  } else {
    $(this).toggleClass('blank');
    $(this).unbind('click');
    card2 = $(this);
    currentTurn--;
    if($(card1).children('i').attr('class') === 
      $(card2).children('i').attr('class')) {
      scores[currentPlayer]++;
      $('[data-player="' + currentPlayer + '"]').html(scores[currentPlayer]);
      $(card1).fadeTo('slow', 0).unbind('click');
      $(card2).fadeTo('slow', 0).unbind('click');
    } else {
      $(card1).click(chooseCard);
      $(card2).click(chooseCard);
    }
    if(checkForWin()) {
      return true;
    } else {
      switchPlayer();
    } 
  }
}

function checkForWin() {
  if(scores[0] + scores[1] === cards.length) {
    if(scores[0] > scores[1]) {
      $('h1').html('Memory: Blue won!');
    } else if(scores[0] < scores[1]) {
      $('h1').html('Memory: Red won!');
    } else {
      $('h1').html('Memory: It\s a tie!');
    }
    return true;
  } else {
    return false;
  }
}

function switchPlayer() {
  if(currentPlayer === 0) {
    currentPlayer++;
  } else {
    currentPlayer--;
  }
  $('.player > span > i').toggleClass('fa-star');
}