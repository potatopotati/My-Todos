export class Todo{
    constructor(title, deadline, priority, projectid){
        this.id = crypto.randomUUID();
        this.title = title;
        this.deadline=deadline;
        this.priority=priority;
        this.completed=false;
        this.projectid=projectid;
        this.createdAt = new Date();
    }
}