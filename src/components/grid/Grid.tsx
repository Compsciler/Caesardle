import { MAX_CHALLENGES } from '../../constants/settings'
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

type Props = {
  solution: string
  guesses: string[]
  currentGuess: string
  isRevealing?: boolean
  currentRowClassName: string
  shiftAmt: number
}

export const Grid = ({
  solution,
  guesses,
  currentGuess,
  isRevealing,
  currentRowClassName,
  shiftAmt,
}: Props) => {
  const empties =
    guesses.length < MAX_CHALLENGES - 1
      ? Array.from(Array(MAX_CHALLENGES - 1 - guesses.length))
      : []

  return (
    <>
      {guesses.map((guess, i) => (
        <CompletedRow
          key={i}
          solution={solution}
          guess={guess}
          isRevealing={isRevealing && guesses.length - 1 === i}
          shiftAmt={shiftAmt}
        />
      ))}
      {guesses.length < MAX_CHALLENGES && (
        <CurrentRow
          guess={currentGuess}
          solution={solution}
          className={currentRowClassName}
          shiftAmt={shiftAmt}
        />
      )}
      {empties.map((_, i) => (
        <EmptyRow solution={solution} key={i} />
      ))}
    </>
  )
}
