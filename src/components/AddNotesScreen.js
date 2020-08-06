import * as React from 'react';
import {useState} from 'react';
import {Button, View, Text, TextInput} from 'react-native';
import {addNotes} from './../redux/actions/index';
import {getBoards} from './../redux/actions/index';
import {connect,mapStateToProps} from 'react-redux'


class AddNotesScreen extends React.Component {

  componentDidMount(){
    
  }

    state = {
        title:"",
        content:""
    }

   sumbitHandler = () => {
    this.props.addNotes(this.state.title,this.state.content);
    this.setState({
        title:'',
        content:''
    })
    
  };

  mapStateToProps(params) {
    return {
      listOfBoards:state.boardsList
    }
  }

  render(){
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TextInput
            placeholder="title"
            onChangeText={title => this.setState({title})} value={this.state.title}
            value={this.state.title}></TextInput>
          <TextInput
            placeholder="content"
            onChangeText={content => this.setState({content})} value={this.state.content}
            value={this.state.content}></TextInput>
          <Button title="Submit" onPress={this.sumbitHandler}></Button>
        </View>
      );
  }
};

export default connect(mapStateToProps,{addNotes})(AddNotesScreen) ;
