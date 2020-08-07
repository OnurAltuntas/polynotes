import firebase from '../../Config/FbConfig';

 export const getNotes = () => {
  return (dispatch) => {
    firebase.database().ref('/notes').on('value', (snapshot) => {
      dispatch({
        type: 'NOTES_FETCH',
        payload: snapshot.val(),
      });
    });
  };
};

export const getBoards = (temp) => {
  return (dispatch) => {
    var currentUserId = firebase.auth().currentUser.uid;
    console.log('$$$$$$$$$$$$$'+temp);
    firebase.database().ref('/'+currentUserId+'/Boards').on('value', (snapshot) => {
      dispatch({
        type: 'BOARDS_FETCH',
        payload:  snapshot.val(),
      });
    });
  };
};

export const getTodos = (boardKey) => {
  return (dispatch) => {
    var currentUserId = firebase.auth().currentUser.uid;
  
    firebase.database().ref('/'+currentUserId+'/Boards/'+boardKey+'/Todo').on('value', (snapshot) => {
      dispatch({
        type: 'TODOS_FETCH',
        payload:  snapshot.val(),
      });
    });
  };
};

export const getInProgress = (boardKey) => {
  return (dispatch) => {
    var currentUserId = firebase.auth().currentUser.uid;
  
    firebase.database().ref('/'+currentUserId+'/Boards/'+boardKey+'/Inprogress').on('value', (snapshot) => {
      dispatch({
        type: 'INPROGRESS_FETCH',
        payload:  snapshot.val(),
      });
    });
  };
};

export const getDones = (boardKey) => {
  return (dispatch) => {
    var currentUserId = firebase.auth().currentUser.uid;
  
    firebase.database().ref('/'+currentUserId+'/Boards/'+boardKey+'/Done').on('value', (snapshot) => {
      dispatch({
        type: 'DONES_FETCH',
        payload:  snapshot.val(),
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
    
    var boardKey = firebase.database().ref('/'+currentUserId+'/Boards').push({id,title}).getKey();
    console.log(JSON.stringify(boardKey));
    var empty = '';
    firebase.database().ref('/'+currentUserId+'/Boards/'+boardKey+'/Todo').push({empty});
    firebase.database().ref('/'+currentUserId+'/Boards/'+boardKey+'/Inprogress').push({empty});
    firebase.database().ref('/'+currentUserId+'/Boards/'+boardKey+'/Done').push({empty});
   
    

    
  
  }
}





