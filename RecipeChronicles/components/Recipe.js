export default function Recipe(id, div) {
    const api_url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=e0139c74c082422caeb7ab68cfa6aa10`;

    fetch(api_url)
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.image;
            div.innerHTML = `
                <div class="row">
                    <div class="col-5">
                        <img src="${imageUrl}" class="card-img-top" style="object-fit: cover; height: 100%; width: 100%;" alt="${data.title}">
                    </div>
                    <div class="col-5 offset-1">
                        <h5>${data.title}</h5>
                        <p>Servings: ${data.servings}</p>
                        <p>Ready in: ${data.readyInMinutes} minutes</p>
                        <h2>Ingredients</h2>
                        <ul>
                            ${data.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
                        </ul>
                        <h2>Instructions</h2>
                        <p>${data.instructions}</p>
                        <button id="add-to-favorites-btn" class="btn btn-sm btn-outline-primary"><i class="bi bi-bookmark-heart"></i> Add to Favorites</button>
                        <a href="/recipes.html" class="btn btn-sm btn-outline-primary mx-2"><i class="bi bi-arrow-left"></i>Go to Recipes</a>
                    </div>
                </div>
            `;

            // Get the "Add to Favorites" button element
            const addToFavoritesButton = document.getElementById('add-to-favorites-btn');

            if (addToFavoritesButton) {
                // Add a click event listener to the button
                addToFavoritesButton.addEventListener('click', function (event) {
                    // Prevent the default button behavior (e.g., submitting a form)
                    event.preventDefault();

                    // Extract relevant information from the recipe details
                    const recipeDetails = {
                        id: data.id,
                        title: data.title,
                        imageUrl: imageUrl,
                        // Add other properties as needed
                    };

                    // Call a function to add the recipe to favorites
                    addToFavorites(recipeDetails);
                });
            } else {
                console.error('Error: "Add to Favorites" button not found.');
            }
        })
        .catch(error => {
            console.error('Error fetching recipe details:', error);
            div.innerHTML = '<p>Error fetching recipe details. Please try again later.</p>';
        });

    function addToFavorites(recipeDetails) {
        // Retrieve existing favorites or initialize an empty array
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Check if the recipe is not already in favorites
        if (!favorites.some(favorite => favorite.id === recipeDetails.id)) {
            // Add the recipe to favorites
            favorites.push(recipeDetails);

            // Save the updated favorites to local storage
            localStorage.setItem('favorites', JSON.stringify(favorites));

            alert('Recipe added to favorites!');
        } else {
            alert('Recipe is already in favorites!');
        }
    }
}