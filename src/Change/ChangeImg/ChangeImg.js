import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from "react-bootstrap/Button";

export default function ChangeImg(props) {
    const [elem, setElem] = useState(props.elem);

    let typeIn = (val) => {
        props.changeImg(elem, val);
        setElem(val);
    };

    return(
        <InputGroup className="mb-3">
            <FormControl
                placeholder="Image source"
                value={elem}
                onChange={(e) => typeIn(e.target.value)}
            />
            <InputGroup.Append>
                <Button variant="danger"
                        onClick={() => props.deleteFieldImg(props.num)}
                >Delete</Button>
            </InputGroup.Append>
        </InputGroup>
    )
}