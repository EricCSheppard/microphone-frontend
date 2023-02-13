import { useState, useEffect } from 'react'

// useParams from react-router-dom allows us to see our route parameters
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneMic, removeMic, updateMic } from '../../api/mics'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'
import EditMicModal from './EditMicModal'
import ShowBox from '../Box/ShowBox'
import NewBoxModal from '../Box/NewBoxModal'

const boxCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowMic = (props) => {
    const [mic, setMic] = useState(null)
    const [updated, setUpdated] = useState(false)
    const [boxModalShow, setBoxModalShow] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)


    const { id } = useParams()
    const navigate = useNavigate()

    const { user, msgAlert } = props

    useEffect(() => {
        getOneMic(id)
            .then(res => setMic(res.data.mic))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting Mics',
                    message: messages.getMicsFailure,
                    variant: 'danger'
                })
            })
    }, [updated])

    const deleteMic = () => {
        removeMic(user, mic.id)
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.deleteMicSuccess,
                    variant: 'success'
                })
            })
            .then(() => {navigate('/')
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: messages.deleteMicFailure,
                    variant: 'danger'
                })
            })
    }
    let boxCards
    if (mic) {
        if (mic.box.length > 0) {
            boxCards = mic.box.map(box => (
                <ShowBox
                    key={box.id}
                    box={box}
                    user={user}
                    mic={mic}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }

    if (!mic) {
        return <LoadingScreen />
    }
    return (
        <>
            <Container>
                <Card>
                    <Card.Header>{ mic.make } { mic.model }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Type: { mic.type }</small></div>
                            <div><small>Phantom powered: { mic.phantom ? 'yes' : 'no' }</small></div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <Button 
                            className='m-2' variant='info'
                            onClick={() => setBoxModalShow(true)}>Add a Box</Button>
                        {
                            mic.owner && user && mic.owner._id === user._id ? 
                            <>
                                <Button 
                                className='m-2'
                                variant='warning'
                                onClick={() => setEditModalShow(true)}

                                >
                                    Edit Mic
                                </Button>
                                <Button 
                                className='m-2' variant='danger'
                                onClick={() => deleteMic()}
                                >
                                    Delete Mic
                                </Button>
                            </> : null
                        }
                    </Card.Footer>  
                </Card>
            </Container>
            <Container className='m-2' style={boxCardContainerLayout}>
                {boxCards}
            </Container>
            <EditMicModal
                user={user}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                updateMic={updateMic}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                mic={mic}
            />
            <NewBoxModal
                user={user}
                mic={mic}
                show={boxModalShow}
                handleClose={() => setBoxModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </>
    )
}

export default ShowMic