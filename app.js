const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");
const { response } = require("express");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/" , function(req ,res){
    const fname = req.body.fName;
    const lname = req.body.lName;
    const email = req.body.eMail;
    
    const data = {
        members:[
            {
                email_address : email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:lname
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);

    const options = {
        method : "POST",
        auth : "sahi:66cd70b41eda60f0e32575bec23e5f37-us14"
    }
    const url = "https://us14.admin.mailchimp.com/lists/c066263d49/members/sahith.sahi9866@gmail.com/options";

    if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
    }else{
        res.sendFile(__dirname + "/failure.html");
    }
    const request = https.request(url,options,function(response){
        response.on("data" , function(data){
            console.log(JSON.parse(data));
        })
    })
 
    //request.write(jsonData);
    request.end;
})

app.post("/failure",function(res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(req,res){
    console.log("Server is listening on port 3000");
})

//api 66cd70b41eda60f0e32575bec23e5f37-us14
//id c066263d49