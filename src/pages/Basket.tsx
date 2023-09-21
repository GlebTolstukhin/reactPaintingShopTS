import React, {FC, useEffect, useState} from "react"
import basketS from "../styles/basket.module.css"
import { useAppDispatch, useAppSelector } from "../hocks"
import { fetchPaintings } from "../store/paintingSlice"
import Painting from "../components/Painting"

interface IBasket {

}

const Basket: FC<IBasket> = () => {

    const dispatch = useAppDispatch()
    const [hasUpdated, setUpdatet] = useState(false)


    const handleUpdated = (): void => {
        setUpdatet(!hasUpdated)
    }


    useEffect( () => {
        dispatch(fetchPaintings())
    }, [dispatch, hasUpdated])

    let {paintingList} = useAppSelector(state => state.paintings)
    paintingList = paintingList.filter(painting => painting.status === "in-puchase")

    return (
        <div>
            <h2 className={basketS.title}>Моя карзина</h2>
            {!paintingList.length ? <div className={basketS.emptyBasket}>Корзина все еще пуста</div> : ""}
            <div className={basketS.paintingGrid}>
                {paintingList.map(painting => <Painting parantComponent="basket"
                    handleUpdated={handleUpdated} key={painting.id} painting={painting}/>)}
            </div>
        </div>
    )
}

export default Basket