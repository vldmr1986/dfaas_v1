
import './App.sass';
import Login from "./components/login";
import Clusters from "./components/clusters";
import {useState} from "react";

function App() {
    const [userData, setUserData] = useState({isAuth: false, customerid: null, customername: ""});
    const {isAuth} = userData;
      return isAuth
                ? <Clusters {...userData} />
                : <Login setUserData={setUserData} />
}

export default App;
