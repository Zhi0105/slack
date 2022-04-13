import axios from 'axios'

const URL = 'https://206.189.91.54/api/v1'
let error = []
    
//REGISTRATION
export const createuser = async(firstname, lastname , email, password, ConfirmPassword, contact) => {
    const res = await axios.post(`${URL}/auth`, {
        firstname,
        lastname,
        email,
        password,
        ConfirmPassword,
        contact
    })
    .catch((err)=> {
        error = err.response.data.errors.full_messages
    })

    return [res, error]

}

//LOGIN
export const loginuser = async(email, password) => {
    const res = await axios.post(`${URL}/auth/sign_in`, {
        email,
        password
    })
    .catch((err) => {
        error = err.response.data.errors
    })

    return [res, error]
}

//RETREIVING ALL USER
export const getAllUser = async(headers) => {
    const res = await axios.get(`${URL}/users`, {
        headers : headers
    })
    .catch((err) => {
        error = err.response.data.errors
    })

    return [res, error]
}

//CREATE USER CHANNEL
export const createchannel = async(name, headers) => {
    let user_ids = []
    const res = await axios.post(`${URL}/channels`, {
        name,
        user_ids
    }, {
        headers : headers
    })
    .catch((err) => {
        error = err.reponse.data.errors
    })

    return [res, error]
}

//RETREIVING ALL USER CHANNEL
export const getUserChannel = async(headers) => {
    const res = await axios.get(`${URL}/channels` , {
        headers : headers
    })
    .catch((err) => {
        error = err.response.data.errors
    })
    
    return [res, error]
}


//ADD MEMBER TO A CHANNEL
export const addToChannel = async(headers, channelID, userID) => {
    const res = await axios.post(`${URL}/channel/add_member`, {
        id : channelID,
        member_id : userID
    }, {
        headers : headers
    })
    .catch((err) => {
        error = err.response.data.errors
    })  

    return [res, error]
}

//DATA FROM CHANNEL BY ID
export const getChannelDetail = async(headers, channelID) => {
    const res = await axios.get(`${URL}/channels/${channelID}`, {
        headers : headers
    })
    .catch((err) => {
        error = err.response.data.errors
    })

    return [res, error]
}

//RETREIVING MESSAGE VIA CHANNEL
export const getMessageChannel = async(headers, channel, ID) => {
    const res = await axios.get(`${URL}/messages?receiver_id=${ID}&receiver_class=${channel}`, {
        headers : headers
    })
    .catch((err) => {
        error = err.response.data.errors
    })
    
    return [res, error]
}

//RETRIEVING MESSAGE VIA USER
export const getMessageUser = async(headers, user, ID) => {
    const res = await axios.get(`${URL}/messages?receiver_id=${ID}&receiver_class=${user}`, {
        headers : headers
    })
    .catch((err) => {
        error = err.response.data.errors
    })

    return [res, error]
}

//SEND MESSAGE VIA CHANNEL
export const sendMessageChannel = async(headers, body, ID) => {
    const res = await axios.post(`${URL}/messages`, {
        receiver_id : ID,
        receiver_class : 'Channel',
        body : body
    }, {
        headers : headers
    })
    .catch((err) => {
        error = err.response.data.errors
    })

    return [res, error]
}
//SEND MESSAGE VIA USER
export const sendMessageUser = async(headers, body, ID) => {
    const res = await axios.post(`${URL}/messages`, {
        receiver_id : ID,
        receiver_class : 'User',
        body : body
    }, {
        headers : headers
    })
    .catch((err) => {
        error = err.response.data.errors
    })

    return [res, error]
}
