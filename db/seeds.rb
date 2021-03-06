# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

groups = ['Б17Д301', 'Б17Д302', 'Б17Д303', 'Б17Д304', 'Б17Д305', 'Б17Д306', 'Б17Д307', 'Б17Д308', 'Б17Д309', 'Б17Д310', 'Б17Д311', 'Б17Д312','Б17Д313','Б17Д314','Б17Д315','Б17Д316','Б17Д317','Б17Д318','Б17Д319','Б17Д320','Б17Д321','Б17Д322']

groups.each do |group|
  if Group.exists?(:name => group) == false
    Group.create(name: group)
  end
end

puts 'Finished creating groups'