import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ProductsProvider } from "@/context/ProductsContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CompareProvider } from "@/context/CompareContext";
import { AuthProvider } from "@/context/AuthContext";
import CartSidebar from "@/components/pages/common/cart-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Funiro - Furniture E-commerce",
  description: "Shop the best furniture for your home",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
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
