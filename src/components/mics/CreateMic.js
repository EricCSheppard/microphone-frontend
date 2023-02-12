import { useState } from 'react'
import { createMic } from '../../api/mics'
import { createMicSuccess, createMicFailure } from'../shared/AutoDismissAlert/messages'
import MicForm from '../shared/MicForm'

// bring in the useNavigate hook from react-router-dom
import { useNavigate } from 'react-router-dom'


const CreateMic = (props) => {

    const { user, msgAlert } = props

    // set up( pull our navigate function from useNavigate)
    const navigate = useNavigate()
    // console.log('this is navigate', navigate)

    const [mic, setMic] = useState({
        model: '',
        make: '',
        type: '',
        phantom: false
    })

    const onChange = (e) => {
        e.persist()

        setMic(prevMic => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            // if (e.target.type === 'number') {
            //     updatedValue = parseInt(e.target.value)
            // }

            // to handle a checkbox, we can check the name, and change the value that is output.  Checkboxes only know if they are checked or not
            if (updatedName === 'phantom' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'phantom' && !e.target.checked) {
                updatedValue = false
            }
            
            const updatedMic = {
                [updatedName] : updatedValue
            }
            return {
                ...prevMic, ...updatedMic
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log('this is the mic', mic)
        createMic(user, mic)
            // first we'll nav to the show page
            .then(res => { navigate(`/mics/${res.data.mic.id}`)})
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createMicSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: createMicFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <MicForm
            mic={mic}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading='Add a new Mic!'
        />
    )
}

export default CreateMic