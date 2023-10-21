//Imports:
//--standard react
import * as React from "react";
import {StyleSheet, Text, View} from "react-native";
//--Navigation
import { createStackNavigator } from '@react-navigation/stack';
//--Komponenter
import SettingsScreen from "./SettingsScreen";
import Profile from "./stackComponents/ProfileSettings";
import Messages from "./stackComponents/Messages";

//Konstanter
//--Der startes en stack hvor react funktionen createStackNavigator kaldes
const Stack = createStackNavigator()

//Stack navigationen
//--Stack navigationens funktion
function StackNavigator() {
    return (
        <Stack.Navigator
            /* det indledende rute navn sættes til "Settings" */
            initialRouteName="Settings"
        >{/* SettingsScreen sættes som standard destination for StackNavigator 
                en screen for settings og profil fastssættes til stacken
                Hver skærm styles unikt ved brug af options
                */}
            <Stack.Screen name="Options" style={styles.container} component={SettingsScreen}
                options={{
                    headerTitleAlign: 'center',
                    headerTitleStyle: { color: 'black' },
                }
                }
            />
            <Stack.Screen name="Profile" component={Profile}
                options={{
                    headerTitleStyle: { textAlign: 'right', color: 'black' },
                }} />
            <Stack.Screen name="Messages" component={Messages}
                options={{
                    headerTitleStyle: { textAlign: 'right', color: 'black' },
                }} />
        </Stack.Navigator>
    )
}

//Eksport
export default StackNavigator

const styles = StyleSheet.create({
    container: {
        
    }
})