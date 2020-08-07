import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TodosScreen from '../components/TodosScreen';
import InProgressScreen from '../components/InProgressScreen';
import DoneScreen from '../components/DoneScreen';
import Boards from '../components/Boards';

import {getTodos} from '../redux/actions/index';

 
const Tab = createMaterialTopTabNavigator();

class TrelloScreen extends React.Component {

    componentDidMount() {

       
    }

    drawHandler = () =>{
        const {boardId} = this.props.route.params;
        const {boardKey} = this.props.route.params;
        
    }
      
    render() {
        return (
           
           <this.drawHandler/>
         
        )
    }
}


export default TrelloScreen
