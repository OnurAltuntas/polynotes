import React, {useState, useEffect} from 'react';
import {
  Button,
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,ImageBackground,StatusBar
} from 'react-native';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import HomeScreen from '../HomeScreen';
import TodosScreen from '../TodosScreen';
import AddNotesScreen from '../AddNotesScreen';
import InProgressScreen from '../InProgressScreen';
import DashBoardScreen from '../DashBoardScreen';
import DoneScreen from '../DoneScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../../redux/reducers/index';
import Signin from '../Auth/Signin';
import CreateUser from '../Auth/CreateUser';
import Signout from '../Auth/Signout';
import Boards from '../Boards';
import firebase from 'firebase';
import {createStackNavigator} from '@react-navigation/stack';
import { color } from 'react-native-reanimated';
import bg from '../../assests/sea.jpg';
import logo from '../../assests/logo.png';

import SplashScreen from "../SplashScreen";
import Animated from 'react-native-reanimated';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';




const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const App = ({navigation}) => {
  const [timePassed, setTimePassed] = useState(false);
  const [userMail, setuserMail] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setTimePassed_();
    }, 3000);
    return () => {};
  }, []);

  const setTimePassed_ = () => {
    setTimePassed(true);
  };

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setuserMail(user.email);
    }
 });

  
function CustomDrawerContent({ progress, ...rest }) {

  return (
    <DrawerContentScrollView {...rest}>
     
        <DrawerItemList {...rest} />
       <View style={{justifyContent:"center",alignItems:"center"}}>
       <Image 
       source={logo}
       ></Image>

       <Text style={{fontSize:15}}>{userMail}</Text>
       </View>
     
    </DrawerContentScrollView>
  );
}


  function DrawerRoutes() {
    return (

      <Drawer.Navigator 
      
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      
      initialRouteName="Boards"
        drawerStyle={{
          backgroundColor: '#fff',
          width: 240,
        }}
        drawerContentOptions={{
          activeTintColor: '#133149',
          itemStyle: { marginVertical: 10,minHeight:50,minWidth:20 }
        }}
      
      >
      <Drawer.Screen name="Boards" component={Boards} />
      <Drawer.Screen
        name="Home"
        component={DashBoardScreen}
        options={{
          title: 'Home',
          headerLeft: null,
        }}
      />
      <Drawer.Screen name="Signout" component={Signout} />
    </Drawer.Navigator>
    );
  }

  const state = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  

  if (!timePassed) {
    return (
      <SplashScreen/>

    );
  } else {
    return (
      <Provider store={state}>
        <NavigationContainer>
        <StatusBar
    backgroundColor="#133149"
    barStyle="light-content"
  />
          <Stack.Navigator>
            <Stack.Screen
              name="Signin"
              component={Signin}
            />
            <Stack.Screen name="CreateUser" component={CreateUser} />
            <Stack.Screen
              name="Boards"
              component={DrawerRoutes}
              options={({navigation}) => ({
                title: 'Boards',
                /* headerStyle:{
                  backgroundColor:"#133149"
                }, */
                headerLeft: () => (
                  <TouchableOpacity
                  onPress={() =>
                    navigation.dispatch(DrawerActions.toggleDrawer())
                  }
                  ><Text style={{fontSize:25,marginRight:0}}>☰</Text>
                  </TouchableOpacity>
                ),
                headerLeftContainerStyle: {paddingLeft: 10},
              })}
            />
            <Stack.Screen
              name="TodosScreen"
              component={TodosScreen}
              options={{title: 'Todos Screen'}}
            />
            <Stack.Screen
              name="InProgressScreen"
              component={InProgressScreen}
            />
            <Stack.Screen name="DoneScreen" component={DoneScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgicon: {
   width:100,
   height:100,
   textAlign:"center",
   justifyContent:"center",
   alignItems:"center"
  },
  text:{
   fontFamily:"Lobster-Regular",
   fontSize:50,
   color:"#FFB500"
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
},
});

export default App;
