//класс пользователя
export class User {
    id!: string;
    name: string | undefined;
    surname: string | undefined;
    email: string | undefined;
    token: string | undefined;
    pictureUrl: string | undefined;
    role:number | undefined = 0;
    IsAdmin!:number;
    telegramlogin: string | undefined;
    biography: string | undefined;
    Country: string | undefined;
    TimeZone: number | undefined = (Math.abs(new Date().getTimezoneOffset()))/60;
}

export class NewUser extends User {
    password!: string;
    login!: string;
    pictureUrl = "";
}