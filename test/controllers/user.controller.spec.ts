import UserController from '../../src/controllers/user.controller'
import * as UserRepository from '../../src/repositories/user.repository'
// import {generateUsersData, generateUserPayload, generateUserData} from 'test/utils/generate'

afterEach(() => {
  jest.resetAllMocks()
})

describe("UserController", () => {
  describe("getUsers", () => {
    test("should return empty array", async () => {
      const spy = jest.spyOn(UserRepository, 'getUsers').mockResolvedValueOnce([])
      const controller = new UserController();
      const users = await controller.getUsers();
      expect(users).toEqual([])
      expect(spy).toHaveBeenCalledWith()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})