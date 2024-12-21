module.exports = {
    apps: [
      { name: "server1", script: "server1.js" },
      { name: "server2", script: "server2.js" },
      { name: "server3", script: "server3.js" },
      { name: "server4", script: "server4.js" },
      { name: "loadbalancer", script: "index.js" }
    ],
    ignore_watch: ["logs"],
  };