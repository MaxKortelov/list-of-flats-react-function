import React, {useState, useEffect} from 'react'
import styles from './Booklist.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Flats from '../Flats/Flats'
import Change from '../Change/Change'

export default function Booklist () {

    // Функция получение массива с обьектами
    const bookApi = () => {
        fetch("https://realtor.p.rapidapi.com/properties/v2/list-for-rent?city=New%20York%20City&state_code=NY&limit=200&offset=0&sort=relevance", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "5639022070msh79c11963246f287p191dc9jsn36b6f4b98ad6",
                "x-rapidapi-host": "realtor.p.rapidapi.com"
            }
        })
            .then(data => data.json())
            .then(json => { setData({info: json.properties, isLoaded: true}); console.log(json.properties) })
            .catch(err => console.warn(err))
    }

    //Выполнения функции получения массива с обьектами
    const [data, setData] = useState({info: [], isLoaded: false});
    useEffect(() => bookApi(), []);

    //Удаление элемента из списка
    let deleteEl = (key) => {
        let newInfo = data.info.filter(el => el.property_id !== key)
        setData({info: newInfo, isLoaded: true})
    }

    //Изменения элемента из списка
    const [changeEl, setChange] = useState({el: [], isChange: false})
    let openChange = (key) => {
        let el = data.info.filter(el => el.property_id === key)
        let info = data.info.filter(el => el.property_id !== key)
        setData({info, isLoaded: true});
        setChange({el: el[0], isChange: true});
    }
    let closeChange = () => {
        let info = data.info;
        info.unshift(changeEl.el);
        setData({info, isLoaded: true});
        setChange({el: [], isChange: false});
    }

    //Изменение в обьект
    let saveChanges = (item) => {
        let info = data.info;
        info.unshift(item);
        setData({info, isLoaded: true});
        setChange({el: [], isChange: false});
    }

    // Обновить окно
    let rerenderEl = () => {
        setChange({el: changeEl.el, isChange: false});
        setChange({el: changeEl.el, isChange: true});
    }

    return(
        <>
            <div className={styles.mainBlock}>
                {!data.isLoaded && <div className="spinner-border" role="status"></div>}
                {data.isLoaded && <Flats info={data.info}
                                         deleteEl={deleteEl}
                                         openChange={openChange}
                />}
            </div>
            {changeEl.isChange && <Change closeChange={closeChange}
                                          el={changeEl.el}
                                          saveChanges={saveChanges}
                                          rerenderEl={rerenderEl}
            />}
        </>
    )
}