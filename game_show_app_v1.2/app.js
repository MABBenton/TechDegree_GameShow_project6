const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const btn__reset = document.getElementsByClassName('btn__reset')[0];
let missed = 0;

const phrases = [
  'Hobbits',
  'live',
  'in',
  'the',
  'shire'    
];

// return a random phrase from an array
const getRandomPhraseAsArray = arr => {
  let randomNumber = Math.floor(Math.random() * arr.length);
  let phrase = arr[randomNumber];
  return phrase.split('');
}

// adds the letters of a string to the display
const addPhraseToDisplay = arr => {  
  const ul = phrase.getElementsByTagName('ul')[0];
  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement('li');
    li.textContent = arr[i];
    if ( arr[i] === ' ' ) {
      li.className = 'space';
    } else {
      li.className = 'letter';
    }
    ul.appendChild(li)
  }    
}

// check if a letter is in the phrase
const checkLetter = button => {
  const letters = phrase.getElementsByTagName('li');
  let matchLetter = null;
  for (let i = 0; i < letters.length; i++) {
    if( letters[i].textContent.toLowerCase() === button.textContent ) {
      letters[i].className += ' show'; 
      matchLetter = letters[i].textContent;
    }
  }
  return matchLetter;
}

// check if the game has been won or lost 
const checkWin = () => {

}

// listen for the start game button to be pressed
btn__reset.addEventListener('click', () => {
  document.getElementById('overlay').style.display = 'none';
  let randomPhrase = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(randomPhrase);
});

// listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', (e) => {
  if( e.target.tagName === 'BUTTON' && e.target.className !== 'chosen' ) {
    const checkLetterResult = checkLetter(e.target);
    e.target.className += 'chosen';
    if( checkLetterResult === null ) {
      missed += 1;
      let ol = document.getElementsByTagName('ol')[0];
      let tries = document.getElementsByClassName('tries')[0];
      ol.removeChild(tries);
    }
  }
});