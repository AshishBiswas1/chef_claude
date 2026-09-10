export default function IngredientList(props) {
  const ingredientElement = props.list.map((ingd) => {
    return <li key={ingd}>{ingd}</li>;
  });

  return (
    <section>
      <h2>Ingredients on hand:</h2>
      <ul className="ingredients-list" aria-live="polite">
        {ingredientElement}
      </ul>
      {props.list.length > 3 && (
        <div className="get-recipe-container">
          <div ref={props.ref}>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={props.getRecipe} disabled={props.isLoading}>
            {props.isLoading ? (
              <span className="btn-spinner"></span>
            ) : (
              <span>Get a recipe</span>
            )}
          </button>
        </div>
      )}
    </section>
  );
}
