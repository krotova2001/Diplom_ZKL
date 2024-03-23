//класс пользователя
export class User {
    id!: string;
    name: string | undefined;
    surname: string | undefined;
    email: string | undefined;
    token: string | undefined;
    pictureUrl: string | undefined;
    role:number | undefined;
    IsAdmin!:number;
    telegramlogin: string | undefined;
    biography: string | undefined;
    Country: string | undefined;
    TimeZone: number | undefined;
}

export class NewUser extends User {
    password!: string;
    login!: string;
    pictureUrl = "";
}