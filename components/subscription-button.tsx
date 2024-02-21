"use client";

import { Button } from "@nextui-org/button";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

function SubscriptionButton({ isProUser }: { isProUser: boolean }) {
  const [loading, setIsLoading] = React.useState(false);

  const onSubscribe = async () => {
    setIsLoading(true);
    try {
      axios.get("/api/stripe").then((response) => {
        window.location.href = response.data.url;
      });
    } catch (error) {
      toast.error("Something went wrong!.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      isLoading={loading}
      onClick={onSubscribe}
      color={isProUser ? "secondary" : "primary"}
      className="font-bold"
    >
      {isProUser ? "Manage Subscription" : "Upgrade"}
    </Button>
  );
}

export default SubscriptionButton;
