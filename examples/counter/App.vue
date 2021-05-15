<template>
    <div>{{ $slovex.state }}</div>
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
            setTimeout(() => {
                const mutation = this.$slovex._actions['@setTest'];
                mutation('new Test');
                setTimeout(() => {
                    const mutation = this.$slovex._actions['@setTest'];
                    mutation('new Test');
                }, 1000);
            }, 2000)
        }
    }
</script>
