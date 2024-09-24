import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;
}
