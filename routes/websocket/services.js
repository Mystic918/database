let ctxs = []
exports.WebSocket = (ctx)=>{

    ctxs.push(ctx)

    ctx.websocket.on('message',message=>{
        console.log(ctxs)
        // 返回给前端的数据
        ctx.websocket.send(message)
          for(let i = 0; i < ctxs.length; i++) {
            if (ctx == ctxs[i]) continue;
            alert(1)
            ctxs[i].websocket.send(message);
        }
    })
    ctx.websocket.on("close",message=>{
        let index =ctxs.indexOf(ctx)
        ctxs.split(index,1)
    })
}