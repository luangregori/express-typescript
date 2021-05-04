export const badRequestError = (error: string) => {
  return Promise.reject({error})
}

