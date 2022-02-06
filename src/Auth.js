import {Auth} from "aws-amplify";

export async function signUp(username, password) {
    try {
        const {user} = await Auth.signUp({
            username, 
            password
        });
        console.log(user);
    } catch(error) {
        console.log("error signing up user: ", error);
    }
}

