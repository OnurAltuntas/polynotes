import React, {useEffect, useState, Component} from 'react';
import {Button, View, Text, FlatList, StyleSheet} from 'react-native';
import {getTodos} from '../redux/actions/index';
import firebase from 'firebase';
import {connect} from 'react-redux';
import _ from 'lodash';

class NotesScreen extends Component {
  componentDidMount() {
    const {boardId} = this.props.route.params;
    const {boardKey} = this.props.route.params;

    var temp = JSON.stringify(boardKey);

    console.log(boardKey);

    this.props.getTodos(boardKey);
  }

  drawHandler = ({navigation, route}) => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Todo</Text>

        <FlatList
          style={{width: '100%'}}
          data={this.props.todosList}
          keyExtractor={(item) => item.key}
          renderItem={({item}) => {
            return (
              <View style={styles.container}>
                <Text>{item.empty}</Text>
              </View>
            );
          }}
        />
      </View>
    );
  };

  render() {
    console.log('---------------------', this.props.todosList);

    return (
      <View style={styles.container}>
        <this.drawHandler />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

function mapStateToProps(state) {
  const todosList = _.map(state.todosList.todosList, (val, key) => {
    return {
      ...val,
      key: key,
    };
  });
  console.log('%%%%%%%%%%%%%%%%%%%%', todosList);

  return {
    todosList,
  };
}

export default connect(mapStateToProps, {getTodos})(NotesScreen);
