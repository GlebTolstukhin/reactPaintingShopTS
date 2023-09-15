import React, {FC, useState} from "react"
import {NavLink, Outlet} from "react-router-dom"
import headerS from "../styles/header.module.css"
import s from "../styles/universalStyles.module.css"
import { useAppDispatch } from "../hocks"
import { addFilter } from "../store/filterSlice"
import logoLigh from "../assets/logoLight.svg"
import logoDark from "../assets/logoDark.svg"
import phoneIcon from "../assets/phoneIcon.svg"
import addressIcon from "../assets/addressIcon.svg"


interface IHeaderProps {

}

type TLinkClass = {
    isActive: boolean,
    isPending: boolean,
}

const Header: FC<IHeaderProps> = () => {

    const [filter, setFilter] = useState("")
    const dispatch = useAppDispatch()

    function handleFilter(filter: string): void {
        dispatch(addFilter(filter))
        setFilter("")
    }

    function isActive(arg: TLinkClass): string {
        return arg.isActive ? headerS.active : headerS.link
    }


    return (
        <div>
            <header className={headerS.header}>
                <div className={s.container}>
                    <div className={headerS.headerRow}>
                        <nav className={headerS.navigation}>
                        <NavLink to={"/"} className={headerS.logo}>
                            <img src={logoLigh} alt="" />
                        </NavLink>
                        <NavLink className={isActive} to={"/"}>Каталог</NavLink>
                        <NavLink className={isActive} to={"/basket"}>Карзина</NavLink>
                        <NavLink className={isActive} to={"/yourPainting"}>Пледложить картину</NavLink>
                        <NavLink className={isActive} to={"/contacts"}>Контакты</NavLink>
                        <NavLink className={isActive} to={"/about"}>О галерее</NavLink>
                        </nav>
                        <div className={headerS.serchingRow}>
                            <input onChange={(e) => setFilter(e.target.value)} className={headerS.searchingInput}
                            value={filter} type="text" placeholder="Поиск по названию картины" />
                            <NavLink to={"/"} onClick={() => handleFilter(filter)} className={headerS.searchingButton}>Найти</NavLink>
                        </div>
                    </div>
                </div>
            </header>
                <div className={s.container}>
                    <Outlet />
                </div>
            <footer className={headerS.footer}>
                <div className={s.container}>
                    <footer className={headerS.headerRow}>
                        <nav className={headerS.navigation}>
                            <NavLink to={"/"} className={headerS.logo}>
                                <img src={logoDark} alt="" />
                            </NavLink>
                            <NavLink className={isActive} to={"/"}>Каталог</NavLink>
                            <NavLink className={isActive} to={"/basket"}>Карзина</NavLink>
                            <NavLink className={isActive} to={"/yourPainting"}>Пледложить картину</NavLink>
                            <NavLink className={isActive} to={"/contacts"}>Контакты</NavLink>
                            <NavLink className={isActive} to={"/about"}>О галерее</NavLink>
                        </nav>
                        <div className={headerS.serchingRow}>
                            <div className={headerS.phoneNumber}><img src={phoneIcon} alt="" />+7 (495) 555-55-55</div>
                            <div className={headerS.adress}><img src={addressIcon} alt="" /> г. Москва, ул. Расплетина, 24</div>
                        </div>
                    </footer>
                </div>
            </footer>
        </div>
        
    )
}

export default Header