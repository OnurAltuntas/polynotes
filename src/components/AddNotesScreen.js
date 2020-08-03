import * as React from 'react';
import {useState} from 'react';
import {Button, View, Text, TextInput} from 'react-native';
import {addNotes} from './../redux/actions/index';
import {connect} from 'react-redux'


class AddNotesScreen extends React.Component {
    state = {
        title:"",
        content:""
    }

   sumbitHandler = () => {
    console.log('----------', this.state);
    this.props.addNotes(this.state.title,this.state.content);
    this.setState({
        title:'',
        content:''
    })
    
  };

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

export default connect(null,{addNotes})(AddNotesScreen) ;
