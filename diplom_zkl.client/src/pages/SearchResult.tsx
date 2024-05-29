import HeaderTop from '../components/HeaderTop';
import { useParams } from 'react-router';
import NasaSearch from '../services/search';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import { AspectRatio, Button, Sheet, Stack } from '@mui/joy';
import { useState } from 'react';

function SearchResult() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const  params  = useParams();
  const str = params['query'];

  NasaSearch.search(str).then((res) => {
    setItems(res.data.collection.items);
    setIsLoaded(true);
    } );

  return (
    <>    
    <HeaderTop Header='Результаты поиска' />
    <Typography level='title-lg'>Вы искали: "{str}"</Typography>
    <Typography level='body-sm'>Так как поиск мы не доделали, предлагаем вам результаты запроса по вашему слову в базе данных изображений NASA<br/></Typography>
    <div style={{display: "flex", flexDirection: "row", flexWrap:"wrap"}}>
  {(!isLoaded||items.length==0)? <Typography level="body-sm">Загружаю...</Typography>:
  items.map((item:any, index:number) => (
    
    
    <Card sx={{ width: 320, margin: '0.5rem' }}>
        <div>
          <Typography level="title-lg">{item.data[0].title}</Typography>
          
          <IconButton
            aria-label="bookmark Bahamas Islands"
            variant="plain"
            color="neutral"
            size="sm"
            sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
          >
            <BookmarkAdd />
          </IconButton>
        </div>
        <AspectRatio minHeight="120px" maxHeight="200px">
          <img
            src={item.links[0].href}
            srcSet={item.links[0].href}
            loading="lazy"
            alt="" />
        </AspectRatio>
        <CardContent orientation="horizontal">
          <div>
            <Typography level="body-xs">{item.data[0].date_created}</Typography>
            
          </div>
          <Button
            variant="solid"
            size="md"
            color="primary"
            aria-label="Explore Bahamas Islands"
            sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
            onClick={() => {window.open(window.location.href = item.links[0].href)}}
          >
            Подробнее
          </Button>
        </CardContent>
      </Card>))}
    </div>
    </>
  );
}

export default SearchResult;