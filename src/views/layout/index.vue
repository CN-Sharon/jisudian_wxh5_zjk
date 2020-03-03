<template>
    <div class="app_main">
        <transition
            name="animated"
            enter-active-class="animated fadeIn faster"
            mode="out-in"
        >
            <keep-alive :include="cachViews">
                <router-view ></router-view>
            </keep-alive>
        </transition>
    </div>
</template>
<script>
export default {
    computed: {
        cachViews ()  {
            return this.$store.getters.cachViews 
        }
    },
    
}
</script>

<style>

</style>
