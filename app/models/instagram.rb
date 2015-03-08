module Instagram
  @access_token = "295738699.1fb234f.fda44f9e854f4083acc3b024e883aeaa"
  @tags_json = Hash.new
  @user_posts = Array.new
  @current_user = User.new
 
  # TODO method to get a new user's Instagram id number
  # user search url, for finding a user's id:
  # https://api.instagram.com/v1/users/search?q=jack&access_token=ACCESS-TOKEN

  def self.get_locative
    tags = ['locativego', 'locative', 'locativeend']
    tags.each do |tag|
      @tags_json[tag] = HTTParty.get("https://api.instagram.com/v1/tags/#{tag}/media/recent?access_token=#{@access_token}")
    end
    return self
  end

  # TODO Add check to avoid duplicates/see if user posts are already saved
  def self.collect_user_posts(user)
    @current_user = user
    @tags_json.each do |tag, hash|
      hash['data'].each do |post|
        @user_posts << post if post['user']['id'] == @current_user.instagram_id.to_s
      end
    end
    return self
  end
  
  def self.make_journeys
    current_journey = @current_user.journeys.last
    @user_posts.sort_by! { |post| post['created_time'] }
    @user_posts.each do |post|
      case 
      when post['tags'].include?('locativego')
        current_journey = @current_user.journeys.create(
        name: "New Journey",
        date: Time.at(post['created_time'].to_i).strftime("%A, %B %d, %Y"))
        add_post_to_journey(current_journey, post)
      when post['tags'].include?('locative')
        add_post_to_journey(current_journey, post)
      when post['tags'].include?('locativeend')
        add_post_to_journey(current_journey, post)      
      end
    end
  end

  def self.add_post_to_journey(journey, post)
    journey.posts.create(
      caption:      post['caption']['text'],
      latitude:     post['location']['latitude'].to_f,
      longitude:    post['location']['longitude'].to_f,
      time_stamp:   post['created_time'],
      tags:         post['tags'],
      low_res_img:  post['images']['low_resolution']['url'],
      med_res_img:  post['images']['thumbnail']['url'],
      hi_res_img:   post['images']['standard_resolution']['url'])
  end

  def self.say_hello
    "Hello, I'm Instagram"
  end

end

