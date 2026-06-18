const Sport = require('./Sport');
const Room = require('./Room');
const SportRoom = require('./SportRoom');
const ClassSchedule = require('./ClassSchedule');
const User = require('./User');

Sport.belongsToMany(Room, {
    through: SportRoom,
    foreignKey: 'sport_id',
    as: 'rooms'
});

Room.belongsToMany(Sport, {
    through: SportRoom,
    foreignKey: 'room_id',
    as: 'sports'
});

SportRoom.belongsTo(Sport, {
    foreignKey: 'sport_id',
    as: 'sport'
});

SportRoom.belongsTo(Room, {
    foreignKey: 'room_id',
    as: 'room'
});

SportRoom.belongsTo(User, {
    foreignKey: 'coach_id',
    as: 'coach'
});

SportRoom.hasMany(ClassSchedule, {
    foreignKey: 'sport_room_id',
    as: 'schedules'
});

ClassSchedule.belongsTo(SportRoom, {
    foreignKey: 'sport_room_id',
    as: 'sportRoom'
});

module.exports = {
    Sport,
    Room,
    SportRoom,
    ClassSchedule,
    User
};