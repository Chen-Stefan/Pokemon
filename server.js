const express = require("express");
const res = require("express/lib/response");
const app = express();      
const https = require('https');       

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

app.get('/profile/:id', function (req, res) {   
    const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`;
    let data = "";
    https.get(url, function(https_res) {
        https_res.on("data", function(chunk) {  
            data += chunk;
        })
        https_res.on("end", function() {
            data = JSON.parse(data);

            let hpArray = data.stats.filter((obj) => {
                return obj.stat.name == "hp"
            }).map((obj_) => {
                return obj_.base_stat     // 这个返回的是一个array
            })

            res.render("profile.ejs", {  
                "id": req.params.id,
                "name": data.name,
                "hp": hpArray[0]          // 去看数据，怎么读出Hp
            })
        })
    })              
})

// sendFile 和res.render一样也可以send整个page to client, 但是sendFile只能send一个static page
// app.get('/', function(req, res){
//     res.sendFile(__dirname + "/index.html");
// })

