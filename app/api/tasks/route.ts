import prisma from "@/base/lib/prisma/client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId)
      return NextResponse.json({
        error: "User is not authorized",
        status: 401,
      });

    const { title, description, date, done, priority } = await req.json();

    if (!title || !description || !date)
      return NextResponse.json({
        error: "Missing required fields",
        status: 400,
      });

    if (title?.length < 3)
      return NextResponse.json({
        error: "Title must have at least 3 characters",
        status: 400,
      });

    const task = await prisma.task.create({
      data: {
        title,
        date,
        description,
        isDone: done,
        isPriority: priority,
        userId,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("Error creating task:", error);
    return NextResponse.json({
      error: "Could not create task!",
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId)
      return NextResponse.json({
        error: "User is not authorized",
        status: 401,
      });

    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.log("Error getting task:", error);
    return NextResponse.json({
      error: "Could not get task1",
      status: 500,
    });
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = auth();

    if (!userId)
      return NextResponse.json({
        error: "User is not authorized",
        status: 401,
      });

    const { id, isDone, title, description, priority } = await req.json();

    const updateTask = await prisma.task.update({
      where: {
        id,
      },
      data: {
        isDone,
        title,
        description,
        isPriority: priority,
      },
    });

    return NextResponse.json(updateTask);
  } catch (error) {
    console.log("Error updating task:", error);
    return NextResponse.json({
      error: "Could not update task!",
      status: 500,
    });
  }
}
