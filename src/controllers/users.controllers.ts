import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  courses: string[];
}

// create user
export const POST = async (req: Request, res: Response) => {
  const { courses, email, firstName, lastName, phone }: User = req.body;
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
