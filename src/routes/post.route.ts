import { Router } from 'express'
import postController from '../controllers/post.controller'

const router = Router()

router.post('/create', postController.createPost)
router.get('/:blog_id/get-all', postController.getAllPosts)
router.get('/get-by-id/:id', postController.getPostById)
router.put('/update/:id', postController.updatePost)
router.delete('/delete/:id', postController.deletePost)
router.get('/sort-by-date/:blog_id', postController.sortPostsByDate)

export default router
