import HeaderTop from '../components/HeaderTop';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Switch from '@mui/joy/Switch';
import { useEffect, useState } from 'react';
import { Box, Button, Snackbar, VariantProp } from '@mui/joy';
import { Divider } from '@mui/material';
import Slider from '@mui/joy/Slider';
import utilsService from '../services/utils.service';
import Typography from '@mui/joy/Typography';

function MySettings() {
  const [checked, setChecked] = useState<boolean>(true);
  const [checked1, setChecked1] = useState<boolean>(false);
  const [checked2, setChecked2] = useState<boolean>(false);
  const [checked3, setChecked3] = useState<boolean>(false);
  const [variant, setVariant] = useState<VariantProp>('solid');
  const [currentWeather, setCurrentWeather]  = useState<String>();
  const [openSnackbar, setOpenSnackbar] = useState(false); //всплывашка справа
  
  useEffect(() => {
    utilsService.getCurrentWeather().then((res) => {
      setCurrentWeather(res.data.main.temp);
    });
  }, []);

  const marks = [
    {
      value: 0,
      label: '-50°C',
    },
    {
      value: 20,
      label: '-35°C',
    },
    {
      value: 37,
      label: '-25°C',
    },
    {
      value: 100,
      label: '-20°C',
    },
  ];
  
    function valueText(value: number) {
        setVariant("solid");
    return `${value}°C`;
  }
  return (
    <>
    <HeaderTop Header='Настройки аккаунта' />
    
    <Box sx={{ 
      flex: 1, width: '70%', 
    rounded:'md', overflow: 'auto', 
    p: 2, m: 2, mt: 0, mb: 0, 
    border: '1px solid', 
    borderColor: 'neutral.300', 
    borderRadius:'md',
    marginTop: '1rem'
    
    }}>
        <Typography level='h4'>Уведомления</Typography>
        <Divider sx={{ mb: 1 }} />


    <FormControl
      orientation="horizontal"
      sx={{ width: 300, justifyContent: 'space-between', mb: 1 }}
    > 
        <div>
        <FormLabel>Уведомления Telegram</FormLabel>
        <FormHelperText sx={{ mt: 0 }}>О выполненных задачах</FormHelperText>
      </div>
      <Switch
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.checked)
        }
        color={checked ? 'success' : 'neutral'}
        variant={checked ? 'solid' : 'outlined'}
        endDecorator={checked ? 'Да' : 'Нет'}
        slotProps={{
          endDecorator: {
            sx: {
              minWidth: 24,
            },
          },
        }}
      />
    </FormControl> 

    <FormControl
      orientation="horizontal"
      sx={{ width: 300, justifyContent: 'space-between', mb: 1 }}
    > 
        <div>
        <FormLabel>Уведомления на почту</FormLabel>
        <FormHelperText sx={{ mt: 0 }}>О выполненных задачах</FormHelperText>
      </div>
      <Switch
        checked={checked1}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setChecked1(event.target.checked)
        }
        color={checked1 ? 'success' : 'neutral'}
        variant={checked1 ? 'solid' : 'outlined'}
        endDecorator={checked1 ? 'Да' : 'Нет'}
        slotProps={{
          endDecorator: {
            sx: {
              minWidth: 24,
            },
          },
        }}
      />
    </FormControl> 

    <FormControl
      orientation="horizontal"
      sx={{ width: 300, justifyContent: 'space-between', mb: 1 }}
    > 
        <div>
        <FormLabel>Напоминать о сроке выполнения задач</FormLabel>
        <FormHelperText sx={{ mt: 0 }}>За 1 день</FormHelperText>
      </div>
      <Switch
        checked={checked2}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setChecked2(event.target.checked)
        }
        color={checked2 ? 'success' : 'neutral'}
        variant={checked2 ? 'solid' : 'outlined'}
        endDecorator={checked2 ? 'Да' : 'Нет'}
        slotProps={{
          endDecorator: {
            sx: {
              minWidth: 24,
            },
          },
        }}
      />
    </FormControl> 
    
    </Box>

    <Box sx={{ 
      flex: 1, width: '70%', 
    rounded:'md', overflow: 'auto', 
    p: 2, m: 2, mt: 0, mb: 0, 
    border: '1px solid', 
    borderColor: 'neutral.300', 
    borderRadius:'md',
    marginTop: '1rem'
    
    }}>
        <Typography level='h4'>Конфиденциальность</Typography>
        <Divider sx={{ mb: 1 }} />
        <FormControl
      orientation="horizontal"
      sx={{ width: 300, justifyContent: 'space-between', mb: 1 }}
    > 
        <div>
        <FormLabel>Моя биография видна</FormLabel>
        <FormHelperText sx={{ mt: 0 }}>членам команды</FormHelperText>
      </div>
      <Switch
        checked={checked3}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setChecked3(event.target.checked)
        }
        color={checked3 ? 'success' : 'neutral'}
        variant={checked3 ? 'solid' : 'outlined'}
        endDecorator={checked3 ? 'Да' : 'Нет'}
        slotProps={{
          endDecorator: {
            sx: {
              minWidth: 24,
            },
          },
        }}
      />
    </FormControl> 
        </Box>

        <Box sx={{ 
      flex: 1, width: '70%', 
    rounded:'md', overflow: 'auto', 
    p: 2, m: 2, mt: 0, mb: 0, 
    border: '1px solid', 
    borderColor: 'neutral.300', 
    borderRadius:'md',
    marginTop: '1rem'
    
    }}>
        <Typography level='h4'>Прочее</Typography>
        <Divider sx={{ mb: 1 }} />
        <FormControl
      orientation="horizontal"
      sx={{ width: 300, justifyContent: 'space-between', mb: 1 }}
    > 
       <Box sx={{ mt: '3em' }}>
        <FormLabel>Температура на улице</FormLabel>
        <FormHelperText sx={{ mt: 0 }}>При которой замораживаются все задачи</FormHelperText>
        {currentWeather == undefined ? ''  : <Typography variant="outlined" color="success" level="body-sm">Текущая температура {currentWeather}</Typography>  }
      </Box>
      <Box sx={{ mx: 'auto', height: 200 }}>
      <Slider
        orientation="vertical"
        aria-label="Always visible"
        defaultValue={80}
        getAriaValueText={valueText}
        step={10}
        marks={marks}
        valueLabelDisplay="off"
      />
    </Box>
    </FormControl> 
    
        </Box>


      <Box sx={{ 
      flex: 1, width: '70%', 
    rounded:'md', overflow: 'auto', 
    p: 2, m: 2, mt: 0, mb: 0, 
    border: '1px solid', 
    borderColor: 'neutral.300', 
    borderRadius:'md',
    marginTop: '1rem'
    
    }}>




        <Button size="md" variant={variant} color="success" onClick={() => setOpenSnackbar(true)}>
          Сохранить
        </Button>
        </Box>

        <Snackbar
                    variant="soft"
                    color="success"
                    open={openSnackbar}
                    onClose={() => setOpenSnackbar(false)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    autoHideDuration={3000}>
                    Изменения сохранены
                </Snackbar>
                
    </>
  );
}
  
export default MySettings;