import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CaslModule } from "./casl/casl.module";
// import { PoliciesGuard } from "./domain/policies/policiesGuard";

@Module({
  imports: [CaslModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
