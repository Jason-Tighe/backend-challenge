const { Service } = require('app/modules/common')

class UserService extends Service {

    // Needed to add this since I was getting an error about userService.readAndUdpate not being a function
    async readAndUpdate(id, data) {
        const user = await this.findById(id)
        if (!user) {
            throw new Error('User not found')
        }
        Object.assign(user, data)
        return user.save()
    }
}

module.exports = UserService
