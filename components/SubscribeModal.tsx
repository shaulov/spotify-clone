import { useState } from "react";
import toast from "react-hot-toast";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripeClient";
import { useUser } from "@/hooks/useUser";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import Modal from "./Modal";
import Button from "./Button";
import { Price, ProductWithPrice } from "@/types";
import { ApiRoutes } from "@/const";

interface SubscribeModalProps {
  products: ProductWithPrice[];
}

const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100);

  return priceString;
}

function SubscribeModal({ products }: SubscribeModalProps) {
  const { isOpen, onClose } = useSubscribeModal();
  const { user, isLoading, subscription } = useUser(); 
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const handleChange = (open: boolean) => {
    if (!open) {
      onClose();
    } 
  }

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return toast.error('Must be logged in');
    }

    if (subscription) {
      setPriceIdLoading(undefined);
      return toast('Already subscribed');
    }

    try {
      const { sessionId } = await postData({
        url: ApiRoutes.CreateCheckoutSession,
        data: { price }
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch(error) {
      toast.error((error as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  }

  let content = (
    <p className="text-center">No products avaliable</p>
  );

  if (products.length) {
    content = (
      <ul>
        {products.map((product) => {
          if (!product.prices?.length) {
            return (
              <li className="" key={product.id}>No prices avaliable</li>
            );
          }

          return product.prices.map((price) => (
            <li className="mb-4" key={product.id}>
              <Button 
                onClick={() => handleCheckout(price)}
                disabled={isLoading || price.active === priceIdLoading}
              >
                {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
              </Button>
            </li>
          ));
        })}
      </ul>
    )
  }

  if (subscription) {
    content = (<p className="text-center">Already subscribed</p>);
  }

  return (
    <Modal
      title="Only for premium users"
      description="Listen music with Spotify Premium"
      isOpen={isOpen}
      onChange={handleChange}
    >
      {content}
    </Modal>
  );
}

export default SubscribeModal;