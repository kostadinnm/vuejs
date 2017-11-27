/*global Vue currencyValidator*/
"use strict";

// TODO: break different parts of this sub-guide apart

Vue.component('my-component', {
    template: '<div>A custom component!</div>'
});
var example1 = new Vue({
    el: '#example-1'
});

var Child = {
    template: '<div>A custom component!</div>'
};
var example2 = new Vue({
    el: '#example-2',
    components: {
        'my-component': Child
    }
});

// var data = {counter: 0};
Vue.component('simple-counter', {
    template: '<button v-on:click="counter += 1">{{ counter }}</button>',
    data: function () {
        return {
            counter: 0
        };
    }
});
var example3 = new Vue({
    el: '#example-3'
});

Vue.component('child', {
    props: ['message', 'messageDescription'],
    template: '<span>{{ message }} - {{ messageDescription }}</span>'
});
Vue.component('todo-item', {
    props: ['text', 'isComplete'],
    template: '<li>{{ text }} - {{ isComplete }}</li>'
});
Vue.component('comp', {
    props: ['someProp'],
    template: '<span>2 + {{ someProp }} is {{ twoPlus }}</span>',
    computed: {
        twoPlus: function () {
            return 2 + this.someProp;
        }
    }
});
Vue.component('counter', {
    props: ['initialCounter'],
    data: function () {
        return {
            counter: this.initialCounter
        };
    },
    template: '<button v-on:click="counter += 1">{{counter}}</button>'
});
Vue.component('toThePowerOf2', {
    props: ['valueRaw'],
    template: '<span>{{ valueRaw }} ^ 2 = {{ result }}</span>',
    computed: {
        result: function () {
            return Math.pow(parseInt(this.valueRaw), 2);
        }
    }
});
var example4 = new Vue({
    el: '#example-4',
    data: {
        parentMsg: '',
        parentDesc: '',
        todos: [
            {id: 0, text: 'Learn Javascript', isComplete: true},
            {id: 1, text: 'Learn Vue', isComplete: false},
            {id: 2, text: 'Build something awesome', isComplete: false}
        ]
    }
});

// TODO: Note that objects and arrays in JavaScript are passed by reference,
// so if the prop is an array or object, mutating the object or array itself inside the child will affect parent state.
Vue.component('exampleComp', {
    props: {
        propA: Number,
        propB: [String, Number],
        propC: {
            // TODO: In addition, type can also be a custom constructor function and the assertion will be made with an instanceof check.
            type: String,
            required: true
        },
        propD: {
            type: Number,
            default: 100
        },
        propE: {
            type: Object,
            default: function () {
                //no stuff from data, computed and methods could go here:
                return {message: 'hello'};
            }
        },
        propF: {
            validator: function (value) {
                //no stuff from data, computed and methods could go here:
                return value > 10;
            }
        }
    },
    template: '<span>num: {{propA}}, string or num: "{{propB}}", required string: "{{propC}}", ' +
            'number with default: {{propD}}, object with default: {{propE}}, custom with validation: {{propF}}</span>'
});
Vue.component('bsDateInput', {
    template: '<span data-3d-date-picker="false" class="form-control">1970</span>'
});
var example5 = new Vue({
    el: '#example-5',
    data: {
        stringPropValue: 'Lorem ipsum...',
        numPropValue: 11
    }
});

// TODO: investigate why the input-rooted components played me tricks with the events(e.g. from the template and .native)
// see commented components
Vue.component('button-counter', {
    template: '<button v-on:click="incrementCounter">{{counter}}</button>',
    data: function () {
        return {
            counter: 0
        };
    },
    methods: {
        incrementCounter: function () {
            this.counter += 1;
            this.vuemit('increment');
        }
    }
});
Vue.component('aboutToAgreeComp', {
    template: '<span><input type="checkbox" v-on:click="vuemit(\'toggle\')">I accept the terms and conditions</span>'
});
// Vue.component('inputComp', {
//     template: '<input type="checkbox">'
// });
// Vue.component('inputCompTempl', {
//     template: '<input type="checkbox" v-on:click="vuemit(\'inpcli\')" v-on:change="vuemit(\'inpcha\')">'
// });
var example6 = new Vue({
    el: '#example-6',
    data: {
        total: 0,
        aboutToAgree: false,
        agreed: false//,
        //checked: false
    },
    methods: {
        incrementTotal: function () {
            this.total += 1;
        },
        setAboutToAgree: function (value) {
            this.aboutToAgree = value;
        },
        toggleAgreed: function () {
            this.agreed = !(this.agreed);
            this.aboutToAgree = false;
        },
        logClicked: function () {
            console.log('clicked');
        },
        logInput: function () {
            console.log('input');
        },
        logChanged: function () {
            console.log('changed');
        }//,
        // toggleChecked: function () {
        //     this.checked = !(this.checked);
        // }
    }
});

Vue.component('syncComp', {
    // THIS IS WRONG AND GENERATES 'UNREACHABLE CODE'-WARNING AND 'NOT A FUNCTION'-ERROR:
    template: '<button v-on:click="this.foocount += 1; ' +
            'this.vuemit(\'update:foocount\', this.foocount);">{{ foocount }}</button>',
    data: function () {
        return {
            foocount: 0
        };
    }
});
Vue.component('compSync', {
    template: '<button v-on:click="incrementFoo">{{ foocount }}</button>',
    data: function () {
        return {
            foocount: 0
        };
    },
    methods: {
        incrementFoo: function () {
            this.foocount += 1;
            this.vuemit('update:foocount', this.foocount);
        }
    }
});
var example7 = new Vue({
    el: '#example-7',
    data: {
        barcount: 0,
        countbar: 0
    }
});

