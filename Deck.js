import React, {Component} from 'react';
import {View, Animated, PanResponder, Dimensions} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;

class Deck extends Component {

  constructor(props) {
    super(props);
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({
          x: gesture.dx,
          y: gesture.dy
        })
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipeRight();
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipeLeft();
        } else {
          this.resetPosition();
        }
      }
    });
    this.state = {panResponder, position, index: 0};
  }

  forceSwipeLeft() {
    Animated.timing(this.state.position, {
      toValue: {
        x: -SCREEN_WIDTH,
        y: -0
      },
      duration: 250,
    }).start(() => this.onSwipeLeftComplete());
  }

  forceSwipeRight() {
    Animated.timing(this.state.position, {
      toValue: {
        x: SCREEN_WIDTH,
        y: 0
      },
      duration: 250,
    }).start(() => this.onSwipeRightComplete());
  }

  onSwipeRightComplete() {
    const { onSwipeRight } = this.props;
    const item = this.props.data[this.state.index];
    this.state.position.setValue({
      x:0,
      y: 0
    });
    this.setState({
      index: this.state.index + 1
    });
  }

  onSwipeLeftComplete() {
    const { onSwipeLeft } = this.props;
    const item = this.props.data[this.state.index];
    this.state.position.setValue({
      x:0,
      y: 0
    });
    this.setState({
      index: this.state.index + 1
    });
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: {
        x: 0,
        y: 0
      }
    }).start();
  }

  getCardStyle() {
    const {position} = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    });
    return {
      ...position.getLayout(),
      transform: [{rotate}]
    }
  }

  renderCards() {

    if(this.state.index > this.props.data.length){
      return this.props.renderNoMoreCards();
    }

    return this.props.data.map((item, i) => {
      if( i < this.state.index) {
        return null;
      }
      if (i === this.state.index) {
        return <Animated.View
          key={item.id}
          style={this.getCardStyle()}
          {...this.state.panResponder.panHandlers}>
          {this.props.renderCard(item)}
        </Animated.View>
      }
      return this.props.renderCard(item);
    })
  }

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    )
  }
}

export default Deck;