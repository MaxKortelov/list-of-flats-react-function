import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

export default function ChangeDescr(props) {
    const [elem, setElem] = useState(props.elem);

    let typeIn = (val) => {
        props.inputChange(elem, val);
        setElem(val);
    }

    return(
        <InputGroup className="mb-3">
            <InputGroup.Prepend>
                <InputGroup.Text>{props.name}</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl value={elem}
                         placeholder="Enter something"
                         onChange={(e) => typeIn(e.target.value)}
            />
        </InputGroup>
    )
}