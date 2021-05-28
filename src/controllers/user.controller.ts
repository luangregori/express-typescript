import { Get, Route, Tags,  Post, Body, Path } from "tsoa";
import * as Yup from 'yup';
import { getUsers, createUser, getUserbyEmail, checkPassword } from '../repositories/user.repository'
import { getToken } from '../repositories/session.repository'
import { badRequestError } from '../helpers/httpHelper'
import { User } from '../models'
import { TokenJWT } from '../interface/token.interface'
import { IUserPayload } from '../interface/user.interface'

@Route("users")
@Tags("User")
export default class UserController {
  @Get("/")
  public async getUsers(): Promise<Array<User>> {
    return getUsers()
  }

  @Post("/")
  public async createUser(@Body() body: IUserPayload): Promise<TokenJWT> {
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
    const { id, name, email } = await createUser(body)
    
    return getToken({ id, name, email })
  }

  @Post("/login")
  public async login(@Body() body: IUserPayload):Promise<TokenJWT> {
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

    const isValidPassword = await checkPassword(body.password, userExists.id);

    if (!isValidPassword) {
      return badRequestError('Password does not match')
    }

    const { id, name, email } = userExists;

    return getToken({ id, name, email })
  }
}