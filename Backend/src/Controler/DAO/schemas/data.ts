import { DTOUser } from "../../DTO/DTOUser";
import { DTOProduct } from "../../DTO/DTOProduct";
import { DTOContent } from "../../DTO/DTOContent";
import { DTOCategory } from "../../DTO/DTOCategory";

/*------------------------------------------
    * Data for Users
-------------------------------------------*/
export const user1 = new DTOUser(1, "user", [
  { productId: 1, quantity: 1 },
  { productId: 2, quantity: 2 },
]);
export const user2 = new DTOUser(2, "user2", [
  { productId: "1", quantity: 1 },
  { productId: "2", quantity: 2 },
  { productId: "3", quantity: 3 },
]);
export const user3 = new DTOUser(3, "user3", [
  { productId: "1", quantity: 1 },
  { productId: "2", quantity: 2 },
  { productId: "3", quantity: 3 },
]);

export const user4 = new DTOUser(1, "user1", [
  { productId: "1", quantity: 1 },
  { productId: "2", quantity: 2 },
  { productId: "3", quantity: 3 },
]);

/*------------------------------------------
    * Data for Products
-------------------------------------------*/
export const product1 = new DTOProduct("1", "product1", 100, 1, 1);
export const product2 = new DTOProduct("2", "product2", 200, 2, 2);
export const product3 = new DTOProduct("3", "product3", 300, 3, 3);

/*------------------------------------------
    * Data for Contents
-------------------------------------------*/
export const content1 = new DTOContent(
  1,
  "Content 1",
  "This is the first content.",
  new Date(2023, 0, 15), // January 15, 2023
  "image1.jpg",
  "Category A",
  ["tag1", "tag2"]
);

export const content2 = new DTOContent(
  2,
  "Content 2",
  "A different content.",
  new Date(2023, 3, 8), // April 8, 2023
  "image2.jpg",
  "Category B",
  ["tag3", "tag4"]
);

export const content3 = new DTOContent(
  3,
  "Content 3",
  "Yet another content.",
  new Date(2023, 6, 21), // July 21, 2023
  "image3.jpg",
  "Category C",
  ["tag5", "tag6"]
);

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
export const category1 = new DTOCategory(1, "Category A", [
  { subcategoryId: 1, name: "Subcategory A1" },
  { subcategoryId: 2, name: "Subcategory A2" },
]);
export const category2 = new DTOCategory(2, "Category B", [
  { subcategoryId: 1, name: "Subcategory B1" },
  { subcategoryId: 2, name: "Subcategory B2" },
]);
export const category3 = new DTOCategory(3, "Category C", [
  { subcategoryId: 1, name: "Subcategory C1" },
  { subcategoryId: 2, name: "Subcategory C2" },
]);
