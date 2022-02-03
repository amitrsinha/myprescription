module.exports = app => {
    app.post(
        '/myprescription/new', async(req, res) => {
            console.log('Creating new prescription');
        }
    );

    app.get('myprescription/patient/:id', async (req, res) => {
        console.log('Getting all prescription belong to patient');
    });
}
