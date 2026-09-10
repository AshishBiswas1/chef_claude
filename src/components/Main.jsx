import React, { useEffect } from 'react';
import Recipe from './Recipe';
import IngredientList from './IngredientList';
import { getRecipeFromMistral } from '../api/ai';

/**
 * Challenge: Get a recipe from the AI!
 *
 * This will be a bit harder of a challenge that will require you
 * to think critically and synthesize the skills you've been
 * learning and practicing up to this point.
 *
 * We'll start with a mini-quiz:
 *
 * 1. Think about where the recipe response should live and how you're
 *    going to make sure it doesn't disappear between each state change in
 *    the app. (I don't mean between refreshes of your mini-browser.
 *    You don't need to save this to localStorage or anything more permanent
 *    than in React's memory for now.)
 *
 *    In react state.
 *
 * 2. What action from the user should trigger getting the recipe?
 *
 */

/**
 * Challenge: Get a recipe from the AI!
 *
 * This will be a bit harder of a challenge that will require you
 * to think critically and synthesize the skills you've been
 * learning and practicing up to this point.
 *
 * Using either the `getRecipeFromChefClaude` function or the
 * `getRecipeFromMistral` function, make it so that when the user
 * clicks "Get a recipe", the text response from the AI is displayed
 * in the <Recipe> component.
 *
 * For now, just have it render the raw markdown that the AI returns,
 * don't worry about making it look nice yet. (We're going to use a
 * package that will render the markdown for us soon.)
 */

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);

  const [recipe, setRecipe] = React.useState('');

  const recipeSection = React.useRef(null);

  const [isLoading, setIsLoading] = React.useState(false);

  /**
   * Problem:
   * We want to scroll the "Ready for a recipe?" div into view
   * ONLY AFTER the ClaudeRecipe section is rendered to the page
   * (i.e. when `recipe` is not an empty string). How can we do that?
   */

  /**
   * Challenge:
   * Add a new effect that calls `recipeSection.current.scrollIntoView()`
   * only if recipe is not an empty string and recipeSection.current is not null.
   * Think carefully about what value(s) you would want to include in
   * the dependencies array.
   */

  useEffect(() => {
    if (recipeSection.current !== null && recipe !== '')
      recipeSection.current.scrollIntoView({ behavior: 'smooth' });
  }, [recipe]);

  function addIngredients(formData) {
    const newIngredient = formData.get('ingredient');
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  async function getRecipe() {
    setIsLoading(true);

    try {
      const generatedRecipe = await getRecipeFromMistral(ingredients);
      setRecipe(generatedRecipe);
    } catch (error) {
      console.error('Failed to fetch Recipe!');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main>
      <form className="add-ingredient-form" action={addIngredients}>
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add Ingredient</button>
      </form>
      {ingredients.length > 0 && (
        <>
          <IngredientList
            isLoading={isLoading}
            list={ingredients}
            getRecipe={getRecipe}
            ref={recipeSection}
          />

          {recipe && <Recipe recipe={recipe} />}
        </>
      )}
    </main>
  );
}
