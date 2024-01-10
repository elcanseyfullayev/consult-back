import express from 'express';
import mongoose, { Schema } from 'mongoose';
import 'dotenv/config'
import cors from 'cors'

const serviceSchema = new Schema({
    title: String,
    about: String,
    icon: String
});

const serviceModel = mongoose.model('services', serviceSchema);

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', async (req, res) => {
    try {
        const services = await serviceModel.find({});
        res.send(services)
    } catch (error) {
        res.send("Can't GET")
    }
})

app.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const services = await serviceModel.findById(id);
        res.send(services)
    } catch (error) {
        res.send("Can't GETbyID")
    }
})

app.post('/', async (req, res) => {
    try {
        const { title, about, icon } = req.body
        const newService = new serviceModel({ title, about, icon });
        await newService.save();
        res.send('Got a POST request')
    } catch (error) {
        res.send("Can't Post")
    }
})

app.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { title, about, icon } = req.body
        const services = await serviceModel.findByIdAndUpdate(id, { title, about, icon });
        res.send(services)
    } catch (error) {
        res.send("Can't Update")
    }
})

app.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const services = await serviceModel.findByIdAndDelete(id);
        res.send(services)
    } catch (error) {
        res.send("Can't Delete")
    }
})

mongoose.connect(process.env.DB_SECRET_KEY)
    .then(() => console.log('Connected!'))
    .catch(err => console.log("Not Connected!"));

app.listen(process.env.PORT , () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})

