import { useThemeMode } from '../hooks/useThemeMode'
import { useTodoBoard } from '../hooks/useTodoBoard'
import { AppHeader } from './layout/AppHeader'
import { BoardHeader } from './layout/BoardHeader'
import { EmptyListState } from './states/EmptyListState'
import { Sidebar } from './layout/Sidebar'
import { TaskFilters } from './tasks/TaskFilters'
import { TaskForm } from './forms/TaskForm'
import { TaskList } from './tasks/TaskList'
import '../style/style.css'

export const MainPage = () => {
	const board = useTodoBoard()
	const { themeMode, setThemeMode } = useThemeMode()

	if (!board.currentList) {
		return (
			<EmptyListState
				listName={board.listName}
				onListNameChange={board.setListName}
				onAddList={board.handleAddList}
			/>
		)
	}

	return (
		<main className='min-h-screen bg-[#f4f7fb] px-4 py-5 text-slate-950 transition-colors dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8'>
			<div className='mx-auto flex max-w-7xl flex-col gap-5'>
				<AppHeader
					activeCount={board.totalActive}
					completedCount={board.totalCompleted}
					listCount={board.state.length}
					themeMode={themeMode}
					onThemeChange={setThemeMode}
				/>

				<section className='grid min-h-[680px] min-w-0 gap-5 lg:grid-cols-[320px_minmax(0,1fr)]'>
					<Sidebar
						lists={board.state}
						currentListId={board.currentListId}
						isOpen={board.isMenuOpen}
						listName={board.listName}
						selectedColor={board.selectedColor}
						onClose={() => board.setIsMenuOpen(false)}
						onSelectList={board.setCurrentListId}
						onListNameChange={board.setListName}
						onColorChange={board.setSelectedColor}
						onAddList={board.handleAddList}
					/>

					<section className='min-w-0 rounded-lg border border-white bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900'>
						<div className='border-b border-slate-200 p-4 dark:border-slate-800 sm:p-5'>
							<BoardHeader
								currentList={board.currentList}
								listProgress={board.listProgress}
								canDeleteList={board.state.length > 1}
								onToggleMenu={() => board.setIsMenuOpen(prev => !prev)}
								onRenameList={board.handleRenameList}
								onClearCompleted={board.clearCompleted}
								onDeleteList={board.handleDeleteList}
							/>

							<TaskForm
								taskName={board.taskName}
								taskDescription={board.taskDescription}
								taskPriority={board.taskPriority}
								taskDueDate={board.taskDueDate}
								onTaskNameChange={board.setTaskName}
								onTaskDescriptionChange={board.setTaskDescription}
								onTaskPriorityChange={board.setTaskPriority}
								onTaskDueDateChange={board.setTaskDueDate}
								onSubmit={board.handleAddTask}
							/>
						</div>

						<TaskFilters
							searchQuery={board.searchQuery}
							displayState={board.displayState}
							sortMode={board.sortMode}
							onSearchChange={board.setSearchQuery}
							onDisplayChange={board.setDisplayState}
							onSortChange={board.setSortMode}
						/>

						<TaskList
							tasks={board.filteredTasks}
							hasActiveTasks={board.listActive > 0}
							onToggleTask={board.toggleTask}
							onToggleImportant={board.toggleImportant}
							onDeleteTask={board.deleteTask}
							onEditTask={board.handleEditTask}
						/>
					</section>
				</section>
			</div>
		</main>
	)
}

export default MainPage