Vue.component('currency-input', {
    template: '<span>' +
            '$<input ref="input" v-bind:value="value" ' +
            'v-on:input="updateValue($event.target.value)">' +
            '</span>',
    props: ['value'],
    methods: {
        // HINT: $refs(see down) should heal it
        updateValue: function (value) {
            var formattedValue = value
                .trim()
                .slice(
                    0,
                    value.indexOf('.') === -1
                        ? value.length
                        : value.indexOf('.') + 3
                );
            if (formattedValue !== value) {
                // TODO: decorate this:
                // refs is an array of the DOM nodes:
                console.log(typeof(this.vurefs));
                this.$refs.input.value = formattedValue;
                // using this.value = formattedValue will cause a warning
            }
            this.vuemit('input', Number(formattedValue));
        }
    },
    created: function () {
        console.log(typeof(this));
        console.log(typeof(this.$refs));
    }
});
Vue.component('input-currency', {
    template: '<div><label v-if="label">{{label}}</label>' +
            '$<input ref="input" v-bind:value="value"' +
            'v-on:input="updateValue($event.target.value)"' +
            'v-on:focus="selectAll" v-on:blur="formatValue"></div>',
    props: {
        value: {
            type: Number,
            default: 0
        },
        label: {
            type: String,
            default: ''
        }
    },
    // TODO: investigate what is this 'mounted':
    mounted: function () {
        this.formatValue();
    },
    methods: {
        updateValue: function (value) {
            //'this.value' is used for reading:
            var result = currencyValidator.parse(value, this.value);
            if (result.warning) {
                this.$refs.input.value = result.value;
            }
            this.vuemit('input', result.value);
        },
        formatValue: function () {
            this.$refs.input.value = currencyValidator.format(this.value);
        },
        selectAll: function (event) {
            // calling 'setTimeout' will fix some safari bug:
            // setTimeout(function () {
            event.target.select();
            // }, 0);
        }
    }
});
Vue.component('my-checkbox', {
    //the 'input' needs to be inside the 'label' so that the update is triggered even if the users clicks on the text:
    template: '<span><label>' +
            '<input type="checkbox" v-on:click="updateValue($event.target.checked)">' +
            '{{value}}' +
            //this is better if building a reusable component, but will miss the point of the example:
            // '<span v-if="checkedren">{{checkedText}}</span>' +
            // '<span v-if="!checkedren">{{uncheckedText}}</span>' +
            '</label></span>',
    model: {
        //renamed default 'value'-property and 'input'-event that triggers its update
        prop: 'checkedren',
        event: 'changeren'
    },
    props: {
        checkedren: {
            type: Boolean,
            //binding takes precedence over this:
            default: true
        },
        //'value'-property used differentways:
        value: {
            type: String,
            default: 'Agreed'
        }//,
        // checkedText: String,
        // uncheckedText: String
    },
    methods: {
        updateValue: function (value) {
            this.vuemit('changeren', value);
        }
    }
});
var example8 = new Vue({
    el: '#example-8',
    data: {
        price: 0.0,
        itemprice: 0.0,
        shipping: 0.0,
        handling: 0.0,
        discount: 0.0,
        aboutToAgree: false,
        agreed: false
    },
    computed: {
        total: function () {
            var tot = ((this.itemprice * 100 + this.shipping * 100 +
                this.handling * 100 - this.discount * 100) / 100);
            return tot.toFixed(2);
        }
    },
    methods: {
        toggleAgreed: function () {
            this.agreed = !(this.agreed);
            this.aboutToAgree = false;
        },
        setAboutToAgree: function (value) {
            this.aboutToAgree = value;
        }
    }
});

var bus = new Vue();
Vue.component('new-todo', {
    template: '<input ref="newTodo" v-on:keyup.enter="addNewTodo($event.target.value)" placeholder="Add a todo">',
    methods: {
        addNewTodo: function (newTodoText) {
            bus.vuemit('todo-added', newTodoText);
            this.$refs.newTodo.value = '';
        }
    }
});
Vue.component('todo-list', {
    template: '<div>' +
            '<ul v-if="todos.length">' +
            '<li is="todo-item" v-for="(todo, index) in todos" v-bind:key="todo.id" ' +
            'v-bind:title="todo.title" v-on:remove="todos.splice(index, 1)"></li>' +
            '</ul>' +
            '<p v-else>No todos left!</p>' +
            '</div>',
    data: function () {
        return {
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
        };
    },
    created: function () {
        bus.vuon('todo-added', function (text) {
            this.todos.push({
                id: this.newTodoId,
                title: text
            });
            this.newTodoId += 1;
        // TODO: report this buls**t:
        }.bind(this));
    }
});
Vue.component('todo-item', {
    template: '<li>' +
            '{{ title }}' +
            '<button v-on:click="vuemit(\'remove\')">X</button>' +
            '</li>',
    props: ['title']
});
var example9 = new Vue({
    el: '#example-9'
});