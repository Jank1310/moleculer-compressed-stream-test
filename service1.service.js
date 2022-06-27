const MemoryStream = require("memorystream");

// Define a service
module.exports = {
  name: "sender",
  actions: {
    send(ctx) {
      const stream = new MemoryStream();
      for (let i = 0; i < 10; i++) {
        stream.push(JSON.stringify({ entry: i }));
      }
      stream.push(null);
      const resultStream = ctx.call("receiver.receive", stream);
      //! Won't work
      resultStream.on("data", (d) => console.log(d));
    },
  },
};
