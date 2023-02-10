import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import { getAllMics } from '../../api/mics'
import messages from '../shared/AutoDismissAlert/messages'


// this is a styling object.  They're a quick easy way to add focused css properties to our react components.
// styling objets use any css style, but in camelCase instead of the typical hyphenated naming convention.
// this is because we're in js
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

// MicsIndex will make a request to the API for all pets
// once it receives a response, display a card for each pet
const MicsIndex = (props) => {
    const [mics, setMics] = useState(null)
    const [error, setError] = useState(false)
    // pull the message alert (msgAlert) from props
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
    // otherwise if there ARE no pets, display that message.
    else if (mics.length === 0) {
        return <p> No mics yet, go add some!</p>
    }
    // once we have an array of pets, loop over them
    // produce one card for every pet
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
    ))
    // return some jsx, a container with all the petcards
    return (
        <div className="container-md" style= { cardContainerStyle }>
            { micCards }
        </div>
    )
}

//export

export default MicsIndex