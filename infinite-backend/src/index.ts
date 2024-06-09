import main from "./app";

const startServer = async () => {
  const io = await main();
  // You can use 'io' here or pass it to other modules
};

startServer().catch((err) => {
  console.error(err);
});
