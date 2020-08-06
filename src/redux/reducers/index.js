import {combineReducers} from 'redux';
import NoteReducer from './NotesReducer';
import BoardReducer from './BoardsReducer';
import TodosReducer from './TodosReducer';




const rootReducer = combineReducers({
    notesList:NoteReducer,
    boardsList:BoardReducer,
    todosList:TodosReducer
})

export default rootReducer;
