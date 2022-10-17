const { response } = require('express');
const Hospital = require('../models/hospital');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');


const getTodo = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const regEx = RegExp( busqueda, 'i' );

    const [ usuarios, medicos, hospital ] = await Promise.all([
        Usuario.find({ nombre: regEx }),
        Hospital.find({ nombre: regEx }),
        Medico.find({ nombre: regEx })
    ])

    res.json({
        ok: true,
        usuarios,
        hospital,
        medicos
    })
}

const getDocuColecion = async (req, res = response) => {

    const tabla    = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regEx    = RegExp( busqueda, 'i' );

    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regEx })
                                        .populate('usuario', 'nombre img')
                                        .populate('hospital', 'nombre img');
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regEx })
                                        .populate('usuario', 'nombre img');
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regEx });
            break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'la tabla tiene que ser usuarios/medicos/hospitales'
            });
            break;

    }

    res.json({
        ok: true,
        resultados: data
    })
}



module.exports = {
    getTodo,
    getDocuColecion
    
}
