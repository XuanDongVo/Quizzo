"use client";

import { useDispatch, useSelector } from 'react-redux';
import { nextStep, setSignupData } from '@/stores/auth/signup/signup.slice';
import { RootState } from '@/stores';
import { cn } from "@/lib/utils"
import { School, GraduationCap, Users, Building2 } from "lucide-react"
import { Button } from '@/components/ui/button';

const workplaceTypes = [
	{
		id: "school",
		label: "School",
		icon: School,
		color: "bg-[oklch(0.488_0.243_264.376)]",
	},
	{
		id: "higher-education",
		label: "Higher Education",
		icon: GraduationCap,
		color: "bg-[oklch(0.488_0.243_264.376)]",
	},
	{
		id: "teams",
		label: "Teams",
		icon: Users,
		color: "bg-[oklch(0.705_0.191_47.604)]",
	},
	{
		id: "business",
		label: "Business",
		icon: Building2,
		color: "bg-[oklch(0.828_0.189_84.429)]",
	},
]

export default function WorkspaceStep() {
	const dispatch = useDispatch();
	const selected = useSelector((state: RootState) => state.signup.workspace);

	return (
		<div className="space-y-8">
			<div className="text-center">
				<h1 className="text-2xl font-semibold text-foreground md:text-3xl">
					Describe a workplace that suits you
				</h1>
				<p className="mt-2 text-muted-foreground">
					You can skip it if you&apos;re not sure
				</p>
			</div>
			<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
				{workplaceTypes.map((type) => {
					const Icon = type.icon
					return (
						<button
							key={type.id}
							onClick={() => {
								dispatch(setSignupData({ workspace: type.id }));
								dispatch(nextStep());
							}}
							className={cn(
								"flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all hover:border-primary/50 hover:shadow-md",
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