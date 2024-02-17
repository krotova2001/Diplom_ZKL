import Grid from '@mui/material/Grid';
import LeftBar from './components/LeftBar';
import NavBar from './components/NavBar';
import useRoutes from './routes/routes';

//визуальный шаблон - главная страница.
const App = () => {
    const routes = useRoutes();
 
    return (
        <> 
            <NavBar />
            <Grid container spacing={1}>
                <Grid xs={1.5}>
                    <LeftBar />
                </Grid>
                <Grid xs={10.5}>
                     {routes}
                </Grid>
            </ Grid>
        </>
    )
       
};
export default App;
