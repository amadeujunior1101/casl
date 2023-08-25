import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { CaslAbilityFactory } from "src/casl/casl-ability.factory/casl-ability.factory";
import { Article } from "../entities/article.entity";
import { Action } from "../enums/actions.enum";

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly caslAbilityFactory: CaslAbilityFactory // private readonly ReadArticlePolicyHandler: ReadArticlePolicyHandler
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.body.user; // Extrai o objeto de usuário da solicitação

    const ability = this.caslAbilityFactory.createForUser(user);

    if (ability.can(Action.Manage, "all")) {
      console.log("Allowed");
      return true;
    } else if (
      ability.can(Action.Create, Article) ||
      // ability.can(Action.Read, User) ||
      ability.can(Action.Read, Article) ||
      ability.can(Action.Delete, Article)
    ) {
      console.log("Allowed");
      return true;
    } else {
      console.log("Denied");
      return false;
    }
  }
}
