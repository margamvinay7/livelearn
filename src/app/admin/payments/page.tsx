"use client"
import { useState, type ReactElement } from "react";
import {
  Download,
  Search,

  CheckCircle,
  XCircle,
  Clock,
  ArrowDownToLine,
  Eye,
  BadgeDollarSign,
  TrendingUp,
  Banknote,
  RefreshCcw
} from "lucide-react";

const paymentData = [
  {
    id: "PMT-1001",
    name: "John Doe",
    email: "john.doe@example.com",
    amount: 299.0,
    date: "2024-06-01",
    status: "Completed",
    method: "Credit Card",
    details: "React Masterclass Course"
  },
  {
    id: "PMT-1002",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    amount: 149.0,
    date: "2024-06-02",
    status: "Pending",
    method: "PayPal",
    details: "Python for Beginners"
  },
  {
    id: "PMT-1003",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    amount: 89.0,
    date: "2024-06-03",
    status: "Refunded",
    method: "Bank Transfer",
    details: "UI/UX Design Fundamentals"
  },
  {
    id: "PMT-1004",
    name: "Emily Brown",
    email: "emily.brown@example.com",
    amount: 199.0,
    date: "2024-06-04",
    status: "Completed",
    method: "Credit Card",
    details: "Machine Learning Basics"
  },
  {
    id: "PMT-1005",
    name: "Alex Chen",
    email: "alex.chen@example.com",
    amount: 120.0,
    date: "2024-06-05",
    status: "Completed",
    method: "UPI",
    details: "JavaScript Essentials"
  },
  {
    id: "PMT-1006",
    name: "Lisa Wang",
    email: "lisa.wang@example.com",
    amount: 59.0,
    date: "2024-06-06",
    status: "Pending",
    method: "Credit Card",
    details: "Data Science Bootcamp"
  },
  {
    id: "PMT-1007",
    name: "David Kim",
    email: "david.kim@example.com",
    amount: 350.0,
    date: "2024-06-07",
    status: "Completed",
    method: "PayPal",
    details: "Fullstack Web Development"
  },
  {
    id: "PMT-1008",
    name: "Priya Singh",
    email: "priya.singh@example.com",
    amount: 75.0,
    date: "2024-06-08",
    status: "Refunded",
    method: "Bank Transfer",
    details: "Intro to SQL"
  }
];

type PaymentStatus = "Completed" | "Pending" | "Refunded";

const statusColors: Record<PaymentStatus, string> = {
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Refunded: "bg-red-100 text-red-700"
};

const statusIcons: Record<PaymentStatus, ReactElement> = {
  Completed: <CheckCircle className="w-4 h-4 text-green-500 mr-1" />,
  Pending: <Clock className="w-4 h-4 text-yellow-500 mr-1" />,
  Refunded: <XCircle className="w-4 h-4 text-red-500 mr-1" />
};

function isPaymentStatus(status: string): status is PaymentStatus {
  return status === "Completed" || status === "Pending" || status === "Refunded";
}

export default function AdminPaymentsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<PaymentStatus | "All">("All");
  const [modal, setModal] = useState<null | typeof paymentData[0]>(null);

  const filteredPayments = paymentData.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Summary stats
  const totalRevenue = paymentData
    .filter((p) => p.status === "Completed")
    .reduce((sum, p) => sum + p.amount, 0);
  const pending = paymentData
    .filter((p) => p.status === "Pending")
    .reduce((sum, p) => sum + p.amount, 0);
  const completed = paymentData.filter((p) => p.status === "Completed").length;
  const refunded = paymentData.filter((p) => p.status === "Refunded").length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Payments</h1>
        <p className="text-gray-600">
          Manage all course payments, refunds, and payouts in one place.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-between animate-fade-in">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-blue-700 mt-1">${totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-blue-500 p-3 rounded-lg">
            <BadgeDollarSign className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-between animate-fade-in delay-100">
          <div>
            <p className="text-sm font-medium text-gray-600">Pending Payouts</p>
            <p className="text-2xl font-bold text-blue-700 mt-1">${pending.toLocaleString()}</p>
          </div>
          <div className="bg-yellow-500 p-3 rounded-lg">
            <RefreshCcw className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-between animate-fade-in delay-200">
          <div>
            <p className="text-sm font-medium text-gray-600">Completed Payments</p>
            <p className="text-2xl font-bold text-blue-700 mt-1">{completed}</p>
          </div>
          <div className="bg-green-500 p-3 rounded-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-between animate-fade-in delay-300">
          <div>
            <p className="text-sm font-medium text-gray-600">Refunds</p>
            <p className="text-2xl font-bold text-blue-700 mt-1">{refunded}</p>
          </div>
          <div className="bg-red-500 p-3 rounded-lg">
            <Banknote className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Table Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search payments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as PaymentStatus | "All")}
            className="ml-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow transition-colors">
          <ArrowDownToLine className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto animate-fade-in-up">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Method</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredPayments.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-400">
                  No payments found.
                </td>
              </tr>
            )}
            {filteredPayments.map((p, idx) => (
              <tr
                key={p.id}
                className="transition-all duration-200 hover:bg-blue-50 cursor-pointer"
                style={{ animationDelay: `${idx * 40}ms` }}
                onClick={() => setModal(p)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700">{p.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700">{p.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700 font-semibold">${p.amount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {isPaymentStatus(p.status) ? (
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[p.status]}`}>{statusIcons[p.status]}{p.status}</span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">{p.status}</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.method}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Eye className="w-5 h-5 text-blue-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Details Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 animate-fade-in">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fade-in-up">
            <button
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setModal(null)}
            >
              <span className="sr-only">Close</span>
              <XCircle className="w-6 h-6 text-gray-400" />
            </button>
            <h2 className="text-xl font-bold text-blue-700 mb-2 flex items-center gap-2">
              <BadgeDollarSign className="w-6 h-6 text-blue-500" /> Payment Details
            </h2>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Payment ID:</span>
                <span className="font-medium text-blue-700">{modal.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Name:</span>
                <span className="font-medium text-blue-700">{modal.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Email:</span>
                <span className="font-medium text-blue-700">{modal.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Amount:</span>
                <span className="font-medium text-blue-700">${modal.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Date:</span>
                <span className="font-medium text-blue-700">{modal.date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status:</span>
                {isPaymentStatus(modal.status) ? (
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[modal.status]}`}>{statusIcons[modal.status]}{modal.status}</span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">{modal.status}</span>
                )}
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Method:</span>
                <span className="font-medium text-blue-700">{modal.method}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Details:</span>
                <span className="font-medium text-blue-700">{modal.details}</span>
              </div>
            </div>
            <button className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow transition-colors">
              <Download className="w-4 h-4" /> Download Invoice
            </button>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s both;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s both;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
