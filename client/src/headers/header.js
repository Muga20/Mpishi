export const setHeaders =()=>{
    const headers ={
        headers:{
            'x-auth-tocken':localStorage.getItem('token')
        }
    }
    
 return headers;
}

