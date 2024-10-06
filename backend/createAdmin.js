var connectDatabase = require('./databaseConnect');
const User = require('./models/user')
require('dotenv').config();
const DATABASE_KEY = process.env.DATABASE_URL
connectDatabase(DATABASE_KEY);
const email = process.argv.slice(2);
async function createAdmin(email)
{
    const filter ={email:email};
    const update ={isAdmin:true};
    const opts = { new: true };
    let ans = await User.findOneAndUpdate(filter, update, opts);
    if(ans.isAdmin) console.log("Admin Update")
    else console.log("Some error occured")
    process.exit()
}

createAdmin(email[0]);
