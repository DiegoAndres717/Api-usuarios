const { response } = require('express')
const Medico = require('../models/medico');

const getMedico = async (req, res = response) => {

    const medicos = await Medico.find()
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img')

    res.json({
        ok: true,
        medicos
    })
}

const updateMedico = async (req, res = response) => {
    
    res.json({
        ok: true,
        msg: 'actualiar Medicos'
    })
}

const createMedico = async (req, res = response) => {
    const uid = req.uid;
    const medico = new Medico({ 
        usuario: uid,
        ...req.body
     });

    try {
        const medicolDB = await medico.save();
        
        res.json({
            ok: true,
            msg: 'crear hospitales',
            medico: medicolDB,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const deleteMedico = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrar Medicos'
    })
}


module.exports = {
    getMedico,
    updateMedico,
    createMedico,
    deleteMedico
}
