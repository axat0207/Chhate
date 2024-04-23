import { faker } from "@faker-js/faker";
import User from "../models/user.js";

export const createFakeUser = async (n) => {
 try {
     const userPromise = [];
     for (let i = 0; i < n; i++) {
       const tempUser = User.create({
         fullName: faker.person.fullName(),
         username: faker.internet.userName(),
         email: faker.internet.email(),
         bio: faker.lorem.sentences(10),
         password: "password",
         avatar: {
           url: faker.image.avatar(),
           public_id: faker.system.fileName(),
         },
       });
       userPromise.push(tempUser);
     }
     await Promise.all(userPromise)
     console.log("user created")
     process.exit(1);
 } catch (error) {
    console.log(error.message);
    process.exit(1);
 }
};
