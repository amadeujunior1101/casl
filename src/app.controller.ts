import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthorizationGuard } from "./domain/policies/authorizationGuard";
import { CheckPolicies } from "./domain/policies/handler.policies";
import { PoliciesGuardAuthorization } from "./domain/policies/policiesGuardAuthorization";
import { ReadArticlePolicyHandler } from "./domain/policies/readArticlePolicyHandler";

@Controller("casl")
export class AppController {
  constructor() // private readonly ability: Ability,
  // private readonly postService: PostService,
  // private readonly appService: AppService,
  {}

  // @Authorize("create", "Post") // Aplicando o decorador de autorização
  @Post()
  @UseGuards(AuthorizationGuard)
  // @UseGuards(PoliciesGuard)
  async create(@Body() createPostDto) {
    console.log("create...", createPostDto);
  }

  @Get()
  @UseGuards(PoliciesGuardAuthorization)
  @CheckPolicies(new ReadArticlePolicyHandler())
  // @UseGuards(AuthorizationGuard)
  // @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Article))
  // @CheckAbilities({ action: Action.Read, subject: User })
  findAll() {
    console.log("findAll...");
    // return this.articlesService.findAll();
  }
}
