import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { f, database, storage, auth } from '../../config/config.js';


import PhotoList from '../components/photoList.js';
import UserAuth from '../components/auth.js';

class feed extends React.Component {

  constructor(props){
    super(props)
    this.state={
      photo_feed: [],
      refresh: true,
      loading: true,
    }
  }

  render(){
    return(
        <View style={{flex:1}}>
          <View style={{height: 70, paddingTop: 25, backgroundColor: 'white', borderColor: 'black', borderBottomWidth: 1.5, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>FEED</Text>
          </View>
          <PhotoList isUser={false} navigation={this.props.navigation} />
        </View>
    )
  }
}

export default feed;
