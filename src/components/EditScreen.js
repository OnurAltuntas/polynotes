import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class EditScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                address: ""
             }
        }

    }

      handle = () =>{
        var temp = 'onur';
        this.setState({formData:{address: 'onur'}});
        console.log(this.state.formData.address);
      }

    render() {
      
        return (
            
            <View>
                <Text
                onPress={()=>{
                   this.handle()
                }}
                > textInComponent </Text>
            </View>
        )
    }
}
