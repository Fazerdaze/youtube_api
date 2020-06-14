const express = require('express')
const next = require('next')
const {parse } = require('url')
const bodyParser = require('body-parser')
const faker = require('faker')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const items = new Array();

const deleteItems = new Array();


app.prepare().then(() => {
  const server = express()
  server.use(bodyParser.urlencoded({ extended: false }))
  server.use(bodyParser.json())
  
  server.get('/api/a', (req, res) => {
    return res.json({
        error: false,
        message: 'hello'
    });
  })

  server.get('/posts/:id', (req, res) => {
    return app.render(req, res, '/posts', { id: req.params.id})
  })

  server.post("/posts", (req,res)=>{
    console.log('Status POST',req.body)
    
    if (item = items.find((g)=>{return g.video == req.body.goal.video})) {
      error = true;
      message = 'Видео добавлено уже в ваш список!!!';
    }else{
        newItem =  {
          id: faker.random.uuid(),
          name: req.body.goal.name,
          video: req.body.goal.video,
          channel: req.body.goal.channel,
          subscribe: req.body.goal.subscribe,
        };
        items.push(newItem);
        message = 'Добавлено новое видео!!!';
  }

  return res.json({ 
    error,
    message,
    data: newItem
  });
})

  server.delete("/goalid", (req, res) => {
    let error = true;
    let message = 'Видео не удалено!!!';
    let item = null;
    console.log(req.body);
    if (item = items.find((g)=>{return g.id == req.body.goalID.id})) {
      items.splice( items.indexOf(item), 1);
      deleteItems.push(item);
      error = false;
      message = 'Видео удалено со списка!!!';
    }
  

    return res.json({
    error,
    message,
    deleteItems,
    data: item});
})


  server.get("/goals", (req,res)=>{

    return res.json({
      error: false,
      data: items
    });
})

server.post("/status", (req,res)=>{
  console.log('Status STAND', req.body)

  const item = items.find((g)=>g.id===req.body.goal.id);
  if (!item) {
    return res.json({ error: true });  
  } else {
    item.isDone=req.body.goal.isDone
  }
  
  return res.json({ 
    error: false,
    data: item});
})


  server.all('*', (req, res) => {
      const params = parse(req.url, true);
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})