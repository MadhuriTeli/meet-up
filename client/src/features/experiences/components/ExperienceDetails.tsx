import Card from "@/features/shared/components/ui/Card"

type ExperienceDetailsProps = {
    experience: ExperienceForDetails
}

export function ExperienceDetails({ experience }: ExperienceDetailsProps) {
    return (
        <Card className="p-0">
            <ExperienceDetailsMedia experience={experience} />
        </Card>
    );
}

type ExperienceDetailsMediaProps = Pick<ExperienceDetailsProps, 'experience'>

function ExperienceDetailsMedia({ experience }: ExperienceDetailsMediaProps) {
    if (!experience.imageUrl) {
        return null;
    }
    return (
        <div className="aspect-video w-full overflow-hidden rounder-lg">
            <img
                src={experience.imageUrl}
                alt={experience.title}
                className="h-full w-full object-cover"
            />
        </div>
    )
}