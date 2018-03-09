const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false
});

const Page = db.define('pages', {
	title: {
    type: Sequelize.STRING,
    allowNull: false
  },
	slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
	content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
	status: Sequelize.ENUM('open', 'closed')
});

Page.beforeValidate((page) => {
  page.slug = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
})

const User = db.define('users', {
	name:{
    type: Sequelize.STRING,
    allowNull: false
  },
	email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

db.authenticate()
.then(() => {
  console.log('connected to the database');
})

module.exports = {
  Page, User
};
