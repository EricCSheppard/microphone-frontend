import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { updateBox } from '../../api/box'
import BoxForm from '../shared/BoxForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditBoxModal = (props) => {
    const { user, mic, show, handleClose, msgAlert, triggerRefresh } = props

    const [box, setBox] = useState(props.box)

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
        updateBox(user, mic.id, box)
            // first we'll close the modal
            .then(() => handleClose())
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success!',
                    message: 'Box updated',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user
            .catch(() => {
                msgAlert({
                    heading: 'Failure:',
                    message: 'Something went wrong!',
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
                    heading='Update the box'
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditBoxModal