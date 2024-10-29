
const express=require("express");
const app=express();
const path=require("path");
const {v4: uuidv4 }=require('uuid');
const port =8080;
const methodoverride=require("method-override");
app.use(methodoverride("_method"));

app.use(express.urlencoded({extended:true}));
app.set ("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));



app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

let posts=[
{
    id: uuidv4(),
    followers:90,
    following:33,
    username:"vishal",
    superuser:"meta_tag",
    contant:"I LOVE CODING",
},
{
    id: uuidv4(),
    followers:36,
    following:34,
    username:"yashwant",
    contant:"smart work",
},
{
    id: uuidv4(),
    followers:55,
    following:12,
    username:"omya",
    contant:"enjoying and exploring",
}
];
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
//creat new post
app.post("/posts",(req,res)=>{
    //console.log(req.body);
    let{ username, contant } =req.body;
    let id=uuidv4();
    console.log(`the user name ${username} content:${contant}`);
    posts.push=({ id,username,contant});
   res.redirect("/posts");
    });

app.get("/post/:id",(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let post=posts.find((p)=> id === p.id);
    res.render("show.ejs",{post});
   
});
//update
app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let newcontant=req.body;
    console.log(newcontant);
    let post=posts.find((p)=> id === p.id);
    post.content= newcontant;
    res.redirect("/posts");
    //res.render("index.ejs",{posts});
}); 
//edit
app.get("/post/:id/edit",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=> id === p.id);
    console.log(post);
    res.render("edit.ejs",{post});
});
//delete 

app.delete("/posts/:id",(req,res)=>{
    let{id}=req.params;
  posts=posts.filter((p)=> id !==p.id);
  res.render("black.ejs"); 
  // res.redirect("/posts");
});

// new page
// app.get("/post/larva",(req,res)=>{
//     res.render("black.ejs");
// });















app.listen(port,() =>{
    console.log(`the network is running on port:${port}`);
});




//my owne code 

