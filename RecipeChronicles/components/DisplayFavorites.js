export default function displayFavorites(container) {
    // Retrieve favorites from local storage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    let favorites_html = '<div class="row">';

    favorites.forEach(favorite => {
        favorites_html += `
            <div class="col-3">
                <div class="card mb-4">
                    <div class="card-img-container" style="height: 356px; overflow: hidden;">
                        <img src="${favorite.imageUrl}" class="card-img-top" style="object-fit: cover; height: 100%; width: 100%;" alt="...">
                    </div>
                    <div class="card-body" style="height: 160px;">
                        <h5 class="card-title">${favorite.title}</h5>
                        <!-- Add more details as needed -->
                        <button class="delete-favorite btn btn-sm btn-outline-danger" data-id="${favorite.id}"><i class="bi bi-trash"></i> Delete</button>
                    </div>
                </div>
            </div>
        `;
    });

    favorites_html += '</div>';
    container.innerHTML = favorites_html;

    // Add event listeners for delete buttons
    const deleteButtons = container.querySelectorAll('.delete-favorite');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const recipeId = this.dataset.id;

            // Show a confirmation dialog
            const isConfirmed = window.confirm("Are you sure you want to delete?");
            
            if (isConfirmed) {
                removeFromFavorites(recipeId);
                // Instead of re-displaying all favorites, remove only the deleted item
                this.closest('.col-3').remove();
            }
        });
    });
}

function removeFromFavorites(recipeId) {
    console.log('Deleting recipe with ID:', recipeId);
    // Retrieve existing favorites or initialize an empty array
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Filter out the recipe with the specified ID
    favorites = favorites.filter(favorite => favorite.id !== recipeId);

    // Save the updated favorites to local storage
    localStorage.setItem('favorites', JSON.stringify(favorites));

    localStorage.removeItem('favorites_' + recipeId);
}