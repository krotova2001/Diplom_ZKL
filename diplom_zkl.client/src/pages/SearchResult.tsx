import { Typography } from '@mui/material';
import HeaderTop from '../components/HeaderTop';
import { useParams } from 'react-router';
import YandexSearch from '../services/search';

function SearchResult() {
  const  params  = useParams();
  const str = params['query'];
  console.log(str)
  YandexSearch.search(str).then((res) => {
    console.log(res);
    } );

  return (
    <>    
    <HeaderTop Header='Результаты поиска' />
    <Typography variant='h6'>Вы искали: "{str}"</Typography>
  
    </>
  );
}

export default SearchResult;