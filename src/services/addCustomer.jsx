const ENDPOINT = 'http://localhost:3000'

const addCustomer = async ({ data, jwt }) => {
  try {
    const res = await fetch(`${ENDPOINT}/customers/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    })
    return res
  } catch (error) {
    return { message: 'A ocurrido un error' }
  }
}

export default addCustomer
