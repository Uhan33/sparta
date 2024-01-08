const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzBiZDE1YTY3YjcxNjY3OTkxOTE2NmZlNjEwOWU2MCIsInN1YiI6IjY1OTc3NWM1NTkwN2RlM2VkZTYzYzAzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QP4Jv9nW8ocmWDwWL0X7CR3axIvJfYXbtfuV61KP_Tg'
    }
};

const imageUrl = "https://image.tmdb.org/t/p/w500";
console.log("hi");

// let list = fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));


export const getData = async () => {
    try {
        const res = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
        const data = await res.json();
        console.log(data);

        for (let i = 0; i < data.results.length; i++) {
            const card =
                `<div class="movie-card" id="${data.results[i].id}" style="display: block;">
            <img src="${imageUrl}${data.results[i].poster_path}" alt="${data.results[i].title}" onclick="alert('영화 ID : ${data.results[i].id}')">
            <h3 class="movie-title">${data.results[i].title}</h3>
            <p>${data.results[i].overview}</p>
            <p>Rating: ${data.results[i].vote_average}</p>
            </div>`

            let cardlist = document.querySelector("#cardList");
            cardlist.insertAdjacentHTML('beforeend', card);
        }

    } catch (error) {
        console.log("error");
    }
}