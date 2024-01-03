export default function Slider(slides){
    let slides_html = ''

    slides.forEach((slide, index) => slides_html += `
        <div class="carousel-item ${index == 0 ? 'active' : ''}">
            <img src="https://cdn.pixabay.com/photo/2022/04/30/19/12/cooking-banner-7166200__340.jpg" class="d-block w-100" alt=""> 
        </div>
    `)
        

    return `
        <div id="carouselExampleIndicators" class="carousel slide">
            <div class="carousel-inner">
                ${slides_html}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
    </div>

    `
}