"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/navigation';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
} from 'recharts';

export default function StatisticsPage() {
    const [hn, setHn] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [assessmentData, setAssessmentData] = useState<any | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [statsData, setStatsData] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/assessment/stats');
            const data = await response.json();
            if (response.ok) {
                setStatsData(data.data);
            }
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!hn.trim()) return;

        setLoading(true);
        setError(null);
        setAssessmentData(null);

        try {
            const response = await fetch(`/api/assessment?hn=${hn.trim()}`);
            const data = await response.json();

            if (response.ok) {
                setAssessmentData(data.data);
            } else {
                setError(data.error || "ไม่พบข้อมูลในระบบ");
            }
        } catch {
            setError("เกิดข้อผิดพลาดในการเชื่อมต่อ");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        router.push(`/assessment/edit?hn=${hn}`);
    };

    // Fixed colors for each result type
    const RESULT_COLORS: { [key: string]: string } = {
        "ให้ลุกนั่งบนเตียง": "#FF8042", // Orange
        "ลุกนั่งข้างเตียง": "#FFBB28", // Yellow
        "ยืนและลุกเดิน": "#00C49F", // Green
        "ไม่สามารถประเมินได้": "#8884d8", // Purple
    };
    const DEFAULT_COLOR = "#0088FE"; // Blue

    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
            <Navbar />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-12 flex-grow">
                <div className="max-w-5xl mx-auto space-y-12">

                    {/* Section 1: Assessment Statistics (Bar Chart) */}
                    <section className="bg-white p-4 md:p-8 rounded-2xl shadow-lg border border-gray-100">
                        <h1 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6 md:mb-8 text-center">
                            สถิติการประเมินภาพรวม
                        </h1>
                        <div className="w-full h-[300px] md:h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={statsData}
                                    margin={{
                                        top: 5,
                                        right: 10,
                                        left: 0,
                                        bottom: 20,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-45} textAnchor="end" height={80} />
                                    <YAxis
                                        allowDecimals={false}
                                        tick={{ fontSize: 12 }}
                                        label={{ value: 'จำนวนผู้ป่วย', angle: -90, position: 'insideLeft', offset: 10, style: { textAnchor: 'middle' } }}
                                    />
                                    <Tooltip contentStyle={{ color: 'black' }} itemStyle={{ color: 'black' }} />
                                    <Bar dataKey="count" name="จำนวนผู้ป่วย" fill="#8884d8">
                                        {statsData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={RESULT_COLORS[entry.name] || DEFAULT_COLOR} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </section>

                    {/* Section 2: Assessment History (Search) */}
                    <section className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <h1 className="text-3xl font-bold text-blue-800 mb-8 text-center">
                            ดูประวัติการประเมิน
                        </h1>

                        <form onSubmit={handleSearch} className="max-w-md mx-auto mb-10">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="กรอกเลข HN เพื่อค้นหา"
                                    value={hn}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d*$/.test(value)) {
                                            setHn(value);
                                        }
                                    }}
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg text-black"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'ค้นหา...' : 'ค้นหา'}
                                </button>
                            </div>
                            {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
                        </form>

                        {assessmentData && (
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 animate-fade-in">
                                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                                    <div className="w-full md:w-auto">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-2">ผลการประเมิน</h2>
                                        <p className="text-gray-600">HN: <span className="font-semibold text-gray-900">{assessmentData.hn}</span></p>
                                        <p className="text-gray-600">วันที่ประเมิน: <span className="font-semibold text-gray-900">{new Date(assessmentData.createdAt).toLocaleString('th-TH')}</span></p>
                                    </div>
                                    <div className="w-full md:w-auto mt-2 md:mt-0">
                                        <div className="text-xl font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg inline-block w-full md:w-auto text-center">
                                            {assessmentData.result}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        onClick={handleEdit}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-8 rounded-lg shadow transition-colors flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                        แก้ไขการประเมิน
                                    </button>
                                </div>
                            </div>
                        )}
                    </section>

                </div>
            </main>
        </div>
    );
}
