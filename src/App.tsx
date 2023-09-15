import './App.css';

import {Routes, Route} from "react-router-dom"
import Header from './components/Header';
import Catalog from './pages/Catalog';
import Basket from './pages/Basket';
import YourPainting from './pages/YourPainting';
import Page404 from './pages/Page404';

function App() {

  


  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<Header />}>
            <Route index element={<Catalog/>}></Route>
            <Route path='basket' element={<Basket/>}></Route>
            <Route path='yourPainting' element={<YourPainting/>}></Route>
            <Route path='contacts' element={<Page404/>}></Route>
            <Route path='about' element={<Page404/>}></Route>
          </Route>
      </Routes>
    </div>
  );
}

export default App;
