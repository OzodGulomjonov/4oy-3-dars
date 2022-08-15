// Get elements from HTML
let elMoviesWrapper = document.querySelector(".movies_wrapper");
let elForm = document.querySelector(".form");
let elMovieSearch = document.querySelector(".movie__title");
let elRating = document.querySelector(".movie__rating");
let elMovieYear = document.querySelector(".movie__year");
let elSelectCategories = document.querySelector(".movie__categories");
let elSelectSort = document.querySelector(".movie__select");
let elModalTitle = document.querySelector(".modal__title");
let elModalBody = document.querySelector(".modal__body");
let elResult = document.querySelector(".result");
let elRenderResult = document.querySelector(".render__result");
let elPaginationWrapper = document.querySelector(".pagination__wrapper");
let elBookmarkedList = document.querySelector(".bookmark__list");
// elModalBody.textContent = "ozodbek"

// Templates
let elMovieCardTemplate = document.querySelector("#movie_card");
let elBookmarkTemplate = document.querySelector("#bookmarkedItem").content;

let newMovies = movies.slice(0, 20);

const moviesRender = (moviesArr) => {

    const fragment = document.createDocumentFragment()

    moviesArr.forEach(item => {
        const movieCard = elMovieCardTemplate.cloneNode(true).content

        movieCard.querySelector(".card-img-top").src = `https://i.ytimg.com/vi/${item.ytid}/mqdefault.jpg`;
        movieCard.querySelector(".card__heading").textContent = item.Title;
        movieCard.querySelector(".movie__year").textContent = item.movie_year;
        movieCard.querySelector(".movie__rating").textContent = item.imdb_rating;
        movieCard.querySelector(".movie__link").href = `https://www.youtube.com/watch?v=${item.ytid}`
        movieCard.querySelector(".movie__link").setAttribute("target", "blank");
        // movieCard.querySelector(".moreinfo_btn").dataset.movieId = item.id;
        // movieCard.querySelector(".btn__bookmark").dataset.bookmarkId = item.id;

        elModalBody.textContent = item.summary
        fragment.appendChild(movieCard)
    });

    elMoviesWrapper.append(fragment)
}

moviesRender(newMovies)

elForm.addEventListener('submit', (e) => {
    e.preventDefault()
    elMoviesWrapper.innerHTML = "";
    const arr = [] ;

    const search = elMovieSearch.value.trim()

    let pattern = new RegExp(search, 'gi');
    const rating = elRating.value

    newMovies.filter(i => {
        console.log(i.Title);
        let searchByName = i.Title.match(pattern)

        if(searchByName && i.imdb_rating >= rating){
            arr.push(i)
            moviesRender(arr)
        }
    })
})
