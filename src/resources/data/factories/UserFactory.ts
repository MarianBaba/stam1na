import { faker } from '@faker-js/faker';
import { User } from '@resources/data/types/user/User';
import { Title } from '@enums/Title';
import { Country } from '@enums/Country';

export class UserFactory {
  static create(): User {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
      id: faker.string.uuid(),
      title: faker.helpers.arrayElement([Title.MR, Title.MRS]),
      firstName,
      lastName,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      password: faker.internet.password(),
      birthDay: faker.number.int({ min: 1, max: 28 }).toString(),
      birthMonth: faker.number.int({ min: 1, max: 12 }).toString(),
      birthYear: faker.number.int({ min: 1950, max: 2003 }).toString(),
      company: faker.company.name(),
      address1: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      country: faker.helpers.arrayElement([
        Country.UNITED_STATES,
        Country.CANADA,
        Country.AUSTRALIA,
        Country.INDIA,
        Country.ISRAEL,
        Country.NEW_ZEALAND,
        Country.SINGAPORE,
      ]),
      state: faker.location.state(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      mobileNumber: faker.phone.number(),
    };
  }
}
