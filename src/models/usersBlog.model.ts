import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.config'

const usersBlog = sequelize.define(
	'usersBlog',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		blog_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		role: {
			type: DataTypes.ENUM('owner', 'user'),
			allowNull: false,
		}
	},
	{
		tableName: 'usersBlog',
		timestamps: true,
	},
)

export { usersBlog }