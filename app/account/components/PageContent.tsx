'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { postData } from "@/libs/helpers";
import Button from "@/components/Button";
import { AppRoutes, ApiRoutes } from "@/const";

function PageContent() {
  const router = useRouter();
  const subscribeModal = useSubscribeModal();
  const { user, subscription, isLoading } = useUser();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user ) router.replace(AppRoutes.Root);
  }, [isLoading, user, router]);

  const redirectToCustomerPortal = async () => {
    setLoading(true);

    try {
      const { url, data } = await postData({
        url: ApiRoutes.CreatePortalLink,
      });

      window.location.assign(url);
    } catch(error) {
      if (error) toast.error((error as Error).message);
    }

    setLoading(true);
  }

  return (
    <section className="px-6">
      <h2 className="sr-only">Subscription plan</h2>
      {!subscription && (
        <div className="flex flex-col gap-y-4">
          <p className="">No active plan</p>
          <Button
            className="w-[300px]"
            onClick={() => subscribeModal.onOpen()}
          >
            Subscribe
          </Button>
        </div>
      )}
      {subscription && (
        <div className="flex flex-col gap-y-4">
          <p>You are currently on the <b>{subscription?.prices?.products?.name}</b> plan</p>
          <Button
            className="w-[300px]"
            onClick={redirectToCustomerPortal}
            disabled={loading || isLoading}
          >
            Open customer portal
          </Button>
        </div>
      )}
    </section>
  );
}

export default PageContent;