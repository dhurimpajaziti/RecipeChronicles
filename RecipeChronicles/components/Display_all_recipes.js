export default function displayAllRecipes(div) {
    // Retrieve search query from the URL
    const searchParams = new URLSearchParams(window.location.search);
    const searchQuery = searchParams.get('search');

    let api_url;

    if (searchQuery) {
        // If there's a search query, fetch recipes based on the search query
        api_url = `https://api.spoonacular.com/recipes/search?apiKey=e0139c74c082422caeb7ab68cfa6aa10&query=${encodeURIComponent(searchQuery)}`;
    } else {
        // If there's no search query, fetch all recipes
        api_url = 'https://api.spoonacular.com/recipes/search?apiKey=e0139c74c082422caeb7ab68cfa6aa10';
    }

    fetch(api_url)
        .then(response => response.json())
        .then(data => {
            const recipes = data.results;
            let recipes_html = '<div class="row">';

            recipes.forEach(r => {
                const imageUrl = `https://spoonacular.com/recipeImages/${r.image}`;
                recipes_html += `
                    <div class="col-3">
                        <div class="card mb-4">
                            <div class="card-img-container" style="height: 356px; overflow: hidden;">
                                <img src="${imageUrl}" class="card-img-top" style="object-fit: cover; height: 100%; width: 100%;" alt="...">
                            </div>
                            <div class="card-body" style="height: 160px;">
                                <h5 class="card-title">${r.title}</h5>
                                <p class="card-text">
                                </p>
                                <a href="recipe_details.html?id=${r.id}" class="btn btn-outline-primary">View Details</a>
                            </div>
                        </div>
                    </div>
                `;
            });

            recipes_html += '</div>';
            div.innerHTML = recipes_html;
        })
        .catch(error => console.error('Error fetching recipes:', error));
}