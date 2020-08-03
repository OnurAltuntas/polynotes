import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../HomeScreen';
import NotesScreen from '../NotesScreen';
import AddNotesScreen from '../AddNotesScreen';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../../redux/reducers/index'


const Drawer = createDrawerNavigator();
 class App extends React.Component {

  render() {

  const state = createStore (reducers,{},applyMiddleware(ReduxThunk))
  return (
    <Provider store={state}>
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notes" component={NotesScreen} />
        <Drawer.Screen name="AddNotes" component={AddNotesScreen} />

      </Drawer.Navigator>
    </NavigationContainer>
    </Provider>
  );
  }
}
export default App;