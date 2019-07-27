import { UPLOAD_FILE_TEST } from '../Apollo/Mutaions'

export const uploadFile = (data) => async (dispatch, getState, client) => {
  const { file, size } = data
  console.log(data)
  
  const res = await client.mutate({
    variables: data,
    mutation: UPLOAD_FILE_TEST
  })
  const url = res.data.singleUpload.url
  dispatch({
    type: 'UPDATE_AVATAR',
    payload: url
  })
}
