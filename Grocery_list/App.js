//Imports:
//--Standard React
import * as React from 'react';
//DB
import { getApps, initializeApp } from "firebase/app"
//import {firebase} from 'firebase'
//--Navigation & ikoner
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
//--Komponenter
import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";
import StackNavigator from "./components/StackNavigator";


//Konstanter
//--Konstant for tabnavigator.
const Tab = createBottomTabNavigator();

//--Tekst brugeren vises i de to "screen" komponenter
const GrocerylistScreenText = "Recipe List!"
const RecipeScreenText = "Recipe Form!"


//Standard react applikation - root komponentet
function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyAOCAkZISDMxe7GZLEad-hAht1EVbaNdDQ",
    authDomain: "database-6b25a.firebaseapp.com",
    databaseURL: "https://database-6b25a-default-rtdb.firebaseio.com",
    projectId: "database-6b25a",
    storageBucket: "database-6b25a.appspot.com",
    messagingSenderId: "320432698864",
    appId: "1:320432698864:web:eaa19bef19f716bdced935"
  };

  // Vi kontrollerer at der ikke allerede er en initialiseret instans af firebase
  // Så undgår vi fejlen Firebase App named '[DEFAULT]' already exists (app/duplicate-app).
  if (getApps().length < 1) {
    initializeApp(firebaseConfig);
    console.log("Firebase On!");
    // Initialize other firebase products here
  }
  const addRecipeToFirebase = (name, ingredients) => {
    return firebase().collection('recipes').add({ name, ingredients });
  };
  return (
    //Navigations beholderen
    <NavigationContainer>
      {/* Navigationen kaldes som styrer tabsne
            screenOptions bruges til at bestemme ruten */}
      <Tab.Navigator screenOptions={({ route }) => ({
        /* styling af navigationsbaren */
        tabBarActiveTintColor: "#FFCC99",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: [
          {
            display: "flex"
          },
          null
        ],
        /* Styling af tab-bar ikonerne
            Ionicons kaldes. https://ionic.io/ionicons 
            if-statement for at ikonerne fastsættes til de enkelte navigationer*/
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Recipe List') {
            return (
              <Ionicons
                name={'cart-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Create Recipe') {
            return (
              <Ionicons
                name='restaurant-outline'
                size={size}
                color={color}
              />
            );
          }
          else {
            return (
              <Ionicons
                name='md-list-outline'
                size={size}
                color={color}
              />
            );
          }
        },
      })}
      /* De importeret Screen-komponenter kaldes 
      Komponentet vises gennem en funktion som returner de komponenter der er fastlagt til Tab-navigationen  
      Hvert komponent bruger prop til at fremvise den tekst der er blevet angivet i konstanterne
      */
      >
        <Tab.Screen name="Create Recipe" children={() => <RecipeForm prop={RecipeScreenText} />} />
        <Tab.Screen name="Recipe List" children={() => <RecipeList prop={GrocerylistScreenText} />} />
        {/* nested stacknavigator der vil blive fremvist i settings */}
        <Tab.Screen name="Settings" component={StackNavigator} />
        {/* Tab-navigationen afsluttes */}
      </Tab.Navigator>
      {/* Navigations beholderen afsluttes */}
    </NavigationContainer>
  );
}

//Eksport
export default App