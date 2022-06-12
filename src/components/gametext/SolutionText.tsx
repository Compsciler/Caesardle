import { Transition } from '@headlessui/react'

type Props = {
  solution: string,
  solutionUnshifted: string,
  solutionShiftAmt: number,
  isGameComplete: boolean,
}

const styles = {
  fontSize: '18px',
  flexFlow: 'wrap',
}
const hrStyles = {
  flexBasis: '100%',
  border: 0,
  height: 0,
  margin: 0,
}

const classes = "flex justify-center mt-4 ml-2 mr-2 text-center dark:text-white"

export const SolutionText = ({ solution, solutionUnshifted, solutionShiftAmt, isGameComplete }: Props) => {
  const lettersPluralText = solutionShiftAmt === 1 ? 'letter' : 'letters'
  return (
    <Transition.Root show={isGameComplete} style={styles} className={classes}>
      The word was {solution} <br />
      ({solutionUnshifted} shifted right by {solutionShiftAmt} {lettersPluralText})
    </Transition.Root>
  )
}
