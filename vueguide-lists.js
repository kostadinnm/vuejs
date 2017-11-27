/*global Vue*/
"use strict";

var example1 = new Vue({
    el: '#example-1',
    data: {
        items: [
            {message: 'Foo'},
            {message: 'Bar'}
        ]
    }
});

var example2 = new Vue({
    el: '#example-2',
    data: {
        parentMessage: 'Parent',
        items: [
            {message: 'Foo'},
            {message: 'Bar'}
        ]
    }
});

var example =
        new Vue({
    el: '#v-for-object',
    data: {
        object: {
            firstName: 'John',
            lastName: 'Doe',
            age: 30
        }
    }
});

var exampleFiltered = new Vue({
    el: '#example-filtered',
    data: {
        numbers: [1, 2, 3, 4, 5]
    },
    computed: {
        eventNumbers: function () {
            return this.numbers.filter(function (number) {
                return number % 2 === 0;
            });
        }
    },
    methods: {
        even: function (numbers) {
            return numbers.filter(function (number) {
                return number % 2 === 0;
            });
        }
    }
});

// TODO: report vue instance needed
new Vue({
    el: "#example-range"
});

new Vue({
    el: '#example-template',
    data: {
        items: [{msg: 'Foo'}, {msg: 'Bar'}]
    }
});

var exampleConditional = new Vue({
    el: '#example-conditional',
    data: {
        todos: [
            {text: 'Learn Javascript', isComplete: true},
            {text: 'Learn Vue', isComplete: false},
            {text: 'Build something awesome', isComplete: false}
        ]
    }
});

Vue.component('todo-item', {
    template: '<li>' +
            '{{ title }}' +
            '<button v-on:click="vuemit(\'remove\')">X</button>' +
            '</li>',
    props: ['title']
});

var todoListExample = new Vue({
    el: '#todo-list-example',
    data: {
        newTodoText: '',
        todos: [
            {
                id: 1,
                title: 'Do the dishes'
            },
            {
                id: 2,
                title: 'Take out the trash'
            },
            {
                id: 3,
                title: 'Mow the lawn'
            }
        ],
        nextTodoId: 4
    },
    methods: {
        addNewTodo: function () {
            this.todos.push({
                id: this.newTodoId,
                title: this.newTodoText
            });
            this.newTodoId += 1;
            this.nextTodoText = '';
        }
    }
});