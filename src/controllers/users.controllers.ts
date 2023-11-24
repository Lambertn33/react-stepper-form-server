import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

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
  try {
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    const existingPhone = await prisma.user.findUnique({
      where: { phone },
    });

    if (existingEmail) {
      return res.status(400).json({ error: "email already exists" });
    }

    if (existingPhone) {
      return res.status(400).json({ error: "phone already exists" });
    }

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
