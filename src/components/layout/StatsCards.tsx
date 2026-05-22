interface StatsCardsProps {
	activeCount: number
	completedCount: number
	listCount: number
}

const cardClass =
	'min-w-0 rounded-lg border border-white bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900'

export const StatsCards = ({
	activeCount,
	completedCount,
	listCount,
}: StatsCardsProps) => (
	<div className='grid grid-cols-[repeat(3,minmax(0,1fr))] gap-2 overflow-hidden'>
		<div className={cardClass}>
			<p className='truncate text-xs font-semibold uppercase text-slate-400'>Активно</p>
			<p className='mt-1 text-2xl font-black'>{activeCount}</p>
		</div>
		<div className={cardClass}>
			<p className='truncate text-xs font-semibold uppercase text-slate-400'>Готово</p>
			<p className='mt-1 text-2xl font-black'>{completedCount}</p>
		</div>
		<div className={cardClass}>
			<p className='truncate text-xs font-semibold uppercase text-slate-400'>Списки</p>
			<p className='mt-1 text-2xl font-black'>{listCount}</p>
		</div>
	</div>
)
