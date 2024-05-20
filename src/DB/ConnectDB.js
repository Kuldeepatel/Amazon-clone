const mongoose = require('mongoose');

const ConnectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://patelkuldip1308:Kuldipatel%401234@cluster0.f0evmgs.mongodb.net/shopping");
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error(`Database Connection Error: ${error}`);
    }
}

module.exports = {
    ConnectDB
}
