/*global Vue*/
"use strict";

var example1 = new Vue({
    el: '#example-1',
    data: {
        counter: 0
    }
});

var example2 = new Vue({
    el: '#example-2',
    data: {
        name: 'Vue.js'
    },
    methods: {
        greet: function (event) {
            alert('Hello ' + this.name + '!');
            if (event) {
                alert(event.target.tagName);
            }
        }
    }
});

var example3 = new Vue({
    el: '#example-3',
    methods: {
        say: function (message) {
            alert(message);
        },
        warn: function (message, event) {
            if (event) {
                event.preventDefault();
            }
            alert(message);
        }
    }
});

var example4 = new Vue({
    el: '#example-4',
    methods: {
        say: function (message) {
            alert(message);
        }
    }
});

var example5 = new Vue({
    el: '#example-5',
    methods: {
        say: function (message) {
            alert(message);
        }
    }
});