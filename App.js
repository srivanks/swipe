import React from 'react';
import {Text, View} from 'react-native';
import {Card, Button} from 'react-native-elements'
import data from './data';
import Deck from './Deck';

export default class App extends React.Component {

  renderCard(item) {
    return (
      <Card
        title={item.text}
        image={{uri: item.uri}}>
        <Text style={{marginBottom: 10}}>ANKUSH</Text>
        <Button icon={{name: 'code'}} style={{backgroundColor: '#03A9F4'}} title={'View Now'}/>
      </Card>
    )
  }

  renderNoMoreCards() {
    return (
      <Card title={'All Done!'}>
        <Text>
          There is no more content here.
        </Text>
      </Card>
    )
  }

  render() {
    return (
      <View>
        <Deck data={data} renderCard={this.renderCard}
              onSwipeRight={this.onSwipeRight}
              onSwipeLeft={this.onSwipeLeft}
              renderNoMoreCards={this.renderNoMoreCards}
        />
      </View>
    );
  }
}