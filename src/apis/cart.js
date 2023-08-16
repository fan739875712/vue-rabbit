import request from '@/utils/http';
// 加入购物车接口
export const insertCartAPI = ({skuId,count}) => { 
    return request({
        url:'/member/cart',
        method:'POST',
        data:{
            skuId,
            count
        }
    })
}
// 获取最新购物车列表
export const findNewCartListAPI = () => { 
    return request({
        url:'/member/cart',
    })
}
// 删除购物车,注意要求是个数组参数ids
export const delCartAPI = (ids) => {
    return request({
      url: '/member/cart',
      method: 'DELETE',
      data: {
        ids
      }
    })
  }
  export const mergeCartAPI = (data)=>{
    return request({
        url: '/member/cart/merge',
        method: 'POST',
        data
      })
  }