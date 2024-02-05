import Header from './components/Header';
import NavBar from './components/NavBar';
import Navigation from './components/Navigation';
import useRoutes from './routes/routes';


const App = () => {
    const routes = useRoutes();
 
    return (
        <>
           <NavBar />{routes}
        </>
    )
};
export default App;
