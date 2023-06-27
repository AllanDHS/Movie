// Affichage des  derniers films 
let h2 = document.querySelector('h2');
let News = document.querySelector('.new');
const lastMovie = document.querySelector('.lastMovie');
const popularMovie = document.querySelector('.popularMovie');
const h2Popular = document.querySelector('#h2Popular');
const searchMovie = document.querySelector('.searchMovie');

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGUzN2Y1YTU4ZTQ3ZGIwMGY4NTkyODU3OWY5MDBmOCIsInN1YiI6IjY0NmUxNjEzMzNhMzc2MDE1OGRjMDRhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.10TTdpPPusGwjBn81duAdGN3P84qd250flrJJOeCyEs'
    }
};

fetch('https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&page=1', options)
    .then(response => response.json())
    .then(data => {
        lastMovie.innerHTML = '';

        data.results.slice(0, 4).forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');

            const posterImage = document.createElement('img');
            posterImage.setAttribute('id', 'myBtn1');
            posterImage.src = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
            movieElement.appendChild(posterImage);

            const titleElement = document.createElement('p');
            titleElement.textContent = movie.title;
            movieElement.appendChild(titleElement);

            const dateElement = document.createElement('p');
            dateElement.textContent = `Sortie le : ${movie.release_date}`;
            movieElement.appendChild(dateElement);

            const popularityElement = document.createElement('p');
            popularityElement.textContent = ` noté : ${movie.vote_average} / 10`;
            movieElement.appendChild(popularityElement);

            lastMovie.appendChild(movieElement);

        });




    })
    .catch(err => console.error(err));


// affichage des prochains films

fetch('https://api.themoviedb.org/3/movie/upcoming?language=fr-FR&page=1', options)
    .then(response => response.json())
    .then(data => {
        popularMovie.innerHTML = '';

        let count = 0;
        data.results.slice(0, 4).forEach(movie => {


            count++;

            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');

            const posterImage = document.createElement('img');
            posterImage.setAttribute('id', `${count}`);
            posterImage.setAttribute('class', 'img');
            posterImage.src = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
            movieElement.appendChild(posterImage);

            const titleElement = document.createElement('p');
            titleElement.textContent = movie.title;
            movieElement.appendChild(titleElement);

            const dateElement = document.createElement('p');
            dateElement.textContent = `Sort le : ${movie.release_date}`;
            movieElement.appendChild(dateElement);


            popularMovie.appendChild(movieElement);
            // modal

            // Get the modal

            let container = document.querySelector('#container');
            console.log(movie.title)
            container.innerHTML += `<div id="myModal${count}" class="modal">

            <div class="modal-content">
              <span class="close">&times;</span>
              
              <img src="" alt="" class="modalImg">
                <p class="modalDescription">${movie.title}</p>
                <p class="modalDate"></p>
                <p class="modalNote"></p>
            </div>`;



            // Get the button that opens the modal
            var btn = document.querySelectorAll(`.img`);
            console.log(btn);

            let id = this.id
            console.log(id);

            btn.forEach(element => {
                element.addEventListener('click', function () {

                    let Modal = document.getElementById(`myModal${count}`);
                    Modal.style.display = "block";
                })
            })



            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName('close')[0];


            // When the user clicks on <span> (x), close the modal

            span.addEventListener('click', function () {
                Modal.style.display = "none";
            })
        });
    })
    .catch(err => console.error(err));



// Fonction recherche de films

let button = document.querySelector('.button');

button.addEventListener('click', function () {


    let input = document.querySelector('.input').value;

    fetch(`https://api.themoviedb.org/3/search/movie?query=${input}&include_adult=false&language=fr-FR&page=1`, options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            searchMovie.innerHTML = '';

            data.results.forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.classList.add('movie');

                const posterImage = document.createElement('img');
                posterImage.setAttribute('id', 'myBtn3');
                posterImage.src = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
                movieElement.appendChild(posterImage);

                const titleElement = document.createElement('p');
                titleElement.textContent = movie.title;
                movieElement.appendChild(titleElement);

                const dateElement = document.createElement('p');
                dateElement.textContent = movie.release_date;
                movieElement.appendChild(dateElement);

                const popularityElement = document.createElement('p');
                popularityElement.textContent = `${movie.vote_average}`;
                movieElement.appendChild(popularityElement);

                searchMovie.appendChild(movieElement);

                

                // Condition pour afficher une image si le film n'en a pas
                if (movie.backdrop_path === null) {
                    posterImage.src = `/assets/img/image-not-found.jpg`;
                }


            });

        });
    News.style.display = 'none';
    lastMovie.style.display = 'none';
    popularMovie.style.display = 'none';
    h2Popular.style.display = 'none';
})

    .catch(err => console.error(err));



