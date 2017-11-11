import React, { Component } from 'react';
import { Image, ImageBackground, ActivityIndicator, ListView, Alert, AppRegistry, Platform, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native';

export default class SOSApp extends Component {

  constructor(props) {
     super(props);
     this.state = {
       isConfirmation: false,
       isSettings: false,
       text: '',
       latitude: null,
       longitude: null,
       error: null,
       data: null,
       message: null
     }

     this._onPressSoSButton = this._onPressSoSButton.bind(this);
     this._onPressBackButton = this._onPressBackButton.bind(this);
     this._onPressSettingsButton = this._onPressSettingsButton.bind(this);
     this._onPressSubmitButton = this._onPressSubmitButton.bind(this);
     this._onPressSentButton = this._onPressSentButton.bind(this);
   }

   componentDidMount() {
     navigator.geolocation.getCurrentPosition(
       (position) => {
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
         });
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
     );
   }

   _onPressSentButton() {

         console.log('_onPressSentButton Called');

         this.setState({
           isConfirmation: false,
           isSettings: false,
           latitude: null,
           longitude: null,
           error: null
         }, function() {
           // do something with new state
         });
   }

  _onPressSoSButton() {

    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        console.log('API Called' + ds);

        this.setState({
          isConfirmation: true,
          dataSource: ds.cloneWithRows(responseJson.movies),
        }, function() {
          // do something with new state
        });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  _onLongPressButton() {
    Alert.alert('You long-pressed the button!')
  }


    _onPressBackButton() {

      this.setState({
        isConfirmation: false,
        isSettings: false,
      }, function() {
        // do something with new state
      });
    }

    _onPressSettingsButton() {

      console.log('lat: ' + this.state.latitude + ' long: ' + this.state.longitude);
      console.log('http://api.openweathermap.org/data/2.5/forecast?lat=' + this.state.latitude + '&lon=' +this.state.longitude+ '&APPID=f1e776e02a4047980ccf995525aba9cc');

        return fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + this.state.latitude + '&lon=' +this.state.longitude+ '&APPID=f1e776e02a4047980ccf995525aba9cc')
        .then((response) => response.json())
        .then((responseJson) => {
              //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

              console.log('API Called' + responseJson.message);


              console.log('Weather main: ' + responseJson.list[0].weather[0].main);
              console.log('Weather description: ' + responseJson.list[0].weather[0].description);

              var alertMessage = '';

              if (responseJson.list[0].weather[0].main == "Clear") {
                alertMessage = 'Sky is clear today!';
              } else if (responseJson.list[0].weather[0].main == "Rain") {
                alertMessage = 'Rainy weather today!';
              } else if (responseJson.list[0].weather[0].main == "Extreme") {
                alertMessage= 'Extreme weather today! Be safe.';
              } else if (responseJson.list[0].weather[0].main == "Snow") {
                alertMessage= 'Going to Snow today! Be safe.';
              } else if (responseJson.list[0].weather[0].main == "Clouds") {
                alertMessage= 'It is Cloudy today!';
              } else {
                alertMessage= 'All good. Be happy!';
              }

                this.setState({
                  isSettings: false,
                  isConfirmation: false
                }, function() {
                  // do something with new state
                });

                console.log('Weather custom message : ' + alertMessage);

                Alert.alert('Alert',alertMessage);
            })
            .catch((error) => {
              console.error(error);
            });
    }

    _onLongPressBackButton() {
      Alert.alert('You long-pressed the back button!')
    }

  _onPressSubmitButton() {

    this.setState({
      isConfirmation: false,
      isSettings: false,
    }, function() {
      // do something with new state
    });

  }

  render() {

    if (this.state.isSettings) {
      return (
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
          <View style={{flex: 1, flexDirection: 'row', paddingTop: 20}}>
              <View style={{flex: 1, paddingTop: 20}}>
                <Text> Mobile 1: </Text>
                </View>
                <View style={{flex: 1}}>
                  <TextInput keyboardType="phone-pad" dataDetectorTypes="phoneNumber" style={styles.textInput}
                    placeholder="First Contact" onChangeText={(text) => this.setState({text})} />
              </View>
          </View>
          <View style={{flex: 1, paddingTop: 20}}>
            <View>
              <TouchableHighlight onPress={this._onPressSubmitButton} underlayColor="white">
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Submit</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      );
    }

    else if (this.state.isConfirmation) {
        return (
          <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: '#F2F2F2', paddingTop: 20}}>
            <View style={{flex: 1, height: 1}}>
            </View>
            <View style={{flex: 4, flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                      <TouchableHighlight onPress={this._onPressSettingsButton} underlayColor="#F2F2F2">
                        <View style={styles.settingsbutton}>
                              <Image
                                 style={{width: 35, height: 35, paddingTop: 20}}
                                 source={require('./img/nav.png')} />
                        </View>
                      </TouchableHighlight>
                   </View>
                  <View style={{flex: 10, flexDirection: 'row', justifyContent: 'center'}}>
                      <Image
                         style={{width: 100, height: 35, paddingTop: 20}}
                         source={require('./img/sos.png')} />
                  </View>
                  <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <TouchableHighlight onPress={this._onPressSettingsButton} underlayColor="#F2F2F2">
                        <View style={styles.settingsbutton}>
                              <Image
                                 style={{width: 35, height: 35, paddingTop: 20}}
                                 source={require('./img/alerton.png')} />
                        </View>
                      </TouchableHighlight>
                   </View>
             </View>
             <View style={{flex: 18, paddingTop: 100}}>
               <TouchableHighlight underlayColor="#F2F2F2">
                 <View style={styles.button}>

                   <Image
                      style={{width: 76, height: 80, paddingTop: 20}}
                      source={require('./img/hope.png')} />
                 </View>
               </TouchableHighlight>
             </View>

            <View style={{flex: 18, paddingTop: 10}}>
              <TouchableHighlight onPress={this._onPressSentButton} underlayColor="#F2F2F2">
                <View style={styles.button}>

                  <Image
                     style={{width: 130, height: 130, paddingTop: 20}}
                     source={require('./img/sent.png')} />
                </View>
              </TouchableHighlight>
            </View>
          </View>
        );
      }
    else {
        return (
          <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: '#F2F2F2', paddingTop: 20}}>
            <View style={{flex: 1, height: 1}}>
            </View>
            <View style={{flex: 4, flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                      <TouchableHighlight onPress={this._onPressSettingsButton} underlayColor="#F2F2F2">
                        <View style={styles.settingsbutton}>
                              <Image
                                 style={{width: 35, height: 35, paddingTop: 20}}
                                 source={require('./img/nav.png')} />
                        </View>
                      </TouchableHighlight>
                   </View>
                  <View style={{flex: 10, flexDirection: 'row', justifyContent: 'center'}}>
                      <Image
                         style={{width: 100, height: 35, paddingTop: 20}}
                         source={require('./img/sos.png')} />
                  </View>
                  <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <TouchableHighlight onPress={this._onPressSettingsButton} underlayColor="#F2F2F2">
                        <View style={styles.settingsbutton}>
                              <Image
                                 style={{width: 35, height: 35, paddingTop: 20}}
                                 source={require('./img/alerton.png')} />
                        </View>
                      </TouchableHighlight>

                   </View>
             </View>
             <View style={{flex: 18, paddingTop: 100}}>
               <View style={{flex: 1}}>
                   <TouchableHighlight underlayColor="#F2F2F2">
                     <View>
                       <Image
                          style={{width: 76, height: 80}}
                          source={require('./img/hope.png')} />
                     </View>
                   </TouchableHighlight>
                 </View>
                 <View style={{flex: 1}}>
                     <View>
                     <Text> Hello Hope! </Text>
                     </View>
                 </View>
             </View>

            <View style={{flex: 42, paddingTop: 10}}>
              <View style={{flex: 1}}>
               </View>

              if (this.state.isConfirmation) {
                <View style={{flex: 1}}>
                  <TouchableHighlight onPress={this._onPressSentButton} underlayColor="#F2F2F2">
                    <View style={styles.button}>

                      <Image
                         style={{width: 130, height: 130, paddingTop: 20}}
                         source={require('./img/sent.png')} />
                    </View>
                  </TouchableHighlight>
                </View>
              } else {

                  <View style={{flex: 1}}>
                      <TouchableHighlight onPress={this._onPressSoSButton} underlayColor="#F2F2F2">
                        <View style={styles.button}>
                          <Image
                             style={{width: 130, height: 130, paddingTop: 20}}
                             source={require('./img/thumb.png')} />
                        </View>
                      </TouchableHighlight>
                  </View>

              }

              <View style={{flex: 1}}>
                  <View>
                  <Text style={{textAlign: 'center'}}> Press to initiate SoS! </Text>
                  </View>
              </View>

            </View>
          </View>
        );
      }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F2F2F2'
  },
  settingsbutton: {
    marginBottom: 30,
    width: 60,
    alignItems: 'center'
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#F2F2F2'
  },
  textboxLabel: {
    flex: 1,
    color: 'black'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  },
  textInput: {
  justifyContent: "center",
  alignItems: "stretch",
  borderRightWidth: 30,
  borderLeftWidth: 30,
  height: 50,
  borderColor: 'gray'
  }
})

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => SOSApp);
