import { trpc } from '@/router';
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

export const Route = createFileRoute('/$experienceId/')({
    params: {
        parse:(params)=> ({
            experienceId: z.coerce.number().parse(params.experienceId),
    }),
},
    loader: async ({ params, context: { trpcQueryUtils } }) => {
        await trpcQueryUtils.experiences.byId.ensureData({
            id: params.experienceId

        });
    },
    component: ExperiencePage,
})

function ExperiencePage() {
    const { experienceId } = Route.useParams();
    // Here you would typically fetch the experience data using the experienceId
    const experience = trpc.experiences.byId.useSuspenseQuery({
        id: experienceId,
    })
  return <div>Hello "/$experienceId/"!</div>
}
