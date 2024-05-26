import Root from "./routes/root";
import { NavItemConfig } from "./types/nav";

// routes
import HomePage from "./routes/home";
import SignInPage from "./routes/signin";
import CustomerPage from "./routes/customer";
import InvoicePage from "./routes/invoice";
import CustomerDetailPage from "./routes/customer/detail";
import InvoiceDetailPage from "./routes/invoice/detail";
import AdminPage from "./routes/admin";
import AdminDetailPage from "./routes/admin/detail";
import PaymentPage from "./routes/payment";

export const routes = [
  {
    path: "/",
    element: <Root />,
    label: "หน้าแรก",
    children: [
      { index: true, element: <HomePage />, label: "หน้าแรก" },
      { path: "/customers", element: <CustomerPage />, label: "ลูกค้า" },
      { path: "/customers/:customerId", element: <CustomerDetailPage/>, loader: CustomerDetailPage.Loader, label: "รายละเอียดลูกค้า"},
      { path: "/customers/:customerId/:invoiceId", element: <InvoiceDetailPage/>, loader: InvoiceDetailPage.Loader, label: "รายละเอียดลูกค้า"},
      { path: "/invoices", element: <InvoicePage />, label: "บิล" },
      { path: "/invoices/:invoiceId", element: <InvoiceDetailPage/>, label: "รายละเอียดบิล"},
      { path: "/admin", element: <AdminPage/>, label: "แอดมิน"},
      { path: "/admin/:adminId", element: <AdminDetailPage/>, label: "รายละเอียดแอดมิน"},
      { path: "/payment", element: <PaymentPage/>, label: "ช่องทางการชำระเงิน"},
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
    href: paths.admin,
    icon: "admin",
    matcher: { type: "startsWith", href: paths.admin },
  },
  { key: "payment", title: "ช่องทางการชำระเงิน", href: paths.payment, icon: "payment" },
] satisfies NavItemConfig[];

export const banks = [
  { id: "002", eng_name: "Bangkok Bank Public Company Limited", thai_name: "ธนาคารกรุงเทพ จำกัด (มหาชน)", short_name: "BBL" },
  { id: "004", eng_name: "Kasikornbank Public Company Limited", thai_name: "ธนาคารกสิกรไทย จำกัด (มหาชน)", short_name: "KBANK" },
  { id: "006", eng_name: "Krung Thai Bank Public Company Limited", thai_name: "ธนาคารกรุงไทย จำกัด (มหาชน)", short_name: "KTB" },
  { id: "011", eng_name: "TMB Bank Public Company Limited", thai_name: "ธนาคารทหารไทย จำกัด (มหาชน)", short_name: "TMB" },
  { id: "014", eng_name: "Siam Commercial Bank Public Company Limited", thai_name: "ธนาคารไทยพาณิชย์ จำกัด (มหาชน)", short_name: "SCB" },
  { id: "017", eng_name: "Citibank N.A.", thai_name: "ซิตี้แบงก์", short_name: "CITI" },
  { id: "020", eng_name: "Standard Chartered Bank (Thai) Public Company Limited", thai_name: "ธนาคารสแตนดาร์ดชาร์เตอร์ด (ไทย) จำกัด (มหาชน)", short_name: "SCBT" },
  { id: "022", eng_name: "BANKTHAI Public Company Limited", thai_name: "บัวหลวง จำกัด (มหาชน)", short_name: "UOBT" },
  { id: "024", eng_name: "United Overseas Bank (Thai) PCL", thai_name: "ธนาคารยูโอบี จำกัด (มหาชน)", short_name: "UOBT" },
  { id: "025", eng_name: "Bank of Ayudhya Public Company Limited", thai_name: "ธนาคารกรุงศรีอยุธยา จำกัด (มหาชน)", short_name: "BAY" },
  { id: "030", eng_name: "Government Saving Bank", thai_name: "ธนาคารออมสิน", short_name: "GOV" },
  { id: "031", eng_name: "Hong Kong & Shanghai Corporation Limited", thai_name: "ฮ่องกงและซานเฟริส แบงก์", short_name: "HSBC" },
  { id: "033", eng_name: "Government Housing Bank", thai_name: "ธนาคารที่ดินและสินเชื่อเพื่อการเกษตร", short_name: "GHB" },
  { id: "034", eng_name: "Bank for Agriculture and Agricultural Cooperatives", thai_name: "ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร", short_name: "AGRI" },
  { id: "039", eng_name: "Mizuho Corporate Bank Limited", thai_name: "มิซูโฮ คอร์ปอเรท แบงก์ จำกัด", short_name: "MHCB" },
  { id: "065", eng_name: "Thanachart Bank Public Company Limited", thai_name: "ธนาคารธนชาต", short_name: "TBANK" },
  { id: "066", eng_name: "Islamic Bank of Thailand", thai_name: "ธนาคารอิสลาม", short_name: "ISBT" },
  { id: "067", eng_name: "Tisco Bank Public Company Limited", thai_name: "ธนาคารทิสโก้ จำกัด (มหาชน)", short_name: "TISCO" },
  { id: "069", eng_name: "Kiatnakin Bank Public Company Limited", thai_name: "ธนาคารเกียรตินาคิน", short_name: "KK" },
  { id: "070", eng_name: "ACL Bank Public Company Limited", thai_name: "เอซีแอล จำกัด (มหาชน)", short_name: "ACL" },
  { id: "071", eng_name: "The Thai Credit Retail Bank Public Company Limited", thai_name: "ธนาคารไทยเครดิตเพื่อรายย่อย จำกัด (มหาชน)", short_name: "TCRB" },
  { id: "073", eng_name: "Land and Houses Bank Public Company Limited", thai_name: "ธนาคารธนชาตบำบัด", short_name: "LHBANK" },
  { id: "079", eng_name: "ANZ Bank (Thai) Public Company Limited", thai_name: "ธนาคารออสเตรเลีย-นิวซีแลนด์", short_name: "ANZ" },
  { id: "080", eng_name: "Sumitomo Mitsui Trust Bank (Thai) PCL.", thai_name: "ซูมิโตโม มิตซุย ทรัสต์ แบงก์ (ไทย) จำกัด", short_name: "SMTB" },
  { id: "098", eng_name: "Small and Medium Enterprise Development Bank of Thailand", thai_name: "ธนาคารอาคารสงเคราะห์", short_name: "SMEB" }
];