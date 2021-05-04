import { Get, Route, Tags,  Post, Body, Path } from "tsoa";
import * as Yup from 'yup';
import { getUsers, createUser, IUserPayload, getUserbyEmail, checkPassword } from '../repositories/user.repository'
import { getToken } from '../repositories/session.repository'
import { badRequestError } from '../helpers/httpHelper'
import { User } from '../models'

@Route("users")
@Tags("User")
export default class UserController {
  @Get("/")
  public async getUsers(): Promise<Array<User>> {
    return getUsers()
  }

  @Post("/")
  public async createUser(@Body() body: IUserPayload): Promise<User> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(body))) {
      return badRequestError('Invalid argument')
    }

    const userExists = await getUserbyEmail(body.email);

    if (userExists) {
      return badRequestError('User already exists')
    }
    return createUser(body)
  }

  @Post("/login")
  public async login(@Body() body: IUserPayload) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(body))) {
      return badRequestError('Invalid argument')
    }

    const userExists = await getUserbyEmail(body.email)

    if (!userExists) {
      return badRequestError('User not found')
    }

    const isValidPassword = await checkPassword(body.password, userExists.password_hash);

    if (!isValidPassword) {
      return badRequestError('Password does not match')
    }

    const { id, name, email } = userExists;

    return getToken({ id, name, email })
  }

  // @Get("/:id")
  // public async getUser(@Path() id: string): Promise<User | null> {
  //   return getUser(Number(id))
  // }
}