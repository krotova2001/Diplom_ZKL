import NavBar from './components/NavBar';
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
