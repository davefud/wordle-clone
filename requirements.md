# Requirements

## V0

- Player provides five character guesses
  - Each guess must be a word
- When player presses enter:
  - Board
    - [X] You see the status of your last guess
      - [X] letters that are in the wrong place are yellow
      - [X] missing letters are gray
      - [X] correct guesses + positions are green
      - [X] don't let unknown words pass
  - [X] You only see past and active attempt
  - Initial visual state
    - [X] all rows are empty
    - [X] as I fill out my guess, background is black

## V1

- Player provides five character guesses
  - Each guess must be a word
- When player presses enter:
  - board
    - [X] You see the status of your last guess
      - [X] letters that are in the wrong place are yellow
      - [X] missing letters are gray
      - [X] correct guesses + positions are green
      - [X] don't let unknown words pass
        - [ ] shake the active row on the word we don't know (also incomplete word)
      - [X] secret has a single letter then additional letters in guess are gray
      - [X] multiple of same letter in secret show with above rules
    - keyboard
      - [X] reflects data of the most correct attempted words
      - [X] third row contains enter key [...] backspace key
      - [X] player can also input by typing
      - [X] when player presses enter, each letter animates into rotating letter
  - [X] You only see past and active attempt
  - [X] You only get 6 word attempts then the game is over
    - [X] Display the secret word
  - initial visual state
    - [X] all rows are empty
    - [X] as I fill out my guess, background is black
    - [X] filled out cells have a slight border highlight
