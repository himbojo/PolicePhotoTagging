import axios from "axios";
import { LOGIN_USER, REG_USER, INS_PHOTO, BUCKET_PHOTO, IMG_SEARCH } from "./types";
import setAuth from "./setAuth";
import { Router, Route, Redirect } from "react-router-dom";

export function setUser(user) {
  return {
    type: LOGIN_USER,
    user
  };
}
export function logout() {
  return dispatch => {
    setAuth(false);
    dispatch(setUser({}));
  };
}
/*
##example
import { FETCH_CITYS } from './types';

export const fetchCitys = values => async dispatch => {
	const k = await axios.post('/api/city', values);
	//console.log(k.data.id);
	const res = await axios.post('/api/cuisines', k);
//	console.log(res.data);
	//var randomItem = temp[Math.floor(Math.random()*temp.length)]; // gets me a random item
	//console.log(randomItem);

	dispatch({ type: FETCH_CITYS, payload: res.data });
};

*/

export const regUser = values => async dispatch => {
  console.log("test12");
  const res = await axios.post("/users/reg", values);

  dispatch({ type: REG_USER, payload: res.data });
};

export const insPhoto = values => async dispatch => {
  console.log(values);
  const res = await axios.post("/image/add", values);
  console.log("insPhoto");
  dispatch({ type: INS_PHOTO, payload: res.data });
};

export const loginUser = (values, history) => async dispatch => {
  console.log("values");
  const res = await axios.post("/users/login", values).then(res => {
    localStorage.setItem("token", res.headers.xauth);
    dispatch(setUser(res.data));

    setAuth(res.headers.xauth);
    console.log(res.headers.xauth);
  });
};
export const bucketPhoto = values => async dispatch => {
    console.log("bucket");
    var form = new FormData();
    var file = values.file;
        form.append(file.name, file);
        form.append('name', file.name);

  const res = await axios.post("/bucket/add", form);
  console.log("bucketPhoto");
  dispatch({ type: BUCKET_PHOTO, payload: res.data });
};
export const searchImage = values => async dispatch => {
  console.log("You done it now");
  const res = await axios.get("/image/search");
  dispatch({ type: IMG_SEARCH, payload: res.data });
};
