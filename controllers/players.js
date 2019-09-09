/**
 * @author  Fabrice Sommavilla <fs@physalix.com>
 * @date    09/09/2019
 */

const fs = require('fs');
const path = require('path');

const readData = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(`${path.resolve(__dirname)}/../data/headtohead.json`, 'utf8', (err, content) => {
            if (err) {
                reject(err)
            } else {
                try {
                    resolve(JSON.parse(content));
                } catch (err) {
                    reject(err)
                }
            }
        })
    });
};

/**
 * GET /players
 * Get all players.
 */
exports.getAll = (req, res) => {
    readData()
        .then(data => {
            res.send(data.players.sort((a, b) => a.id - b.id));
        })
        .catch(err => res.status(500).json({message: err}));
};

/**
 * GET /players/:id
 * Get player by id.
 */
exports.getById = (req, res) => {
    readData()
        .then(data => {
            const player = data.players.filter(player => player.id === parseInt(req.params.id));
            if (!player.length) {
                return res.status(404).json({message: `Player ${req.params.id} not found`});
            }
            res.send(player[0]);
        })
        .catch(err => res.status(500).json({message: err}));
};

/**
 * DELETE /players
 * Delete player.
 */
exports.delete = (req, res) => {
    readData()
        .then(data => {
            const removeIndex = data.players.findIndex(player => player.id === parseInt(req.params.id));

            if (removeIndex === -1) {
                return res.status(404).json({message: `Player ${req.params.id} not found`});
            }
            data.players.splice(removeIndex, 1);
            fs.writeFileSync(`${path.resolve(__dirname)}/../data/headtohead.json`, JSON.stringify(data));

            res.send(`Player ${req.params.id} deleted with success`);
        })
        .catch(err => res.status(500).json({message: err}));
};
