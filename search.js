export const getSearch = () => {
    // onSubmit으로 인한 새로고침 방지용 메소드
    // event.preventDefault(); // err
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

    // 간단한 다른 방법..
    // for(let i in array) {
    //     array[i].getElementsByClassName("movie-title")[0].innerHTML.toUpperCase().includes(search.toUpperCase()) ? 
    //     document.getElementById(array[i].id).style.display = 'block' : document.getElementById(array[i].id).style.display = 'none';
    // }
}