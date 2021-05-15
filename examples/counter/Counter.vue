<template>
    <div id="app">
        Clicked: {{ $slovex.state.count }} times, count is {{ count }}.
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
        <button @click="incrementIfOdd">Increment if odd</button>
        <button @click="incrementAsync">Increment async</button>
    </div>
</template>

<script>
import { mapStateToComputed, mapDispatchToMethods } from 'slovex';

export default {
    computed: mapStateToComputed(['count']),
    methods: mapDispatchToMethods([
        'increment',
        'decrement',
        'incrementIfOdd',
        'incrementAsync'
    ])
}
</script>
