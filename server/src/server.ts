
import express, { Request, Response } from 'express';
import mysql from "mysql2";
import cors from 'cors';

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "login"
})
db.connect(function(err:any) {
    if (err) throw err;
    console.log("Connected!");
 });

 app.use(express.json());
 app.use(cors());
interface GetDatasProps{
    name: String;
    email: String;
    password: String;
}


app.post("/register", (req: Request, res: Response) => {
    res.send("hello")
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password
    db.query(`INSERT INTO user (name, email, password) VALUES ('${user}', '${email}', '${password}')`, (error, result) =>{
        if(error){
            console.log("erro")
        }else{
            console.log("good")
        }
    })
})

app.listen(3001, ()=>{
    console.log("rodando o server")
    
})