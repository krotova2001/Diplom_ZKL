//класс пользователя
import { ProjectItem } from './projectitem';

export class User {
    id!: string;
    name: string | undefined;
    surname: string | undefined;
    email: string | undefined;
    token: string | undefined;
    pictureUrl: string | undefined;
    role:number | undefined = 0;
    IsAdmin:number = 0;
    telegramlogin: string | undefined;
    biography: string | undefined;
    Country: string | undefined;
    TimeZone: number | undefined = (Math.abs(new Date().getTimezoneOffset()))/60;
    Projects: ProjectItem[] = [];
}

export class NewUser extends User {
    password!: string;
    login!: string;
    pictureUrl = "";
}

export class usersInProject
{
    id!: string;
    name: string | undefined;
    surname: string | undefined;
    pictureUrl: string | undefined;
}