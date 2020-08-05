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

export const getBoards = () => {
  return (dispatch) => {
    var currentUserId = firebase.auth().currentUser.uid;
    firebase.database().ref('/'+currentUserId+'/Boards').on('value', (snapshot) => {
      dispatch({
        type: 'BOARDS_FETCH',
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

export function addBoards(id,title){
  return (dispatch) =>{
    var currentUserId = firebase.auth().currentUser.uid;
    if(currentUserId===null){
      console.log("null geldi");
    }
    firebase.database().ref('/'+currentUserId+'/Boards').push({id,title});
  
  }
}





