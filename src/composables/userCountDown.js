import { computed, onUnmounted, ref } from "vue"

import dayjs from 'dayjs';
export const useCountDown = () => {
    let timer = null
    const time = ref(0)
    const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
    console.log(formatTime);

    const start = (currentTime) => {
        // 倒计时逻辑
        time.value = currentTime
        timer = setInterval(() => {
            time.value--
        }, 1000)
        // 组件销毁时清除定时器
        onUnmounted(() => {
            // 如果timer存在
            timer && clearInterval(timer)
        })

    }
    return {
        formatTime,
        start
    }
}