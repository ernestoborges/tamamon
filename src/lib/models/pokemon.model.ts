import mongoose from 'mongoose'

const pokemonSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    pokemon_id: {
        type: Number,
        require: true
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
        atq: {
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
        spAtq: {
            type: Number,
            min: 0,
            max: 31,
            require: true
        },
        spDef: {
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

const Pokemon = mongoose.models.Pokemon || mongoose.model('Pokemon', pokemonSchema);

export default Pokemon;