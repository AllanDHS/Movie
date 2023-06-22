const last = document.querySelector('.last');

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
              last.innerHTML = '';

              data.results.slice(0, 4).forEach(movie => {
                  const movieElement = document.createElement('div');
                  movieElement.classList.add('movie');

                  const posterImage = document.createElement('img');
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

                  last.appendChild(movieElement);
              });
          })
          .catch(err => console.error(err));