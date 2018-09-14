# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

olga = Author.create(name: 'Olga Tokarczuk')
filip = Author.create(name: 'Filip Springer')

Book.create(author: olga, pages: 180, title: 'Prawiek i inne czasy')
Book.create(author: olga, pages: 880, title: 'Księgi Jakubowe')
Book.create(author: olga, pages: 200, title: 'Dom dzienny, dom nocny')
Book.create(author: filip, pages: 240, title: 'Wanna z kolumnadą')
Book.create(author: filip, pages: 350, title: '12 pięter')
