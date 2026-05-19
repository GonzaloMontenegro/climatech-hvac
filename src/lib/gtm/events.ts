import { CartItem } from '../store/cartStore';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

const pushEvent = (eventData: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventData);
  }
};

export const trackAddToCart = (item: CartItem) => {
  pushEvent({
    event: 'add_to_cart',
    ecommerce: {
      currency: 'CLP',
      value: item.precioCLP,
      items: [{
        item_id: item.sku,
        item_name: item.nombre,
        price: item.precioCLP,
        quantity: item.cantidad
      }]
    }
  });
};

export const trackPurchase = (items: CartItem[], transactionId: string, valueCLP: number) => {
  pushEvent({
    event: 'purchase',
    ecommerce: {
      transaction_id: transactionId,
      currency: 'CLP',
      value: valueCLP,
      items: items.map(i => ({
        item_id: i.sku,
        item_name: i.nombre,
        price: i.precioCLP,
        quantity: i.cantidad
      }))
    }
  });
};
