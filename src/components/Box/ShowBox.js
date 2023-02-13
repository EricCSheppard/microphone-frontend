import { Card, Button } from 'react-bootstrap'
import { deleteBox } from '../../api/box'
import EditBoxModal from './EditBoxModal'
import { useState } from 'react'

const ShowBox = (props) => {
    const { box, user, mic, msgAlert, triggerRefresh } = props
    const [editModalShow, setEditModalShow] = useState(false)

    const setBgStyle = (sty) => {
        if (sty === 'wood') {
            return({width: '18rem', backgroundColor: '#d1b073'})
        } else {
            return({width: '18rem', backgroundColor: '#969493'})
        }
    }

    const destroyBox = () => {
        deleteBox(user, mic.id, box._id)
            .then(() => {
                msgAlert({
                    heading: 'Box Deleted',
                    message: 'Box removed',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh no.',
                    message: 'Something went wrong, please try again.',
                    variant: 'danger'
                })
            })
    }
    return (
        <>
            <Card className='m-2' style={setBgStyle(box.style)}>
                <Card.Header>This mic has a {box.style} container.</Card.Header>
                <Card.Body>
                    <small>it keeps the mic safe!</small>
                </Card.Body>
                <Card.Footer>
                    <small>Condition: {box.condition} </small><br/>
                    {
                        user && mic.owner && user._id === mic.owner._id 
                        ?
                        <>
                            <Button onClick={() => setEditModalShow(true)
                            } variant='warning' className='me-2'>Edit Box</Button>
                            <Button 
                                variant='danger' 
                                onClick={() => destroyBox()}
                                >
                                    Delete Box
                                </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditBoxModal
                user={user}
                mic={mic}
                box={box}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowBox