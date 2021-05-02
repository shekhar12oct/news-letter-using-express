const express=require("express");

// not in use any more body parser
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(express.urlencoded({extended:true}));

//to use static csss and images files
app.use(express.static("public"));

app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res)
{
    const fName=req.body.fName;
    const lName=req.body.lName;
    const email=req.body.email;

    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fName,
                    LNAME:lName
                }
            }
        ]
    }

    const jsonData=JSON.stringify(data);
    const url="https://us1.api.mailchimp.com/3.0/lists/333817fcab1";

    const options={
        method:"POST",
        auth:"shekhar:d368a132bef3634935218963e7cae0e2-us1"
    }

    const request= https.request(url,options,function(response)
    {

       if(response.statusCode===200)
       {
           res.sendFile(__dirname+"/success.html");
       }
       else
       {
        res.sendFile(__dirname+"/failure.html");
       }

       response.on("data",function(data){
       console.log(JSON.parse(data));
       })
    })

   request.write(jsonData);
   request.end();
})

app.post("/failure",function(req,res){
    res.redirect("/");
  })

app.listen(process.env.PORT||3000,function()
{
    console.log("server is running at port 3000");
})



// unique id for audience shekharsubscriberbox
//333817fcab

// Api key
//d368a132bef3634935218963e7cae0e2-us1