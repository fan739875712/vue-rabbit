import httpInstance from "@/utils/http";
// 获取banner
// 定义形参为params对象,方法一 在形参使用：定义默认值 传参直接传入params
export function getBannerAPI (params = {distributionSite:'1'}) {
    // 方法二 解构使用=号定义默认值，:用来定义别名
    // 解构，默认为1 传参传入 {distributionSite}  
    // const {distributionSite=1} = params 
    return httpInstance({
        url:'home/banner',
        // 
        params:params
    })
}
export function findNewAPI () { 
    return httpInstance({
        url:'home/new'
    })
}
export function getHotAPI () { 
    return httpInstance({
        url:'home/hot'
    })
}
export function getGoodsAPI () { 
    return httpInstance({
        url:'home/goods'
    })
}
// export {
//     getCategory
// }