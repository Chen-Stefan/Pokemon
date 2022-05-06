const express = require("express");
const res = require("express/lib/response");
const app = express();             

app.set('view engine', 'ejs');

app.use(express.static('./public'));     

app.listen(5000, function(err){      // anonymous function as the second parameter
    if(err) console.log(err);
})

// url里的内容属于request, req是一个很大的object，params是其中一个attribute
// res.send()一般用一次， res.write()会把string concatenate, 可以连用好多个

// app.get('/profile/:id', function (req, res){      
//     res.send(`Hi there, the pokemon has the id ${req.params.id}`) 
// })

app.get('/profile/:id', function (req, res){      
    res.render("profile.ejs", {  
        "id": req.params.id
    });              // second parameter is a JSON object, 把这个值喂给EJS，然后再render整个EJS page
    // 如果有这个的话，之前render的profile.ejs就没了，会被下面的json object取代掉
    // res.json({                  
    //     "nabil": "cute",
    //     "chris": "dumb",
    //     "hoda": "love"
    // })
})

// sendFile 和res.render一样也可以send整个page to client, 但是sendFile只能send一个static page
// app.get('/', function(req, res){
//     res.sendFile(__dirname + "/index.html");
// })

