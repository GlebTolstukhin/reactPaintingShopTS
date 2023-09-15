import React, {FC, useEffect, useState} from "react"
import { useAppDispatch, useAppSelector } from "../hocks"
import { fetchPaintings } from "../store/paintingSlice"
import catalogS from "../styles/catalog.module.css"
import Painting from "../components/Painting"

interface ICatalog {

}

const Catalog: FC<ICatalog> = () => {



    const dispatch = useAppDispatch()
    

    

    let {paintingList = []} = useAppSelector(state => state.paintings)
    const filter = useAppSelector(state => state.filter.filter)
    paintingList = paintingList.filter(painting =>
         painting.authorFullName.replaceAll(" ", "").toLowerCase().includes(filter.replaceAll(" ", "").toLowerCase()) ||
          painting.paintingName.replaceAll(" ", "").toLowerCase().includes(filter.replaceAll(" ", "").toLowerCase()))

    const [hasUpdated, setUpdated] = useState(false)
    

    useEffect(() => {
        dispatch(fetchPaintings())
    }, [dispatch, hasUpdated])


    const handleUpdated = (): void => {
        setUpdated(!hasUpdated)
    }

    return (
        <div >
            <h2 className={catalogS.title}>Картины эпохи возраждения</h2>
            <div className={catalogS.paintingGrid}>
                {paintingList.map(painting => <Painting parantComponent="catalog"
                    handleUpdated={handleUpdated} key={painting.id} painting={painting}/>)}
            </div>
        </div>
    )
}

export default Catalog