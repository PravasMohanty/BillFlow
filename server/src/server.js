const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))


PORT = 5000
app.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT}`)}
)