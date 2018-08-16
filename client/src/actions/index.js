import axios from 'axios';
import { LOGIN_USER, REG_USER } from './types';

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
export const loginUser = (values) => async dispatch => {

	const res = await axios.post('/users/login', values);

	dispatch({ type: LOGIN_USER, payload: res.data });
};





export const regUser = (values) => async dispatch => {
	console.log("test");
	const res = await axios.post('/users/reg', values);
		console.log("test12");
	dispatch({ type: REG_USER, payload: res.data });
};
