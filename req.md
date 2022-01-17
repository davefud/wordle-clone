# Requirements

## V0

- You provide five char guesses
- Each guess must be a word
- When you press enter:
  - board
    - You see the status of your last guess
      - letters that are in the wrong place are yellow
      - missing letters are gray
      - correct guesses + positions are green
      - don't let unknown words pass
  - You only see past and active attempt
  - initial visual state
    - all rows are empty
    - as I fill out my guess, background is black

## V1

- You Provide five char guesses
- Each guess must be a word
- When you press enter:
  - board
    - You see the status of your last guess
      - letters that are in the wrong place are yellow
      - missing letters are gray
      - correct guesses + positions are green
      - don't let unknown words pass
        - shake the active row on the word we don't know
      - secret has a single letter then additional letters in guess are gray
      - multiple of same letter in secret show with above rules
    - keyboard
      - reflects data of the most correct attempted words
      - third row contains enter key [...] backspace key
      - you can also input by typing
      - when you press enter, each letter animates into rotating letter
  - You only see past and active attempt
  - You only get 6 word attempts then the game is over
    - Display the secret word
  - initial visual state
    - all rows are empty
    - as I fill out my guess, background is black
    - filled out cells have a slight border highlight
