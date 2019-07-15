import mongoose from 'mongoose'

export const isObjectID = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return false
  } else {
    return true
  }
}