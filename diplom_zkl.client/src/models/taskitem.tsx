//класс задачи
export class TaskItemModel
{
    public id!: string;
    public title!: string;
    public description: string|undefined;
    public start: Date | null | undefined;
    public end: Date|undefined;
    public createdAt!: Date;
    public author!: string;
    public statement!: number;
}

export class NewTask
{
    public Title!: string;
    public Description: string|undefined;
    public Start: Date | null | undefined;
    public End: Date|undefined;
    public AuthorId: string | null | undefined;
    public statement!: number;
    
}
