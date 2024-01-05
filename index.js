const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzBiZDE1YTY3YjcxNjY3OTkxOTE2NmZlNjEwOWU2MCIsInN1YiI6IjY1OTc3NWM1NTkwN2RlM2VkZTYzYzAzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QP4Jv9nW8ocmWDwWL0X7CR3axIvJfYXbtfuV61KP_Tg'
    }
};

const imageUrl = "https://image.tmdb.org/t/p/w500";

// let list = fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));


const getData = async () => {
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
getData();

let handleSearch = (event) => {
    // onSubmit으로 인한 새로고침 방지용 메소드
    event.preventDefault();
    let cardList = document.getElementById("cardList");
    let search = document.getElementById("search-input").value;
    let array = [];

    for (let i = 0; i < cardList.children.length; i++) {
        array[i] = cardList.children[i];
    }

    // serach로 검색한 단어에 포함되는 title만 필터링 해주는 함수
    let filtering = (array, search) => {
        return array.filter(
            (arr) => arr.getElementsByClassName("movie-title")[0].innerHTML.toUpperCase().includes(search.toUpperCase()),
        )
    };

    // search로 검색받은 div 콘솔에 출력
    console.log(filtering(array, search));

    /* 
    카드 요소를 하나씩 돌리면서 기본을 none으로 만들어준 뒤,
    필터링된 id라면 block으로 보여지게 변경.
    forEach를 사용하기위해 이중 for문 사용
    */
    array.forEach(e => {
        document.getElementById(e.id).style.display = "none"
        for(let i = 0; i < filtering(array,search).length; i++) {
            if(e.id === filtering(array, search)[i].id) {
                document.getElementById(e.id).style.display = "block";
            }
        }
    });

    //간단한 다른 방법..
    // for(let i in array) {
    //     array[i].getElementsByClassName("movie-title")[0].innerHTML.toUpperCase().includes(search.toUpperCase()) ? 
    //     document.getElementById(array[i].id).style.display = 'block' : document.getElementById(array[i].id).style.display = 'none';
    // }
}