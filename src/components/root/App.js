import  React, {useState} from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../HomeScreen';
import TodosScreen from '../TodosScreen';
import AddNotesScreen from '../AddNotesScreen';
import InProgressScreen from '../InProgressScreen';
import DoneScreen from '../DoneScreen';

import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../../redux/reducers/index';
import Signin from '../Auth/Signin';
import CreateUser from '../Auth/CreateUser';
import Signout from '../Auth/Signout';

import Boards from '../Boards';

import firebase from 'firebase';
import { createStackNavigator } from '@react-navigation/stack';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

  const App = ({ navigation }) =>  {


  function DrawerRoutes(){
    return(
      <Drawer.Navigator initialRouteName="Boards">
        <Drawer.Screen name="Boards" component={Boards}   />
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="TodosScreen" component={TodosScreen}  options={{ title: 'Todos Screen' }} />
        <Drawer.Screen name="InProgressScreen" component={InProgressScreen} />
        <Drawer.Screen name="DoneScreen" component={DoneScreen} />
        <Drawer.Screen name="AddNotes" component={AddNotesScreen} />
        <Drawer.Screen name="Signout" component={Signout} />
      </Drawer.Navigator>
    )
  }


  const state = createStore (reducers,{},applyMiddleware(ReduxThunk))
  return (
    <Provider store={state}>
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Signin" component={Signin}  />
      <Stack.Screen name="CreateUser" component={CreateUser} />
      <Stack.Screen name="Boards" component={DrawerRoutes} />
      <Stack.Screen name="TodosScreen" component={TodosScreen}   options={{ title: 'Todos Screen' }} />
      <Stack.Screen name="InProgressScreen" component={InProgressScreen} />
      <Stack.Screen name="DoneScreen" component={DoneScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
  }

export default App;