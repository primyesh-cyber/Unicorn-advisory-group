import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  ScrollRestoration,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import AnimatedBackground from "./components/AnimatedBackground";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import TickerTape from "./components/TickerTape";
import AdminDashboard from "./pages/AdminDashboard";
import Advisors from "./pages/Advisors";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Markets from "./pages/Markets";
import Pricing from "./pages/Pricing";
import Services from "./pages/Services";

const rootRoute = createRootRoute({
  component: () => (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.07 0.02 265)", position: "relative" }}
    >
      <ScrollRestoration />
      <AnimatedBackground />
      <div style={{ position: "relative", zIndex: 10 }}>
        <TickerTape />
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "oklch(0.12 0.025 265)",
            border: "1px solid oklch(0.82 0.22 155 / 0.3)",
            color: "oklch(0.9 0.02 265)",
          },
        }}
      />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: Services,
});
const marketsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/markets",
  component: Markets,
});
const advisorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/advisors",
  component: Advisors,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});
const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pricing",
  component: Pricing,
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminDashboard,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  servicesRoute,
  marketsRoute,
  advisorsRoute,
  contactRoute,
  pricingRoute,
  adminRoute,
]);

const router = createRouter({
  routeTree,
  scrollRestoration: true,
  defaultViewTransition: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
