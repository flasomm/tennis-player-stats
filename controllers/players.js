/**
 * @author  Fabrice Sommavilla <fs@physalix.com>
 * @date    09/09/2019
 */

const fs = require('fs');
const path = require('path');
const dataFilePath = require('../data/headtohead.json');

/**
 * GET /players
 * Get all players.
 */
exports.getAll = (req, res) => res.send(dataFilePath.players.sort((a, b) => a.id - b.id));

/**
 * GET /players/:id
 * Get player by id.
 */
exports.getById = (req, res) => {
    const player = dataFilePath.players.filter(player => player.id === parseInt(req.params.id));
    if (!player.length) {
        return res.status(404).json({message: `Player ${req.params.id} not found`});
    }
    res.send(player[0]);
};

/**
 * DELETE /players
 * Delete player.
 */
exports.delete = (req, res) => {
    const removeIndex = dataFilePath.players.findIndex(player => player.id === parseInt(req.params.id));

    if (removeIndex === -1) {
        return res.status(404).json({message: `Player ${req.params.id} not found`});
    }
    dataFilePath.players.splice(removeIndex, 1);

    try {
        fs.writeFileSync(`${path.resolve(__dirname)}/../data/headtohead.json`, JSON.stringify(dataFilePath));
    } catch (err) {
        return res.status(500).json({message: `Error writing data ${err}`});
    }

    res.send(`Player ${req.params.id} deleted with success`);
};
