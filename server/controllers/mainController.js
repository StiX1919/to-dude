module.exports = {
    getPeople: (req, res, next) => {
        const dbInstance = req.app.get('db');
        dbInstance.getUsers()
        .then( response => {
            return res.status(200).json(response)
        })
        .catch(console.log)
    },

    addPerson: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {name, pass} = req.params
        console.log(name, pass, 'req.params')

        dbInstance.addPerson([name, pass])
        .then( response => {
            dbInstance.getUsers().then( newRes => {
                return res.status(200).json(newRes)
                console.log(newRes)
            })
        })
    },

    deletePerson: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {name, pass} = req.params
        console.log(name, pass, 'req.params')

        dbInstance.deletePerson([name, pass])
        .then( response => {
            dbInstance.getUsers().then( newRes => {
                return res.status(200).json(newRes)
                console.log(newRes)
            })
        })
    },

    editName: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {newName, id} = req.body
        console.log(newName, 'req.params')

        dbInstance.editName([newName, id])
        .then( response => {
            dbInstance.getUsers().then( newRes => {
                return res.status(200).json(newRes)
                console.log(newRes)
            })
        })
    },
    
}