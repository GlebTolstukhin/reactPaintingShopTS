import  {FC, useState} from "react"
import s from "../styles/universalStyles.module.css"
import yourPaintingS from "../styles/yourPainting.module.css"
import { useAppDispatch } from "../hocks"
import { addPainting } from "../store/addPaintingSlice"
interface IYourPainting {

}

const YourPainting: FC<IYourPainting> = () => {

    const [name, setName] = useState("")
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState("")

    const dispatch = useAppDispatch()
    
     const handleAdd = () => {
        if (name && author && price) {
            let payload = {
                name,
                author,
                price,
            }
            dispatch(addPainting(payload))
        } else {
            alert("Заполните все поля формы")
        }
        setName("")
        setAuthor("")
        setPrice("")
     }

    return (
        <div className={s.container}>   
            <h2 className={yourPaintingS.title}>Вы можете предложить свою картину для продажи на нашей площадке.</h2>
            <div className={yourPaintingS.info}>Вам нужно просто указать имя художника, название картины и цену,
                которую Вы планируете за нее выручить - остальное мы сделаем сами.
            </div>
            <div className={yourPaintingS.paintingForm}>
                <div className={yourPaintingS.valueType}>Название картины:</div>
                <input value={name} onChange={(e) => setName(e.target.value)}
                     className={yourPaintingS.input} type="text" />
                <div className={yourPaintingS.valueType}>Имя художника:</div>
                <input value={author} onChange={(e) => setAuthor(e.target.value)}
                     className={yourPaintingS.input} type="text" />
                <div className={yourPaintingS.valueType}>Ваша цена:</div>
                <input value={price} onChange={(e) => setPrice(e.target.value)}
                     className={yourPaintingS.input} type="number" />
                <button onClick={handleAdd} className={yourPaintingS.button}>Предложить картину</button>
            </div>
        </div>
    )
}   
export default YourPainting