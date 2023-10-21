import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import { useEffect, useState } from 'react';

import {
  getDatabase,
  ref,
  child,
  push,
} from 'firebase/database';

function AddRecipe({ navigation, route }) {
  const db = getDatabase();

  const initialState = {
    recipe_name: '',
    ingredient_1: '',
    ingredient_2: '',
    ingredient_3: '',
  };

  const [newRecipe, setRecipe] = useState(initialState);

  const changeTextInput = (name, event) => {
    setRecipe({ ...newRecipe, [name]: event });
  };

  const handleSave = async () => {
    const { recipe_name, ingredient_1, ingredient_2, ingredient_3 } = newRecipe;

    if (
      recipe_name.length === 0 ||
      ingredient_1.length === 0 ||
      ingredient_2.length === 0 ||
      ingredient_3.length === 0
    ) {
      return Alert.alert('One or more fields are empty!');
    } else {
      const recipeRef = ref(db, '/Recipies/');

      const newRecipeData = {
        recipe_name,
        ingredient_1,
        ingredient_2,
        ingredient_3,
      };

      await push(recipeRef, newRecipeData)
        .then(() => {
          Alert.alert('Saved');
          setRecipe(initialState);
        })
        .catch((error) => {
          console.error(`Error: ${error.message}`);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {Object.keys(initialState).map((key, index) => {
          return (
            <View style={styles.row} key={index}>
              <Text style={styles.label}>{key}</Text>
              <TextInput
                value={newRecipe[key]}
                onChangeText={(event) => changeTextInput(key, event)}
                style={styles.input}
              />
            </View>
          );
        })}
        <Button title="Add Recipe" onPress={() => handleSave()} color="#007BFF" />
      </ScrollView>
    </SafeAreaView>
  );
}

export default AddRecipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFE5CC',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    height: 40,
    margin: 10,
  },
  label: {
    fontWeight: 'bold',
    width: 100,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    color: 'black',
  },
});
