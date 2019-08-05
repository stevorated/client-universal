import moment from 'moment'

export const formatDateAndDay = (date) => {
  return moment(date).format('dddd, DD MMMM YYYY')
}

export const formatDate = (date, threeLetter = true, year = false) => {
  const month = threeLetter ? 'MMM' : 'MMMM'
  return {
    month: moment(date).format(month),
    day: moment(date).format('DD')
  }
}