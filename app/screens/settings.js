import React from 'react';
import { TouchableOpacity, TouchableHighlight, StyleSheet, Text, View, FlatList, Image, TextInput } from 'react-native';
import { f, database, storage, auth } from '../../config/config.js';

class settings extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      updateInfo: false
    }
  }

  fetchUserInfo = (userId) => {

    var that = this;
    database.ref('users').child(userId).once('value').then(function(snapshot){
      const exists = (snapshot.val() !== null);
      if(exists) data = snapshot.val();
      that.setState({
        username: data.username,
        name    : data.name,
        email   : data.email,
        bio     : data.bio,
        qualification  : data.qualification,
        category       : data.category,
        avatar  : data.avatar,
        loggedin: true,
        userId  : userId,
      });
    });
  }

  componentDidMount = () => {
    var that = this;
    f.auth().onAuthStateChanged(function(user){
      if(user){
        that.fetchUserInfo(user.uid);
      }
    });
  }

  saveProfile = () => {
    var username = this.state.username;
    var name     = this.state.name;
    var email    = this.state.email;
    var bio      = this.state.bio;
    var qualification = this.state.qualification;
    var category      = this.state.category;

    if (name !== '') {
      database.ref('users').child(this.state.userId).child('name').set(name);
    }

    if (username !== '') {
      database.ref('users').child(this.state.userId).child('username').set(username);
    }

    if (bio !== '') {
      database.ref('users').child(this.state.userId).child('bio').set(bio);
    }

    if (email !== '') {
      database.ref('users').child(this.state.userId).child('email').set(email);
    }
    if (qualification !== '') {
      database.ref('users').child(this.state.userId).child('qualification').set(qualification);
    }
    if (category !== '') {
      database.ref('users').child(this.state.userId).child('category').set(category);
    }
  }

  render(){
    return(
      <View style={{flex:1}}>
          <View style={{flexDirection: 'row', height: 70, paddingTop: 25, backgroundColor: 'white', borderColor: 'grey', borderBottomWidth: 0.5, justifyContent: 'space-between', alignItems: 'center'}}>
            <TouchableOpacity
              style={{width: 100}}
              onPress={() => this.props.navigation.goBack()}>
              <Text style={{fontSize: 15, fontWeight: 'bold', paddingLeft: 10}}> Back </Text>
            </TouchableOpacity>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>  Settings</Text>
            <TouchableOpacity
              style={{width: 100}}
              onPress={() => this.saveProfile()}>
              <Text style={{fontSize: 15, fontWeight: 'bold', paddingLeft: 10, color: 'darkblue'}}>     Save</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{justifyContent: 'space-evenly', paddingLeft: 20, paddingVertical: 10, paddingBottom: 20, borderBottomWidth: 1, marginRight: 5, paddingVertical: 10, paddingBottom: 20}}>
              <Text style={{fontWeight: 'bold'}}>Username: </Text>
              <Text style={{fontWeight: 'bold'}}>Name</Text>
              <Text style={{fontWeight: 'bold'}}>Email</Text>
              <Text style={{fontWeight: 'bold'}}>Bio</Text>
              <Text style={{fontWeight: 'bold'}}>Qualification</Text>
              <Text style={{fontWeight: 'bold'}}>Category</Text>
            </View>
            <View style={{justifyContent: 'space-evenly', paddingLeft: 20, paddingVertical: 10, paddingBottom: 20, borderBottomWidth: 1, marginRight: 5, paddingVertical: 10, paddingBottom: 20}}>
                <Text style={{fontWeight: 'bold'}}>{this.state.username}</Text>
                <Text style={{fontWeight: 'bold'}}>{this.state.name}</Text>
                <Text style={{fontWeight: 'bold'}}>{this.state.email}</Text>
                <Text style={{fontWeight: 'bold'}}>{this.state.bio}</Text>
                <Text style={{fontWeight: 'bold'}}>{this.state.qualification}</Text>
                <Text style={{fontWeight: 'bold'}}>{this.state.category}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{justifyContent: 'space-evenly', paddingLeft: 20, paddingVertical: 10, paddingBottom: 20, borderBottomWidth: 1, marginRight: 5, paddingVertical: 10, paddingBottom: 20}}>
              <Text style={{fontWeight: 'bold'}}>Username: </Text>
              <Text style={{fontWeight: 'bold'}}>Name</Text>
              <Text style={{fontWeight: 'bold'}}>Email</Text>
              <Text style={{fontWeight: 'bold'}}>Bio</Text>
              <Text style={{fontWeight: 'bold'}}>Qualification</Text>
              <Text style={{fontWeight: 'bold'}}>Category</Text>
            </View>
            <View style={{justifyContent: 'space-evenly', paddingLeft: 20, paddingVertical: 10, paddingBottom: 20, borderBottomWidth: 1, marginRight: 5, paddingVertical: 10, paddingBottom: 20}}>
                <TextInput
                  editable={true}
                  placeholder={'Enter Username'}
                  onChangeText={(text) => this.setState({username: text})}
                  value={this.state.username}
                  style={{width: 200, marginVertical: 10, padding: 2, borderColor: 'grey', borderWidth: 1}}
                />
                <TextInput
                  editable={true}
                  placeholder={'Enter Name'}
                  onChangeText={(text) => this.setState({name: text})}
                  value={this.state.name}
                  style={{width: 200, marginVertical: 10, padding: 2, borderColor: 'grey', borderWidth: 1}}
                />
                <TextInput
                  editable={true}
                  placeholder={'Enter Email'}
                  onChangeText={(text) => this.setState({email: text})}
                  value={this.state.email}
                  style={{width: 200, marginVertical: 10, padding: 5, borderColor: 'grey', borderWidth: 1}}
                />
                <TextInput
                  editable={true}
                  placeholder={'Enter Bio'}
                  onChangeText={(text) => this.setState({bio: text})}
                  value={this.state.bio}
                  style={{width: 200, marginVertical: 10, padding: 2, borderColor: 'grey', borderWidth: 1}}
                />
                <TextInput
                  editable={true}
                  placeholder={'Enter Qualification'}
                  onChangeText={(text) => this.setState({qualification: text})}
                  value={this.state.qualification}
                  style={{width: 200, marginVertical: 10, padding: 2, borderColor: 'grey', borderWidth: 1}}
                />
                <TextInput
                  editable={true}
                  placeholder={'Enter Category'}
                  onChangeText={(text) => this.setState({category: text})}
                  value={this.state.category}
                  style={{width: 230, marginVertical: 5, padding: 2, borderColor: 'grey', borderWidth: 1}}
                />
            </View>
          </View>
      </View>
    )
  }
}

export default settings;
