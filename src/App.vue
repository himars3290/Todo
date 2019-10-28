<template>
  <div class="home">
    <img alt="Vue Logo" id="vue-logo" src="@/assets/logo.png" />
    <div class="title">What do i need to do today?</div>
    <input v-model="myTodo" />
    <button @click="addToDo">Add</button>
    <div id="errors" v-if="errors !== ''">{{ errors }}</div>
    <div
      id="items"
      v-if="
        this.$store.getters.getItems && this.$store.getters.getItems.length > 0
      "
    >
      <div class="title">Todos to do today</div>
      <div v-for="item in this.$store.getters.getItems" :key="item.id">
        {{ item.title }}<br />
        <small style="text-decoration: underline;" @click="deleteItem(item.id)"
          >Delete
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/main'
export default {
  name: 'app',
  beforeCreate: function() {
    this.$store.dispatch('setItems')
  },
  data() {
    return {
      myTodo: '',
      errors: ''
    }
  },
  methods: {
    addToDo() {
      this.errors = ''
      if (this.myTodo !== '') {
        db.collection('items')
          .add({
            title: this.myTodo,
            createdAt: Date.now()
          })
          .then(response => {
            if (response) {
              this.myTodo = ''
            }
          })
          .catch(error => {
            this.errors = error
          })
      } else {
        this.errors = 'Enter a todo'
      }
    },
    deleteItem(id) {
      if (id) {
        db.collection('items')
          .doc(id)
          .delete()
          .then(function() {
            console.log('deleted item')
          })
          .catch(function(error) {
            this.errors = error
          })
      } else{
        this.errors = 'no ID'
      }
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

html,
body,
#app {
  background: #8ac8e5;
}

.home {
  width: 300px;
  margin: auto;
}

#vue-logo {
  width: 100px;
}

input,
button {
  border: 0;
  width: 100%;
  margin: 0 0 10px;
  padding: 7px;
}

input {
  font-size: 12px;
}

button {
  background: #43b823;
  border: 0;
  text-transform: uppercase;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}

.title {
  font-size: 14px;
  font-weight: 700;
  padding: 0 0 10px 0;
  margin: 0 0 10px 0;
  border-bottom: 1px solid #666;
}

#errors {
  background: #a52222;
  color: #ffffff;
  padding: 5px;
}
</style>
