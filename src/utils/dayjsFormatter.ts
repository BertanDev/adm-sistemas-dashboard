import dayjs, { Dayjs } from 'dayjs'
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
 * @returns {string} Retorna uma string com a data do mês anterior no formato Janeiro 2023.
 */

export function dayjsFormatPreviousMMMMYYYY() {
  const currentDate = dayjs()
  const previousMonth = currentDate.subtract(1, 'month')

  let formattedPreviousMonth = previousMonth.format('MMMM YYYY')
  formattedPreviousMonth =
    formattedPreviousMonth.charAt(0).toUpperCase() +
    formattedPreviousMonth.slice(1)

  return formattedPreviousMonth
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

/**
 * @returns {Array<string>} Retorna um array dos últimos 12 meses no formato ['01/2023', 02/2023]'.
 */

export function getLastTwelveMonths() {
  const currentMonth = dayjs()
  const monthsArray = []

  for (let i = 0; i < 12; i++) {
    const formattedDate = currentMonth.subtract(i, 'month').format('MM/YYYY')
    monthsArray.unshift(formattedDate)
  }

  return monthsArray
}

/**
 * @param {string} data - Recebe uma string de data no formato 2024-05-16T03:00:00.000Z.
 * @returns {string} Retorna uma string no formato extenso: 16 de Fevereiro de 2024.
 */

export function dayjsFormatExtenso(dateString: string) {
  const date = dayjs(dateString)
  return date.format('DD [de] MMMM [de] YYYY')
}

/**
 * @param {Dayjs} data - Recebe uma string de data no formato Dayjs.
 * @returns {string} Retorna uma string no formato DD/MM/YYYY.
 */

export function daysjFormatDDMMYYYY(date: Dayjs) {
  // const date = dayjs(dateString)
  return date.format('DD[/]MM[/]YYYY')
}

export function getCurrentDateDDMMYYYY() {
  return dayjs().format('DD/MM/YYYY')
}
