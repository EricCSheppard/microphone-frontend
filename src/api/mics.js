import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllMics = () => {
    return axios(`${apiUrl}/mics`)
}