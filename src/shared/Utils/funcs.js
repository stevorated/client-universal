import mongoose from 'mongoose'
import moment from 'moment'

export const isObjectID = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return false
  } else {
    return true
  }
}

export const dayOfWeek = (date) => {
  const rawDay = moment(date).day()
  if (rawDay === 7) return 1
  else return rawDay + 1
}

export const makeMonthsArray = (start, months) => {
  let i
  let arr = []
  for (i = 0; i < months + 1; i++) {
    const monthToAddDate = moment(start).add(i, 'M').format('YYYY-MM-DD')
    const monthToAddText = moment(start).add(i, 'M').format('MMMM YY')
    arr.push({ monthToAddDate, monthToAddText })
  }
  return arr
}

export const daysArray = (max, start) => {
  let arr = []
  let i = 1
  const modSeven = (max) % 7
  const maxEffective = (modSeven + 2) * 7
  
  for (i = 1; i < maxEffective + 1 + 7; i++) {
    const count = i - start + 1
    if (count >= 1 && count <= max) {
      arr.push(count)
    } else {
      arr.push(null)
    }
  }
  return removeExtraArray(sliceArray(arr, 7))
}

const sliceArray = (arr, chunk) => {
  let finalArr = []
  let i, j, tempArray
  for (i = 0, j = arr.length; i < j; i += chunk) {
    tempArray = arr.slice(i, i + chunk)
    finalArr.push(tempArray)
  }
  return finalArr
}

const removeExtraArray = (arr) => {

  return arr.map(week => {
    if( week.filter(day=> day !== null).length === 0) {
      return []
    } else {
      return week
    }
  })
}