/*global Vue setTimeout*/
"use strict";

Vue.component('child-component', {
    template: '<span><slot>Hello!</slot></span>'
});
Vue.component('app-layout', {
    template: '<div class="container">' +
            '<header>' +
            '<slot name="header"></slot>' +
            '</header>' +
            '<main>' +
            '<slot></slot>' +
            '</main>' +
            '<footer>' +
            '<slot name="footer"></slot>' +
            '</footer>' +
            '</div>'
});
Vue.component('child', {
    template: '<div class="child">' +
            '<slot text="hello from child"></slot>' +
            '</div>'
});
Vue.component('my-awesome-list', {
    template: '<ul>' +
            '<slot name="item" v-for="item in items" v-bind:desc="item.text" v-bind:prior="item.priority">item..</slot>' +
            '</ul>',
    // TODO: report missing property:
    props: ['items']
});
var example1 = new Vue({
    el: '#example-1',
    data: {
        message: 'Hello, child!',
        items: [
            {priority: 100, text: 'One'},
            {priority: 110, text: 'Two'},
            {priority: 200, text: 'Three'}
        ]
    }
});

var thirdPartyWrapper = {
    template: '<span>Info from another party...</span>'
};
var ac = Vue.component('about-component', {
    template: '<span>We are the new company...</span>'
});
var example2 = new Vue({
    el: '#example-2',
    data: {
        currentView: 'home',
        home: true,
        posts: false,
        archive: false,
        tp: false,
        ab: false
    },
    components: {
        home: {
            template: '<span>Welcome!</span>'
        },
        posts: {
            template: '<div><label><input type="checkbox">Show only posts I commented on</label><div>Posts...</div></div>'
        },
        archive: {
            template: '<span>Old(unrevised) posts...</span>'
        }
    },
    methods: {
        showHome: function () {
            this.currentView = 'home';
            // TODO: figure out better tab switch
            this.home = true; this.posts = false; this.archive = false; this.tp = false; this.ab = false;
        },
        showPosts: function () {
            this.currentView = 'posts';
            this.posts = true; this.home = false; this.archive = false; this.tp = false; this.ab = false;
        },
        showArchive: function () {
            this.currentView = 'archive';
            this.archive = true; this.posts = false; this.home = false; this.tp = false; this.ab = false;
        },
        showThirdParty: function () {
            this.currentView = thirdPartyWrapper;
            this.tp = true; this.posts = false; this.archive = false; this.home = false; this.ab = false;
        },
        showAbout: function () {
            //these both work:
            this.currentView = ac;
            // this.currentView = 'about-component';
            this.ab = true; this.posts = false; this.archive = false; this.tp = false; this.home = false;
        }
    }
});

// todo: make this use an array(beware - by reference)
// todo: hide slide buttons on no items / single item
// todo: show 'no items' on no items
Vue.component('simple-slideshow', {
    template: '<div class="slideshow" style="position: relative; max-width:600;">' +
            '<span style="text-align:center;"><slot name="title"></slot></span>' +
            '<div style="position: relative;">' +
            '<img style="width:100%" v-bind:src="src"></img>' +
            '<div class="display-bottomright padding-16 black"><span>{{caption}}</span></div>' +
            '</div>' +
            '<button class="arrow-button black display-left" v-on:click="vuemit(\'go-left\')"><</button>' +
            '<button class="arrow-button black display-right" v-on:click="vuemit(\'go-right\')">></button>' +
            '</div>',
    props: {
        caption: String,
        src: String
    }
});
var example3 = new Vue({
    el: '#example-3',
    data: {
        items: [
            {id: 0, name: 'Javascript', image: 'images/js_1280.jpg'},
            {id: 1, name: 'Vue', image: 'images/vue_1280.jpg'}
        ],
        selected: 0
    },
    methods: {
        slideTo: function (index) {
            if (this.items && (index < this.items.length) && index >= 0) {
                this.selected = index;
                return true;
            } else {
                return false;
            }
        },
        slideLeft: function () {
            if (!this.slideTo(this.selected - 1)) {
                this.slideTo(this.items.length - 1);
            }
        },
        slideRight: function () {
            if (!this.slideTo(this.selected + 1)) {
                this.slideTo(0);
            }
        }
    }
});

// TODO: make up better examples:
Vue.component('some-comp', {
    template: '<div>{{someProp}}</div>',
    props: {
        someProp: String
    }
});
Vue.component('tech-item', {
    props: ['name', 'image'],
    template: '<li><img v-bind:src="image" style="max-height: 15px;"/>{{ name }}<input type="checkbox" v-model="selected"></li>',
    data: function () {
        return {
            selected: false
        };
    },
    methods: {
        select: function () {
            this.selected = !this.selected;
        }
    }
});
var example4 = new Vue({
    el: '#example-4',
    data: {
        items: [
            {id: 0, name: 'Javascript', image: 'images/javascript.png'},
            {id: 1, name: 'Vue', image: 'images/vue.png'}
        ]
    },
    methods: {
        switchBackground: function () {
            //assume empty background color:
            if (this.$refs.sc.$el.style.backgroundColor === '') {
                this.$refs.sc.$el.style.backgroundColor = '#ddd';
            } else {
                this.$refs.sc.$el.style.backgroundColor = '';
            }
        },
        revertIt: function () {
            this.$refs.sc.$el.style.border = '';
        },
        highlight: function (index) {
            var refs = this.$refs.techs;
            if (this.items && (index < this.items.length) && index >= 0) {
                //access to the dom element is not that important:
                //assume empty background color:
                if (refs[index].$el.style.backgroundColor === '') {
                    refs[index].$el.style.backgroundColor = '#ddd';
                } else {
                    refs[index].$el.style.backgroundColor = '';
                }
                //access to the component instance is the real deal:
                refs[index].select();
                this.selected = index;
                return true;
            }
            return false;
        }
    }
});

Vue.component('async-example', function (resolve, reject) {
    setTimeout(function () {
        resolve({
            template: '<div>I am async!</div>'
        });
        reject({
            // TODO: demonstrate this
        });
    }, 1000);
});
var example5 = new Vue({
    el: '#example-5'
});