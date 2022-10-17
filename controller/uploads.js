const fs = require('fs');
const path = require('path');
const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updateImg } = require("../helpers/update-img");


const fileUploads = async (req, res = response) => {

    const tipo = req.params.tipo;
    const id   = req.params.id;
    //validar tipos
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es valido'
        })
    }
    //validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            mgs: 'No hay ningun archivo'
        })
    }
    //procesar la imagen..
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];

    //validar extension
    const extensionValidas = [ 'png', 'jpg', 'jpeg', 'gif' ]
    if ( !extensionValidas.includes(extensionArchivo )) {
        return res.status(400).json({
            ok: false,
            mgs: 'No es una extension valida'
        });
    }
    //generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${extensionArchivo}`
    // crear el path 
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;
    //mover la imagen
    file.mv( path, (error) => {
        if (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'error al mover la imagen'
            })
        }

        //actualizar base de datos
        updateImg( tipo, id, nombreArchivo );

        res.json({
            ok: true,
            msg: 'archivo subido',
            nombreArchivo
        });
    });
}

const mostrarImg = async (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }` );

    //imagen por defecto
    if ( fs.existsSync( pathImg )) {
        res.sendFile( pathImg );
    }else{
        const pathImg = path.join( __dirname, `../uploads/defecto.jpg` );
        res.sendFile( pathImg );
    }

}


module.exports = {
    fileUploads,
    mostrarImg
}
