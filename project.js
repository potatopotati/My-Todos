export class Project{
    constructor(name){
        this.id=crypto.randomUUID();
        this.name=name;
        this.todos=[];//array of todos
        this.createdAt=new Date();
    }
}

