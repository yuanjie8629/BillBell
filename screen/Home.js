import React, {useEffect }from "react";
import { Text, View} from 'react-native';
import { DatabaseConnection } from '../database/Connection';
const createTable = () => {
  db.transaction((tx) => {
      tx.executeSql(
          "CREATE TABLE IF NOT EXISTS "
          + "Bill"
          + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT, Category TEXT, Amount REAL, Date TEXT);"
      )
  })
}
const db = DatabaseConnection.getConnection();

function Home() {
  useEffect(() => {
    createTable();
  }, []);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
}

export default Home;