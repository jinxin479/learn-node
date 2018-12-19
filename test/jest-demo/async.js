import 'whatwg-fetch'
const fetchUser = ()=>{
    return fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
}

export default fetchUser;


