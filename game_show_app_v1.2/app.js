const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const btn__reset = document.getElementsByClassName('btn__reset')[0];
const ul = phrase.getElementsByTagName('ul')[0];
let missed = 0;

const phrases = [
  'Hobbits live in the shire',
  'Some people like hot tea',
  'When in Rome',
  'The sun rises in the east',
  'Life is better when dancing'    
];

// return a random phrase from an array
const getRandomPhraseAsArray = arr => {
  let randomNumber = Math.floor(Math.random() * arr.length);
  let phrase = arr[randomNumber];
  return phrase.split('');
}

// adds the letters of a string to the display
const addPhraseToDisplay = arr => {  
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
  for ( let i = 0; i < letters.length; i++ ) {
    if( letters[i].textContent.toLowerCase() === button.textContent ) {
      letters[i].className += ' show'; 
      matchLetter = letters[i].textContent;
    }
  }
  return matchLetter;
}

// check if the game has been won or lost and include restart button
const checkWin = () => {
  const liLetter = document.getElementsByClassName('letter');
  const liShow = document.getElementsByClassName('show');
  const overlay = document.getElementById('overlay');
  const title = document.querySelector('#overlay h2');
  const restartButton = document.querySelector('#overlay a');

  if ( liLetter.length === liShow.length ) {
    overlay.className = 'win';
    title.textContent = 'You won!';  
    overlay.style.display = 'flex';
    overlay.style.fontSize = '4em';
    restartButton.textContent = 'Restart Button';
    return overlay;
  } else {
    if ( missed > 4 ) {
      overlay.className = 'lose';
      title.textContent = 'You lost, try again!';
      overlay.style.display = 'flex';
      overlay.style.fontSize = '4em';
      restartButton.textContent = 'Restart Button';
      return overlay;
    }
  }
}

// listen for the start game button to be pressed
btn__reset.addEventListener('click', () => {
  if( btn__reset.textContent === 'Restart Button' ) {
    ul.innerHTML = '';
    missed = 0;
    let tries = document.getElementsByClassName('tries');
    for ( let i = 0; i < tries.length; i++ ) {
      tries[i].style.display = 'inline-block';
    }

    const buttons = document.getElementsByTagName('button');
    for ( let i = 0; i < buttons.length; i++ ) {
      buttons[i].className = '';
    }
  }

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
      
      let tries = document.getElementsByClassName('tries')[missed];
      missed += 1;
      tries.innerHTML = '<img src=images/lostHeart.png height="35px" width="30px">';
    }
  }
  checkWin();
});