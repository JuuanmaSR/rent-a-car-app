const ENDPOINT = 'http://localhost:3000'

const getSingleCar = async ({ jwt, id }) => {
  try {
    const res = await fetch(`${ENDPOINT}/cars/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
    const { car } = await res.json()
    return car
  } catch (error) {
    console.error(error)
    return error
  }
}

export default getSingleCar
