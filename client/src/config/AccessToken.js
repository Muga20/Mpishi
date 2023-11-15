
export function accessToken() {
    // Retrieve the user object from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
  
    // Check if the user object and accessToken property exist
    if (user && user.accessToken.accessToken) {
      return user.accessToken.accessToken;
    } else {
      // Handle the case where user or accessToken is undefined
      return null; // or you can return a default value or handle the error as needed
    }
  }


  