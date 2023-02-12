import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllMics = () => {
    return axios(`${apiUrl}/mics`)
}

// READ -> Show
export const getOneMic = (id) => {
    return axios(`${apiUrl}/mics/${id}`)
}

// Create (create a mic)
export const createMic = (user, newMic) => {
    console.log('this is the user ', user)
    console.log('this is the new mic ', newMic)
    return axios({    
        url: `${apiUrl}/mics`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {
            mic: newMic
        }
    })
}

// Update (update a mic)
export const updateMic = (user, updatedMic) => {
    return axios({    
        url: `${apiUrl}/mics/${updatedMic.id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {
            mic: updatedMic
        }
    })
}

// Delete (delete a mic)
export const removeMic = (user, micId) => {
    return axios({    
        url: `${apiUrl}/mics/${micId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}