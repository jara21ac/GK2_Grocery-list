import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";

function RecipeList() {
    const [recipes, setRecipes] = useState({});
    const [markedRecipes, setMarkedRecipes] = useState({});

    useEffect(() => {
        const db = getDatabase();
        const recipesRef = ref(db, "Recipies");

        onValue(recipesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setRecipes(data);
            }
        });

        return () => {
            off(recipesRef); // Unsubscribe the listener
        };
    }, []);

    const handleMarkRecipe = (id) => {
        setMarkedRecipes((prevMarked) => {
            const updatedMarked = { ...prevMarked };
            updatedMarked[id] = !updatedMarked[id];
            return updatedMarked;
        });
    };

    const recipeArray = Object.values(recipes);
    const recipeKeys = Object.keys(recipes);

    // Count marked recipes
    const markedRecipeCount = Object.values(markedRecipes).filter(Boolean).length;

    const isButtonVisible = markedRecipeCount >= 7;

    return (
        <View style={styles.container}>
            <FlatList
                data={recipeArray}
                keyExtractor={(item, index) => recipeKeys[index]}
                numColumns={2} // Display recipes in two columns
                renderItem={({ item, index }) => {
                    const isRecipeMarked = markedRecipes[recipeKeys[index]];

                    return (
                        <TouchableOpacity
                            style={[
                                styles.recipeContainer,
                                isRecipeMarked ? { backgroundColor: 'white' } : null,
                            ]}
                            onPress={() => handleMarkRecipe(recipeKeys[index])}
                        >
                            <Text style={styles.recipeText}>
                                {item.recipe_name}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />
            <Text style={styles.markedRecipeCount}>
                Marked Recipes: {markedRecipeCount}/7
            </Text>
            {isButtonVisible && (
                <Button
                    title="Continue"
                    onPress={() => {
                        // Button function
                    }}
                    color="blue"
                />
            )}
        </View>
    );
}

export default RecipeList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFE5CC',
        padding: 10,
    },
    recipeContainer: {
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        padding: 10,
        width: 160,
    },
    recipeText: { 
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
    },
    markedRecipeCount: {
        textAlign: 'center',
        fontSize: 16,
        color: 'black',
    },
});
