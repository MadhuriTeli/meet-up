import Spinner from "@/features/shared/components/ui/Spinner";
import { ExperienceCard } from "./ExperienceCard";
import { ExperienceForList } from "../types";

type ExperiencesListProps = {
    experiences: ExperienceForList[],
    isLoading?: boolean,
    noExperienceMessage?: string
}

export function ExperienceList({ experiences, isLoading, noExperienceMessage = 'No Experience Found' }:ExperiencesListProps) {
    return (<>
        <div className="space-y-4">
        {
            experiences.map((experience) =>
                <ExperienceCard key={experience.id} experience= {experience} />
            )
        }
        {
            isLoading &&(
            <div className="flex justify-center">
                    <Spinner />
            </div>)
        }
        {
            !isLoading && experiences.length === 0 && (
                <div className="flex justify-center">{ noExperienceMessage}</div>
            )
            }
        </div>
    </>);
}