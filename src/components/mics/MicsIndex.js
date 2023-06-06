import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import { getAllMics } from '../../api/mics'
import messages from '../shared/AutoDismissAlert/messages'

const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const MicsIndex = (props) => {
    const [mics, setMics] = useState(null)
    const [error, setError] = useState(false)
    const { msgAlert } = props

    useEffect(() => {
        getAllMics()
            .then(res => setMics(res.data.mics))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting mics',
                    message: messages.getMicsFailure,
                    variant: 'danger'
                })
                setError(true)
            })
    }, [])

    if (error) {
        return <p>Error!</p>
    }
    if (!mics) {
        return <LoadingScreen />
    }

    else if (mics.length === 0) {
        return <p> No mics yet, go add some!</p>
    }

    const micCards = mics.map(mic => (
        
        
        <Card key={ mic.id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ mic.make} { mic.model }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/mics/${mic.id}`} className='btn btn-info'>View { mic.make} { mic.model }</Link>
                </Card.Text>
                { mic.owner ?
                <Card.Footer>
                    owner: {mic.owner.email}     
                </Card.Footer>
                : null }
            </Card.Body>
        </Card>
        // <div class='post-it'>
        //     <p>{ mic.model } </p><br/>
        //     <p> { mic.make } </p>
        //     <Link to={`/mics/${mic.id}`}>View { mic.make} { mic.model }</Link>
        // </div>
    ))
    return (
        <div className="container-md" style= { cardContainerStyle }>
            { micCards }
        </div>
    )
}

export default MicsIndex