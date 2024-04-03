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
    public title!: string;
    public description: string|undefined;
    public start: Date | null | undefined;
    public end: Date|undefined;
    public author!: string;
    public statement!: number;
    
}
