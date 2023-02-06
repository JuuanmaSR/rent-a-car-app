const ENDPOINT = 'http://localhost:3000/auth'

const login = async ({ email, password }) => {
  try {
    const res = await fetch(`${ENDPOINT}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    return await res.json()
  } catch (error) {
    console.error(error)
  }
}

export default login
