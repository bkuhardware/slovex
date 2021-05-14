<template>
    <div>{{ $slovex.state.gay }}</div>
</template>

<script>
    export default {
        name: "App",
        data() {
            return {
                dit: 100
            }
        },
        mounted() {
            this.$slovex.state.gay = 1000
            console.log(this.$slovex.state);
            console.log(this.$data);
        }
    }
</script>
