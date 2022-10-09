import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Image } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

const App = () => {
  const [data, setData] = useState([]);
  const [isFetching, setisFetching] = useState(false);

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  const onRefresh = () => {
    setisFetching(true);
    getData();
  };

  const getData = async () => {
    try {
      const response = await fetch(
        'https://dev-dummy-api.jelantah.org/api/foods/get'
      );
      const json = await response.json();
      console.log(json);
      setData(json.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={() => onRefresh()}
        refreshing={isFetching}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.mainView} key={index}>
              <View style={styles.images}>
                <Image
                  source={{
                    uri: item.url_image_absolute,
                  }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 10,
                  }}
                  resizeMode="cover"
                />
              </View>
              <View style={{ flex: 2, justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, textTransform: 'capitalize' }}>
                  {item.food_name}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mainView: {
    marginTop: 10,
    marginHorizontal: 15,
    borderWidth: 0.5,
    borderColor: '#4c669f',
    borderRadius: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  images: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "red",
    margin: 10,
  },
});
