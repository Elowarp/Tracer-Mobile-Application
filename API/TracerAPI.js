IP="http://172.20.10.4:8000/"

export async function login(username, password){
    const url = IP + 'api/public/obtainToken'

    try {
        const response = await fetch(url, {
            method: "POST",

            body: JSON.stringify({
                username: username,
                password: password,
            }),

            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        return response.json()

    } catch (error) {
        return console.error(error)
    }
}

export async function register(username, password, email){
    const url = IP + 'api/public/addUser?username=' + username + "&password=" + password + "&email=" + email

    try {
        const response = await fetch(url, {
            method: "GET"
        })

        
        return response.json()

    } catch (error){
        return console.error(error)
    }

}

export async function search(longitude, latitude){
    const url = IP + "api/public/search?longitude=" + longitude + "&latitude=" + latitude + "&distanceFromUser=" + 40000

    try {
        const response = await fetch(url, {
            method: "GET"
        })

        return response.json()

    } catch(error) {
        return console.error(error)
    }
}

export async function addSpot(token, title, sport, coordonnees, description = "", is_temp = null, time_available = null){
    const url = IP + "api/private/addSpot"

    const data = new FormData();
    data.append("title", title)
    data.append("sport", sport)
    data.append("latitude", coordonnees.latitude)
    data.append("longitude", coordonnees.longitude)
    data.append("description", description)
    if(is_temp !== null){
        data.append("is_temp", is_temp)

    }
    data.append("time_available", time_available)
    

    try {
        const response = await fetch(url, {
            method: "POST",

            headers: {
                "Authorization": "Token " + token
            },

            body: data
        })

        return response.json()
    } catch(error){
        return console.error(error)
    }
}