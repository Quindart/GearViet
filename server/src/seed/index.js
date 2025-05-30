import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import { faker } from '@faker-js/faker';

import User from "../models/user.model.js";
import Product from '../models/product.model.js';
import Category from '../models/category.model.js';
import Subcategory from '../models/subcategory.model.js';

await mongoose.connect(`${process.env.DB_URL}`)

async function seedData() {
    await mongoose.connection.dropDatabase();
    const subcategories = [];
    for (let i = 0; i < 5; i++) {
        const sub = await Subcategory.create({
            name: faker.commerce.department().toLowerCase(),
        });
        subcategories.push(sub);
    }

    const categories = [];
    for (let i = 0; i < 5; i++) {
        const cat = await Category.create({
            name: faker.commerce.productAdjective().toLowerCase(),
            subcategory: [subcategories[i]._id],
        });
        categories.push(cat);
    }

    const users = [];
    for (let i = 0; i < 10; i++) {
        const user = await User.create({
            username: faker.internet.userName().toLowerCase(),
            password: faker.internet.password(10),
            name: faker.name.fullName(),
            phone: faker.phone.number("09########"),
            email: faker.internet.email(),
            gender: faker.name.sexType(),
        });
        users.push(user);
    }

    const products = [];
    for (let i = 0; i < 10; i++) {
        const prod = await Product.create({
            name: faker.commerce.productName().toLowerCase(),
            code: faker.datatype.uuid().slice(0, 10).toLowerCase(),
            images: [{ url: faker.image.imageUrl(), public_id: faker.datatype.uuid() }],
            price: faker.commerce.price(),
            available: faker.number.int({ min: 1, max: 100 }),
            description: faker.commerce.productDescription(),
            tags: [faker.commerce.productMaterial().toLowerCase()],
            brand: faker.company.name().toLowerCase(),
            selling: faker.number.int(100),
            subcategory: subcategories[Math.floor(Math.random() * subcategories.length)]._id,
            width: faker.number.int({ min: 10, max: 100 }),
            length: faker.number.int({ min: 10, max: 100 }),
            weight: faker.number.int({ min: 100, max: 1000 }),
            height: faker.number.int({ min: 10, max: 100 }),
        });
        products.push(prod);
    }
    console.log("✅ Seeded successfully!");
    mongoose.disconnect();
}

seedData().catch((err) => {
    console.error(err);
    mongoose.disconnect();
});
