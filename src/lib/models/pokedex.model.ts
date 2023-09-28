import mongoose from 'mongoose'

const PokedexSchema = new mongoose.Schema({

    id: {
        type: Number
    },
    name: {
        type: String
    },
    base_experience: {
        type: Number
    },
    heght: {
        type: Number
    },
    weight: {
        type: Number
    },
    stats: [
        {
            name: { type: String },
            base_stat: { type: Number },
            effort: { type: Number },
        }
    ],
    types: [
        {
            slot: { type: Number },
            name: { type: String },
        }
    ],
    abilities: [
        {
            slot: { type: Number },
            name: { type: String },
            is_hidden: { type: Boolean },
        }
    ]
}
)

const Pokedex = mongoose.models.Pokedex || mongoose.model('Pokedex', PokedexSchema);

export default Pokedex;