import {
  Ability,
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
  createMongoAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Article } from "src/domain/entities/article.entity";
import { RoleTypes, User } from "src/domain/entities/user.entity";
import { Action } from "src/domain/enums/actions.enum";

type Subjects = InferSubjects<typeof Article | typeof User> | "all";

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    // Permissões genéricas para todos os usuários
    // can(Action.Read, "all");

    if (user.role === RoleTypes.SysAdmin) {
      can(Action.Manage, "all");
    } else if (user.role === RoleTypes.Admin) {
      can(Action.Create, Article);
      // can(Action.Read, User);
      can(Action.Read, Article);
      can(Action.Delete, Article);
    } else if (user.role === RoleTypes.User) {
      can(Action.Read, User);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
