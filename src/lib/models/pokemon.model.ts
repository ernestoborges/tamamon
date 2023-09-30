import mongoose from 'mongoose'

const PokemonSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    specie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pokedex",
        require: true
    },
    lv: {
        type: Number,
        require: true,
        min: 1,
        max: 100
    },
    is_shiny: {
        type: Boolean,
        require: true
    },
    is_egg: {
        type: Boolean,
        require: true
    },
    wh_scalar: {
        height: {
            type: Number,
            min: 0,
            max: 255,
            required: true
        },
        weight: {
            type: Number,
            min: 0,
            max: 255,
            required: true
        }
    },
    ivs: {
        hp: {
            type: Number,
            min: 0,
            max: 31,
            require: true
        },
        atk: {
            type: Number,
            min: 0,
            max: 31,
            require: true
        },
        def: {
            type: Number,
            min: 0,
            max: 31,
            require: true
        },
        sp_atk: {
            type: Number,
            min: 0,
            max: 31,
            require: true
        },
        sp_def: {
            type: Number,
            min: 0,
            max: 31,
            require: true
        },
        speed: {
            type: Number,
            min: 0,
            max: 31,
            require: true
        },
    },
    evs: {
        hp: {
            type: Number,
            min: 0,
            max: 255,
            require: true
        },
        atk: {
            type: Number,
            min: 0,
            max: 255,
            require: true
        },
        def: {
            type: Number,
            min: 0,
            max: 255,
            require: true
        },
        sp_atk: {
            type: Number,
            min: 0,
            max: 255,
            require: true
        },
        sp_def: {
            type: Number,
            min: 0,
            max: 255,
            require: true
        },
        speed: {
            type: Number,
            min: 0,
            max: 255,
            require: true
        },
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    prevOwners: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
},
    { timestamps: true }
)

const Pokemon = mongoose.models.Pokemon || mongoose.model('Pokemon', PokemonSchema);

export default Pokemon;