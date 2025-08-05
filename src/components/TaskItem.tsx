import React, { useState } from 'react'
import type { Task } from '../types/types'

interface TaskItemProps {
	task: Task
	onToggle: () => void
	onDelete: () => void
	onEdit: (newName: string) => void
}

export const TaskItem = React.memo(
	({ task, onToggle, onDelete, onEdit }: TaskItemProps) => {
		const [isEditing, setIsEditing] = useState(false)
		const [editValue, setEditValue] = useState(task.name)

		const handleEdit = () => {
			if (editValue.trim()) {
				onEdit(editValue)
				setIsEditing(false)
			}
		}

		return (
			<div className='h-[70px] w-[100%] flex items-center text-[25px] px-[20px] border-b border-solid justify-between'>
				<div className='flex gap-[20px] items-center'>
					<div
						onClick={onToggle}
						className='cursor-pointer h-[35px] w-[35px] rounded-[50%] border border-solid transition border-gray-300 flex justify-center items-center select-none'
					>
						{task.verified && '✔'}
					</div>

					{isEditing ? (
						<input
							type='text'
							value={editValue}
							onChange={e => setEditValue(e.target.value)}
							onBlur={handleEdit}
							onKeyPress={e => e.key === 'Enter' && handleEdit()}
							autoFocus
							className='border-b border-gray-300 outline-none'
						/>
					) : (
						<span
							className={`${
								task.verified ? 'line-through text-gray-400' : ''
							} cursor-pointer`}
							onDoubleClick={() => setIsEditing(true)}
						>
							{task.name}
						</span>
					)}
				</div>
				<button
					onClick={onDelete}
					className='cursor-pointer text-red-500 hover:text-red-700 transition'
				>
					Delete
				</button>
			</div>
		)
	}
)
