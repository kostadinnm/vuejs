/*global Vue*/

var example1 = new Vue({
    el: '#example-1',
    data: {
        message: '',
        multiMessage: '',
        checked: false
    }
});

var example2 = new Vue({
    el: '#example-2',
    data: {
        checkedNames: [],
        picked: '',
        selected: '',
        multiSelected: []
    }
});

var example3 = new Vue({
    el: '#example-3',
    data: {
        selected: 'A',
        options: [
            {text: 'One', value: 'A'},
            {text: 'Two', value: 'B'},
            {text: 'Three', value: 'C'}
        ]
    }
});

var example4 = new Vue({
    el: '#example-4',
    data: {
        a: 'Filled',
        b: 'Empty',
        toggle: '',
        x: {theme: 'Light'},
        y: {theme: 'Dark'},
        pick: '',
        selected: {}
    }
});

var example5 = new Vue({
    el: '#example-5',
    data: {
        msg: '',
        age: 12,
        text: ''
    }
});