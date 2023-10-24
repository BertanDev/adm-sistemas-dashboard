interface DifferenceBetweenTwoValuesInPercentageProps {
  firstValue: number
  secondValue: number
}

export function differenceBetweenTwoValuesInPercentage({
  firstValue,
  secondValue,
}: DifferenceBetweenTwoValuesInPercentageProps) {
  const absoluteDifference = firstValue - secondValue
  const percentage = (absoluteDifference / Math.abs(secondValue)) * 100

  return Number(percentage.toFixed(2))
}
