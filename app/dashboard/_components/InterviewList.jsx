"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, Briefcase } from "lucide-react";
import moment from "moment";

const InterviewList = () => {
    const { user } = useUser();
    const [interviewList, setInterviewList] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            GetInterviewList();
        }
    }, [user]);

    const GetInterviewList = async () => {
        setLoading(true);
        try {

            const resp = await fetch(`/api/interview?createdBy=${user?.email}`);
            const result = await resp.json();

            if (result.success) {
                setInterviewList(result.data);
            }
        } catch (error) {
            console.error("Error fetching interviews:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="animate-spin h-10 w-10 text-gray-400" />
            </div>
        );
    }

    return (
        <div className="mt-10">
            <h2 className="font-bold text-3xl mb-8 text-white">
                Previous Mock Interviews
            </h2>

            {interviewList.length === 0 ? (
                <div className="text-gray-400 text-center py-16 border border-dashed border-gray-800 bg-gray-900/50 rounded-xl">
                    <p className="text-lg">No interviews found. Start your first one!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {interviewList.map((interview, index) => (
                        <div
                            key={index}
                            className="group border border-gray-800 bg-gray-900 rounded-xl p-6 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer"
                        >
                            {/* Card Header */}
                            <div className="mb-5">
                                <h3 className="font-bold text-2xl text-gray-100 capitalize group-hover:text-indigo-400 transition-colors">
                                    {interview?.jobPosition}
                                </h3>

                                <div className="flex flex-col gap-3 mt-4">
                                    <div className="flex items-center gap-3 text-gray-400">
                                        <Briefcase size={18} className="text-indigo-500" />
                                        <span className="text-sm font-medium">
                                            {interview?.jobExperience} Years Experience
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3 text-gray-400">
                                        <Calendar size={18} className="text-indigo-500" />
                                        <span className="text-sm font-medium">
                                            Created: {moment(interview?.createdAt).format('DD MMM YYYY')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Buttons - Now Full Width */}
                            <div className="flex gap-4 mt-6">
                                <Button
                                    onClick={() => router.push(`/dashboard/interview/${interview?.mockInterviewId}/feedback`)}
                                    size="lg"
                                    variant="outline"
                                    className="flex-1 cursor-pointer border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                                >
                                    Feedback
                                </Button>

                                <Button
                                    onClick={() => router.push(`/dashboard/interview/${interview?.mockInterviewId}`)}
                                    size="lg"
                                    className="flex-1 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20"
                                >
                                    Start
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InterviewList;