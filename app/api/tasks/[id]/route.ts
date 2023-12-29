import prisma from "@/base/lib/prisma/client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

type ParamsProps = {
  params: { id: string };
};
export async function DELETE(req: Request, { params }: ParamsProps) {
  try {
    const { userId } = auth();
    const { id } = params;

    if (!userId)
      return NextResponse.json({
        error: "Not authorized to delete",
        status: 401,
      });

    const task = await prisma.task.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("Error deleting task:", error);
    return NextResponse.json({
      error: "Failed! Could not delete task",
      status: 500,
    });
  }
}
