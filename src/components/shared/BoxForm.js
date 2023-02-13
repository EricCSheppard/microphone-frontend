import { Form, Button, Container } from 'react-bootstrap'

const BoxForm = (props) => {

    const { box, handleChange, handleSubmit, heading } = props

    return (
        <Container className='justify-content-center'>
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
            <Form.Group className='m-2'>
                <Form.Label>Box Style:</Form.Label>
                    <Form.Select
                        aria-label='box style'
                        name='style'
                        defaultValue={box.style}
                        onChange={handleChange}
                    >
                    <option>Please Select a style:</option>
                    <option value='wood'>Wood</option>
                    <option value='plastic'>Plastic</option>
                    <option value='bag'>Bag</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Box Condition:</Form.Label>
                    <Form.Select
                        aria-label='box condition'
                        name='condition'
                        defaultValue={box.condition}
                        onChange={handleChange}
                    >
                    <option>Please Select a condition:</option>
                    <option value='new'>new</option>
                    <option value='used'>used</option>
                    </Form.Select>
                </Form.Group>
                <Button className='m-2' type='submit'>Submit</Button>
            </Form>

        </Container>
    )
}

export default BoxForm