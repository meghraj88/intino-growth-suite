import SidebarItem from "./SidebarItem"
import { LayoutDashboard, Package, ShoppingCart, RotateCcw, TrendingUp, Bell, Settings } from "icons"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav className="space-y-2">
        <SidebarItem href="/dashboard" icon={LayoutDashboard}>
          Dashboard
        </SidebarItem>
        <SidebarItem href="/dashboard/products" icon={Package}>
          Products
        </SidebarItem>
        <SidebarItem href="/dashboard/orders" icon={ShoppingCart}>
          Orders
        </SidebarItem>
        <SidebarItem href="/dashboard/returns" icon={RotateCcw}>
          Returns
        </SidebarItem>
        <SidebarItem href="/dashboard/trends" icon={TrendingUp}>
          Trends
        </SidebarItem>
        <SidebarItem href="/dashboard/alerts" icon={Bell}>
          Alerts
        </SidebarItem>
        <SidebarItem href="/dashboard/settings" icon={Settings}>
          Settings
        </SidebarItem>
      </nav>
    </div>
  )
}

export default Sidebar
