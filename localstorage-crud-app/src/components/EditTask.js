import { useState } from 'react'

const EditTask = ({ id, title, description, onEditTask, onEditingDone }) => {
  const [editedTitle, setEditedTitle] = useState(title)
  const [titlePlaceholderText, setTitlePlaceholderText] = useState('Write the new task title here...')
  const [editedDesc, setEditedDesc] = useState(description);
  const [descPlaceholderText, setDescPlaceholderText] = useState('Write the new task desc here...')

  const handleNewTitleChange = (event) => {
    const newTitle = event.target.value
    setEditedTitle(newTitle)
  }

  const handleNewDescChange = (event) => {
    const newDesc = event.target.value
    setEditedDesc(newDesc)
  }

  const onSaveEditedTask = () => {
    if (editedTitle === '' || editedDesc === '') {
      setTitlePlaceholderText('Title cannot be empty')
      setDescPlaceholderText('Description cannot be empty')
      return
    }

    onEditTask(id, editedTitle, editedDesc)
    onEditingDone()
  }

  return (
    <>
      {/* for Title */}
      <input type='text' value={editedTitle} placeholder={titlePlaceholderText} onChange={handleNewTitleChange} className='grow p-1 outline-yellow-400 rounded' />
      {/* for Desc */}
      <input type='text' value={editedDesc} placeholder={descPlaceholderText} onChange={handleNewDescChange} className='grow p-1 outline-yellow-400 rounded' />

      <button onClick={onSaveEditedTask} className='lg:px-3 bg-yellow-500 hover:bg-yellow-300 rounded transition-colors'>Save</button>
    </>
  )
}

export default EditTask;