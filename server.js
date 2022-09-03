const express=require("express")
const mysql=require("mysql")
const bodyparser=require("body-parser")
const cors = require("cors")
var a
const app=express()
app.use(cors())
const encoder=bodyparser.urlencoded()
app.use(bodyparser.json())
const con=mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"database3"
})
con.connect(function(error){
    if(error)
    throw error; 
    else{
        console.log("Database connected")
    }
})
app.post("/register",encoder,(req,res)=>{
    console.log("Hii")
    var name = req.body.t1;
    var emp_id = req.body.t2;
    var mob = req.body.num;
    var email = req.body.mail;
    var job = req.body.job;
    var sal = req.body.sal;
    var sql = "INSERT INTO employee(Emp_name,Emp_id,Mobileno,Email,Job,Salary) VALUES("+con.escape(name)+","+con.escape(emp_id)+","+con.escape(mob)+","+con.escape(email)+","+con.escape(job)+","+con.escape(sal)+")"
    con.query(sql,function(error,result){
        console.log("sharmi")
        if(error)
        throw error;
        console.log(result)
        res.redirect("/welcome")
    })
})

app.post("/calc",encoder,(req,res)=>{
    var name=req.body.c1
    a=name
    console.log(name)
    var leave=req.body.c2
    var x=(leave*200)
    var sql="update employee set Salary=Salary-("+con.escape(x)+")where Emp_name="+con.escape(name)
    console.log(sql)
            con.query(sql,function(err,result){
                console.log(result);
                if (err) throw err;
                if(result.changedRows>0)
                {
                    res.redirect("/disp2")
                    console.log("1 record updated"); 
                      
                }
                else{
                    res.send("Invalid ")
                   
                }
               
 })
})
app.post("/call",encoder,(req,res)=>{
    var name=req.body.h1
    c=name
    var y=(2*200)
    var sql="update employee set Salary=Salary-("+con.escape(y)+")where Emp_name="+con.escape(name)
    console.log(sql)
            con.query(sql,function(err,result){
                console.log(result);
                if (err) throw err;
                if(result.changedRows>0)
                {
                    res.redirect("/disp3")
                    console.log("1 record updated"); 
                      
                }
                else{
                    res.send("Invalid ")
                   
                }
               
 })
})
app.get("/disp2",(req,res)=>{
    res.sendFile(__dirname+"/disp2.html")
})



 app.get("/salcalc",(req,res)=>{
     var sql="select * from employee where Emp_name="+con.escape(a)
     con.query(sql,function(error,result){
        console.log("sharmitha")
        if(error)
        throw error;
        console.log(result)
        res.json(result)
    })
 })



 app.get("/search",(req,res)=>{
    var sql="select * from employee where Emp_name="+con.escape(c)
    con.query(sql,function(error,result){
       console.log("sharmitha")
       if(error)
       throw error;
       console.log(result)
       res.json(result)
   })
})

                      
 

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})
app.get("/welcome",(req,res)=>{
    res.sendFile(__dirname+"/welcome.html")
})

app.get("/disp",(req,res)=>{
    res.sendFile(__dirname+"/disp.html")
})
app.get("/disp3",(req,res)=>{
    res.sendFile(__dirname+"/disp3.html")
})

app.get("/display",(req,res)=>{
    var sql = "select * from employee"
    console.log("Hio")
    con.query(sql,(error,result)=>{
        console.log(result)
        res.json(result)    
    })
})

app.listen(2570,function(){
    console.log("server created")
    console.log(__dirname)
})