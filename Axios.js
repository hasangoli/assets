// ================================= AXIOS GLOBALS
axios.defaults.headers.common["X-Auth-Token"] =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

// ================================= GET REQUEST
axios({
  method: "GET",
  url: "https://jsonplaceholder.typicode.com/todos",
  params: {
    _limit: 5,
  },
})
  .then(res => showOutput(res))
  .catch(err => console.log(err));

axios
  .get("https://jsonplaceholder.typicode.com/todos?_limit=5", {
    timeout: 5000,
  })
  .then(res => showOutput(res))
  .catch(err => console.log(err));

// ================================= POST REQUEST
axios({
  method: "POST",
  url: "https://jsonplaceholder.typicode.com/todos",
  data: {
    title: "New Todo",
    completed: false,
  },
})
  .then(res => showOutput(res))
  .catch(err => console.log(err));

axios
  .post("https://jsonplaceholder.typicode.com/todos", {
    title: "New Todo",
    completed: false,
  })
  .then(res => showOutput(res))
  .catch(err => console.log(err));

// ================================= PUT => Replaces the whole Obj
axios
  .put("https://jsonplaceholder.typicode.com/todos/1", {
    title: "Updated Todo",
    completed: true,
  })
  .then(res => showOutput(res))
  .catch(err => console.log(err));

// ================================= PATCH => Just replaces included items
axios
  .patch("https://jsonplaceholder.typicode.com/todos/1", {
    title: "Updated Todo",
    completed: true,
  })
  .then(res => showOutput(res))
  .catch(err => console.log(err));

// ================================= DELETE REQUEST
axios
  .delete("https://jsonplaceholder.typicode.com/todos/1")
  .then(res => showOutput(res))
  .catch(err => console.log(err));

// ================================= SIMULTANEOUS DATA
axios
  .all([
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
    axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
  ])
  // .then(res => {
  // console.log(res[0], res[1]);
  // })
  .then(axios.spread((todos, posts) => showOutput(posts)))
  .catch(err => console.log(err));

// ================================= CUSTOM HEADERS
const config = {
  headers: {
    "Content-type": "application/json",
    Authorization: "sometoken",
  },
};

axios
  .post(
    "https://jsonplaceholder.typicode.com/todos",
    {
      title: "New Todo",
      completed: false,
    },
    config
  )
  .then(res => showOutput(res))
  .catch(err => console.log(err));

// ================================= TRANSFORMING REQUESTS & RESPONSES
const options = {
  method: "POST",
  url: "https://jsonplaceholder.typicode.com/todos",
  data: {
    title: "Hello World",
  },
  transformResponse: axios.defaults.transformResponse.concat(data => {
    data.title = data.title.toUpperCase();
    return data;
  }),
};

axios(options).then(res => showOutput(res));

// ================================= ERROR HANDLING
axios
  .get("https://jsonplaceholder.typicode.com/todoss", {
    validateStatus: function (status) {
      return status < 500; //Reject only if status is greater or equal to 500
    },
  })
  .then(res => showOutput(res))
  .catch(err => {
    if (err.response) {
      // Server responded with status other than 200 range
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);

      if (err.response.status === 404) {
        alert("Error: page not found");
      }
    } else if (err.request) {
      // Request was made but there is no response
      console.log(err.request);
    } else {
      console.log(err.message);
    }
  });

// ================================= CANCEL TOKEN
const source = axios.CancelToken.source();

axios
  .get("https://jsonplaceholder.typicode.com/todoss", {
    CancelToken: source.token,
  })
  .then(res => showOutput(res))
  .catch(thrown => {
    if (axios.isCancel(thrown)) {
      console.log("Request canceled", thrown.message);
    }
  });

if (true) {
  source.cancel("Request canceled");
}

// ================================= INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  config => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().getTime()}`
    );

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// ================================= AXIOS INSTANCES
const axiosInstance = axios.create({
  // Other custom settings
  baseURL: "https://jsonplaceholder.typicode.com",
});

axiosInstance.get("/comments").then(res => showOutput(res));
