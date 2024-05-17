//заголовок второго уровня

import { Divider, Typography } from '@mui/joy';

type PropTypes = {
    Header: string
  };

const HeaderTop: React.FC<PropTypes> = ({Header=""}) => {
    return (
        <>
        <Typography sx={{
            marginLeft: '45 px',
            marginTop: '10px',
            padding: '5px',
          }} level="h3">
          {Header}
          </Typography>
          <Divider/>
         
          </>
       
    )
}

export default HeaderTop;