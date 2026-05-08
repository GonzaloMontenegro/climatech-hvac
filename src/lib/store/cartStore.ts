import { create } from 'zustand';

export interface CartItem {
  id: string;
  sku: string;
  nombre: string;
  precioCLP: number;
  tipo: 'equipo' | 'servicio';
  cantidad: number;
  serviciosAsignados?: {
    servicioId: string;
    nombre: string;
    precioCLP: number;
  }[];
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  addServiceToItem: (itemId: string, servicioId: string, nombre: string, precioCLP: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) => set((state) => {
    const existing = state.items.find(i => i.id === item.id);
    if(existing) {
      return { items: state.items.map(i => i.id === item.id ? { ...i, cantidad: i.cantidad + item.cantidad } : i) };
    }
    return { items: [...state.items, item] };
  }),
  addServiceToItem: (itemId, servicioId, nombre, precioCLP) => set((state) => ({
    items: state.items.map(i => {
      if (i.id === itemId) {
        const serv = i.serviciosAsignados || [];
        if(serv.find(s => s.servicioId === servicioId)) return i; 
        return { ...i, serviciosAsignados: [...serv, { servicioId, nombre, precioCLP }] };
      }
      return i;
    })
  })),
  clearCart: () => set({ items: [] }),
}));
