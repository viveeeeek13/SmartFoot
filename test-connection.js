const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

async function test() {
    try {
        console.log("Testing bcrypt...");
        const hash = await bcrypt.hash("test", 10);
        console.log("Bcrypt hash successful:", hash);

        const uri = process.env.MONGODB_URI;
        console.log("Testing MongoDB connection to:", uri);

        await mongoose.connect(uri);
        console.log("MongoDB connection successful!");

        console.log("Testing a DB operation (listDatabases)...");
        const admin = mongoose.connection.db.admin();
        const result = await admin.listDatabases();
        console.log("DB operation successful, databases:", result.databases.map(d => d.name));

        await mongoose.disconnect();
    } catch (err) {
        console.error("Test failed:", err);
        if (mongoose.connection) await mongoose.disconnect();
    }
}

test();
