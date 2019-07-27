import { UPLOAD_FILE_TEST } from '../Apollo/Mutaions'

export const uploadFile = (data) => async (dispatch, getState, client) => {
  const { file, size } = data
  console.log('data', data)

  const res = await client.mutate({
    variables: data,
    mutation: UPLOAD_FILE_TEST
  })
  console.log('res', res)
  const url = res.data.singleUpload.url
  dispatch({
    type: 'UPDATE_AVATAR',
    payload: url
  })
}
