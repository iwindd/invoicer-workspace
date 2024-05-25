import Root from "./routes/root";
import { NavItemConfig } from "./types/nav";

// routes
import HomePage from "./routes/home";
import SignInPage from "./routes/signin";
import CustomerPage from "./routes/customer";
import InvoicePage from "./routes/invoice";
import CustomerDetailPage from "./routes/customer/detail";
import InvoiceDetailPage from "./routes/invoice/detail";

export const routes = [
  {
    path: "/",
    element: <Root />,
    label: "หน้าแรก",
    children: [
      { index: true, element: <HomePage />, label: "หน้าแรก" },
      { path: "/customers", element: <CustomerPage />, label: "ลูกค้า" },
      { path: "/customers/:customerId", element: <CustomerDetailPage/>, label: "รายละเอียดลูกค้า"},
      { path: "/invoices", element: <InvoicePage />, label: "บิล" },
      { path: "/invoices/:invoiceId", element: <InvoiceDetailPage/>, label: "รายละเอียดบิล"},
    ]
  },
  { path: "/signin", element: <SignInPage />, label: "เข้าสู่ระบบ" },

];

export const paths = {
  home: "/",
  signIn: "/signin",
  overview: "/dashboard",
  customers: "/customers",
  invoice: "/invoices",
  admin: "/admin",
  payment: "/payment",
} as const;

export const breadcrumbData = [
  { name: "home", path: "/", label: "หน้าแรก" },
  { name: "signin", path: "/auth/singin", label: "เข้าสู่ระบบ" },
  { name: "dashboard", path: "/", label: "แดชบอร์ด" },
  { name: "customer", path: "/customers", label: "ลูกค้า" },
  {
    name: "customer.detail",
    path: "/customers/:id",
    label: "รายละเอียดลูกค้า",
  },
  {
    name: "customer.detail.invoice.detail",
    path: "/customers/:id/invoice/:iid",
    label: "รายละเอียดบิล",
  },
  { name: "invoices", path: "/invoices", label: "บิลทั้งหมด" },
  { name: "invoices.invoice", path: "/invoices/:iid", label: "รายละเอียดบิล" },
  { name: "admin", path: "/admin", label: "แอดมิน" },
  { name: "admin.detail", path: "/admin/:id", label: "รายละเอียดแอดมิน" },
  { name: "payment", path: "/payment", label: "ช่องทางการชำระเงิน" },
] as {
  name: string;
  path: string;
  label: string;
}[];

export const navItems = [
  {
    key: "overview",
    title: "ภาพรวม",
    href: paths.home,
    icon: "chart-pie",
  },
  {
    key: "customers",
    title: "ลูกค้า",
    href: paths.customers,
    icon: "user",
    matcher: { type: "startsWith", href: paths.customers },
  },
  {
    key: "invoices",
    title: "บิลทั้งหมด",
    href: paths.invoice,
    icon: "invoice",
    matcher: { type: "startsWith", href: paths.invoice },
  },
] satisfies NavItemConfig[];

export const navCEO = [
  {
    key: "admin",
    title: "แอดมิน",
    href: "",
    icon: "admin",
    matcher: { type: "startsWith", href: "" },
  },
  { key: "payment", title: "ช่องทางการชำระเงิน", href: "", icon: "payment" },
] satisfies NavItemConfig[];
