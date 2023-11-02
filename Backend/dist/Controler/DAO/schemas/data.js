"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.category3 = exports.category2 = exports.category1 = exports.content3 = exports.content2 = exports.content1 = exports.product3 = exports.product2 = exports.product1 = exports.user4 = exports.user3 = exports.user2 = exports.user1 = void 0;
const DTOUser_1 = require("../../DTO/DTOUser");
const DTOProduct_1 = require("../../DTO/DTOProduct");
const DTOContent_1 = require("../../DTO/DTOContent");
const DTOCategory_1 = require("../../DTO/DTOCategory");
/*------------------------------------------
    * Data for Users
-------------------------------------------*/
exports.user1 = new DTOUser_1.DTOUser(1, "user", [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 2 },
]);
exports.user2 = new DTOUser_1.DTOUser(2, "user2", [
    { productId: "1", quantity: 1 },
    { productId: "2", quantity: 2 },
    { productId: "3", quantity: 3 },
]);
exports.user3 = new DTOUser_1.DTOUser(3, "user3", [
    { productId: "1", quantity: 1 },
    { productId: "2", quantity: 2 },
    { productId: "3", quantity: 3 },
]);
exports.user4 = new DTOUser_1.DTOUser(1, "user1", [
    { productId: "1", quantity: 1 },
    { productId: "2", quantity: 2 },
    { productId: "3", quantity: 3 },
]);
/*------------------------------------------
    * Data for Products
-------------------------------------------*/
exports.product1 = new DTOProduct_1.DTOProduct("1", "product1", 100, 1, 1);
exports.product2 = new DTOProduct_1.DTOProduct("2", "product2", 200, 2, 2);
exports.product3 = new DTOProduct_1.DTOProduct("3", "product3", 300, 3, 3);
/*------------------------------------------
    * Data for Contents
-------------------------------------------*/
exports.content1 = new DTOContent_1.DTOContent(1, "Content 1", "This is the first content.", new Date(2023, 0, 15), // January 15, 2023
"image1.jpg", "Category A", ["tag1", "tag2"]);
exports.content2 = new DTOContent_1.DTOContent(2, "Content 2", "A different content.", new Date(2023, 3, 8), // April 8, 2023
"image2.jpg", "Category B", ["tag3", "tag4"]);
exports.content3 = new DTOContent_1.DTOContent(3, "Content 3", "Yet another content.", new Date(2023, 6, 21), // July 21, 2023
"image3.jpg", "Category C", ["tag5", "tag6"]);
/*------------------------------------------
    * Data for Purchase
-------------------------------------------*/
// export const purchase1 = new DTOPurchase(
//   1,
//   "Purchase details for user 1",
//   [
//     { productId: "1", quantity: 1 },
//     { productId: "2", quantity: 2 },
//     { productId: "3", quantity: 3 },
//   ],
//   "Voucher123",
//   new Date(2023, 0, 15), // January 15, 2023
//   "123 Main St, City A",
//   5.99,
//   1 // UserID 1
// );
// export const purchase2 = new DTOPurchase(
//   2,
//   "Purchase details for user 2",
//   [
//     { productId: "1", quantity: 1 },
//     { productId: "2", quantity: 2 },
//     { productId: "3", quantity: 3 },
//   ],
//   "Voucher456",
//   new Date(2023, 3, 8), // April 8, 2023
//   "456 Elm St, City B",
//   7.99,
//   2 // UserID 2
// );
// export const purchase3 = new DTOPurchase(
//   3,
//   "Purchase details for user 3",
//   [
//     { productId: "1", quantity: 1 },
//     { productId: "2", quantity: 2 },
//     { productId: "3", quantity: 3 },
//   ],
//   "Voucher789",
//   new Date(2023, 6, 21), // July 21, 2023
//   "789 Oak St, City C",
//   9.99,
//   3 // UserID 3
// );
/*------------------------------------------
    * Data for Categories
-------------------------------------------*/
exports.category1 = new DTOCategory_1.DTOCategory(1, "Category A", [
    { subcategoryId: 1, name: "Subcategory A1" },
    { subcategoryId: 2, name: "Subcategory A2" },
]);
exports.category2 = new DTOCategory_1.DTOCategory(2, "Category B", [
    { subcategoryId: 1, name: "Subcategory B1" },
    { subcategoryId: 2, name: "Subcategory B2" },
]);
exports.category3 = new DTOCategory_1.DTOCategory(3, "Category C", [
    { subcategoryId: 1, name: "Subcategory C1" },
    { subcategoryId: 2, name: "Subcategory C2" },
]);
