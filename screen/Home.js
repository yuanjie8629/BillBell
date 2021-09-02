import React, {useEffect }from "react";
import { Text, View} from 'react-native';
import { DatabaseConnection } from '../database/Connection';
const createTable = () => {
  db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Bill(ID INTEGER PRIMARY KEY AUTOINCREMENT, Title VARCHAR(20), Category VARCHAR(10), Amount REAL(100), Date VARCHAR(100))'
      )
  })
}
const db = DatabaseConnection.getConnection();

function HomeScreen() {
  useEffect(() => {
    createTable();
  }, []);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
}

export default HomeScreen;