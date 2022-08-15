let elForm = document.querySelector(".form");
let elTemplate = document.querySelector("#movie_card").content;
let movieWrapper = document.querySelector(".movies_wrapper")
let inputName = document.querySelector(".movie__title")
let inputRating = document.querySelector(".movie__rating")
let inputYear = document.querySelector(".movie__year")
let searchResult = document.querySelector(".result")
let select = document.querySelector(".movie__categories")
let selectSort = document.querySelector(".movie__select")

let moviesArray = movies.slice(0 , 10);


let newArrays = []

let normolizeMovies = moviesArray.map(item => {
    
    let newObject = {}
    
    newObject.title = item.Title.toString();
    newObject.img = `https://i.ytimg.com/vi/${item.ytid}/mqdefault.jpg`;
    newObject.link = `https://www.youtube.com/watch?v=${item.ytid}`;
    newObject.rating = item.imdb_rating;
    newObject.categories = item.Categories.split("|");
    newObject.year = item.movie_year;
    
    newArrays.push(newObject)
    
    return newObject
})

let newArray = normolizeMovies



function renderMovies(array,wrapper) {
    wrapper.innerHTML = null
    
    searchResult.textContent = array.length
    
    let elFragment = document.createDocumentFragment()
    
    array.forEach(item => {
        
        let templateItem = elTemplate.cloneNode(true)
        
        templateItem.querySelector(".movie__link").href = item.link
        templateItem.querySelector(".movie__rating").textContent = item.rating
        templateItem.querySelector(".movie__year").textContent = item.year
        templateItem.querySelector(".movie__category").textContent = item.categories
        templateItem.querySelector(".card__heading").textContent = item.title
        templateItem.querySelector(".movie__img").src = item.img
        
        elFragment.appendChild(templateItem)
    });
    
    wrapper.appendChild(elFragment)
}

renderMovies(newArray, movieWrapper)


let categoryArray = []
function searchCategories(array) {
    
    for (const item of array) {
        let categoryOne = item.categories
        for (const item1 of categoryOne) {
            if(!categoryArray.includes(item1)) {
                categoryArray.push(item1)
            }
        }
    }
    return categoryArray
}

let findedCategory = searchCategories(newArray)

function renderCategories(array) {
    
    for (const item of array) {
        let newOption = document.createElement("option")
        
        newOption.textContent = item
        newOption.value = item
        
        select.appendChild(newOption)
    }
}

renderCategories(categoryArray)


elForm.addEventListener("submit" , function (evt) {
    
    evt.preventDefault()
    
    let inputNameValue = inputName.value.trim()
    let inputYearValue = inputYear.value.trim()
    let inputRatingValue = inputRating.value.trim()
    let inputSelectValue = select.value.trim()
    let selectSortValue = selectSort.value.trim()
    
    let pattern = new RegExp(inputNameValue , 'gi')
    
    
    let filteredArray = newArray.filter((item) => {
        
        let searchByName = item.title.match(pattern)

        let isTrue = "";
        
        if(inputSelectValue == "all") {
            isTrue = true
        }else {
            isTrue = item.categories.includes(inputSelectValue)
        }
        
        let validation = item.year >= inputYearValue && item.rating >= inputRatingValue && isTrue && searchByName
        
        return validation
    })

    filteredArray.sort(function (a,b) {
        return a.year - b.year
    })

    if(selectSortValue == "rating-high-low") {
        filteredArray.sort((a,b) => {
            return b.rating - a.rating
        })
    }
    if(selectSortValue == "rating-low-high") {
        filteredArray.sort((a,b) => {
            return a.rating - b.rating
        })
    }

    
    if(selectSortValue == "year-high-low") {
        filteredArray.sort((a,b) => {
            return b.year - a.year
        })
    }
    if(selectSortValue == "year-low-high") {
        filteredArray.sort((a,b) => {
            return a.year - b.year
        })
    }
    
    renderMovies(filteredArray, movieWrapper)
})