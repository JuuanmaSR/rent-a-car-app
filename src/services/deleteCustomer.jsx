const ENDPOINT = 'http://localhost:3000'

const deleteCustomer = async ({ jwt, id }) => {
  try {
    const res = await fetch(`${ENDPOINT}/customers/delete/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
    const response = await res.json()
    return response
  } catch (error) {
    console.error(error)
  }
}

export default deleteCustomer
