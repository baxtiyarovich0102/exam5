import { Request, Response } from 'express'
import { Post } from '../models/post.model'


const createPost = async (req: Request, res: Response) => {
  try {
    const { title, body, blog_id, user_id } = req.body
    const post = await Post.create({ title, body, blog_id, user_id })
    res.status(201).json(post)
  } catch (error) {
    res.status(500).json({ message: 'Xatolik', error })
  }
}



const getAllPosts = async (req: Request, res: Response) => {
  try {
    const { blog_id } = req.params
    const posts = await Post.findAll({ where: { blog_id } })
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ message: 'Xatolik', error })
  }
}



const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const post = await Post.findByPk(id)
    if (!post) return res.status(404).json({ message: 'Post topilmadi' })

    await post.increment('views') 
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ message: 'Xatolik', error })
  }
}



const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const post = await Post.findByPk(id)
    if (!post) return res.status(404).json({ message: 'Post topilmadi' })

    await post.update(req.body)
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ message: 'Xatolik', error })
  }
}



const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const post = await Post.findByPk(id)
    if (!post) return res.status(404).json({ message: 'Post topilmadi' })

    await post.destroy()
    res.status(200).json({ message: 'Post o‘chirildi' })
  } catch (error) {
    res.status(500).json({ message: 'Xatolik', error })
  }
}



const sortPostsByDate = async (req: Request, res: Response) => {
  try {
    const { blog_id } = req.params
    const posts = await Post.findAll({
      where: { blog_id },
      order: [['createdAt', 'DESC']],
    })
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ message: 'Xatolik', error })
  }
}


export default {createPost, getAllPosts, getPostById, updatePost, deletePost, sortPostsByDate}