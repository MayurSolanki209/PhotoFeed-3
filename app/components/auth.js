import React from 'react';
import { TouchableOpacity, TextInput, KeyboardAvoidingView, StyleSheet, Text, View, FlatList } from 'react-native';
import { f, database, storage, auth } from '../../config/config.js';

class userAuth extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      authStep: 0,
      email: '',
      pass: '',
      moveScreen: false
    }
  }

  login = async() => {
    //force user to login
    var email = this.state.email;
    var pass = this.state.pass;
    if (email != '' && pass != '') {
      try {
        let user = await auth.signInWithEmailAndPassword(email, pass)//'test@user.com', 'password');
      }catch(error) {
        console.log(error);
        alert(error);
      }
    }else {
      alert('Email or Password is empty.');
    }
  }

  createUserObj = (userObj, email) => {
    console.log(userObj, email, userObj.uid);
    var uObj = {
      name    : 'Enter name',
      username: '@name',
      avatar  : 'http://www.gravatar.com/avatar',
      email   : email,
      bio     : 'Enter your bio here',
      category: 'Enter category',
      qualification: 'Enter qualification'
    };

    database.ref('users').child(userObj.uid).set(uObj);
  }

  signup = async() => {
    //force user to login
    var email = this.state.email;
    var pass = this.state.pass;
    if (email != '' && pass != '') {
      try {
        let user = await auth.createUserWithEmailAndPassword(email, pass)
        .then((userObj)=> this.createUserObj(userObj.user, email))
        .catch((error)=> alert(error));

      }catch(error) {
        console.log(error);
        alert(error);
      }
    }else {
      alert('Email or Password is empty.');
    }
  }


  componentDidMount = () => {
    if (this.props.moveScreen == true) {
      this.setState({moveScreen: true})
    }
  }

  showLogin = () => {
    this.setState({authStep: 1});
  }
  showSignup = () => {
    this.setState({authStep: 2});
  }


  render(){
    return(
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>You are not logged in</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>{this.props.message}</Text>
          { this.state.authStep == 0 ? (
            <View style={{ marginVertical:20, flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => this.showLogin()}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: 'green'}}>LogIn</Text>
              </TouchableOpacity>
              <Text style={{marginHorizontal: 15, fontSize: 18,}}>OR</Text>
              <TouchableOpacity onPress={() => this.showSignup()}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: 'blue'}}>SignUp</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ marginVertical:20}}>
              { this.state.authStep == 1 ? (
                //log in
                <View style={{backgroundColor: 'white'}}>
                  <TouchableOpacity onPress={() => this.setState({authStep: 0})}
                    style={{borderBottomWidth: 1, paddingVertical: 5, marginBottom: 10, borderBottomColor: 'black'}}>
                    <Text style={{fontWeight: 'bold'}}> ← Cancel</Text>
                  </TouchableOpacity>
                  <Text style={{paddingLeft: 5, fontSize: 18, color: 'darkblue', fontWeight: 'bold', marginBottom: 10, alignItems: 'center', justifyContent: 'center'}}> Log in</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{ paddingLeft: 5, marginVertical: 10, padding: 5, fontWeight: 'bold', fontSize: 16}}>   Email-Id:     </Text>
                    <TextInput
                      editable={true}
                      keyboardType={'email-address'}
                      placeholder={'Email Address'}
                      onChangeText={(text) => this.setState({email: text})}
                      value={this.state.email}
                      style={{width: 250, marginVertical: 10, padding: 5, borderColor: 'grey', borderRadius: 3, borderWidth: 1}}
                    />
                  </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize:16,  marginVertical: 10, padding: 5, fontWeight: 'bold'}}>   Password:  </Text>
                      <TextInput
                        editable={true}
                        secureTextEntry={true}
                        placeholder={'Password'}
                        onChangeText={(text) => this.setState({pass: text})}
                        value={this.state.pass}
                        style={{width: 250, marginVertical: 10, padding: 5, borderColor: 'grey', borderWidth: 1, borderRadius: 3}}
                      />
                    </View>
                    <TouchableOpacity onPress={() => this.login()}
                      style={{backgroundColor: 'green', paddingVertical: 5, paddingHorizontal: 50, borderRadius: 5, marginHorizontal: 90}}
                      >
                      <Text style={{fontWeight: 'bold', textAlign: 'center', color: 'white', fontSize: 18}}>Login</Text>
                    </TouchableOpacity>
                    <Text style={{fontWeight: 'bold', textAlign: 'center', color: 'white'}}></Text>
                </View>
              ) : (
                //signup
                <View style={{backgroundColor: 'white'}}>
                  <TouchableOpacity onPress={() => this.setState({authStep: 0})}
                    style={{borderBottomWidth: 1, paddingVertical: 5, marginBottom: 10, borderBottomColor: 'black'}}>
                    <Text style={{fontWeight: 'bold'}}> ← Cancel</Text>
                  </TouchableOpacity>
                  <Text style={{paddingLeft: 5, fontSize: 18, color: 'darkblue', fontWeight: 'bold', marginBottom: 10, alignItems: 'center', justifyContent: 'center'}}> Sign Up</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{paddingLeft: 5, marginVertical: 10, padding: 5, fontWeight: 'bold', fontSize: 16}}>  Email-Id:    </Text>
                      <TextInput
                        editable={true}
                        keyboardType={'email-address'}
                        placeholder={'Email Address'}
                        onChangeText={(text) => this.setState({email: text})}
                        value={this.state.email}
                        style={{width: 250, marginVertical: 10, padding: 5, borderColor: 'grey', borderRadius: 3, borderWidth: 1}}
                      />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{paddingLeft: 5, marginVertical: 10, padding: 5, fontWeight: 'bold', fontSize: 16}}>  Password: </Text>
                      <TextInput
                        editable={true}
                        secureTextEntry={true}
                        placeholder={'Password'}
                        onChangeText={(text) => this.setState({pass: text})}
                        value={this.state.pass}
                        style={{width: 250, marginVertical: 10, padding: 5, borderColor: 'grey', borderWidth: 1, borderRadius: 3}}
                      />
                    </View>
                    <TouchableOpacity onPress={() => this.signup()}
                      style={{backgroundColor: 'blue', paddingVertical: 5, paddingHorizontal: 50, borderRadius: 5, marginHorizontal: 90}}
                      >
                      <Text style={{fontWeight: 'bold', textAlign: 'center', color: 'white'}}>SignUp</Text>
                    </TouchableOpacity>
                    <Text style={{fontWeight: 'bold', textAlign: 'center', color: 'white'}}></Text>
                </View>
              ) }
            </View>
          )}
      </View>
    )
  }
}

export default userAuth;
