const apiURL = process.env.NEXT_PUBLIC__API_URL

function client(endpoint, customConfig = {}) {
    const config = {
        method: 'GET',
        ...customConfig,
    }

    return window
        .fetch(`https://landhills.co/wp-json/wp/v2/${endpoint}`, config)
        .then(response => response.json())

}

export { client }
