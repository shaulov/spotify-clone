import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { ProductWithPrice } from "@/types";

const getActiveProducsWithPrices = async (): Promise<ProductWithPrice[]> => {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { foreignTable: 'prices' });

  if (error) console.log(error);

  return data || [];
}

export default getActiveProducsWithPrices;