import {
  ADD_TASK,
  REMOVE_TASK,
  TOGGLE_TASK,
} from "./actions.mjs";

const initialState = {
  tasks: [],
  total: 0,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
        const newTask = [...state.tasks, action.payload]
      return { 
        ...state, 
        tasks: newTask,
        total: state.total + 1
     };

    case REMOVE_TASK:
        const taskId  = state.tasks.filter(task=> task.id !== action.payload)
      return {
        ...state,
        tasks: taskId,
        total: state.total - 1
      };

    case TOGGLE_TASK:
        const toggledTask = state.tasks.map(task=>task.id === action.payload ? {...task, completed : !task.completed} : task)
      return {
        ...state, 
        tasks: toggledTask,
      };

    default:
     return state
  }
};


export default taskReducer