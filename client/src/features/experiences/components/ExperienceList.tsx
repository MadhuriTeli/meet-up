import Spinner from "@/features/shared/components/ui/Spinner";
import { Experience } from "@advanced-react/server/database/schema";

type ExperiencesListProps = {
    experiences: Experience[],
    isLoading?: boolean,
    noExperienceMessage?: string
}

export function ExperienceList({ experiences, isLoading, noExperienceMessage = 'No Experience Found' }:ExperiencesListProps) {
    return (<>
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
    </>);
}