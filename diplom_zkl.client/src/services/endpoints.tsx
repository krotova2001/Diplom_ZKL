export default class Endpoints {
    public static readonly login: string = "http://localhost:5216/login";
    public static readonly API_URL: string = "http://localhost:5216/";

    //для production
    //public static readonly login: string = "http://176.116.170.251/login";
    //public static readonly API_URL: string = "http://176.116.170.251/";

    public static readonly TASKS_API: string = `${Endpoints.API_URL}`+"api/Taskitems/";
    public static readonly PROJECT_API: string = `${Endpoints.API_URL}`+"api/Project/";

    //5216
}