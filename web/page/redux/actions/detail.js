
export const GET_DETAIL_DATA_SUCCESS = 'GET_DETAIL_DATA_SUCCESS';
const getDetailSuccess = data => ({
    type: GET_DETAIL_DATA_SUCCESS,
    data
});
export const getDetail = data => dispatch => {
    console.log(data);

    return Promise.resolve().then(() => {
        dispatch(getDetailSuccess({
            desc: data.desc
        }));
    });

    // return axios.get(`/about/info`).then(res => {
    //     dispatch(getDetailSuccess(res.data.data))
    // }).catch(e => {
    //     console.log('about 请求的错误', e);
    // })
};
