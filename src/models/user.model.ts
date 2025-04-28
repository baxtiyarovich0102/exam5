import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.config'

const User = sequelize.define(
	'User',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING(100),
			unique: true,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	},
	{
		tableName: 'users',
		timestamps: true,
	},
)

export { User }