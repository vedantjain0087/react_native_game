import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import  Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';

const StartGameScreen = props =>{
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {

        setEnteredValue(inputText.replace(/[^0-9]/g,''))
    }

    const resetInputhandler = () =>{
        setEnteredValue("");
        setConfirmed(false);
    }
    const confirmInputHandler = () =>{
        const chosenValue = parseInt(enteredValue);
        if( isNaN(chosenValue) || chosenValue < 1  || chosenValue > 99){
            Alert.alert('Invalid Number','Number has to be between 1 and 99',[{text:'okay', style:'destructive', onPress:resetInputhandler}])
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenValue);
        setEnteredValue("");
    }

    let confirmedOutput;
    if(confirmed){
        confirmedOutput = <Text>Chosen Number: {selectedNumber}</Text>
    }
return (
    <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
    }}>
    <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
            <Text>Select a Number</Text>
          <Input style={styles.input} onChangeText={numberInputHandler} value={enteredValue} keyboardType="number-pad" maxLength={2}/>
            <View style={styles.buttonContainer}>
                <View style={styles.button}><Button title="Reset" color={Colors.accent} onPress={resetInputhandler}/></View>
                <View style={styles.button}><Button title="Confirm" color={Colors.primary} onPress={confirmInputHandler}/></View>
            </View>
        </Card>
        {confirmedOutput}
    </View>
    </TouchableWithoutFeedback>
)
}

const styles = StyleSheet.create({
screen:{
    flex:1,
    padding:10,
    alignItems:"center"
},
title:{
    fontSize:20,
    marginVertical:10
},
buttonContainer:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between',
    paddingHorizontal:15
},
inputContainer:{
    width:300,
    maxWidth:'80%',
    alignItems:'center',
},
button:{
     width:100
},
input:{
    width:50,
    textAlign:"center"
}
});

export default StartGameScreen;