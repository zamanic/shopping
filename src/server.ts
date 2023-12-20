import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
//const mongoose = require('mongoose');

async function main() {
  //  await mongoose.connect(config.database_url);

  try {
    await mongoose.connect(config.database_url as string);
    // await mongoose.connect('mongodb://127.0.0.1:27017/test');
    app.listen(config.port, () => {
      console.log(`shuvo is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();
// app.listen(config.port, () => {
//     console.log(`Example app listening on port ${config.port}`)
//   })
