const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzBiZDE1YTY3YjcxNjY3OTkxOTE2NmZlNjEwOWU2MCIsInN1YiI6IjY1OTc3NWM1NTkwN2RlM2VkZTYzYzAzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QP4Jv9nW8ocmWDwWL0X7CR3axIvJfYXbtfuV61KP_Tg'
    }
};

const imageUrl = "https://image.tmdb.org/t/p/w500";
const array1 = [];

// let list = fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));


const getData = async () => {
    try {
        const res = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
        const data = await res.json();
        console.log(data);

        data.results.forEach(e => {
            array1.push(e);
        });

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
getData();

let handleSearch = (event) => {
    let cardList = document.getElementsById("cardList");
    console.log(cardList);

    event.preventDefault();
    let search = document.getElementById("search-input").value;

    let testfilter = (array, search) => {
        return array.filter(
            (arr) => arr.title.toUpperCase().includes(search.toUpperCase()),
        )
    };

    // filter를 사용하기 위한 강제 이중 포문
    for (let i = 0; i < array1.length; i++) {
        document.getElementById(array1[i].id).style.display = "none";
        for (let j = 0; j < testfilter(array1, search).length; j++) {
            if (array1[i].id === testfilter(array1, search)[j].id) {
                document.getElementById(array1[i].id).style.display = "block";
            }
        }
    }

    // 간단한 다른 방법..
    // for(let i in array1) {
    //     array1[i].title.toUpperCase().includes(search.toUpperCase()) ? 
    //     document.getElementById(array1[i].id).style.display = 'block' : document.getElementById(array1[i].id).style.display = 'none';
    // }



}