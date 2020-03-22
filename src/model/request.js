let modalTimeFlag = 0;

export default {
    get(url, params, header = {}, originRes = false) {
        const that = this;
        wx.getNetworkType({
            success(netRes) {
                if (
                    netRes.networkType != 'none' &&
                    netRes.networkType != '2g' &&
                    netRes.networkType != 'unknown'
                ) {
                    return that._req('GET', url, params, header, originRes);
                } else {
                    wx.hideLoading();
                    const nowTime = new Date().getTime();
                    const timeDiffer = nowTime - modalTimeFlag;
                    modalTimeFlag = nowTime;
                    if (timeDiffer >= 300) {
                        wx.showModal({
                            content:
                                '网络状态异常，请确认设备网络状态正常后重试',
                            showCancel: true,
                            cancelText: '取消',
                            cancelColor: '#303033',
                            confirmText: '重新加载',
                            confirmColor: '#f22',
                            success(re) {
                                if (re.confirm) {
                                    const curPage = getCurrentPages()[
                                        getCurrentPages().length - 1
                                    ];
                                    curPage.onLoad();
                                    curPage.onShow();
                                    curPage.onReady();
                                } else if (re.cancel) {
                                    console.log('cancel reload');
                                    wx.navigateBack({
                                        delta: 1
                                    });
                                }
                            }
                        });
                    }
                }
            }
        });
    },

    post(url, params, header = {}, originRes = false) {
        return this._req('POST', url, params, header, originRes);
    },

    _req(method, url, params = {}, header, originRes) {
        params.token = wx.getStorageSync('token');
        console.log(url, 'params: ', params);
        return new Promise((resolve, reject) => {
            wx.request({
                url: url,
                data: params,
                method: method,
                header: header, // 设置请求的 header
                // originRes = true时，返回原始的请求数据，包括data/header/statusCode
                success: res => {
                    console.log(url, 'res: ', res);
                    let data = res.data;
                    if (originRes) {
                        resolve(res);
                    } else if (+data.code === 200) {
                        resolve(data.data);
                    } else {
                        reject(data);
                    }
                },
                fail: res => {
                    console.error(url, 'res: ', res);
                    wx.showToast({
                        title: '网络错误',
                        icon: 'none'
                    });
                    reject(res);
                }
            });
        });
    }
};
