//Prototype service for authentication logic using localStorage for account management  

//Keys used to store users and current logged-in user in localStorage
const USERS_KEY = "users";
const LOGGED_IN_USER_KEY = "loggedInUser";

//Function for user UUID Generation
const generateUserId = () => {
  return 'user -' + Date.now() + '-' + Math.floor(Math.random() * 1000);
};

//Register new user and store in localStorage
export const registerUser = (username, password) => {
    //Retrieve existing users array, or empty array if none exist
  let users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

    //Check if username already taken and/or if input is empty
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    throw new Error("Username already taken. Please use a different username.");
    //Validate empty input
  } else if (username === '' || password === '') {
    throw new Error("Username and password cannot be empty.");
  }

  //Generate a unique user ID for the new user
  const id = generateUserId();

  //If it's valid, push new user into users array and save to localStorage
  users.push({ id, username, password });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

//Login function, to check credentials and store logged-in user in localStorage
export const loginUser = (username, password) => {
  let users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

  const user = users.find(user => user.username === username && user.password === password);
  //Validate empty input
  if (username === '' || password === '') {
    throw new Error("Please enter both username and password.");
    //If user not found or invalid credentials, throw error
  } else if (!user) {
    throw new Error("User not found, or invalid username or password.");
  }
    //Store logged-in user in localStorage
  localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
};

//Logout function to remove logged-in user from localStorage
export const logoutUser = () => {
  localStorage.removeItem(LOGGED_IN_USER_KEY);
};

//Retrieve current logged-in user from localStorage
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(LOGGED_IN_USER_KEY));
};

//Check if a user is logged in by checking if logged-in user exists in localStorage
export const isLoggedIn = () => {
  return !!localStorage.getItem(LOGGED_IN_USER_KEY);
};
