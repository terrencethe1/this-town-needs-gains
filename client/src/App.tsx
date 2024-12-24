import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import Login from './pages/Login'
import AuthService from './utils/auth';


function App() {


  if (AuthService.loggedIn()) {
    return (
      <>
        <Header />
          <main>
            <Outlet />
          </main>
      </>
    )
  } else {
    return (
      <>
        <Header />
        <Login />
      </>
    )
  }

}


export default App
