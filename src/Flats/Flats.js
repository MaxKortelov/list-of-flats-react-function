import React, {useState, useEffect} from 'react'
import styles from './Flats.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from "react-bootstrap/cjs/Carousel";
import Button from "react-bootstrap/Button";

export default function Flats(props) {

    // Рендеринг всех обьектов на странице
    let flat = props.info.map(el => {
        return <div className={styles.card}
                    key={el.property_id}>
                <div className={styles.cardInner}>
                    <div className={styles.imgWrap}
                         onClick={() => watchPic(el.property_id)}
                    >
                        <img src={el.photos[0].href}
                         className={styles.img}
                        />
                    </div>
                    <div className={styles.description}>
                        <div className={styles.title}>{el.prop_type[0].toUpperCase() + el.prop_type.slice(1)}</div>
                        <div className={styles.address}>
                            <b>Address:</b> {el.address.postal_code}, {el.address.country}, {el.address.state},
                            {el.address.city}, {el.address.line}
                        </div>
                        <div className={styles.address}>
                            <div><b>Bath:</b> {el.community.baths_max}</div>
                            <div><b>Bed:</b> {el.community.beds_max}</div>
                            <div><b>Price:</b> ${el.community.sqft_min}</div>
                        </div>
                        <div className={styles.buttons}>
                            <Button variant="primary"
                                    onClick={() => props.openChange(el.property_id)}
                            >Change</Button>
                            <Button variant="danger"
                                    onClick={() => props.deleteEl(el.property_id)}
                            >Delete</Button>
                        </div>
                    </div>
                </div>
                </div>
    })

    // Выбор нужного обьекта для слайдера
    const [image, setImage] = useState({images: [], isImg: false});
    let watchPic = (key) => {
        let el = props.info.filter(el => el.property_id === key);
        setImage({images: el[0].photos, isImg: true});
    }

    // Рендеринг Картинок в Слайдер
    let renderImage = image.images.map((el, i) => {
        return (<Carousel.Item key={i}>
            <img src={el.href} alt="picture" />
        </Carousel.Item>);
    });

    return (<>
                <div className={styles.field}>
                    {flat}
                </div>
                {image.isImg &&
                <div className={styles.imageScope}>
                    <div className={styles.close}
                         onClick={() => setImage({images: [], isImg: false})}
                    />
                    <Carousel className={styles.carousel}>
                    {renderImage}
                    </Carousel>
                </div>}
            </>
    )
}