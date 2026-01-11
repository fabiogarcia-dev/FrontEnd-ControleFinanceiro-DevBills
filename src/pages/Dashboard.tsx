import { useEffect, useState } from "react";
import MonthYaerSelect from "../components/MonthYearSelect";
import { getTransactionsMonthly, getTransactionsSummary } from "../services/transactionService";
import type { MonthlyItem, TransactionSummary } from "../types/transactions";
import Card from "../components/Card";
import { AArrowUp, Calendar, TrendingUp, Wallet } from "lucide-react";
import { formatCurrency } from "../utils/formatters";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from "recharts";

const initialSummary: TransactionSummary = {
    balance: 0,
    totalExpenses: 0,
    totalIncomes: 0,
    expensesByCategory: [],
};

import type { PieLabelRenderProps } from "recharts/types/polar/Pie";

const formatToolTipValue = (value: number | string): string => {
    return formatCurrency(typeof value === "number" ? value : 0);
};

const Dashboard = () => {
    const currentDate = new Date();
    const [year, setYear] = useState<number>(currentDate.getFullYear());
    const [month, setMonth] = useState(currentDate.getMonth() + 1);
    const [summary, setSummary] = useState<TransactionSummary>(initialSummary);
    const [monthlyItemsData, setMonthlyItemsData] = useState<MonthlyItem[]>([]);

    useEffect(() => {
        async function loadTransactionsSummary() {
            const response = await getTransactionsSummary(month, year);
            setSummary(response);
        }
        loadTransactionsSummary();
    }, [month, year]);

    useEffect(() => {
        async function loadTransactionsMonthly() {
            const response = await getTransactionsMonthly(month, year, 4);
            setMonthlyItemsData(response.history);
        }
        loadTransactionsMonthly();
    }, [month, year]);

    const renderPieChartLabel = (props: PieLabelRenderProps) => {
        const { name, percent } = props;
        return `${name}: ${((percent as number) * 100).toFixed(1)}%`;
    };

    return (
        <div className="container-app py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h1 className="text-2xl font-bold mb-4 md:mb-0">Dashboard</h1>
                <MonthYaerSelect month={month} year={year} onMonthChange={setMonth} onYearChange={setYear} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card
                    icon={<Wallet size={20} className="text-primary-500" />}
                    tittle="Saldo"
                    hover
                    glowEffect={summary.balance > 0}
                >
                    <p
                        className={`text-2xl font-semibold mt-2 ${
                            summary.balance > 0 ? "text-primary-500" : "text-red-300"
                        }`}
                    >
                        {formatCurrency(summary.balance)}
                    </p>
                </Card>

                <Card
                    icon={<AArrowUp size={20} className="text-primary-500" />}
                    tittle="Receitas"
                    hover
                >
                    <p className="text-2xl font-semibold mt-2 text-primary-500">
                        {formatCurrency(summary.totalIncomes)}
                    </p>
                </Card>

                <Card
                    icon={<Wallet size={20} className="text-red-600" />}
                    tittle="Despesas"
                    hover
                >
                    <p className="text-2xl font-semibold mt-2 text-red-600">
                        {formatCurrency(summary.totalExpenses)}
                    </p>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 mt-3">
                <Card
                    icon={<TrendingUp size={20} className="text-primary-500" />}
                    tittle="Despesas por Categoria"
                    className="min-h-80"
                >
                    {summary.expensesByCategory.length > 0 ? (
                        <div className="h-72 mt-4">
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={summary.expensesByCategory}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        dataKey="amount"
                                        nameKey="CategoryName"
                                        label={renderPieChartLabel}
                                    >
                                        {summary.expensesByCategory.map((entry) => (
                                            <Cell key={entry.categoryId} fill={entry.categoryColor} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={formatToolTipValue} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-64 text-gray-500">
                            Nenhuma despesa registrada nesse período
                        </div>
                    )}
                </Card>

                <Card
                    icon={<Calendar size={20} className="text-primary-500" />}
                    tittle="Histórico Mensal"
                    className="min-h-80 p-2.5"
                >
                    <div className="h-72 mt-4">
                        {monthlyItemsData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyItemsData} margin={{ left: 40 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#94A3B8"
                                        tick={{ style: { textTransform: "capitalize" } }}
                                    />
                                    <YAxis
                                        stroke="#94A3B8"
                                        tickFormatter={formatCurrency}
                                        tick={{ style: { fontSize: "14" } }}
                                    />
                                    <Tooltip
                                        formatter={formatCurrency}
                                        contentStyle={{ backgroundColor: "#1A1A1A", borderColor: "#2A2A2A" }}
                                        labelStyle={{ color: "#F8F8F8" }}
                                    />
                                    <Legend />
                                    <Bar dataKey="expenses" name="Despesas" fill="#FF6384" />
                                    <Bar dataKey="income" name="Receitas" fill="#37E359" />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-64 text-gray-500">
                                Nenhuma despesa registrada nesse período
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;