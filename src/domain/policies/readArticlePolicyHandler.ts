import { AppAbility } from "src/casl/casl-ability.factory/casl-ability.factory";
import { Article } from "../entities/article.entity";
import { Action } from "../enums/actions.enum";
import { IPolicyHandler } from "./handler.policies";

export class ReadArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, Article);
  }
}
