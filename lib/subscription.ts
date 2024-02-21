import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";

const DAY_IN_MS = 86400000;

export async function checkSubscription() {
  const { userId } = auth();

  if (!userId) return false;

  const userSubscription = await prismadb.userSubscription.findUnique({
    where: { userId },
    select: {
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
      stripeSubscrptionId: true,
    },
  });

  if (!userSubscription) return false;

  const isValidSubscription =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValidSubscription;
}
