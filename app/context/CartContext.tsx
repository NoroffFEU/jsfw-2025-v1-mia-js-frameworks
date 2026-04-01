"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";

export interface CartLine {
  id: string;
  title: string;
  imageUrl?: string;
  unitPrice: number;
  listPrice?: number;
  quantity: number;
}

const CART_STORAGE_KEY = "cart";

function isCartLine(x: unknown): x is CartLine {
  if (x == null || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  const listOk =
    o.listPrice == null ||
    (typeof o.listPrice === "number" && Number.isFinite(o.listPrice));
  return (
    typeof o.id === "string" &&
    typeof o.title === "string" &&
    typeof o.unitPrice === "number" &&
    Number.isFinite(o.unitPrice) &&
    typeof o.quantity === "number" &&
    Number.isInteger(o.quantity) &&
    o.quantity >= 1 &&
    (o.imageUrl == null || typeof o.imageUrl === "string") && listOk
  );
}

function parseStoredCart(json: string): CartLine[] {
  try {
    const data = JSON.parse(json) as unknown[];
    if (!Array.isArray(data)) return [];
    return data.filter(isCartLine);
  } catch {
    return [];
  }
}

export function lineSubtotal(line: CartLine): number {
  return line.unitPrice * line.quantity;
}

export function lineSavings(line: CartLine): number {
  const list = line.listPrice ?? line.unitPrice;
  const perUnit = Math.max(0, list - line.unitPrice);
  return perUnit * line.quantity;
}

type CartAction =
  | {
      type: "ADD";
      productId: string;
      title: string;
      imageUrl?: string;
      unitPrice: number;
      listPrice: number;
    }
  | { type: "REMOVE"; productId: string }
  | { type: "SET_QTY"; productId: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "LOAD"; lines: CartLine[] };

function cartReducer(state: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case "LOAD":
      return action.lines;
    case "ADD": {
      const i = state.findIndex((line) => line.id === action.productId);
      if (i === -1) {
        return [
          ...state,
          {
            id: action.productId,
            title: action.title,
            imageUrl: action.imageUrl,
            unitPrice: action.unitPrice,
            listPrice: action.listPrice,
            quantity: 1,
          },
        ];
      }
      const next = [...state];
      next[i] = { ...next[i], quantity: next[i].quantity + 1 };
      return next;
    }
    case "REMOVE":
      return state.filter((line) => line.id !== action.productId);
    case "SET_QTY": {
      if (action.quantity < 1)
        return state.filter((line) => line.id !== action.productId);
      return state.map((line) =>
        line.id === action.productId
          ? { ...line, quantity: action.quantity }
          : line,
      );
    }
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export interface CartContextValue {
  lines: CartLine[];
  addItem: (payload: {
    productId: string;
    title: string;
    imageUrl?: string;
    unitPrice: number;
    listPrice: number;
  }) => void;
  removeLine: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
  totalSavings: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(cartReducer, []);

  const skipNextPersist = useRef(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const parsed = parseStoredCart(raw);
        dispatch({ type: "LOAD", lines: parsed });
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (skipNextPersist.current) {
      skipNextPersist.current = false;
      return;
    }
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
    } catch {}
  }, [lines]);

  const addItem = useCallback(
    (p: {
      productId: string;
      title: string;
      imageUrl?: string;
      unitPrice: number;
      listPrice: number;
    }) => dispatch({ type: "ADD", ...p }),
    [],
  );

  const removeLine = useCallback(
    (productId: string) => dispatch({ type: "REMOVE", productId }),
    [],
  );
  const setQuantity = useCallback(
    (productId: string, quantity: number) =>
      dispatch({ type: "SET_QTY", productId, quantity }),
    [],
  );

  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = lines.reduce((n, line) => n + line.quantity, 0);
    const total = lines.reduce(
      (n, line) => n + lineSubtotal(line),
      0,
    );
    const totalSavings = lines.reduce(
      (n, line) => n + lineSavings(line),
      0,
    );
    return {
      lines,
      addItem,
      removeLine,
      setQuantity,
      clearCart,
      itemCount,
      total,
      totalSavings,
    };
  }, [lines, addItem, removeLine, setQuantity, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

