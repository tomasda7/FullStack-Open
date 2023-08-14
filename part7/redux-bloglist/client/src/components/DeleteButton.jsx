
const DeleteButton = ({ blogId, ownerId, userId, handleDelete }) => {
  const currentUserId = userId

  if(currentUserId === ownerId) {
    return (
      <div>
        <button key={blogId} onClick={() => handleDelete(blogId)}>remove</button>
      </div>
    )
  } else {
    return null
  }
}

export default DeleteButton
