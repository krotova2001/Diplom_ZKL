import Grid from '@mui/material/Grid';
import LeftBar from './components/LeftBar';
import NavBar from './components/NavBar';
import useRoutes from './routes/routes';

//���������� ������ - ������� ��������.
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
                    <div style={{marginLeft:'30px'}}>
                     {routes}
                     </div>
                </Grid>
            </ Grid>
        </>
    )
       
};
export default App;
