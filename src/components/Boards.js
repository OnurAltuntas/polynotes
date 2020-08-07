import React,{useState,useEffect, Component}from 'react'
import { StyleSheet, Text, View,FlatList ,Button} from 'react-native'
import {getBoards} from '../redux/actions/index';
import {connect} from 'react-redux';
import _ from 'lodash';
import firebase from 'firebase';


class Boards  extends Component {
 
  componentDidMount(){
    var temp = 'gelir inş';
    this.props.getBoards(temp);
  }

  signOutHandler = ({ navigation }) =>{
    firebase.auth().signOut().then(function() {
      navigation.navigate('Home')
    }).catch(function(error) {
      // An error happened.
    });
  }
  

  onPressHandler = ({ navigation }) => {
    return (
      <FlatList style={{width:'100%'}}
        data = {this.props.boardsList}
        keyExtractor={(item) => item.key}
        renderItem={({item})=>{
          var temp = item;
          var tempKey = JSON.stringify(item.key).split('undefined').toString().replace(/['"]+/g, '').replace(',','');
        
          return(
            <View style={styles.container}>
            <Text
            onPress={() => this.props.navigation.navigate('TodosScreen',{
              boardId:temp.title,
              boardKey:tempKey
            })}
            >{tempKey}</Text> 
            <Text
            
            >{item.id}</Text> 
            </View>
          )
        }}
    
    />
    );
  };

render(){
  console.log('//////////////////////',this.props.boardsList);
  return (
    
    <View style={styles.container}>
    <this.onPressHandler/>
    
    
    </View>
  );
}
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    textAlign:"center"
  }

})

function mapStateToProps(state) {

  const boardsList = _.map(state.boardsList.boardsList, (val,key) => {
    return{
      ...val,
      key:key
    }
  })
  return{
    boardsList
}
}

export default connect(mapStateToProps,{getBoards})(Boards);