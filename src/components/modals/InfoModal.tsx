import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  const a_classes = "underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Guess the shifted word in 8 tries. After each guess, the color of the tiles will
        change to show how close your guess was to the word.
      </p>
      <br />
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The word is encrypted using the <a href="https://en.wikipedia.org/wiki/Caesar_cipher" target="_blank" className={a_classes}>Caesar cipher</a>.  
        Each letter in the original word is replaced by a letter some fixed number of positions down the alphabet. {' '}
        The number of letter positions the word is right-shifted by is a random number between 0 (no shift at all) and 25.
      </p>
      <div className="flex justify-center mb-1 mt-6">
        <img src={require('../../img/wikipediacaesarexample.png')} alt="Caesar substitution example" width={320} />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        This diagram shows a left shift of 3 letters, or equivalently a right shift of 23 letters. <br />
        For example, if the word was FACED with a right shift of 23, the new solution word would be CXZBA, 
        and the color of the tiles will be based on the new word.
      </p>
      <br />
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The slider at the top denotes the right shift applied to your guesses in the grid. 
        For example, guessing the word BLAZE would show the same tile colors as 
        guessing AKZYD with a +1 shift, ZJYXC with a +2 shift, and so on.
        Moving the slider helps you focus on or rule out potential shift values for the solution word. 
        The colors on the keyboard will reflect the tile colors of the current shift value. {' '}
        <strong>Your guess must be a valid word in at least one shift value.</strong>
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="W"
          status="correct"
        />
        <Cell value="E" />
        <Cell value="A" />
        <Cell value="R" />
        <Cell value="Y" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter W is in the word and in the correct spot. <br />
        &#8203;
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="X" />
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="Q"
          status="present"
        />
        <Cell value="T" />
        <Cell value="T" />
        <Cell value="A" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter Q is in the word but in the wrong spot. <br />
        (XQTTA is PILLS shifted right by 8 letters.)
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="B" />
        <Cell value="G" />
        <Cell value="M" />
        <Cell isRevealing={true} isCompleted={true} value="A" status="absent" />
        <Cell value="K" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter A is not in the word in any spot. <br />
        (BGMAK is VAGUE shifted right by 6 letters.)
      </p>

      <p className="mt-6 italic text-sm text-gray-500 dark:text-gray-300">
        This is an open source version of the word guessing game we all know and
        love -{' '}
        <a
          href="https://github.com/Compsciler/Caesardle"
          className="underline font-bold"
        >
          check out the code here
        </a>{' '}
      </p>
    </BaseModal>
  )
}
