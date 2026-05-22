import type { FormEvent } from 'react'
import type { TodoList } from '../../types/types'
import { getActiveCount } from '../../helpers/todoHelpers'
import { ListForm } from '../forms/ListForm'

interface SidebarProps {
	lists: TodoList[]
	currentListId: string
	isOpen: boolean
	listName: string
	selectedColor: string
	onClose: () => void
	onSelectList: (listId: string) => void
	onListNameChange: (value: string) => void
	onColorChange: (value: string) => void
	onAddList: (event: FormEvent<HTMLFormElement>) => void
}

export const Sidebar = ({
	lists,
	currentListId,
	isOpen,
	listName,
	selectedColor,
	onClose,
	onSelectList,
	onListNameChange,
	onColorChange,
	onAddList,
}: SidebarProps) => (
	<aside
		className={`min-w-0 rounded-lg border border-white bg-white shadow-sm transition dark:border-slate-800 dark:bg-slate-900 ${
			isOpen ? 'block' : 'hidden lg:block'
		}`}
	>
		<div className='border-b border-slate-200 p-4 dark:border-slate-800'>
			<div className='flex items-center justify-between gap-3'>
				<h2 className='text-sm font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400'>
					Списки
				</h2>
				<button
					type='button'
					onClick={onClose}
					className='rounded-md border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden'
				>
					Скрыть
				</button>
			</div>

			<ListForm
				listName={listName}
				selectedColor={selectedColor}
				onListNameChange={onListNameChange}
				onColorChange={onColorChange}
				onSubmit={onAddList}
			/>
		</div>

		<div className='max-h-[520px] overflow-y-auto p-2'>
			{lists.map(list => {
				const activeCount = getActiveCount(list.listToDo)
				const isCurrent = currentListId === list.id

				return (
					<button
						key={list.id}
						type='button'
						onClick={() => onSelectList(list.id)}
						className={`mb-2 flex w-full items-center gap-3 rounded-md border px-3 py-3 text-left transition ${
							isCurrent
								? 'border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-800'
								: 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800'
						}`}
					>
						<span
							className='h-10 w-1.5 rounded-full'
							style={{ backgroundColor: list.color }}
						/>
						<span className='min-w-0 flex-1'>
							<span className='block truncate text-sm font-bold text-slate-900 dark:text-white'>
								{list.task}
							</span>
							<span className='text-xs font-medium text-slate-500 dark:text-slate-400'>
								{list.listToDo.length} задач
							</span>
						</span>
						<span className='rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-500 dark:bg-slate-700 dark:text-slate-300'>
							{activeCount}
						</span>
					</button>
				)
			})}
		</div>
	</aside>
)
