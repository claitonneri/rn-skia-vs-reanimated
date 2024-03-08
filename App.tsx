import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, SafeAreaView, Image } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {
  Canvas,
  Group,
  Rect,
  useComputedValue,
  mix,
  vec,
  SkiaValue,
  useTiming,
} from '@shopify/react-native-skia';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const BOX_SIZE = 20;

export default function App() {
  // reanimated
  // const duration = 2000;
  // const easing = Easing.bezier(0, 0, 0, 0);
  
  // const sv = useSharedValue(0);
  
  // React.useEffect(() => {
  //   sv.value = withRepeat(withTiming(1, {duration, easing}), -1);
  // }, []);
  
  // const animatedStyle = useAnimatedStyle(() => ({
  //   transform: [{rotate: `${sv.value * 360}deg`}],
  // }));
  
  // return (
  //   <SafeAreaView style={styles.container}>
  //     {new Array(2000).fill(null).map((_, index) => (
  //       <RotatedSquare key={index} animatedStyle={animatedStyle} />
  //     ))}
  //     <Image source={require('./assets/favicon.png')} style={styles.image} />
  //   </SafeAreaView>
  // );
  
  const progress = useTiming({loop: true}, {duration: 2000});
  const transform = useComputedValue(
    () => [{rotate: mix(progress.current, 0, 7.8)}],
    [progress],
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Canvas style={styles.container}>
        <Group>
          {new Array(2000).fill(0).map((_, index) => (
            <CanvasSquare key={index} transform={transform} />
          ))}
        </Group>
      </Canvas>
      <Image source={require('./assets/favicon.png')} style={styles.image} />
    </SafeAreaView>
  );
}

type RotatedSquareProps = {
  animatedStyle: {transform: {rotate: string}[]};
};

const RotatedSquare = ({animatedStyle}: RotatedSquareProps) => (
  <Animated.View
    style={[
      styles.box,
      animatedStyle,
      {
        top: Math.random() * deviceHeight - BOX_SIZE / 2,
        left: Math.random() * deviceWidth - BOX_SIZE / 2,
      },
    ]}
  />
);

type CanvasSquareProps = {
  transform: SkiaValue<{rotate: number}[]>;
};

const CanvasSquare = ({transform}: CanvasSquareProps) => {
  const x = Math.random() * deviceWidth - BOX_SIZE / 2;
  const y = Math.random() * deviceHeight - BOX_SIZE / 2;
  const c = vec(x + BOX_SIZE / 2, y + BOX_SIZE / 2);

  return (
    <Rect
      transform={transform}
      origin={c}
      x={x}
      y={y}
      width={BOX_SIZE}
      height={BOX_SIZE}
      color={'#b58df1'}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
  },
  box: {
    position: 'absolute',
    height: BOX_SIZE,
    width: BOX_SIZE,
    backgroundColor: '#b58df1',
  },
  text: {
    position: 'absolute',
    alignSelf: 'center',
    top: deviceHeight / 2 - 24,
    fontSize: 24,
    color: 'black',
  },
  image: {
    height: 150,
    width: 150,
    position: 'absolute',
    top: Dimensions.get('window').height / 2 - 75,
    left: Dimensions.get('window').width / 2 - 75
  }
});
