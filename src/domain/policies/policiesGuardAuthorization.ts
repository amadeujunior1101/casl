import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import {
  AppAbility,
  CaslAbilityFactory,
} from "src/casl/casl-ability.factory/casl-ability.factory";
import { CHECK_POLICIES_KEY, PolicyHandler } from "./handler.policies";

@Injectable()
export class PoliciesGuardAuthorization implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler()
      ) || [];

    const { body } = context.switchToHttp().getRequest();
    const ability = this.caslAbilityFactory.createForUser(body.user);

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability)
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === "function") {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
