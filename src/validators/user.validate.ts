import { body, ValidationChain } from "express-validator";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const validateUser: ValidationChain[] = [
  body("courses")
    .isArray()
    .withMessage("Courses must be an array of strings")
    .notEmpty()
    .withMessage("Courses cannot be empty"),

  body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .custom(async (email) => {
      const user = await prisma.user.findFirst({
        where: {
          email
        },
      });
      if (user) {
        throw new Error("email already in use");
      }
    }),

  body("firstName")
    .isString()
    .withMessage("First name must be a string")
    .notEmpty()
    .withMessage("First name cannot be empty"),

  body("lastName")
    .isString()
    .withMessage("Last name must be a string")
    .notEmpty()
    .withMessage("Last name cannot be empty"),

  body("phone")
    .isString()
    .withMessage("Phone must be a string")
    .custom(async (phone) => {
      const user = await prisma.user.findFirst({
        where: {
          phone,
        },
      });
      if (user) {
        throw new Error("phone already in use");
      }
    })
    .notEmpty()
    .withMessage("Phone cannot be empty"),
];
