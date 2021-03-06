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

export const addTodos = (empty,boardKey) => {
  return (dispatch) => {
    var currentUserId = firebase.auth().currentUser.uid;
    firebase.database().ref('/'+currentUserId+'/Boards/'+boardKey+'/Todo').push({empty});
  };
};
export const deleteTodos = (boardKey,key) => {
  return (dispatch) => {
    var currentUserId = firebase.auth().currentUser.uid;
    firebase.database().ref('/'+currentUserId+'/Boards/'+boardKey+'/Todo/'+key).remove();
  };
};
export const editTodos = (empty,boardKey,key) => {
  return (dispatch) => {
    var currentUserId = firebase.auth().currentUser.uid;
    firebase.database().ref('/'+currentUserId+'/Boards/'+boardKey+'/Todo').child(key).update({empty});
  };
};

export const todosToInProgress = (empty,boardKey,key) => {
  return (dispatch) => {
    var currentUserId = firebase.auth().currentUser.uid;
    firebase.database().ref('/'+currentUserId+'/Boards/'+boardKey+'/Inprogress').push({empty});
    firebase.database().ref('/'+currentUserId+'/Boards/'+boardKey+'/Todo/'+key).remove();
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

export const addInProgress = (empty,boardKey) => {
  return (dispatch) => {
    var currentUserId = firebase.auth().currentUser.uid;
    firebase.database().ref('/'+currentUserId+'/Boards/'+boardKey+'/Inprogress').push({empty});
  };
};
export const deleteInProgress = (boardKey,key) => {
  return (dispatch) => {
    var currentUserId = firebase.auth().currentUser.uid;
    firebase.database().ref('/'+currentUserId+'/Boards/'+boardKey+'/Inprogress/'+key).remove();
  };
};
export const editInProgress = (empty,boardKey,key) => {
  return (dispatch) => {
    var currentUserId = firebase.auth().currentUser.uid;
    firebase.database().ref('/'+currentUserId+'/Boards/'+boardKey+'/Inprogress').child(key).update({empty});
  };
};

export const InProgressToDone = (empty,boardKey,key) => {
  return (dispatch) => {
    var currentUserId = firebase.auth().currentUser.uid;
    firebase.database().ref('/'+currentUserId+'/Boards/'+boardKey+'/Done').push({empty});
    firebase.database().ref('/'+currentUserId+'/Boards/'+boardKey+'/Inprogress/'+key).remove();
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

export const addDones = (empty,boardKey) => {
  return (dispatch) => {
    var currentUserId = firebase.auth().currentUser.uid;
    firebase.database().ref('/'+currentUserId+'/Boards/'+boardKey+'/Done').push({empty});
  };
};
export const deleteDones = (boardKey,key) => {
  return (dispatch) => {
    var currentUserId = firebase.auth().currentUser.uid;
    firebase.database().ref('/'+currentUserId+'/Boards/'+boardKey+'/Done/'+key).remove();
  };
};
export const editDones = (empty,boardKey,key) => {
  return (dispatch) => {
    var currentUserId = firebase.auth().currentUser.uid;
    firebase.database().ref('/'+currentUserId+'/Boards/'+boardKey+'/Done').child(key).update({empty});
  };
};


export function addNotes(title,content){
    return (dispatch) =>{
        var currentUserId = firebase.auth().currentUser.uid;
        firebase.database().ref('/'+currentUserId+'/notes').push({title,content});
    }
}

export function addBoards(title){
  return (dispatch) =>{
    var currentUserId = firebase.auth().currentUser.uid;
    if(currentUserId===null){
      console.log("null geldi");
    }
    
    var boardKey = firebase.database().ref('/'+currentUserId+'/Boards').push({title}).getKey();
    var empty = '';
    firebase.database().ref('/'+currentUserId+'/Boards/'+boardKey+'/Todo').push({empty});
    firebase.database().ref('/'+currentUserId+'/Boards/'+boardKey+'/Inprogress').push({empty});
    firebase.database().ref('/'+currentUserId+'/Boards/'+boardKey+'/Done').push({empty});
  
  }
}

export const deleteBoards = (key) => {
  return (dispatch) => {
    var currentUserId = firebase.auth().currentUser.uid;
   
    firebase.database().ref('/'+currentUserId+'/Boards/'+key).remove();
  };
};
export const editBoards = (title,key) => {
  return (dispatch) => {
    var currentUserId = firebase.auth().currentUser.uid;
    firebase.database().ref('/'+currentUserId+'/Boards').child(key).update({title});
  };
};





