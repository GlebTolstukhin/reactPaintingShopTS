import  {FC} from "react"
import page404S from "../styles/page404.module.css"

interface IPage404 {

}

const Page404: FC<IPage404> = () => {


    return (
        <div>
          <h2 className={page404S.title}>Упс, страница еще не готова.</h2>  
        </div>
    )
}

export default Page404