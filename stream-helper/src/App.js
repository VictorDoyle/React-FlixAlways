import routes from './config/routes';
/* Recoil */
import { userState } from "./recoil/atoms"
import { useSetRecoilState } from "recoil"
import Cookies from 'js-cookie';

function App() {
  const setUser = useSetRecoilState(userState)



  return (
    <>
     { routes }
     
    </>
  );
}

export default App;
