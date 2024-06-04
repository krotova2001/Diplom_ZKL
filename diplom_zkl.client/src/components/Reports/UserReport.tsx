import { useEffect, useState } from 'react';
import { User } from '../../models/user';
import userService from "../../services/user.service";

import { DataGrid } from '@mui/x-data-grid';

function UserReport() {
    const [allUsers, setallUsers] = useState<User[]>([]); //таблица пользователей

  

//загрузить таблицу юзеров
useEffect(() => {
    userService.getAllUsers().then(result => {
        setallUsers(result.data);
    })});

    return (

        <>
        
        <div style={{ height: 300, width: '100%' }}>
      
    </div>
        </>
    )
}

export default UserReport;