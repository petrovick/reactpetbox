const Box = require('../models/Box');
const File = require('../models/File');

class BoxController {
    async store(req, res){
        //Criar arquivo
        const box = await Box.findById(req.params.id);
        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key
        });
        
        box.files.push(file);

        await box.save();

        //Funciona por causa do app.use((req, res, next) => { do server.js linha 21(21 até então)
        req.io.sockets.in(box._id).emit('file', file);

        return res.json(file);
    }
}

module.exports = new BoxController();