const { SportRoom, Sport, Room, User } = require("../models");

async function findAll(filters = {}) {
    const where = {};

    if (filters.status !== undefined) {
        where.status = filters.status === 'true' || filters.status === true;
    }

    return SportRoom.findAll({
        where,
        include: [
            {
                model: Sport,
                as: "sport"
            },
            {
                model: Room,
                as: "room"
            },
            {
                model: User,
                as: "coach",
                attributes: ["id", "name", "email"]
            }
        ],
        order: [["created_at", "DESC"]]
    });
}