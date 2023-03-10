const ENDPOINT = 'http://localhost:3000'

const getCustomer = async ({ jwt }) => {
  try {
    const res = await fetch(`${ENDPOINT}/customers/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
    const { customers } = await res.json()
    return customers
  } catch (error) {
    console.error(error)
  }
}

export default getCustomer
