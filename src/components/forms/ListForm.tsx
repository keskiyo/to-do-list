import type { FormEvent } from 'react'
import { listColors } from '../../constants/todoConfig'

interface ListFormProps {
	listName: string
	selectedColor: string
	onListNameChange: (value: string) => void
	onColorChange: (value: string) => void
	onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export const ListForm = ({
	listName,
	selectedColor,
	onListNameChange,
	onColorChange,
	onSubmit,
}: ListFormProps) => (
	<form onSubmit={onSubmit} className='mt-4 space-y-3'>
		<input
			value={listName}
			onChange={event => onListNameChange(event.target.value)}
			placeholder='Новый список'
			className='w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-blue-950'
		/>

		<div className='flex min-w-0 flex-wrap items-center justify-between gap-2'>
			<div className='flex flex-wrap gap-2'>
				{listColors.map(color => (
					<button
						key={color}
						type='button'
						aria-label={`Выбрать цвет ${color}`}
						onClick={() => onColorChange(color)}
						className={`h-7 w-7 rounded-full border-2 transition ${
							selectedColor === color
								? 'border-slate-950 dark:border-white'
								: 'border-white dark:border-slate-900'
						}`}
						style={{ backgroundColor: color }}
					/>
				))}
			</div>

			<button
				type='submit'
				className='rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200'
			>
				Добавить
			</button>
		</div>
	</form>
)
