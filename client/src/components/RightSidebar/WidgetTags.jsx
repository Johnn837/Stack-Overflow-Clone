import React from 'react'

const WidgetTags = () => {

  const tags = ['c', 'css', 'express', 'mern', 'mongodb', 'mysql', 'node.js', 'react.js', 'java', 'python', 'php', 'c++', 'javascript']

  return (
    <div className='widget-tags'>
      <h4>Watched Tags</h4>
      <div className='widget-tags-div'>
        {
          tags.map((tag) => (
            <p key={tag}>{tag}</p>
          ))
        }
      </div>
    </div>
  )
}

export default WidgetTags
