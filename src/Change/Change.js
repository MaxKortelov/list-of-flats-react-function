import React, {useState} from 'react';
import styles from './Change.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert';
import ChangeDescr from './ChangeDescr/ChangeDescr';
import ChangeImg from './ChangeImg/ChangeImg';

export default function Change(props) {

    const [item, setItem] = useState(props.el);

    //Обновление состояния адреса изображения по нажатию кнопки
    let changeImg = (oldVal, val) => {
        let newItem = item;

        for(let key in newItem.photos) {
            if(newItem.photos[key].href === oldVal) {
                newItem.photos[key].href = val;
            }
        }
        setItem(newItem);
    };

    //Добавление поля для изображений
    let addFieldImg = () => {
        let newItem = item;
        newItem.photos.push({href: ''});
        setItem(newItem);
        props.rerenderEl();
    };

    //Удаление поля для изображений
    let deleteFieldImg = (key) => {
        let newItem = item;
        if(newItem.photos.length > 1) {
            newItem.photos.splice(key, 1);
            setItem(newItem);
            props.rerenderEl();
        }
    };

    // Список изображений
    let renderList = item.photos.map( (el, i) => {
         return <ChangeImg key={i}
                           num={i}
                           elem={el.href}
                           changeImg={changeImg}
                           deleteFieldImg={deleteFieldImg}
                />
    });

    // Обновление состояния item по нажатию
    let inputChange = (oldVal, val) => {
        let newItem = item;

        for(let key in newItem) {
            if(newItem[key] === oldVal) {
                newItem[key] = val;
            }
        }

        for(let key in newItem.address) {
            if(newItem.address[key] === oldVal) {
                newItem.address[key] = val;
            }
        }

        for(let key in newItem.community) {
            if(newItem.community[key] === oldVal) {
                newItem.community[key] = val;
            }
        }
        setItem(newItem);
    };
    const [warning, setWarning] = useState(false);
    //Проверка заполнения полей
    let checkFields = (func) => {
        if(item.prop_type && item.address.postal_code && item.address.country &&
            item.address.state && item.address.city && item.address.line &&
            item.community.baths_max && item.community.beds_max && item.community.sqft_min) {
            setWarning(false);
            func(item);
        } else {
            setWarning(true)
        }
    };

    return(
        <div className={styles.changeBox}>
            <div className={styles.darkFont}
                 onClick={() => checkFields(props.closeChange)}
            />
            <div className={styles.changeWindow}>
                <div className={styles.title}>Add changes</div>
                {warning && <Alert variant="danger">Don't leave empty fields!</Alert>}
                <div className={styles.innerChanges}>
                    <div className={styles.imgBlock}>
                        <Alert variant="success" className={styles.alert}>Images</Alert>
                        <div className={styles.list}>{renderList}</div>
                        <Button variant="secondary"
                                onClick={() => addFieldImg()}
                        >Add</Button>
                    </div>
                    <div className={styles.imgBlock}>
                        <Alert variant="success" className={styles.alert}>Description</Alert>
                        <div className={styles.imgBlockDescription}>
                            <ChangeDescr name="Type: " elem={item.prop_type} inputChange={inputChange} />
                            <ChangeDescr name="ZIP: " elem={item.address.postal_code} inputChange={inputChange} />
                            <ChangeDescr name="Country: " elem={item.address.country} inputChange={inputChange}/>
                            <ChangeDescr name="State: " elem={item.address.state} inputChange={inputChange} />
                            <ChangeDescr name="City: " elem={item.address.city} inputChange={inputChange}/>
                            <ChangeDescr name="Address: " elem={item.address.line} inputChange={inputChange} />
                            <ChangeDescr name="Bath: " elem={item.community.baths_max} inputChange={inputChange} />
                            <ChangeDescr name="Bed: " elem={item.community.beds_max} inputChange={inputChange} />
                            <ChangeDescr name="Price: $" elem={item.community.sqft_min} inputChange={inputChange} />
                        </div>
                    </div>
                </div>
                <div className={styles.completeButtons}>
                    <Button variant="primary"
                            onClick={() => checkFields(props.saveChanges)}
                    >Safe</Button>
                    <Button variant="danger"
                            onClick={() => props.closeDeleteChange()}
                    >Delete</Button>
                </div>
            </div>
        </div>
    )
}