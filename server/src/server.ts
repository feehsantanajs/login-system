
import express, { Request, Response } from 'express';
import mysql from "mysql2";
import cors from 'cors';
import bcrypt from 'bcrypt'

const saltRounds = 10;
const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "login"
})
db.connect(function (err: any) {
    if (err) throw err;
    console.log("Connected!");
});

app.use(express.json());
app.use(cors());

app.post("/register", (req: Request, res: Response) => {

    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;

    db.query(`SELECT * from user where email = '${email}'`, (error, result) => {
        if (!error) {
            const resultQty = Object.keys(result).length
            if (resultQty < 1) {
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    db.query(`INSERT INTO user (name, email, password) VALUES ('${user}', '${email}', '${hash}')`, (error, result) => {
                        if (!error) {
                            res.send("cadastrado com sucesso")
                            console.log("cadastrado com sucesso")
                        } else {
                            console.log("Erro no cadastro", error)
                        }
                    })
                })
            } else {
                res.send("This email is register yet !")
            }
        } else {
            res.send(error)
            console.log("Error at verification!")
        }
    })
})

app.post("/login", (req: Request, res: Response) => {

    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM user WHERE email = ? ", [email], (error, result) => {
        if (!error) {
            const data = Object(result)
            if (data.length > 0) {
                bcrypt.compare(password, data[0].password, (err, result) =>{
                    if(!err){
                        result ? res.send({response: "Logado com Sucesso" }) : res.send({response: "Senha ou email errado" })
                    }
                })
            }
            else {
                res.send({
                    response: "Email não encontrado"
                });
            }
        } else {
            res.send(error);
        }
    })
})

app.listen(3001, () => {
    console.log("rodando o server")

})