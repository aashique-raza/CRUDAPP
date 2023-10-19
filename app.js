import dotenv from 'dotenv'
dotenv.config()
import { sessionMiddleware } from './middlewares/user.middleware.js';
import express from 'express';
import session from 'express-session';
import connectionDB from './db/connection.js'
import usreRoute from './routes/user.route.js'
import { appendFile } from 'fs';


const URI = process.env.DATABASE_URI;
const PORT = process.env.PORT || 4000;
const app = express();


// database connection--
connectionDB(URI)

// express session--
app.use(session({
    secret: 'my-secret',  // a secret string used to sign the session ID cookie
    resave: false,  // don't save session if unmodified
    saveUninitialized: false  // don't create session until something stored
}))

// middleware--
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(sessionMiddleware);
app.use(express.static('uploads'))

// view engine set--
app.set('view engine','ejs')




// routes----
app.use('/', usreRoute)



app.listen(PORT, () => console.log(`server running on ${PORT}`))
