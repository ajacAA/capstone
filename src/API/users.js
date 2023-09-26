/* FUNCTION TO FETCH USERS FROM THE API */
export default async function fetchUsers() {
    try {
        const response = await fetch('https://fakestoreapi.com/users');
        const users = await response.json();
        console.log("Users", users);
        return result;
    }
    catch(error) {
        console.log("Problem fetching products");
    }

}