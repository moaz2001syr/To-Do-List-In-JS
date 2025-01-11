
let tasks = [
    {
        "title": "قراءة كتاب",
        "date": "15/10/2030",
        "isDone": true
    },
    {
        "title": "انهاء المشروع النهائي",
        "date": "15/10/2030",
        "isDone": false
    },
    {
        "title": "انهاء كورس الجافا سكريبت",
        "date": "15/10/2030",
        "isDone": false
    },
    {
        "title": "حل التحدي",
        "date": "15/10/2030",
        "isDone": true
    }
]    

function getTasksFromStorage(){
    let retrievedTasks = JSON.parse(localStorage.getItem("tasks"))
    // if(retrievedTasks == null){
    //     tasks = []
    // }else {
    //     tasks = retrievedTasks
    // }
    tasks = retrievedTasks ?? []
}

getTasksFromStorage()


function fillTasksOnThePage(){

    document.getElementById("tasks").innerHTML = ""

    let index = 0
    for(task of tasks){
        
        let content = 
            `
                <div class="task ${task.isDone ? 'done' : ''} ">

                    <!-- TASK INFO -->
                    <div class="task-info">
                        <h2>${task.title}</h2>

                        <div>
                            <span class="material-symbols-outlined">
                                calendar_month
                            </span>
                            <span>
                                ${task.date}
                            </span>
                        </div>
                    </div>
                    <!--// TASK INFO //-->
                    
                    <!-- TASK ACTIONS -->
                    <div class="D-C-E-buttons">
                        <button onclick="deleteTask(${index})" id="D-button" class="circular-button">
                            <span class="material-symbols-outlined">
                                delete
                            </span>
                        </button>
                        
                        ${task.isDone ? `
                            <button onclick="toggleTaskCompletion(${index})" id="C-button" style="background-color:rgb(118, 0, 101);" class="circular-button">
                                <span class="material-symbols-outlined">
                                    cancel
                                </span>
                            </button>
                            ` : `
                            <button onclick="toggleTaskCompletion(${index})" id="C-button" class="circular-button">
                                <span class="material-symbols-outlined">
                                    check
                                </span>
                            </button>
                        `}
                        
                        
                        <button onclick="editTask(${index})" id="E-button" class="circular-button">
                            <span class="material-symbols-outlined">
                                edit
                            </span>
                        </button>
                    </div>
                    <!--// TASK ACTIONS //-->

                </div>
            `
        document.getElementById("tasks").innerHTML += content 
        index++

    }
}

fillTasksOnThePage()

document.getElementById("add-btn").addEventListener("click", function(){
    let now = new Date()
    let date = now.getDate() + "/" + (now.getMonth()+1) + "/" + now.getFullYear() + " | " + now.getHours() + ":" + now.getMinutes()
    let taskName = prompt("الرجاء ادخال عنوان المهمة")
    
    
    //let date =
    let taskObj = {
        "title" : taskName,
        "date" : date,
        "isDone" : false
    }
    tasks.push(taskObj)

    storeTasks()

    fillTasksOnThePage()
    
})

function deleteTask(index){
    let task = tasks[index]
    let inConfirmed = confirm("هل انت متأكد من حذف: " + task.title)

    if(inConfirmed ){
        tasks.splice(index, 1)
        storeTasks()
        fillTasksOnThePage()
    }
    
}

function editTask(index){
    let task = tasks[index]
    let newTaskTitle = prompt("الرجاء تحديد عنوان المهمة الجديد", task.title)
    
    task.title = newTaskTitle
    storeTasks()
    fillTasksOnThePage()
}

function toggleTaskCompletion(index){
    let task = tasks[index]
    task.isDone =!task.isDone
    storeTasks()
    fillTasksOnThePage()
}

//============ STORAGE FUNCTIONS ============
function storeTasks(){
    let tasksAtring = JSON.stringify(tasks)
    localStorage.setItem("tasks", tasksAtring)
}