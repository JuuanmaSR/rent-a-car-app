const ENDPOINT = 'http://localhost:3000'

const getSingleCustomer = async ({ jwt, id }) => {
  try {
    const res = await fetch(`${ENDPOINT}/customers/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })

    const response = await res.json()
    return response
  } catch (error) {
    return { message: 'A ocurrido un error' }
  }
}

export default getSingleCustomer
