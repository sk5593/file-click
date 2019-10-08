import request from './index';

export const condition = () => {
    return request({
        url: '/api/sale_info/r/condition',
        method: 'get'
    });
}