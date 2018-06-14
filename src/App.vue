<template>
  <div id="app">
    <h1><a :href="instapage">@{{ username }} on instagram</a></h1>
  <template v-if="grams.length > 0">
    <div v-for="(gram, index) in grams">
      <a :href="gram.link">
        <img :src="gram.images.standard_resolution.url" :alt="gram.text" />
      </a>
    </div>
  </template>
  <div v-else class="loading"></div>
  <div v-if="error" class="error">Sorry, the Instagrams couldn't be fetched.</div>
  <button @click="getMoreGrams">Load More</button>
  </div>
</template>

<script>
import axios from "axios";
import dotenv from "dotenv";

export default {
  data() {
    return {
      access_token: process.env.ACCESS_TOKEN,
      url: "https://api.instagram.com/v1/users/self/media/recent/",
      username: "",
      grams: [],
      next_url: "",
      error: false
    };
  },
  computed: {
    instapage() {
      return "https://www.instagram.com/" + this.username;
    }
  },
  methods: {
    getGrams() {
      axios
        .get(this.url + "?access_token=" + this.access_token)
        .then(({ data }) => {
          this.grams = data.data;
          this.username = data.data[0].user.username;
          this.next_url = data.pagination.next_url;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getMoreGrams() {
      axios
        .get(this.next_url)
        .then(({ data }) => {
          this.grams = this.grams.concat(data.data);
          this.next_url = data.pagination.next_url;
        })
        .catch(function(error) {
          console.log(error);
          this.error = true;
        });
    }
  },
  created() {
    this.getGrams();
  }
};
</script>

<style>
:root {
  --color: #95e9ef;
  --background: #1f1f1f;
  --spacing: 1rem;
  --speed: 1700ms;
  --fontsize: 2rem;
}
body {
  margin: 0;
  padding: var(--spacing);
  font-family: Karbon, Helvetica, sans-serif;
  color: var(--color);
  background: var(--background);
}
#app {
  display: grid;
  grid-gap: var(--spacing);
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  min-height: calc(100vh - var(--spacing)*2);
}
h1 {
  align-self: start;
}
h1,
button {
  margin: 0;
  padding: 0;
  grid-column: 1 / -1;
  font-size: var(--fontsize);
  line-height: 1.2;
  font-weight: 300;
  border: 4px solid var(--color);
  border-width: 4px 0;
}
img {
  max-width: 100%;
  display: block;
}
button {
  border-radius: 0;
  color: var(--color);
  background: transparent;
  grid-column: 1 / -1;
  outline: none;
  cursor: pointer;
  align-self: end;
}
a {
  color: inherit;
  text-decoration: none;
}
.error {
  grid-column: 1 / -1;
  justify-self: center;
}
.loading {
  width: calc(var(--spacing)*3);
  height: calc(var(--spacing)*3);
  grid-column: 1 / -1;
  justify-self: center;
  align-self: center;
  background: var(--color);
  animation: load var(--speed) infinite ease-in-out;
  transform: rotate(0);
}
@keyframes load {
  100% {
    transform: rotate(360deg);
  }
}
</style>
