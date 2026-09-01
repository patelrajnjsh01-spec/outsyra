"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    Play,
    FileText,
    HelpCircle,
    CheckCircle2,
    BookOpen,
    Award,
    Users,
    ExternalLink,
    Plus,
} from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getCourses, addCourse } from "@/lib/supabase/db";

export default function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [activeLesson, setActiveLesson] = useState(null);
    const [completedLessons, setCompletedLessons] = useState(["les-101"]);
    const [selectedQuizAnswers, setSelectedQuizAnswers] = useState({});
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("149.00");

    useEffect(() => {
        async function fetchCourses() {
            try {
                const data = await getCourses("ws-rajnish-001");
                setCourses(data || []);
                if (data && data.length > 0) {
                    setSelectedCourse(data[0]);
                    setActiveLesson(data[0]?.modules?.[0]?.lessons?.[0] || null);
                }
            } catch (err) {
                console.error("Failed to load courses", err);
            }
        }
        fetchCourses();
    }, []);

    const toggleLessonCompletion = (lessonId) => {
        if (completedLessons.includes(lessonId)) {
            setCompletedLessons(completedLessons.filter((id) => id !== lessonId));
        } else {
            setCompletedLessons([...completedLessons, lessonId]);
        }
    };

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        const newCourse = await addCourse("ws-rajnish-001", {
            title,
            slug: title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
            subtitle: "Complete in-depth video training with worksheets & certificates.",
            description: "Step-by-step masterclass curriculum designed to scale creator revenues.",
            price: parseFloat(price) || 0,
            thumbnail_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
            modules: [
                {
                    id: `mod-${Date.now()}`,
                    title: "Module 1: Foundations & Architecture",
                    lessons: [
                        {
                            id: `les-${Date.now()}`,
                            title: "1.1 Introduction to the System",
                            duration_minutes: 14,
                            type: "video",
                            video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                        },
                    ],
                },
            ],
        });
        setCourses([newCourse, ...courses]);
        setSelectedCourse(newCourse);
        setActiveLesson(newCourse.modules[0].lessons[0]);
        setCreateModal(false);
        setTitle("");
    };

    const totalLessons = selectedCourse?.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0;
    const progressPercent = Math.round((completedLessons.length / (totalLessons || 1)) * 100);

    return (
        <div className="flex-1 flex flex-col bg-background text-foreground transition-colors duration-200">
            <DashboardHeader
                title="Course Builder & LMS (Supabase Database)"
                subtitle="Create structured multi-module video courses with student progress, quizzes, and certificates."
            />
            <main className="p-6 md:p-8 space-y-8 max-w-7xl">
                {selectedCourse && (
                    <div className="glass-card p-6 rounded-3xl border border-zinc-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-24 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 flex-shrink-0">
                                <img
                                    src={selectedCourse.thumbnail_url}
                                    alt={selectedCourse.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="gradient" className="text-[10px]">
                                        Active LMS Course
                                    </Badge>
                                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                                        ${selectedCourse.price} USD
                                    </span>
                                </div>
                                <h2 className="text-lg font-bold text-zinc-900 dark:text-white mt-1">{selectedCourse.title}</h2>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-3 mt-1">
                                    <span className="flex items-center gap-1">
                                        <Users className="h-3.5 w-3.5" /> {selectedCourse.total_students || 0} Enrolled Students
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <BookOpen className="h-3.5 w-3.5" /> {totalLessons} Lessons
                                    </span>
                                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                                        <Award className="h-3.5 w-3.5" /> Certificates Active
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => setCreateModal(true)} className="gap-1 text-xs">
                                <Plus className="h-3.5 w-3.5" />
                                <span>New Course</span>
                            </Button>
                            <Link href={`/checkout/${selectedCourse.id}`} target="_blank">
                                <Button
                                    variant="gradient"
                                    size="sm"
                                    className="text-xs gap-1.5"
                                >
                                    <ExternalLink className="h-3.5 w-3.5" />
                                    <span>Sales Page</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        <Card className="glass-card border-zinc-200 dark:border-white/10 overflow-hidden shadow-sm">
                            {activeLesson?.type === "video" ? (
                                <div className="relative aspect-video bg-black flex items-center justify-center border-b border-zinc-200 dark:border-white/10">
                                    <video
                                        controls
                                        className="h-full w-full"
                                        poster={selectedCourse?.thumbnail_url}
                                        src={activeLesson.video_url}
                                    />
                                </div>
                            ) : activeLesson?.type === "quiz" ? (
                                <div className="p-8 space-y-6 bg-zinc-50 dark:bg-zinc-950/80">
                                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                                        <HelpCircle className="h-5 w-5" />
                                        <h3 className="text-base font-bold text-zinc-900 dark:text-white">{activeLesson.title}</h3>
                                    </div>
                                    <div className="space-y-6">
                                        {activeLesson.quiz_data?.questions.map((q, qIndex) => (
                                            <div
                                                key={q.id}
                                                className="p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/5 space-y-3"
                                            >
                                                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                                                    {qIndex + 1}. {q.question}
                                                </p>
                                                <div className="space-y-2">
                                                    {q.options.map((opt, optIndex) => {
                                                        const isSelected = selectedQuizAnswers[q.id] === optIndex;
                                                        const isCorrect = optIndex === q.correct_answer_index;
                                                        return (
                                                            <button
                                                                key={optIndex}
                                                                type="button"
                                                                onClick={() =>
                                                                    setSelectedQuizAnswers({
                                                                        ...selectedQuizAnswers,
                                                                        [q.id]: optIndex,
                                                                    })
                                                                }
                                                                className={`w-full p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                                                                    isSelected
                                                                        ? quizSubmitted && isCorrect
                                                                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold"
                                                                            : quizSubmitted && !isCorrect
                                                                            ? "bg-rose-500/20 border-rose-500 text-rose-700 dark:text-rose-300 font-bold"
                                                                            : "bg-indigo-600/10 dark:bg-indigo-600/20 border-indigo-500 text-indigo-700 dark:text-white font-bold"
                                                                        : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-white/5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                                                                }`}
                                                            >
                                                                {opt}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                        <Button
                                            variant="gradient"
                                            onClick={() => setQuizSubmitted(true)}
                                            className="w-full text-xs"
                                        >
                                            {quizSubmitted ? "Quiz Submitted - 100% Score! 🎉" : "Submit Quiz Answers"}
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-8 space-y-4 bg-zinc-50 dark:bg-zinc-950/80 min-h-[300px]">
                                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                                        <FileText className="h-5 w-5" />
                                        <h3 className="text-base font-bold text-zinc-900 dark:text-white">{activeLesson?.title}</h3>
                                    </div>
                                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{activeLesson?.content}</p>
                                </div>
                            )}

                            <div className="p-6 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/80 border-t border-zinc-200 dark:border-white/5">
                                <div>
                                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{activeLesson?.title}</h4>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                        Estimated completion: {activeLesson?.duration_minutes || 10} minutes
                                    </p>
                                </div>
                                {activeLesson && (
                                    <Button
                                        variant={completedLessons.includes(activeLesson.id) ? "secondary" : "gradient"}
                                        size="sm"
                                        onClick={() => toggleLessonCompletion(activeLesson.id)}
                                        className="gap-2 text-xs"
                                    >
                                        <CheckCircle2
                                            className={`h-4 w-4 ${
                                                completedLessons.includes(activeLesson.id) ? "text-emerald-600 dark:text-emerald-400" : ""
                                            }`}
                                        />
                                        <span>{completedLessons.includes(activeLesson.id) ? "Completed" : "Mark as Complete"}</span>
                                    </Button>
                                )}
                            </div>
                        </Card>
                    </div>

                    <div className="space-y-4">
                        <Card className="glass-card border-zinc-200 dark:border-white/10 p-5 space-y-4 shadow-sm">
                            <div className="flex items-center justify-between pb-3 border-b border-zinc-200/60 dark:border-white/5">
                                <span className="text-xs font-semibold text-zinc-900 dark:text-white">Curriculum & Progress</span>
                                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{progressPercent}% Done</span>
                            </div>
                            <div className="w-full bg-zinc-200 dark:bg-zinc-900 h-2 rounded-full overflow-hidden border border-zinc-200 dark:border-white/5">
                                <div
                                    className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-300"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>

                            <div className="space-y-4 pt-2">
                                {selectedCourse?.modules?.map((module) => (
                                    <div key={module.id} className="space-y-2">
                                        <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-[11px]">
                                            {module.title}
                                        </p>
                                        <div className="space-y-1.5">
                                            {module.lessons?.map((lesson) => {
                                                const isCurrent = activeLesson?.id === lesson.id;
                                                const isDone = completedLessons.includes(lesson.id);
                                                return (
                                                    <button
                                                        key={lesson.id}
                                                        type="button"
                                                        onClick={() => {
                                                            setActiveLesson(lesson);
                                                            setQuizSubmitted(false);
                                                        }}
                                                        className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                                                            isCurrent
                                                                ? "bg-indigo-600/10 dark:bg-indigo-600/20 border-indigo-500 text-indigo-700 dark:text-white font-semibold"
                                                                : "bg-white/80 dark:bg-zinc-900/40 border-zinc-200 dark:border-white/5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-2">
                                                            {lesson.type === "video" ? (
                                                                <Play className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                                                            ) : lesson.type === "quiz" ? (
                                                                <HelpCircle className="h-3.5 w-3.5 text-pink-600 dark:text-pink-400 flex-shrink-0" />
                                                            ) : (
                                                                <FileText className="h-3.5 w-3.5 text-zinc-500 flex-shrink-0" />
                                                            )}
                                                            <span className="truncate">{lesson.title}</span>
                                                        </div>
                                                        {isDone && (
                                                            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </main>

            {createModal && (
                <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="glass-card p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-white/10 max-w-md w-full space-y-4 animate-in fade-in zoom-in-95 shadow-2xl">
                        <h3 className="text-base font-bold text-zinc-900 dark:text-white">Create New LMS Course</h3>
                        <form onSubmit={handleCreateCourse} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Course Title</label>
                                <Input
                                    required
                                    placeholder="e.g. Masterclass: Scaling Digital Products"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Price (USD)</label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    required
                                    placeholder="149.00"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2 pt-2">
                                <Button variant="outline" type="button" className="w-1/2" onClick={() => setCreateModal(false)}>
                                    Cancel
                                </Button>
                                <Button variant="gradient" type="submit" className="w-1/2">
                                    Save to Supabase
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
