import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

import { validationResult } from "express-validator";

const prisma = new PrismaClient();

interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  courses: string[];
}

// get all users
export const GET = async (_: Request, res: Response) => {
  const users = await prisma.user.findMany();
  return res.status(200).json({ users });
};

// create user
export const POST = async (req: Request, res: Response) => {
  const { courses, email, firstName, lastName, phone }: User = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        courses,
        email,
        firstName,
        lastName,
        phone,
      },
    });
    return res
      .status(201)
      .json({ message: "new user created successfully", newUser });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
