import { TaskItemModel } from "./taskitem";
import { User } from "./user";

export class ProjectItem
{
    public id!: string;
    public title!: string;
    public description: string | undefined;
    userNavigation!: User[];
    taskitemNavigation!: TaskItemModel[];  
}