import { User } from './user.model';
import { Blog } from './blog.model';
import { Post } from './post.model';
import { Comment } from './comment.model';
import { usersBlog } from './usersBlog.model';


usersBlog.belongsTo(User, { foreignKey: 'user_id', as: 'user' })
usersBlog.belongsTo(Blog, { foreignKey: 'blog_id', as: 'blog' })

User.hasMany(usersBlog, { foreignKey: 'user_id' });
Post.belongsTo(usersBlog, { foreignKey: 'user_id' });

Blog.hasMany(Post, { foreignKey: 'blog_id' });
Post.belongsTo(Blog, { foreignKey: 'blog_id' });

Post.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });

User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });