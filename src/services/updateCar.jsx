const ENDPOINT = 'http://localhost:3000'

const updateCar = async ({ jwt, data }) => {
  try {
    const res = await fetch(`${ENDPOINT}/cars/update/${data.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    })
    return await res.json()
  } catch (error) {
    console.error(error)
  }
}

export default updateCar
