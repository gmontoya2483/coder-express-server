import { faker } from '@faker-js/faker'

export const generateRandomProduct = () => {
    return {
        id: faker.random.numeric(),
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        thumbnail: faker.image.abstract(60,60, true)
    }
}


export const generate_x_randomProducts = (x=10) => {
    let products = []
    for (let i = 1; i <= x; i++) {
        products.push({...generateRandomProduct(), id: i})
    }
    return products;
}
