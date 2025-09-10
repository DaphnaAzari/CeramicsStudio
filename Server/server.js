const express = require('express');
const app = express();

app.get('/', (req, res) => {
    console.log('Here')
    res.status(200).json({ message: "Welcome!" })
})
app.listen(3000,)