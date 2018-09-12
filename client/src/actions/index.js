import axios from "axios";
import { LOGIN_USER, REG_USER, INS_PHOTO, BUCKET_PHOTO } from "./types";

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

export const loginUser = values => async dispatch => {
  console.log("values");
  const res = await axios.post("/users/login", values);

  dispatch({ type: LOGIN_USER, payload: res.data });
};

export const bucketPhoto = values => async dispatch => {
    console.log("bucket");
    var form = new FormData();
    var file = values.file;
        form.append(file.name, file);

  const res = await axios.post("/bucket/add", form);
  console.log("bucketPhoto");
  dispatch({ type: BUCKET_PHOTO, payload: res.data });

};
