

const { error } = require('console');
const express = require('express')
const fs = require('fs').promises
const path = require('path')

const app = express()
app.use(express.json());

const filePath = path.join(__dirname, "dishes.json");

async function readFile() {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data)
}

async function writeDishesFile(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

//  get
app.get("/dishes", async (req, res) => {
    try {
        const data = await readFile();
        res.json(data.dishes || [])
    } catch (error) {
        res.status(500).json({ error: "failed to fetch data" })
    }

})

// get by id 
app.get("/dishes/:id", async (req, res) => {
    try {
        const data = await readFile();
        const dishes = data.dishes
        const dishId = parseInt(req.params.id);

        const dish = dishes.find(d => d.id === dishId);
        if (!dish) return res.json(404).json({ error: "Dish not found" })

        res.json(dish)
    } catch (error) {
        res.status(404).json({ error: "failed to read data" })
    }
})

//post 
app.post("/dishes", async (req, res) => {

    try {
        const data = await readFile();

        // generate a unique id 
        const maxId = data.dishes.reduce((max, d) => Math.max(max, d.id), 0);
        const newDish = { id: maxId + 1, ...req.body }

        data.dishes.push(newDish);
        await writeDishesFile(data)
        res.status(201).json(newDish);
    } catch (error) {
        return res.status(404).json({ error: "failed to write" })
    }

})

//put-- path param
app.put("/dishes/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        // read DB
        const data = await readFile();
        const dishes = data.dishes;

        const dish = dishes.find(d => d.id === id);
        if (!dish) return res.status(404).json({ error: "Dish not found" });

        data.dishes = dishes.map(d => {
            if (d.id === id) {
                // merge existing dish with req.body
                return { ...d, ...req.body };
            }
            return d; // keep other dishes unchanged
        });

        await writeDishesFile(data);
        const updated = data.dishes.find(d => d.id === id);
        res.json(updated);

    } catch (error) {
        res.status(500).json({ error: "Failed to update dish" });
    }
});


//delete 
app.delete("/dishes/:id", async (req, res) => {
    try {
        const data = await readFile();
        const dishId = Number(req.params.id);

        const dish = data.dishes.find(d => d.id === dishId);
        if (!dish) {
            return res.status(404).json({ error: "Dish not found" });
        }

        data.dishes = data.dishes.filter(d => d.id !== dishId);

        await writeDishesFile(data);

        res.json({ message: "Dish deleted successfully", deletedDish: dish });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete dish" });
    }
});


// dish by name query param
app.get("/dish", async (req, res) => {
    console.log(req.query)
    let name = req.query.name

    let data = await readFile()
    let dishes = data.dishes
    let flag = true
    dishes.forEach((el, i) => {
        if (el.name.includes(name)) {
            flag = false
            res.json({ msg: "dish", dishes: el })
        }
    })
    if (flag == true) {
        res.json({ msg: "not found" })
    }
})








app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});







app.listen(3000, (req, res) => {
    console.log("The server is running of port 3000")
})