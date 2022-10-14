const apiURL = process.env.NEXT_PUBLIC__API_URL

function client(endpoint, customConfig = {}) {
    const config = {
        method: 'GET',
        ...customConfig,
    }

    return window
        .fetch(`${apiURL}/${endpoint}`, config)
        .then(response => response.json())
}

export { client }
