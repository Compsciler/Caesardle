import { WORDS } from '../constants/wordlist'
import { VALID_GUESSES } from '../constants/validGuesses'
import { WRONG_SPOT_MESSAGE, NOT_CONTAINED_MESSAGE } from '../constants/strings'
import { getGuessStatuses } from './statuses'
import { default as GraphemeSplitter } from 'grapheme-splitter'

const getWords = (wordlist: { solution: string }[]) => {
  return wordlist.map(wordObj => wordObj.solution)
}

export const isWordInWordList = (word: string) => {
  // VALID_GUESSES.includes(localeAwareLowerCase(word))
  const shiftAmts = Array.from(Array(ALPHA_SIZE).keys());
  return shiftAmts.some((shiftAmt) => VALID_GUESSES.includes(localeAwareLowerCase(caesarShift(word, shiftAmt))))
}

const ALPHA_SIZE = 26
export const caesarShift = (word: string, shiftAmt: number) => {
  return unicodeSplit(word).map((char) => {
    const isLowerLetter = char.toLowerCase() === char && char.toUpperCase() !== char
    const isUpperLetter = char.toUpperCase() === char && char.toLowerCase() !== char
    if (!isLowerLetter && !isUpperLetter) {
      return char
    }

    const charAscii = char.charCodeAt(0)
    const baseCharAscii = isUpperLetter ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0)
    const shiftedCharAscii = (charAscii - baseCharAscii + shiftAmt + ALPHA_SIZE) % ALPHA_SIZE + baseCharAscii
    return String.fromCharCode(shiftedCharAscii)
  })
  .join('')
}

export const isWinningWord = (word: string, solution: string) => {
  return word === solution
}

export const isWinningWordOfDay = (word: string) => {
  return isWinningWord(word, solution)
}

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
// also check if all revealed instances of a letter are used (i.e. two C's)
export const findFirstUnusedReveal = (word: string, shiftAmt: number, guesses: string[], solution: string) => {
  if (guesses.length === 0) {
    return false
  }

  const lettersLeftArray = new Array<string>()
  const guess = guesses[guesses.length - 1]
  const statuses = getGuessStatuses(solution, guess)
  const splitWord = unicodeSplit(word)
  const splitGuess = unicodeSplit(guess)

  for (let i = 0; i < splitGuess.length; i++) {
    if (statuses[i] === 'correct' || statuses[i] === 'present') {
      lettersLeftArray.push(splitGuess[i])
    }
    if (statuses[i] === 'correct' && splitWord[i] !== splitGuess[i]) {
      return WRONG_SPOT_MESSAGE(caesarShift(splitGuess[i], -shiftAmt), i + 1)
    }
  }

  // check for the first unused letter, taking duplicate letters
  // into account - see issue #198
  let n
  for (const letter of splitWord) {
    n = lettersLeftArray.indexOf(letter)
    if (n !== -1) {
      lettersLeftArray.splice(n, 1)
    }
  }

  if (lettersLeftArray.length > 0) {
    return NOT_CONTAINED_MESSAGE(caesarShift(lettersLeftArray[0], -shiftAmt))
  }
  return false
}

export const unicodeSplit = (word: string) => {
  return new GraphemeSplitter().splitGraphemes(word)
}

export const unicodeLength = (word: string) => {
  return unicodeSplit(word).length
}

export const localeAwareLowerCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleLowerCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toLowerCase()
}

export const localeAwareUpperCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleUpperCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toUpperCase()
}

export const getWordBySolutionIndex = (solutionIndex: number) => {
  if (solutionIndex < 0 || solutionIndex >= WORDS.length) {
    return {
      solution: '',
      solutionUnshifted: '',
      solutionShiftAmt: -1,
      solutionIndex: -1
    }
  }
  return {
    solution: localeAwareUpperCase(WORDS[solutionIndex].solution),
    solutionUnshifted: localeAwareUpperCase(WORDS[solutionIndex].solutionUnshifted),
    solutionShiftAmt: WORDS[solutionIndex].shiftAmount,
    solutionIndex: solutionIndex,
  }
}

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const epoch = new Date(2022, 0)
  const start = new Date(epoch)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  let index = 0
  while (start < today) {
    index++
    start.setDate(start.getDate() + 1)
  }

  const nextDay = new Date(today)
  nextDay.setDate(today.getDate() + 1)

  const offset = 0
  const solutionAndIndex = getWordBySolutionIndex((index + offset) % WORDS.length)
  
  return {
    solution: solutionAndIndex.solution,
    solutionUnshifted: solutionAndIndex.solutionUnshifted,
    solutionShiftAmt: solutionAndIndex.solutionShiftAmt,
    solutionIndex: solutionAndIndex.solutionIndex,
    tomorrow: nextDay.valueOf(),
  }
}

export const { solution, solutionIndex, solutionUnshifted, solutionShiftAmt, tomorrow } = getWordOfDay()
