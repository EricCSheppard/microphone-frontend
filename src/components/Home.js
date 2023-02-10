import MicsIndex from './mics/MicsIndex'
import Container from 'react-bootstrap/Container'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<Container className='m-2' style={{textAlign: 'center'}}>
			<h2>See All The Mics</h2>
            <MicsIndex msgAlert={ props.msgAlert }/>
		</Container>
	)
}

export default Home
