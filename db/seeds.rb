# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

  users = User.create([
    { name: 'Locative Team', instagram_id: 1410115954, 
      email: 'locative@locative.com' } 
    ])



#   topics = Topic.create([
# { name: 'Top Stories',      code: 1002 },
# { name: 'Animals',          code: 1132 },
# { name: 'Books',            code: 1032 },
# { name: 'Business',         code: 1006 },
# { name: "'Digital Life'",   code: 1049 },
# { name: 'Food',             code: 1053 },
# { name: 'Music',            code: 1039 },
# { name: 'Politics',         code: 1014 },
# { name: 'Science',          code: 1007 },
# { name: 'Sports',           code: 1055 },
# { name: 'User Search',      code: 4321 }
# ]),