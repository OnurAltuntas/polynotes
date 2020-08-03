import {combineReducers} from 'redux';
import NoteReducer from './NotesReducer';

const rootReducer = combineReducers({
    notesList:NoteReducer
})

export default rootReducer;
