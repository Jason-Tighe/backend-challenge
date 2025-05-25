let should
let agent
let mockData

before(() => {
    should = require('should')
    agent = require('test/lib/agent')
    mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('user', () => {
    describe('user-id-check', () => {   
        let globalAuth
        let comparableUser 
        before(async () => {
            globalAuth = await mockData.mockAuthAndUser()
            comparableUser = await mockData.mockAuthAndUser()
        })

        it('should fail with invalid auth', () => {
            return agent.client().get(`/user/${globalAuth.user}`).expect(401).promise()
        })

        it('should fail to update since user must match the user id in the url', () => {
            return agent
                .client()
                .put(`/user/${comparableUser.user}`)
                .set('authorization', globalAuth.token)
                .send({email: 'test@test.com'})
                .expect(403)
                .promise()
        })

        it('should allow update since user must match the user id in the url', async () => {
            const updateData = {firstName: 'Updated', lastName: 'User'}
            const updatedUser = await agent
              .client()
              .put(`/user/${globalAuth.user}`)
              .set('authorization', globalAuth.token)
              .send(updateData)
              .expect(200)
              .promise()
            should.exist(updatedUser)
            updatedUser.firstName.should.equal(updateData.firstName)
            updatedUser.lastName.should.equal(updateData.lastName)
        })
    })
  })
})