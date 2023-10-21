//Import
//--Standard React
import * as React from "react";
//--React funktioner 
import {StyleSheet, Text, View} from "react-native";


/*
*ScreenOne er den ene af de tre screens i StackNavigatoren
* ScreenOne præsenterer en tekst, der beskriver, hvor brugeren befinder sig samt
* returnerer to <Button/>, som benyttes til henholdsvis at navigere tilbage til sidste Screen og
* navigere ind til den anden screen i stackComponents
* Slutteligt er der inkluderet styling til komponenterne
 */
//Profile
//--det view brugeren sendes hen til gennem stack navigationen
function Profile({ navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Jacob</Text>
            <View style={{display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column'}}>
                <Text style={styles.text_information}>
                Kategori: studerende {"\n"}
                Personer: 1 {"\n"}
                Foretrukket mad: Italienske
                </Text>
                {/* Knapper der gemmes til senere brug. Knapperne kan bruges til at navigere hen til anden screen eller tilbage til navigations stacken */}
                {/* <View style={{margin: '2%'}} >
                    <Button title="Go Back" onPress={() => navigation.goBack() } />
                </View> */}
                {/* <View style={{margin: '2%'}} >
                    <Button title="Notifications" onPress={() => navigation.navigate('NotificationSettings')}  />
                </View> */}
            </View>
        </View>
    );
}

//Eksport 
export default Profile


//Lokal styling til brug i ScreenOne
const styles = StyleSheet.create({
    //Beholder
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    //Tekst
    },
    text: {
        fontSize: 20,
    },
    text_information: {
        textAlign: 'center',
    }
});