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
    const { cars } = await res.json()
    return cars
  } catch (error) {
    console.error(error)
  }
}

export default getCars
