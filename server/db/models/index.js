const User = require('./user')
const Activity = require('./activity')
const Adventure = require('./adventure')
const Note = require('./note')
const Poll = require('./poll')
const Pod = require('./pod')

Adventure.belongsTo(User, { as: 'coordinator' })
User.hasMany(Adventure)

Pod.hasMany(Adventure)
Adventure.belongsTo(Pod)

User.belongsToMany(Pod, { through: 'user_pods' })
Pod.belongsToMany(User, { through: 'user_pods' })

User.hasMany(Poll)
Poll.belongsTo(User)

Poll.belongsTo(Adventure)
Adventure.hasMany(Poll)

Adventure.hasMany(Activity)
Activity.belongsTo(Adventure)

Adventure.hasOne(Note)
Note.belongsTo(Adventure)

Note.belongsTo(User)
User.hasMany(Note)

module.exports = {
  User,
  Activity,
  Adventure,
  Note,
  Poll,
  Pod
};
