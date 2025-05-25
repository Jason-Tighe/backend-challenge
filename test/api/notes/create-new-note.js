let should
let agent
let mockData

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('note', () => {
    describe('create-new-note', () => {
      let globalAuth

      before(async () => {
        globalAuth = await mockData.mockAuthAndUser()
      })

      it('should fail with invalid auth', () => {
        return agent.client().get(`/user/${globalAuth.user}`).expect(401).promise()
      })

      it('should not create a note without content, userId, or title', () => {
        const noteData = {
            userId: globalAuth.user,
            title: '',
            message: ''
        }
        return agent
          .client()
          .post('/note')
          .set('authorization', globalAuth.token)
          .send(noteData)
          .expect(422)
          .promise()
      })

      it('should create a note for the current user', async () => {
        const noteData = {
          userId: globalAuth.user,
          title: 'Test Note',
          message: 'This is a test note.'
        }
        const notes = await agent
          .client()
          .post(`/note`)
          .set('authorization', globalAuth.token)
          .send(noteData)
          .expect(201)
          .promise()
        should.exist(notes)
      })
    })
  })
})