import React, { Component } from 'react';
import './Hangman.css';
import { randomWord } from './Words.js';

import step0 from "./images/state1.GIF";
import step1 from "./images/state2.GIF";
import step2 from "./images/state3.GIF";
import step3 from "./images/state5.GIF";
import step4 from "./images/state6.GIF";
import step5 from "./images/state7.GIF";
import step6 from "./images/state9.GIF";
import step7 from "./images/state10.gif";
import step8 from "./images/state11.GIF";

// Hangman component to play the Hangman game

class Hangman extends Component {
  // Default properties for the hangman game
  static defaultProps = {
    maxWrong: 8, 
    images: [step0, step1, step2, step3, step4, step5, step6, step7, step8]
  }

  // constructor to initialise the state of the hangman game
  constructor(props) {
    super(props);
    this.state = {
      mistake: 0,  //count the incorrect guesses
      guessed: new Set([]),  //set of correctly guessed letters
      answer: randomWord()   //word to be guessed
    }
  }

  // Handle the letter guess made by the user

  handleGuess = e => {
    let letter = e.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(letter),    //add the correctly guessed letter to the set
      mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1)  //increase the incorrect guess count if the guessed letter is not int the word
    }));
  }

  guessedWord() {
    return this.state.answer.split("").map(letter => (this.state.guessed.has(letter) ? letter : " _ "));
  }

// generate buttons for each letter of the alphabeth

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
      <button
        className='lettersBtn'
        key={letter}
        value={letter}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </button>
    ));
  }

// reset button to start the game again

  resetButton = () => {
    this.setState({
      mistake: 0,    //reset the incorrect guess count
      guessed: new Set([]),    //reset the set of correctly guessed letters
      answer: randomWord()     //choose a new word to be guessed
    });
  }

// show the rules of the game

  showRules = () => {
  alert("The rules of the game are as follows:\n\n1. You need to guess the word by choosing one letter at a time.\n2. The game ends when you have made 8 wrong guesses or have successfully found the word.\n3. The Reset button allows you to start the game again.\n4. The Help button displays these rules.");
}


  render() {
    const gameOver = this.state.mistake >= this.props.maxWrong;
    const isWinner = this.guessedWord().join("") === this.state.answer;
    let gameStat = this.generateButtons();
    
// check if the game is over(either the user won or lost)

    if (isWinner) {
      gameStat = <div className="winning-message">You Won!!!</div>;
    }

    if (gameOver) {
      gameStat = <div className = "losing-message">You Lost!!!</div>;
    }

// render the game interface

    return (
        <div className='box'>
        <div className="Hangman"> 
        <h1 className='text-center'>Hangman</h1>
        <div className="guesses">Wrong Guesses: {this.state.mistake} of {this.props.maxWrong}</div>
        <div className="text-center">
          <img src={this.props.images[this.state.mistake]} alt=""/>
        </div>
        <div className='center'>
        <div className="paragraph">
          <p>Guess the Word:</p>
          <p>
            {!gameOver ? this.guessedWord() : this.state.answer}
          </p>
          <p>{gameStat}</p>
          <button className='btn btn-info' onClick={this.resetButton}>Reset</button>
          <button className='btn btn-info' onClick={this.showRules}>Help</button>
        </div>
        </div>
        </div>
      </div>
    )
  }
}

export default Hangman;