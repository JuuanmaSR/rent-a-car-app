const ENDPOINT = 'http://localhost:3000'

const getCars = async ({ jwt }) => {
  try {
    const res = await fetch(`${ENDPOINT}/cars/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
    return await res.json()
  } catch (error) {
    console.error(error)
    return error
  }
}

export default getCars
