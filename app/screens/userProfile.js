import React from 'react';
import { TouchableOpacity, TouchableHighlight, StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { f, database, storage, auth } from '../../config/config.js';

import PhotoList from '../components/photoList.js';

class userProfile extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      loaded : false,
    }
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

  fetchUserInfo = (userId) => {
    //
    var that = this;

    database.ref('users').child(userId).child('username').once('value').then(function(snapshot) {
      const exists = (snapshot.val() !== null);
      if(exists) data = snapshot.val();
        that.setState({
          username: data
        });
    }).catch(error => console.log(error));

    database.ref('users').child(userId).child('name').once('value').then(function(snapshot) {
      const exists = (snapshot.val() !== null);
      if(exists) data = snapshot.val();
        that.setState({
          name: data
        });
    }).catch(error => console.log(error));

    database.ref('users').child(userId).child('avatar').once('value').then(function(snapshot) {
      const exists = (snapshot.val() !== null);
      if(exists) data = snapshot.val();
        that.setState({
          avatar: data,
          loaded: true
        });
    }).catch(error => console.log(error));

    database.ref('users').child(userId).child('bio').once('value').then(function(snapshot) {
      const exists = (snapshot.val() !== null);
      if(exists) data = snapshot.val();
        that.setState({
          bio: data,
          loaded: true
        });
    }).catch(error => console.log(error));

  }

  componentDidMount = () => {
      this.checkParams();

  }

  render(){
    return(
      <View style={{flex:1}}>
        { this.state.loaded == false ? (
          <View>
            <Text>Loading...</Text>
          </View>
        ) : (
          <View style={{flex:1}}>
            <View style={{flexDirection: 'row', height: 70, paddingTop: 25, backgroundColor: 'white', borderColor: 'grey', borderBottomWidth: 0.5, justifyContent: 'space-between', alignItems: 'center'}}>
              <TouchableOpacity
                style={{width: 100}}
                onPress={() => this.props.navigation.goBack()}>
                <Text style={{fontSize: 15, fontWeight: 'bold', paddingLeft: 10}}>Back</Text>
              </TouchableOpacity>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>PROFILE</Text>
              <Text style={{width: 100}}></Text>
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
              <PhotoList isUser={true} userId={this.state.userId} navigation={this.props.navigation} />
          </View>
          )}
      </View>
    )
  }
}

export default userProfile;
