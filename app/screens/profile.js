import React from 'react';
import { TextInput, TouchableOpacity, TouchableHighlight, StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { f, database, storage, auth } from '../../config/config.js';


import PhotoList from '../components/photoList.js';
import UserAuth from '../components/auth.js';

class profile extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      refresh: true
    }
  }

  fetchUserInfo = (userId) => {

    var that = this;
    database.ref('users').child(userId).on('value', (function(snapshot){
      const exists = (snapshot.val() !== null);
      if(exists) data = snapshot.val();
      that.setState({
        username: data.username,
        bio     : data.bio,
        name    : data.name,
        avatar  : data.avatar,
        loggedin: true,
        userId  : userId
      });
    }));
  }

  checkParams = () => {
    var params = this.props.navigation.state.params;
    if (params) {
      if (params.userId) {
        this.setState({
          userId: params.userId
        });
        this.fetchUserInfo(params.userId);
      }
    }
  }

  componentDidMount = () => {
    var that = this;
    f.auth().onAuthStateChanged(function(user){

      if(user){
        that.fetchUserInfo(user.uid);
      }

    });
    this.checkParams();
  }

  logoutUser = () => {
    f.auth().signOut();
    alert('Logged Out.');
  }

  saveProfile = () => {
    var name     = this.state.name;
    var username = this.state.username;
    var bio      = this.state.bio;

    if (name !== '') {
      database.ref('users').child(this.state.userId).child('name').set(name);
    }

    if (username !== '') {
      database.ref('users').child(this.state.userId).child('username').set(username);
    }

    if (bio !== '') {
      database.ref('users').child(this.state.userId).child('bio').set(bio);
    }
    this.setState({editingProfile: false});
  }

  render(){
    return(
        <View style={{flex:1, backgroundColor: 'white'}}>
          <View style={{height: 70, paddingTop: 25, backgroundColor: 'white', borderColor: 'black', borderBottomWidth: 1, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>                  </Text>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>PROFILE</Text>
            <TouchableOpacity
              onPress={() => this.logoutUser()}
              style={{paddingVertical: 5, borderRadius: 5, borderColor: 'white', borderWidth: 1.5, paddingRight: 10}}>
              <Text style={{textAlign: 'center', color: 'red' , fontWeight: 'bold', fontSize: 16}}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View style={{justifyContent: 'space-evenly', alignItems: 'flex-start', flexDirection: 'row', paddingVertical: 10, paddingBottom: 20, borderBottomWidth: 1}}>
            <Image source={{uri: this.state.avatar}} style={{marginLeft: 3, width: 100, height: 100, borderRadius: 50}}
            />
            <View style={{marginRight: 5, paddingTop: 15, marginLeft: 20}}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>{this.state.username}</Text>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>{this.state.name}</Text>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>{this.state.bio}</Text>
            </View>
          </View>
          <View style={{flex: 1}}>
              <View style={{paddingBottom: 5, borderBottomWidth: 1, justifyContent: 'center'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Settings')}
                  style={{backgroundColor: 'darkblue', marginTop: 5, marginHorizontal: 60, paddingVertical: 5, borderRadius: 10, borderColor: 'white', borderWidth: 1.5}}>
                  <Text style={{color: 'white', fontSize: 18, textAlign: 'center', fontWeight: 'bold'}}>      Settings       </Text>
                </TouchableOpacity>
              </View>
            <PhotoList isUser={true} userId={this.state.userId} navigation={this.props.navigation} />
          </View>
        </View>

    )
  }
}

export default profile;
