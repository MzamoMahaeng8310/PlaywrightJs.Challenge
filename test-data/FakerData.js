import { faker } from '@faker-js/faker';

const firstName = faker.person.firstName()
const lastName = faker.person.lastName();
const postalCode = faker.location.zipCode('#####');
const fullName = `${firstName} ${lastName}`;

console.log(`Generated User: ${fullName}, Postal Code: ${postalCode}`);

console.log(`The best song  of our time is :  ${faker.music.songName()}`)
export {firstName, lastName, postalCode, fullName};