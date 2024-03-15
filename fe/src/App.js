import Main from "./Components/MainPage/Main";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route exact path = '/' element = {<Main />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
