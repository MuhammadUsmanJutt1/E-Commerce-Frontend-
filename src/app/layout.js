import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ProductsProvider } from "@/context/ProductsContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CompareProvider } from "@/context/CompareContext";
import { AuthProvider } from "@/context/AuthContext";
import CartSidebar from "@/components/pages/common/cart-sidebar";

export const metadata = {
  title: "Funiro - Furniture E-commerce",
  description: "Shop the best furniture for your home",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AuthProvider>
          <ProductsProvider>
            <WishlistProvider>
              <CompareProvider>
                <CartProvider>
                  {children}
                  <CartSidebar />
                </CartProvider>
              </CompareProvider>
            </WishlistProvider>
          </ProductsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
