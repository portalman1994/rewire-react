const express = require('express');
const cors = require('cors');
const app = express();

let corsOptions = {
    origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./src/models');
const Role = db.role;

db.sequelize.sync()
    .then(() => {
        console.log('DB has been synced successfully.');
    })
    .catch((err) => {
        console.log('DB sync failure: ' + err.message);
    })

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Rewire.' });
});

require('./src/routes/rewire.routes')(app);
require('./src/routes/auth.routes')(app);
require('./src/routes/user.routes')(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

