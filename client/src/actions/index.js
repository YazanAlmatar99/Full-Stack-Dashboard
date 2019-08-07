import axios from "axios";

const FETCH_USER = 'fetch_user';
export const fetchUser = () => {
    return function(dispatch) {axios.get("/api/current_user")
        .then(res => dispatch({ type: FETCH_USER, payload: res.data })); 
    };
  };

  