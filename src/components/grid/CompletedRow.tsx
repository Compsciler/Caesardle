import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'
import { caesarShift, unicodeSplit } from '../../lib/words'

type Props = {
  solution: string
  guess: string
  isRevealing?: boolean
  shiftAmt: number
}

export const CompletedRow = ({ solution, guess, isRevealing, shiftAmt }: Props) => {
  const statuses = getGuessStatuses(solution, guess)
  const unshiftedGuess = caesarShift(guess, -shiftAmt)
  const splitUnshiftedGuess = unicodeSplit(unshiftedGuess)

  return (
    <div className="flex justify-center mb-1">
      {splitUnshiftedGuess.map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          status={statuses[i]}
          position={i}
          isRevealing={isRevealing}
          isCompleted
        />
      ))}
    </div>
  )
}
