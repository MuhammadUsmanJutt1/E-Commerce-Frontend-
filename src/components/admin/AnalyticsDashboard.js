'use client';

import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  AlertTriangle,
  Star,
} from 'lucide-react';
import api from '@/lib/api';

const AnalyticsDashboard = () => {
  const [stats, setStats] = useState(null);
  const [salesChart, setSalesChart] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);
  const [recentActivity, setRecentActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartPeriod, setChartPeriod] = useState('month');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    fetchSalesChart();
  }, [chartPeriod]);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, topProductsRes, categoryRes, activityRes] = await Promise.all([
        api.get('/analytics/dashboard'),
        api.get('/analytics/top-products?limit=5'),
        api.get('/analytics/categories'),
        api.get('/analytics/recent-activity?limit=10'),
      ]);

      setStats(statsRes.data);
      setTopProducts(topProductsRes.data);
      setCategoryStats(categoryRes.data);
      setRecentActivity(activityRes.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSalesChart = async () => {
    try {
      const response = await api.get(`/analytics/sales-chart?period=${chartPeriod}`);
      setSalesChart(response.data);
    } catch (error) {
      console.error('Failed to fetch sales chart:', error);
    }
  };

  const StatCard = ({ title, value, change, icon: Icon, color = 'blue' }) => {
    const isPositive = change >= 0;
    const colorClasses = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
    };

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
          <div className={`p-3 rounded-full ${colorClasses[color]}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        {change !== undefined && (
          <div className="mt-4 flex items-center">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span
              className={`text-sm font-medium ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {Math.abs(change)}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        )}
      </div>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-200 h-64 rounded-lg"></div>
            <div className="bg-gray-200 h-64 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600">Overview of your store performance</p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value={formatCurrency(stats.revenue.total)}
            change={stats.revenue.growth}
            icon={DollarSign}
            color="green"
          />
          <StatCard
            title="Total Orders"
            value={stats.orders.total.toLocaleString()}
            change={stats.orders.growth}
            icon={ShoppingCart}
            color="blue"
          />
          <StatCard
            title="Total Customers"
            value={stats.customers.total.toLocaleString()}
            change={stats.customers.growth}
            icon={Users}
            color="purple"
          />
          <StatCard
            title="Products"
            value={stats.products.total.toLocaleString()}
            icon={Package}
            color="orange"
          />
        </div>
      )}

      {/* Low Stock Alert */}
      {stats && stats.products.lowStock > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
            <p className="text-yellow-800">
              <span className="font-semibold">{stats.products.lowStock}</span> products are running low on stock
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Sales Overview</h2>
            <select
              value={chartPeriod}
              onChange={(e) => setChartPeriod(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            >
              <option value="week">Last 7 Days</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <div className="space-y-3">
            {salesChart.slice(0, 7).map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.date}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium">{item.orders} orders</span>
                  <span className="text-sm font-semibold text-green-600">
                    {formatCurrency(item.revenue)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Top Selling Products</h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product._id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-sm">{product.title}</p>
                    <p className="text-xs text-gray-500">{product.totalSold} sold</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-green-600">
                  {formatCurrency(product.totalRevenue)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Category Performance</h2>
          <div className="space-y-4">
            {categoryStats.map((category) => (
              <div key={category._id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{category._id}</p>
                  <p className="text-sm text-gray-500">{category.totalSold} items sold</p>
                </div>
                <span className="text-sm font-semibold text-green-600">
                  {formatCurrency(category.totalRevenue)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Orders</h3>
              <div className="space-y-2">
                {recentActivity?.orders.slice(0, 5).map((order) => (
                  <div key={order._id} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium">#{order.orderNumber}</p>
                      <p className="text-gray-500">{order.user?.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(order.total)}</p>
                      <p className={`text-xs ${
                        order.status === 'delivered' ? 'text-green-600' :
                        order.status === 'shipped' ? 'text-blue-600' :
                        order.status === 'processing' ? 'text-yellow-600' :
                        'text-gray-600'
                      }`}>
                        {order.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">New Customers</h3>
              <div className="space-y-2">
                {recentActivity?.users.slice(0, 3).map((user) => (
                  <div key={user._id} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-gray-500">{user.email}</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;