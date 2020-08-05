import {combineReducers} from 'redux';
import NoteReducer from './NotesReducer';
import BoardReducer from './BoardsReducer';


const rootReducer = combineReducers({
    notesList:NoteReducer,
    boardsList:BoardReducer
})

export default rootReducer;
