export const Storage = {
    PROJECT_PREFIX: 'mytodo_project_',
    save(key, data){
        localStorage.setItem(this.PROJECT_PREFIX + key, JSON.stringify(data));
    },

    get(key){
        return localStorage.getItem(this.PROJECT_PREFIX + key);
    },

    remove(key){
        localStorage.removeItem(this.PROJECT_PREFIX + key)
    },
    
    update(key,data){
        const project = this.get(key)
        if(project){
            const project_JSON = JSON.parse(project)
            const existingTodo = project_JSON.todos.find((todo)=>{
                return todo.id == data.id
            })
            if(existingTodo == undefined){
                project_JSON.todos.push(data)
            }
            else{
                existingTodo.completed = data.completed
            }
            this.save(key,project_JSON)
        }
            else{
                console.log("cant find project")
        }
    },

    removeTodo(key,data){
        const project = this.get(key)
        if(project){
            const project_JSON = JSON.parse(project)
            const existingTodo = project_JSON.todos.findIndex((todo)=>{
                return todo.id == data
            })
            if(existingTodo){
                project_JSON.todos.splice(existingTodo,1) //remove 1 item from that specific index
                this.save(key,project_JSON)
            }
        }
    },

    getAllProject(){
        const projects=[]
        for(let i=0; i<localStorage.length;i++){
            const key = localStorage.key(i); //get key first
            if(key.startsWith(this.PROJECT_PREFIX)){
                projects.push(localStorage.getItem(key))
            }
        }
        return projects
    }
}