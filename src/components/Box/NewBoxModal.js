import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { createBox } from '../../api/box'
import BoxForm from '../shared/BoxForm'
import messages from '../shared/AutoDismissAlert/messages'

const NewBoxModal = (props) => {
    const { user, mic, show, handleClose, msgAlert, triggerRefresh } = props

    const [box, setBox] = useState({})

    const onChange = (e) => {
        e.persist()

        setBox(prevBox => {
            const updatedName = e.target.name
            let updatedValue = e.target.value
    
            const updatedBox = {
                [updatedName] : updatedValue
            }
            return {
                ...prevBox, ...updatedBox
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log('the box submitted', box)
        createBox(mic.id, box)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success!',
                    message: messages.createBoxSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user
            .catch(() => {
                msgAlert({
                    heading: 'Failure:',
                    message: messages.createBoxFailure,
                    variant: 'danger'
                })
            })
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <BoxForm 
                    box={box}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading='Add a box!'
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewBoxModal