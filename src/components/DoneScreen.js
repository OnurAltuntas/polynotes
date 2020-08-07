import React, {useEffect, useState, Component} from 'react';
import {Button, View, Text, FlatList, StyleSheet} from 'react-native';
import {getDones} from '../redux/actions/index';
import firebase from 'firebase';
import {connect} from 'react-redux';
import _ from 'lodash';

class DoneScreen extends Component {
  componentDidMount() {

    const {boardKey} = this.props.route.params;

    var temp = JSON.stringify(boardKey);

    console.log(boardKey);

    this.props.getDones(boardKey);
  }

  drawHandler = ({navigation, route}) => {
    const {boardKey} = this.props.route.params;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize:24}}>DONES PAGE Page</Text>

        <FlatList
          style={{width: '100%'}}
          data={this.props.donesList}
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
        title='<-- InProgress '
        onPress={() => this.props.navigation.navigate('InProgressScreen',{
          boardKey:boardKey
        })}
        />

      </View>
    );
  };

  render() {
    console.log('---------------------', this.props.donesList);

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
  const donesList = _.map(state.donesList.donesList, (val, key) => {
    return {
      ...val,
      key: key,
    };
  });

  return {
    donesList,
  };
}

export default connect(mapStateToProps, {getDones})(DoneScreen);
