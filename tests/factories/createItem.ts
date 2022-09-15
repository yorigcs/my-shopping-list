import {faker} from "@faker-js/faker";
import { TItemData } from "../../src/types/ItemsTypes";

export function createItem (): TItemData {
  const item: TItemData = {
    title: faker.name.fullName(),
    amount: parseInt(faker.random.numeric()),
    description: faker.random.alpha(),
    url: faker.internet.url()
    
  };

 return item
} 