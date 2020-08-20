import  React, {useState} from 'react';
import {Button, View,Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../HomeScreen';
import TodosScreen from '../TodosScreen';
import AddNotesScreen from '../AddNotesScreen';
import InProgressScreen from '../InProgressScreen';
import DashBoardScreen from '../DashBoardScreen';

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
import styles from '../style/styles';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

  const App = ({ navigation }) =>  {


    function LogoTitle() {
      source={ uri: "https://images.unsplash.com/photo-1425342605259-25d80e320565?auto=format&amp;fit=crop&amp;w=750&amp;q=80&amp;ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" };

      return (
        <Image
          style={{ width: 50, height: 50 }}
          source={source}
        />
      );
    }


  function DrawerRoutes(){
    return(
      <Drawer.Navigator initialRouteName="Boards">
        <Drawer.Screen name="Boards" component={Boards} 
      
        
        />
        <Drawer.Screen name="Home" component={DashBoardScreen} />
        <Drawer.Screen name="Signout" component={Signout} />
      </Drawer.Navigator>
    )
  }


  const state = createStore (reducers,{},applyMiddleware(ReduxThunk))
  return (
    <Provider store={state}>
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Signin" component={Signin} 
      options={{
      
        headerRight: () => (
          <Button style={styles.barButton}
            onPress={() => alert('This is a button!')}
            title="sign out"

          />
        ),
      }}
      
      />
      <Stack.Screen name="CreateUser" component={CreateUser} />
      <Stack.Screen name="Boards" component={DrawerRoutes}
      options={{
      
        title: 'BoardScreen',
    headerLeft: null
      }}
      />
      <Stack.Screen name="TodosScreen" component={TodosScreen}   options={{ title: 'Todos Screen' }} />
      <Stack.Screen name="InProgressScreen" component={InProgressScreen} />
      <Stack.Screen name="DoneScreen" component={DoneScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
  }


export default App;