"use client";

import { useDispatch, useSelector } from 'react-redux';
import { nextStep, setSignupData } from '@/stores/auth/signup/signup.slice';
import { RootState } from '@/stores';
import { User, GraduationCap, BookOpen, Briefcase } from "lucide-react"
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const accountTypes = [
    {
        id: "personal",
        label: "Personal",
        icon: User,
        color: "bg-[oklch(0.488_0.243_264.376)]",
    },
    {
        id: "teacher",
        label: "Teacher",
        icon: GraduationCap,
        color: "bg-[oklch(0.696_0.17_162.48)]",
    },
    {
        id: "student",
        label: "Student",
        icon: BookOpen,
        color: "bg-[oklch(0.828_0.189_84.429)]",
    },
    {
        id: "professional",
        label: "Professional",
        icon: Briefcase,
        color: "bg-[oklch(0.205_0_0)]",
    },
]

export default function AccountTypeStep() {
    const dispatch = useDispatch();
    const selected = useSelector((state: RootState) => state.signup.accountType);

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-2xl font-semibold text-foreground md:text-3xl">
                    What type of account do you like to create?
                </h1>
                <p className="mt-2 text-muted-foreground">
                    You can skip it if you&apos;re not sure
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {accountTypes.map((type) => {
                    const Icon = type.icon
                    return (
                        <button
                            key={type.id}
                            onClick={() => {
                                dispatch(setSignupData({ accountType: type.id }));
                                dispatch(nextStep());
                            }}
                            className={cn(
                                "flex items-center gap-4 rounded-xl border-2 p-4 text-left  hover:border-primary/50 hover:shadow-md",
                                selected === type.id
                                    ? "border-primary bg-primary/5 shadow-md"
                                    : "border-border bg-card"
                            )}
                        >
                            <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl text-white", type.color)}>
                                <Icon className="h-6 w-6" />
                            </div>
                            <span className="text-lg font-medium text-foreground">{type.label}</span>
                        </button>
                    )
                })}
            </div>

            <div className="mx-auto mt-12 flex w-full max-w-xl gap-4">
                <Button
                  variant="outline"
                  onClick={() => dispatch(nextStep())}
                  className="h-12 flex-1 bg-primary text-white hover:bg-primary/70 hover:text-white"
                >
                  Skip
                </Button>
            </div>
        </div>
    );
}