import React, {FC, useEffect, useState} from "react"
import { TPainting } from "../store/paintingSlice"
import paintingS from "../styles/painting.module.css"
import { useAppDispatch, useAppSelector } from "../hocks"
import { toBasket } from "../store/toBasketSlice"
import creationOfAdam from "../assets/CreationOfAdam.png"
import anatomyLesson from "../assets/anatomyLesson.png"
import theBirthOfVenus from "../assets/theBirthOfVenus.png"
import theLustSupper from "../assets/theLustSupper.png"
import noPicture from "../assets/noPicture.png"



interface IPaintingProps {
    painting: TPainting
    handleUpdated(): void
    parantComponent: string
}

const Painting: FC<IPaintingProps> = ({painting, handleUpdated, parantComponent}) => {


    const dispatch = useAppDispatch()
    const {isPatching} = useAppSelector(state => state.toBasket)
    const [patching, setPatching] = useState(false)


    const handleToBasket = () => {
        if(parantComponent === "catalog") {
            dispatch(toBasket({id: painting.id, status: "in-puchase"}))
            setPatching(true)
            handleUpdated()
        }
        if(parantComponent === "basket") {
            dispatch(toBasket({id: painting.id, status: "available"}))
            setPatching(true)
            handleUpdated()
        }
    }

    useEffect(()=> {
            setPatching(false)
    }, [isPatching])


    let toBasketButtonText
    switch (parantComponent) {
        case "catalog":
            toBasketButtonText = patching && isPatching ? "Обновляется" : painting.status === "available" ? "Купить" : "✓ В корзине"
            break;
        case "basket":
            toBasketButtonText = patching && isPatching ? "Обновляется" : "Удалить"
            break;
        default:
            break;
    }
    let image
    switch (painting.paintingName) {
        case "Сотворение Адама":
            image = creationOfAdam
            break
        case "Тайная вечеря":
            image = theLustSupper
            break
        case "Урок анатомии":
            image = anatomyLesson
            break
        case "Рождение Венеры":
            image = theBirthOfVenus
            break
        default:
            image = noPicture
            break
    }

    const whithSale = <div>
                        <div className={paintingS.fullPrice}>{painting.price.value}$</div>
                        <div className={paintingS.actualPrice}>{painting.price.value * (1 - Number(painting.discount))}$</div>
                    </div>
    const notSold = <div className={paintingS.infoRow}>
                        <div className={paintingS.priceCell}>
                            {painting.discount? whithSale : <div className={paintingS.actualPrice}>{painting.price.value}$</div>}
                        </div>
                        <button className={painting.status === "available" ? paintingS.toBasket : paintingS.inBasket} onClick={() => handleToBasket()}>
                            {toBasketButtonText}</button>
                    </div>

    return(
        <div className={painting.status === "sold" ? paintingS.wrapperSold : paintingS.wrapper}>
            <div className={paintingS.image}>
                <img src={image} alt="" />
            </div>
            <div className={paintingS.name}>
                «{painting.paintingName}» <br/> {painting.authorFullName}
            </div>
            <div>
                {painting.status === "sold" ? <div className={paintingS.sold}>Проданa на аукционе</div> : notSold}
            </div>
        </div>
    )
}
export default Painting