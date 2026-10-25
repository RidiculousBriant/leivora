import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, X } from "lucide-react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  slug?: string;
};

const CART_STORAGE_KEY = "leivora-cart";

export default function CartDropdown() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function loadCart() {
      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        const parsed: unknown = savedCart ? JSON.parse(savedCart) : [];

        setCartItems(Array.isArray(parsed) ? parsed : []);
      } catch {
        setCartItems([]);
      }
    }

    function handleResize() {
      setIsMobile(window.innerWidth < 768);
      setIsOpen(false);
    }

    loadCart();
    handleResize();

    window.addEventListener("storage", loadCart);
    window.addEventListener("leivora-cart-change", loadCart);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("storage", loadCart);
      window.removeEventListener("leivora-cart-change", loadCart);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent | TouchEvent) {
      if (
        containerRef.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const totalItems = cartItems.reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0,
  );

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0,
  );

  function removeItem(id: string) {
    const updatedCart = cartItems.filter((item) => item.id !== id);

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      window.dispatchEvent(new Event("leivora-cart-change"));
    } catch {
      return;
    }
  }

  function handleCartClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (isMobile) {
      event.preventDefault();
      setIsOpen((open) => !open);
      return;
    }

    setIsOpen(false);
  }

  function handleMouseEnter() {
    if (!isMobile) {
      setIsOpen(true);
    }
  }

  function handleMouseLeave() {
    if (!isMobile) {
      setIsOpen(false);
    }
  }

  function closeAndNavigate(path: string) {
    setIsOpen(false);
    navigate(path);
  }

  return (
    <div
      ref={containerRef}
      className="relative z-[300] shrink-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to="/cart"
        aria-label={`Shopping cart with ${totalItems} items`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={handleCartClick}
        onFocus={() => {
          if (!isMobile) setIsOpen(true);
        }}
        className="relative flex size-10 items-center justify-center rounded-full text-zinc-900 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
      >
        <ShoppingCart className="size-5" strokeWidth={1.8} />

        {totalItems > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex min-w-5 items-center justify-center rounded-full bg-zinc-900 px-1 text-[10px] font-bold leading-5 text-white">
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
      </Link>

      {isOpen && isMobile && (
        <button
          type="button"
          aria-label="Close cart preview"
          className="fixed inset-0 z-[998] bg-black/20"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        aria-label="Shopping cart preview"
        className={[
          "z-[999] w-[min(24rem,calc(100vw-1rem))]",
          "transition-[opacity,visibility,transform] duration-200",
          isMobile
            ? [
                "fixed left-1/2 top-[4.5rem] -translate-x-1/2",
                "max-h-[calc(100dvh-5.5rem)]",
                isOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible translate-y-2 opacity-0 pointer-events-none",
              ].join(" ")
            : [
                "absolute right-0 top-full pt-2",
                isOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible translate-y-1 opacity-0 pointer-events-none",
              ].join(" "),
        ].join(" ")}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex max-h-[calc(100dvh-5.5rem)] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white text-zinc-900 shadow-2xl sm:max-h-[min(34rem,calc(100dvh-2rem))]">
          <div className="flex shrink-0 items-center justify-between border-b border-zinc-100 px-4 py-3 sm:px-5 sm:py-4">
            <div>
              <h3 className="text-sm font-bold sm:text-base">
                Your Shopping Cart
              </h3>
              <p className="mt-1 text-xs text-zinc-500">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </p>
            </div>

            <button
              type="button"
              aria-label="Close cart preview"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
            >
              <X className="size-4" />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="overflow-y-auto px-5 py-8 text-center sm:py-10">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-zinc-100 sm:size-14">
                <ShoppingCart className="size-6 text-zinc-500" />
              </div>

              <p className="mt-4 text-sm font-semibold">Your cart is empty</p>

              <p className="mt-1 text-xs text-zinc-500">
                Discover something worth adding.
              </p>

              <Link
                to="/shop"
                onClick={() => setIsOpen(false)}
                className="mt-5 inline-flex rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
              >
                Explore Products
              </Link>
            </div>
          ) : (
            <>
              <div className="min-h-0 flex-1 divide-y divide-zinc-100 overflow-y-auto overscroll-contain px-3 sm:px-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 py-3 sm:py-4">
                    <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-zinc-100 sm:size-16">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="size-full object-cover"
                        />
                      ) : (
                        <ShoppingCart className="size-5 text-zinc-400" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 break-words text-sm font-semibold">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-zinc-500">
                        Quantity: {item.quantity}
                      </p>

                      <p className="mt-1.5 text-sm font-bold">
                        ₱
                        {(
                          (Number(item.price) || 0) *
                          (Number(item.quantity) || 0)
                        ).toLocaleString("en-PH", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>

                    <button
                      type="button"
                      aria-label={`Remove ${item.name} from cart`}
                      onClick={() => removeItem(item.id)}
                      className="self-start rounded-full p-2 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="shrink-0 border-t border-zinc-100 bg-white p-3 sm:p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-zinc-500">Subtotal</span>

                  <span className="text-right text-base font-bold">
                    ₱
                    {subtotal.toLocaleString("en-PH", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => closeAndNavigate("/cart")}
                  className="mt-3 flex w-full items-center justify-center rounded-full bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 sm:mt-4"
                >
                  View Full Cart
                </button>

                <button
                  type="button"
                  onClick={() => closeAndNavigate("/shop")}
                  className="mt-2 flex w-full items-center justify-center rounded-full border border-zinc-200 px-4 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50"
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
