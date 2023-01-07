const apiURL = process.env.NEXT_PUBLIC_API_URL

function client(endpoint, customConfig = {}) {
    const config = {
        method: 'GET',
        ...customConfig,
    }

    return fetch(`${apiURL}/${endpoint}`, config)
        .then(response => response.json())
        .catch((err) => { throw err })

}

export { client }
