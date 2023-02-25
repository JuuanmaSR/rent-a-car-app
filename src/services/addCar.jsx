const ENDPOINT = 'http://localhost:3000'

const addCar = async ({ jwt, data }) => {
  try {
    const res = await fetch(`${ENDPOINT}/cars/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    })
    return await res.json()
  } catch (error) {
    console.log(error)
    return error
  }
}

export default addCar
