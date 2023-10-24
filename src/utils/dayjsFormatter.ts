import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')

/**
 * @returns {string} Retorna uma string com a data de hoje no formato Janeiro 2023.
 */

export function dayjsFormatMMMMYYYY() {
  const currentDate = dayjs()
  let currentDateFormated = currentDate.format('MMMM YYYY')
  currentDateFormated =
    currentDateFormated.charAt(0).toUpperCase() + currentDateFormated.slice(1)

  return currentDateFormated
}

/**
 * @param {Array<string>} data - Recebe um Array no formato ['01/2023', '02/2023'] MM/YYYY.
 * @returns {Array<string>} Retorna um array do mesmo tamanho com as datas no formato ['Jan 2023', 'Fev 2023'] MMM YYYY.
 */

export function dayjsFormatMMMYYYY(data: Array<string>) {
  const dataFormated = data.map((item) => {
    item = `${item.substring(0, 2)}/01/${item.slice(-4)}`
    const toDate = dayjs(item, 'DD/MM/YYYY')
    return dayjs(toDate, 'DD/MM/YYYY').format('MMM YYYY')
  })

  const upperCaseFormat = dataFormated.map(
    (item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase(),
  )

  return upperCaseFormat
}
