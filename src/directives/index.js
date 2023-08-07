import { useIntersectionObserver } from '@vueuse/core';
export const lazyPlugin = {
    install(app) {
        app.directive('img-lazy', {
            mounted(el, binding) {
                // 
                const {stop} = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {
                        //   console.log(isIntersecting);
                        if (isIntersecting) {
                            // console.log(el);
                            el.src = binding.value
                            stop()
                        }
                    },
                )
            }
        })
    }
}
