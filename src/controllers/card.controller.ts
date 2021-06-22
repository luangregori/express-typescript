import { Get, Route, Tags,  Post, Body, Delete } from "tsoa";
import * as Yup from 'yup';
import { Card, User } from '../models'
import { createCard, deleteCard, getCardbyUser } from '../repositories/card.repository';
// import { updateCard } from "../repositories/user.repository";
import { badRequestError } from '../helpers/httpHelper'
import { ICardPayload } from "../interface/card.interface";

@Route("card")
@Tags("Card")
export default class CardController {

  @Get("/:id")
  public async getCards(user: User): Promise<any> {
    const allCards= await getCardbyUser(user.id)

    // let default_card = user.default_card ? user.default_card.id : 0;

    // allCards.map((el, idx) => {
    //   if(el.id === default_card){
    //     allCards.splice(idx, 1);
    //   }
    // })

    // let merged = {
    //   default: user.default_card,
    //   all: allCards
    // }

    return allCards
  }

  @Post("/")
  public async createCard(@Body() body: ICardPayload): Promise<Card> {
    const schema = Yup.object().shape({
      number: Yup.string().required(),
      name: Yup.string().required(),
      due_date: Yup.string().required(),
      cvv: Yup.string().required().min(3).max(3),
      cpf: Yup.string().required(),
    });

    if (!(await schema.isValid(body))) {
      return badRequestError('Invalid argument')
    }

    const card = await createCard(body)

    // if(body.default){
    //   await updateCard(body.user.id, card)
    // }
    return card
  }

  @Delete('/')
  public async deleteCard(body: { user: any, cardId: number }): Promise<any> {
    // if(body.user.default_card.id === body.cardId){
    //   await updateCard(body.user.id)
    // }
    return deleteCard(body.cardId)
  }
}