// Source: https://mui.com/material-ui/react-slider/
import { Box, Slider } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  setShiftAmt: Dispatch<SetStateAction<number>>
}

export const CaesarSlider = ({ setShiftAmt: setCaesarShift }: Props) => {
  const marks = [
    {
      value: 0,
      label: '+0',
    },
    {
      value: 5,
      label: '+5',
    },
    {
      value: 10,
      label: '+10',
    },
    {
      value: 15,
      label: '+15',
    },
    {
      value: 20,
      label: '+20',
    },
    {
      value: 25,
      label: '+25',
    },
  ]

  const valuetext = (value: number) => {
    return `+${value}`;
  } 

  const handleChange = (event: Event, newValue: number | number[]) => {
    setCaesarShift(newValue as number)
  }

  const markClasses = "dark:text-white"

  return (
    <Box sx={{ width: '90%', maxWidth: 400 }} m="auto" >
      <Slider
        aria-label="Caesar shift amount"
        defaultValue={0}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={1}
        marks={marks}
        min={0}
        max={25}
        onChange={handleChange}
        classes={{markLabel: markClasses}}
      />
    </Box>
  )
}
