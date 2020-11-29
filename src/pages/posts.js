import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Posts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {
        loadPosts();
    }, [])

    async function loadPosts() {
        try {
            const result = await axios.get('/posts')
            if (result.status === 200) {
                setPosts(result.data.data)
            }
        }
        catch(err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }

    function renderPosts() {
        return (
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <span>title: {post.title}</span>
                        <span>content: {post.content}</span>
                    </li>
                ))}
            </ul>
        )
    }

    function renderCreatePost() {
        return (
            <div>
                <h3>新建</h3>
                <p>
                    <span>Title: </span>
                    <input 
                        value={title} 
                        onChange={e => setTitle(e.target.value)}
                    />
                </p>
                <p>
                    <span>Content: </span>
                    <textarea 
                        value={content} 
                        onChange={e => setContent(e.target.value)}
                    />
                </p>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        );
    }

    async function handleSubmit() {
        if (title === '') {
            alert('Title should not empty!')
            return;
        }
        if (content === '') {
            alert('Content should not empty!')
            return;
        }

        const requestParam = {
            title,
            content
        }
        try {
            setLoading(true)
            const result = await axios.post('/posts/', requestParam)
            if (result.status === 200) {
                await loadPosts()
            }
        }
        catch(err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h2>Posts</h2>
            {renderCreatePost()}
            {loading ? <div>loading...</div> : renderPosts()}
        </div>
    )
}

export default Posts