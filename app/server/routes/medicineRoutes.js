module.exports = app => {
    app.post('myprescription/medicine/new', async (req, res) => {
        console.log('New medicine');
    });

    app.get('myprescription/medicine/:id', async (req, res) => {
        console.log('Get medicine');
    });

    app.get('myprescription/medicines', async (req, res) => {
        console.log('Get All medicine');
    });
}
