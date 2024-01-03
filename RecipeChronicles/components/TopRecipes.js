export default function TopRecipes(div) {
    const api_url = 'https://api.spoonacular.com/recipes/search?apiKey=e0139c74c082422caeb7ab68cfa6aa10';

    fetch(api_url)
    .then(response => response.json())
    .then(data => {
        const recipes = data.results;
        const top_recipes = recipes.slice(0, 4);
        let recipes_html = `<div class="row">`;

        top_recipes.forEach(r => {
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
                            <a href="recipe_details.html?id=${r.id}" class="btn btn-outline-primary">View Details</i></a>
                        </div>
                    </div>
                </div>
            `;
        });

        recipes_html += `</div>`;
        div.innerHTML = recipes_html;
    })
    .catch(error => console.error('Error fetching recipes:', error));
}