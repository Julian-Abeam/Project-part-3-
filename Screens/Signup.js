import React, { Component } from 'react';
import { Button, ToastAndroid } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';




class Signup extends Component{


  constructor(props){
    super(props);


    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    }
  }


  signup = () => {
    //Validation Here


    return fetch("http://10.0.2.2:3333/api/1.0.0/user", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then((response) => {
      if(response.status === 201){
          console.log("User Created with ID: ", response);
        return response.json()
      }else if(response.status === 400){
        throw 'Failed validation';
      }else{
        throw 'Something went wrong';
      }
    })
    .then(async (responseJson) => {
      console.log("User Created with ID: ", responseJson);
      this.props.navigation.navigate("Login");
      ToastAndroid.show(error, ToastAndroid.SHORT);
    })
    .catch((error) => {
      console.log(error);
      ToastAndroid.show("error",ToastAndroid.SHORT);
    })
  }




  render(){
    return (
      <ScrollView>
        <TextInput
          placeholder="Enter your first name..."
          onChangeText={(first_name) => this.setState({first_name})}
          value={this.state.first_name}
          style={{padding:5, borderWidth:1, margin:5}}
        />




        <TextInput
          placeholder="Enter your last name..."
          onChangeText={(last_name) => this.setState({last_name})}
          value={this.state.last_name}
          style={{padding:5, borderWidth:1, margin:5}}
        />




        <TextInput
          placeholder="Enter your email..."
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          style={{padding:5, borderWidth:1, margin:5}}
        />




        <TextInput
          placeholder="Enter your password..."
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          secureTextEntry
          style={{padding:5, borderWidth:1, margin:5}}
        />




        <Button
          title="Create an account"
          onPress={() => this.signup()}
        />
      </ScrollView>
    )
  }
}



export default Signup;
