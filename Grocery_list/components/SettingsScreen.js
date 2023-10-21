//Import
//--Standard React
import * as React from "react";
//--Importer React native funktioner
import {Button, StyleSheet, Text, View} from "react-native";

//Konstanter
//--Navigations kontrol
const navController = (navigation, route) =>{
    //Navigation til det komponent der hænger sammen med det overførte rutenavn
    navigation.navigate(route)
}

//SettingsScreen
//--Bruger navigation (prædefineret prop) som argument
//--Navigation kan referes til i alle screen komponenter
function SettingsScreen({navigation}) {
    return (
        <View style={styles.container}>
            {/* <Text style={styles.text}>SettingsScreen!</Text> */}
            {/* Knap til profil som kalder navController-funktionen */}
            <Button title="Profile" style={styles.button} onPress={() => navController(navigation, 'Profile')}  />
            <Text>{"\n"}</Text>
            <Button title="Messages" style={styles.button} onPress={() => navController(navigation, 'Messages')}/>
            <Text>{"\n"}</Text>
            <Button title="Log out"/>
        </View>
    );
}

//Export
export default SettingsScreen


//Lokal styling
const styles = StyleSheet.create({
    //container, beholderen til titel og knap
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height:'100%'
    },
    //tekst styling
    text: {
        fontSize: 20,
    },
});