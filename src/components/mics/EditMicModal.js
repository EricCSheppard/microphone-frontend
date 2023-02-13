import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import MicForm from '../shared/MicForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditMicModal = (props) => {
    // destructure our props
    const { user, show, handleClose, updateMic, msgAlert, triggerRefresh } = props

    const [mic, setMic] = useState(props.mic)

    const onChange = (e) => {
        e.persist()

        setMic(prevMic => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

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
        updateMic(user, mic)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.updateMicSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.updateMicFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <MicForm 
                    mic={mic} 
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading='Update Mic'
                    /> 
            </Modal.Body>
        </Modal>
    )
}

export default EditMicModal