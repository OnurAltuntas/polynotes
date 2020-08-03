import firebase from '../../Config/FbConfig';

 export const getBlogs = () => {
  return (dispatch) => {
    firebase.database.ref('/notes').on('value', (snapshot) => {
      dispatch({
        type: 'NOTES_FETCH',
        payload: 'done',
      });
    });
  };
};


export function addNotes(title,content){
    return (dispatch) =>{
        firebase.database().ref('/notes').push({title,content});
    }
}


