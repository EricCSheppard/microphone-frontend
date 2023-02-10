import { useState, useEffect } from 'react'

// useParams from react-router-dom allows us to see our route parameters
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneMic } from '../../api/mics'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'




const ShowMic = (props) => {
    const [mic, setMic] = useState(null)
    // const [updated, setUpdated] = useState(false)

    const { id } = useParams()

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
    }, [])

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
                    </Card.Footer>  
                </Card>
            </Container>
        </>
    )
}

export default ShowMic