/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from "react";
import { ScrollView, StyleSheet, Keyboard, Text, View, TextInput, TouchableOpacity} from "react-native";
import {todoItems} from "./constants/cart"

export default function App() {
  const [getInputText, setInputText] = useState('');
  const [getList, setList] = useState(todoItems);
  const [editingItem, setEditingItem] = useState(0);

  const addItem = () => {
    console.log(getInputText);
    setList([
      ...getList,
      {key:Math.random().toString() , data:getInputText}
    ]);
    setInputText('');
    Keyboard.dismiss();
  }
  const  removeItem = (itemKey) => {
    setList(list => getList.filter(item => item.key != itemKey));
  }
  const editItem = (item) => {
  setInputText(item.data);
  setEditingItem(item.key);
  }
  const updateItem = () => {
    setList(list => getList.map(item =>
      item.key === editingItem ?
        {key: item.key, data: getInputText} : item
    ));
    setInputText("");
    setEditingItem(0);
  }
  const scrollView = (
    <ScrollView style={styles.scrollview}>
      {getList.map((item, index) =>
        <TouchableOpacity
          key= {item.key}
          activeOpacity={0.7}
          onPress= {() =>editItem(item) }
        >
          <View style={styles.scrollItem}>
            <Text style={styles.scrollviewText}>{index + 1} : {item.data}</Text>
            <TouchableOpacity onPress={() => removeItem(item.key)}>
            <View style={{backgroundColor: "#4B371C", borderRadius: 30, padding: 7}}>
              <Text style={styles.removeText}> X </Text>
            </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </ScrollView>
  );

  const emptyScrollView = (
    <View>
      <Text style={{color: "grey", fontSize: 25}}>Empty items</Text>
    </View>
  );

  return (
    <View style={styles.sectionContainer}>
      <View style={{flexDirection: "row",  margin: 10, width: "95%",  height: "10%",  backgroundColor: "coral", borderRadius: 2}}>
        <Text style={{fontSize: 25,  color: "white" ,margin:15,  fontFamily: 'sans-serif-medium' }}>Items Cart</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput }
          placeholder= "Enter Items"
          onChangeText={text => setInputText(text)}
          value={getInputText}
        />
        <TouchableOpacity activeOpacity={0.9} onPress = {editingItem === 0 ? addItem : updateItem} disabled={getInputText.length <=0 }>
          <View style={{backgroundColor:'coral', padding: 10, marginLeft:5, borderRadius:20 , paddingHorizontal: 15}}>
            <Text style={{color: "white", fontSize: 20}}> {editingItem === 0 ? "ADD" : "EDIT"} </Text>
          </View>
        </TouchableOpacity>

      </View>
      {getList.length <= 0 ? emptyScrollView: scrollView}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop:5
  },
  inputContainer:{
    flexDirection: "row",
    width: "70%",
    justifyContent: "space-between",
    paddingTop: 10,
    alignItems: "center"
  },
  textInput:{
    borderColor: "coral",
    width: '80%',
    fontSize: 18,
    borderBottomWidth: 2,
  },
  scrollItem:{
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: 'coral',
    width: "90%",
    padding: 10,
    margin: 10,
    borderRadius: 20,
    alignSelf: "center"
  },
  scrollviewText:{
    fontSize: 25,
    color: "white",
  },
  scrollview:{
    width: "100%",
  },
  removeText:{
    fontSize: 20,
    color: "white",
  }
});
