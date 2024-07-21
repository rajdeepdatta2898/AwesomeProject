/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
// import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  NativeModules,
  Image
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const {UPIInstalledAppsModule} = NativeModules;

const App = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getInstalledUPIApps = async () => {
      const appList = await UPIInstalledAppsModule.getInstalledUPIAppLists();
      console.log(appList)
      setResults(appList);
    };
    getInstalledUPIApps();
  }, []);
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <View styles={styles.container}>
      {results?.map((app,id) => (
        <View styles={styles.listView} key={id}>
          <Image
            source={{uri: `data:image/png;base64,${app?.icon}`}}
            resizeModule="contain"
            style={{
              width: 100,
              height: 50,
              // resizeMode: Image.resizeMode.contain,
              borderWidth: 1,
              borderColor: 'red',
            }}
            // styles={styles.icon}
          />
          <Text>{app?.name}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContents: 'center',
  },
  listView: {
    flexDirection: 'column',
    flex: 1,
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default App;
