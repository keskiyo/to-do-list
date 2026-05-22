import type { Priority, Task } from '../../types/types'
import { EmptyTasks } from './EmptyTasks'
import { TaskItem } from './TaskItem'

interface TaskListProps {
	tasks: Task[]
	hasActiveTasks: boolean
	onToggleTask: (taskId: string) => void
	onToggleImportant: (taskId: string) => void
	onDeleteTask: (taskId: string) => void
	onEditTask: (
		taskId: string,
		newName: string,
		priority: Priority,
		dueDate?: string,
		description?: string
	) => void
}

export const TaskList = ({
	tasks,
	hasActiveTasks,
	onToggleTask,
	onToggleImportant,
	onDeleteTask,
	onEditTask,
}: TaskListProps) => (
	<div className='min-h-[360px]'>
		{tasks.length > 0 ? (
			tasks.map(task => (
				<TaskItem
					key={task.id}
					task={task}
					onToggle={() => onToggleTask(task.id)}
					onToggleImportant={() => onToggleImportant(task.id)}
					onDelete={() => onDeleteTask(task.id)}
					onEdit={(newName, priority, dueDate, description) =>
						onEditTask(task.id, newName, priority, dueDate, description)
					}
				/>
			))
		) : (
			<EmptyTasks hasActiveTasks={hasActiveTasks} />
		)}
	</div>
)
