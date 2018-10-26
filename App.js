/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  Image, 
  StatusBar,
  View} from 'react-native';
import axios from 'axios';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const API_KEY = "bd5e378503939ddaee76f12ad7a97608";
const DEFAULT_ZIPCODE = 98052

export default class myFirstApp extends Component {

  constructor() {
    super();
    this.state = {
      zipcode: DEFAULT_ZIPCODE,
      days: [],
    }
  }

  _getForecast(zipcode)
  {
    const request_url = "http://openweathrmap.org/current" + API_KEY + "/forecast/q/" + zipcode + ".json";
    axios.get(request_url).then( (response) => {
      if (response.status == 200 ) {
        var weather = response.data.forecast.simpleforecast.forecastday;
        var forecast = [];
        weather.forEach( (element,index) => {
          forecast = forecast.concat([
            {
              date: element.date.weekday,
              temperature:
              {
                high:
                {
                  fahrenheit: element.high.fahrenheit,
                  celsius: element.high.celsius
                },
                low:
                {
                  fahrenheit: element.low.fahrenheit,
                  celsius: element.low.celsius
                }
              }, 
              conditions: element.conditions,
              wind:
                {
                  mph: element.avewind.mph,
                  dir: element.avewind.dir
                },
                icon_url: element.icon_url
                }
              ]);
        });
      }
    });
  }

  render() {
    if ( this.state.days.length <= 0 )
    {
        this._getForecast(this.state.zipcode);
    }
    return (
      <View style={styles.container}>
        <StatusBar hidden/>
      {
        this.state.days.map( (element, index) => {
          return (
            <View key={ index } style={{ marginTop: 10, borderWidth: 2, justifyContent: "center", alignItems: "center", backgroundColor: "white", width: Dimensions.get('window').width / 1.25 }}>
              <Image
                style={{width: 50, height: 50}}
                source={{url: element.icon_url}}
                />
                <Text>{element.conditions}</Text>
                <Text>High: {element.temperature.high.fahrenheit}F | {element.temperature.high.celsius}C</Text>
                <Text>Low: {element.temperature.low.fahrenheit}F | {element.temperature.low.celsus}C</Text>
                <Text>Wind: {element.wind.dir} @ {element.wind.mph} MPH</Text>
                <Text style={{fontWeight: "900"}}>{element.date}</Text>
            </View>
          )
        })
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'e3e3e3',
  },
});
