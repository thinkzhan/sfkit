import axios from 'axios';

export const GET_ABOUT_DATA_SUCCESS = 'GET_ABOUT_DATA_SUCCESS';
const getAboutSuccess = data => ({
    type: GET_ABOUT_DATA_SUCCESS,
    data
});
export const getAbout = () => dispatch => axios.get('/about/info').then(res => {
    dispatch(getAboutSuccess(res.data.data));
}).catch(e => {
    console.log('about 请求的错误', e);
});
