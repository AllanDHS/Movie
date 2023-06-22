
let button = document.getElementById('button')
let pictures = document.getElementById('pictures')
let infos = document.getElementById('infos')



button.addEventListener('click', function () {
    let search = document.getElementById('search').value
    console.log(search)

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGUzN2Y1YTU4ZTQ3ZGIwMGY4NTkyODU3OWY5MDBmOCIsInN1YiI6IjY0NmUxNjEzMzNhMzc2MDE1OGRjMDRhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.10TTdpPPusGwjBn81duAdGN3P84qd250flrJJOeCyEs'
        }
    };


    fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=fr-FR&page=1`, options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
                data.results.forEach(movie => {
                    pictures.innerHTML += `<img src="https://image.tmdb.org/t/p/original${movie.poster_path}">`
                infos.innerHTML += ` <div class="info" id="infos">
                <p>${movie.original_title}</p>
                <p>${movie.release_date}</p>
                <p>${movie.popularity} % </p>
            </div>
                });
                
            });

        })
        .catch(err => console.error(err));

