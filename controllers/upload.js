const fs = require('fs');
const CombinedStream = require('combined-stream');
const axios = require('axios');

const URL_MDATAPROCESSOR = require('../constants.js').URL_MDATAPROCESSOR;

const loadFileFromLocal = async (req, res) => {

    try {

        const filePath = 'files/test.txt';
        const filePathplus = 'files/testplus.txt';

        const { repeat } = req.params;

        console.log(`repeat: ${repeat}`);

        let i = 1;

        if (repeat) {
            i = repeat;
        }

        const combinedStream = CombinedStream.create();

        for (let j = 0; j < i; j++) {
            combinedStream.append(fs.createReadStream(filePath));
        }

        combinedStream.pipe(fs.createWriteStream(filePathplus)).
            on('finish', () => {

                const readableStream = fs.createReadStream(filePathplus);

                readableStream.on('open', function () {
                    console.log('The file is open');
                });

                readableStream.on('error', function (error) {
                    console.log(`error: ${error.message}`);
                })

                readableStream.on('data', (chunk) => {

                    console.log(chunk);
                    const formData = new FormData()
                    formData.append('mystream', chunk)

                    try {
                        axios.post(URL_MDATAPROCESSOR, formData);

                        res.status(200).json('success');
                    } catch (error) {
                        res.status(404).json({ message: error.message });
                    }

                })
            })

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const loadFileFromCustom = async (req, res) => {
    try {

        res.status(200).json('success');
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = { loadFileFromLocal, loadFileFromCustom }; 