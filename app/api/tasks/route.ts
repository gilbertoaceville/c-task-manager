import prisma from "@/base/lib/prisma/client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId)
      return NextResponse.json({
        error: "You are not authorized",
        status: 401,
      });

    const { title, description, date, completed, important } = await req.json();

    if (!title || !description || !date)
      return NextResponse.json({
        error: "Required fields not found",
        status: 400,
      });

    if (title?.length < 3)
      return NextResponse.json({
        error: "Title must have at least 3 characters",
        status: 400,
      });

    const task = prisma.task.create({
      data: {
        title,
        date,
        description,
        isCompleted: completed,
        isImportant: important,
        userId,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("Error creating task:", error);
    return NextResponse.json({
      error: "Failed! Could not create task",
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  try {
  } catch (error) {
    console.log("Error getting task:", error);
    return NextResponse.json({
      error: "Failed! Could not get task",
      status: 500,
    });
  }
}

export async function UPDATE(req: Request) {
  try {
  } catch (error) {
    console.log("Error updating task:", error);
    return NextResponse.json({
      error: "Failed! Could not update task",
      status: 500,
    });
  }
}

export async function DELETE(req: Request) {
  try {
  } catch (error) {
    console.log("Error deleting task:", error);
    return NextResponse.json({
      error: "Failed! Could not delete task",
      status: 500,
    });
  }
}
