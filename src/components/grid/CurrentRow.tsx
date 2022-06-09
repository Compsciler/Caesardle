import { Cell } from './Cell'
import { caesarShift, unicodeSplit } from '../../lib/words'

type Props = {
  guess: string
  solution: string
  className: string
  shiftAmt: number
}

export const CurrentRow = ({ guess, solution, className, shiftAmt }: Props) => {
  const unshiftedGuess = caesarShift(guess, -shiftAmt)
  const splitUnshiftedGuess = unicodeSplit(unshiftedGuess)
  const emptyCells = Array.from(Array(solution.length - splitUnshiftedGuess.length))
  const classes = `flex justify-center mb-1 ${className}`

  return (
    <div className={classes}>
      {splitUnshiftedGuess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
