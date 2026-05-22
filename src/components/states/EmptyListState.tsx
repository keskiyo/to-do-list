import type { FormEvent } from 'react'
import { AppLogo } from '../layout/AppLogo'

interface EmptyListStateProps {
	listName: string
	onListNameChange: (value: string) => void
	onAddList: (event: FormEvent<HTMLFormElement>) => void
}

export const EmptyListState = ({
	listName,
	onListNameChange,
	onAddList,
}: EmptyListStateProps) => (
	<main className='min-h-screen bg-slate-100 px-4 py-8 text-slate-950 dark:bg-slate-950 dark:text-white'>
		<div className='mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center gap-4 text-center'>
			<AppLogo size='lg' />
			<h1 className='text-4xl font-bold'>Создайте первый список</h1>
			<form onSubmit={onAddList} className='flex w-full max-w-md gap-2'>
				<input
					value={listName}
					onChange={event => onListNameChange(event.target.value)}
					placeholder='Название списка'
					className='min-w-0 flex-1 rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-blue-950'
				/>
				<button
					type='submit'
					className='rounded-md bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200'
				>
					Добавить
				</button>
			</form>
		</div>
	</main>
)
