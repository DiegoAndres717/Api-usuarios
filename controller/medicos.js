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
    
    const id = req.params.id;
    const uid = req.uid;
    try {
        const medicoDB = await Medico.findById( id );
        if ( !medicoDB) {
            return res.status(404).json({
                ok: true,
                msg: 'medico no encontrado por id'
             });
        }
        const cambiomedico = {
            ...req.body,
            usuario: uid
        }

        const medicoUpdate = await Medico.findByIdAndUpdate( id, cambiomedico, { new: true})

        res.json({
            ok: true,
            medico: medicoUpdate
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

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
    const id = req.params.id;

    try {
        const medicoDB = await Medico.findById( id );
        if ( !medicoDB) {
            return res.status(404).json({
                ok: true,
                msg: 'medico no encontrado por id'
             });
        }

        await Medico.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'medico eliminado'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = {
    getMedico,
    updateMedico,
    createMedico,
    deleteMedico
}
