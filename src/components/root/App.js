import  React, {useState} from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../HomeScreen';
import NotesScreen from '../NotesScreen';
import AddNotesScreen from '../AddNotesScreen';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../../redux/reducers/index';
import Signin from '../Auth/Signin';
import CreateUser from '../Auth/CreateUser';
import Boards from '../Boards';

import firebase from 'firebase';

const Drawer = createDrawerNavigator();
  const App = () =>  {
  const [loggedIn, setloggedIn] = useState(null);


  firebase.auth().onAuthStateChanged(user => {
    if(user){
      setloggedIn(true);
    }
    else{
      setloggedIn(false);
    }
  })


  const state = createStore (reducers,{},applyMiddleware(ReduxThunk))
  return (
    <Provider store={state}>
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Signin">
        <Drawer.Screen name="Signin" component={Signin} />
        <Drawer.Screen name="CreateUser" component={CreateUser} />
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="NotesScreen" component={NotesScreen} />
        <Drawer.Screen name="AddNotes" component={AddNotesScreen} />
        <Drawer.Screen name="Boards" component={Boards} />


      </Drawer.Navigator>
    </NavigationContainer>
    </Provider>
  );
  }

export default App;