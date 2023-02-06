const ENDPOINT = 'http://localhost:3000'
const updateCustomer = async ({ jwt, newData }) => {
  try {
    const res = await fetch(`${ENDPOINT}/customers/update/${newData.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(newData),
    })
    const response = await res.json()
    return response
  } catch (error) {
    console.error(error)
  }
}

export default updateCustomer
