export function formatMoney(number: number) {
  if (isNaN(number) || number === null) {
    return 'NULL'
  }

  const formatedNumber = number.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return formatedNumber
}
