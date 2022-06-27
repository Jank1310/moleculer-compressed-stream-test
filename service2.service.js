const MemoryStream = require("memorystream");

module.exports = {
  name: "receiver",
  actions: {
    receive(ctx) {
      ctx.params.on("data", (d) => console.log(d));
      const stream = new MemoryStream();
      for (let i = 0; i < 10; i++) {
        stream.push(JSON.stringify({ entry: i }));
      }
      stream.push(null);
      return stream;
    },
  },
};
