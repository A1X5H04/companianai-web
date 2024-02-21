import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const isPro = await checkSubscription();
    const { name, description, categoryId, imageSrc, instruction, seed } = body;

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      !name ||
      !description ||
      !instruction ||
      !seed ||
      !imageSrc ||
      !categoryId
    ) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    if (!isPro) {
      return new NextResponse("Pro Subsciption Required", { status: 403 });
    }

    const companion = await prismadb.companion.create({
      data: {
        userId: user.id,
        userName: user.firstName,
        name,
        description,
        instruction,
        imageSrc,
        seed,
        categoryId,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
