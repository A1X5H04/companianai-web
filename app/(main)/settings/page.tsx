import SubscriptionButton from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";
import { Divider } from "@nextui-org/divider";
import React from "react";

async function SettingsPage() {
  const isProUser = await checkSubscription();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="pb-4">
        <h2 className="text-xl font-extrabold">Settings</h2>
        <p className="text-content1-foreground/50">
          Manage your account settings
        </p>
      </div>
      <Divider className="mb-6" />
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold">
          You are currently on the {isProUser ? "Pro" : "Free"} plan
        </h3>
        <SubscriptionButton isProUser={isProUser} />
      </div>
    </div>
  );
}

export default SettingsPage;
