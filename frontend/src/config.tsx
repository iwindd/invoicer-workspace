// routes
import HomePage from "./routes/home";
import SignInPage from "./routes/signin";
import { NavItemConfig } from "./types/nav";

export const routes = [
  { path: "/", element: <HomePage />, label: "หน้าแรก" },
  { path: "/signin", element: <SignInPage />, label: "เข้าสู่ระบบ" },
] ;

export const paths = {
  home: '/',
  signIn: '/signin',
  overview: '/dashboard',
  customers: '/customers',
  invoice: '/invoices',
  admin: '/admin',
  payment: '/payment'
} as const;

export const breadcrumbData = [
  { name: "home", path: '/', label: "หน้าแรก" },
  { name: "signin", path: '/auth/singin', label: "เข้าสู่ระบบ" },
  { name: "dashboard", path: '/', label: 'แดชบอร์ด' },
  { name: "customer", path: '/customers', label: 'ลูกค้า' },
  { name: "customer.detail", path: '/customers/:id', label: 'รายละเอียดลูกค้า' },
  { name: "customer.detail.invoice.detail", path: '/customers/:id/invoice/:iid', label: "รายละเอียดบิล"},
  { name: "invoices", path: '/invoices', label: 'บิลทั้งหมด' },
  { name: "invoices.invoice", path: '/invoices/:iid', label: 'รายละเอียดบิล' },
  { name: "admin", path: '/admin', label: 'แอดมิน' },
  { name: "admin.detail", path: '/admin/:id', label: 'รายละเอียดแอดมิน' },
  { name: "payment", path: '/payment', label: 'ช่องทางการชำระเงิน' },
] as {
  name: string,
  path: string,
  label: string
}[]


export const navItems = [
  {
    key: "overview",
    title: "ภาพรวม",
    href: "",

    icon: "chart-pie",
  },
  {
    key: "customers",
    title: "ลูกค้า",
    href: "",
    icon: "user",
    matcher: { type: "startsWith", href: "" },
  },
  {
    key: "invoices",
    title: "บิลทั้งหมด",
    href: "",
    icon: "invoice",
    matcher: { type: "startsWith", href: "" },
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
