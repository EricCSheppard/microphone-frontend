import { Form, Button, Container } from 'react-bootstrap'

const MicForm = (props) => {
    // we need several props for a working, reusable form
    // the object itself, some handleChange fn, some handleSubmit fn
    // and in this case we'll add a custom heading
    
    const { mic, handleChange, handleSubmit, heading } = props

    return (
        <Container className='justify-content-center'>
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group ckassName='m-2'>
                    <Form.Label>Model:</Form.Label>
                    <Form.Control
                        placeholder="What is the Mic's Model"
                        name='model'
                        id='model'
                        value={ mic.model }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group ckassName='m-2'>
                    <Form.Label>Make:</Form.Label>
                    <Form.Control
                        placeholder="Who makes this Mic?"
                        name='make'
                        id='make'
                        value={ mic.make }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Mic type:</Form.Label>
                    <Form.Select
                        aria-label='mic type'
                        name='type'
                        defaultValue='Dynamic'
                        onChange={handleChange}
                    >
                    <option value='Dynamic'>Dynamic</option>
                    <option value='Condenser'>Condenser</option>
                    <option value='Ribbon'>Ribbon</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Check 
                        label='Does this Mic require phantom power?'
                        name='phantom'
                        defaultChecked={ mic.phantom }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className='m-2' type='submit'>Submit</Button>
            </Form>

        </Container>
    )
}

export default MicForm