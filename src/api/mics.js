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