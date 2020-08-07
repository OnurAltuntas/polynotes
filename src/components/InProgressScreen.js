import React, {useEffect, useState, Component} from 'react';
import {Button, View, Text, FlatList, StyleSheet} from 'react-native';
import {getInProgress} from '../redux/actions/index';
import firebase from 'firebase';
import {connect} from 'react-redux';
import _ from 'lodash';

class InProgressScreen extends Component {
  componentDidMount() {
    const {boardKey} = this.props.route.params;

    var temp = JSON.stringify(boardKey);

    console.log(boardKey);

    this.props.getInProgress(boardKey);
  }

  drawHandler = ({navigation, route}) => {
    const {boardKey} = this.props.route.params;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize:24}}>INPROGRESS PAGE Page</Text>

        <FlatList
          style={{width: '100%'}}
          data={this.props.InProgressList}
          keyExtractor={(item) => item.key}
          renderItem={({item}) => {
            return (
              <View style={styles.container}>
                <Text>{item.empty}</Text>
              </View>
            );
          }}
        />
        <Button
        title='<--Todos '
        onPress={() => this.props.navigation.navigate('TodosScreen',{
          boardKey:boardKey
        })}
        />
        <Button
        title='Done -->'
        onPress={() => this.props.navigation.navigate('DoneScreen',{
          boardKey:boardKey
        })}
        />

        
      </View>
    );
  };

  render() {
    console.log('---------------------', this.props.InProgressList);

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
  const InProgressList = _.map(state.InProgressList.InProgressList, (val, key) => {
    return {
      ...val,
      key: key,
    };
  });

  return {
    InProgressList,
  };
}

export default connect(mapStateToProps, {getInProgress})(InProgressScreen);
