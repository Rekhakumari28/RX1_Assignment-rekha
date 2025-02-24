export const ADD_TASK = "task/added"
export const REMOVE_TASK = "task/removed"
export const TOGGLE_TASK = "task/toggled"

export const addTask  = (task)=>({
    type: ADD_TASK,
    payload: task
})

export const removeTask = (taskId )=>({
    type: REMOVE_TASK,
    payload: taskId 
})

export const toggleTask  = (taskId )=>({
    type: TOGGLE_TASK,
    payload: taskId 
})
