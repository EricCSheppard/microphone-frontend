import apiUrl from '../apiConfig'
import axios from 'axios'


//CREATE
// /box/:micId
export const createBox = (micId, newBox) => {
    return axios({    
        url: `${apiUrl}/box/${micId}`,
        method: 'POST',
        data: {
            box: newBox
        }
    })
}
// UPDATE
// /box/:micId/:boxId

export const updateBox = (user, micId, updatedBox) => {
    return axios({    
        url: `${apiUrl}/box/${micId}/${updatedBox._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {
            box: updatedBox
        }
    })
}


// DELETE
// /box/:micId/:boxId

export const deleteBox = (user, micId, boxId) => {
    return axios({    
        url: `${apiUrl}/box/${micId}/${boxId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}