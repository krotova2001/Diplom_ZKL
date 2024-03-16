//класс пользователя
export class User {
    id: string | undefined;
    name: string | undefined;
    surname: string | undefined;
    email: string | undefined;
    token: string | undefined;
    pictureUrl: string | undefined;
    role:number | undefined;
    IsAdmin:number | undefined;
    telegramlogin: string | undefined;
    biography: string | undefined;
    Country: string | undefined;
    TimeZone: number | undefined;
}

export class NewUser extends User {
    password: string | undefined;
    login: string | undefined;
    pictureUrl = "";
}