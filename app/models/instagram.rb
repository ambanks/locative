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

  # def self.get_locative_for_testing
  #   tags = ['locativego', 'locative', 'locativeend']
  #   tags.each do |tag|
  #     @tags_json[tag] = HTTParty.get("https://api.instagram.com/v1/tags/#{tag}/media/recent?access_token=#{@access_token}")
  #   end
  #   return @tags_json
  # end

  def self.collect_user_posts(user)
    @current_user = user
    @user_posts = []
    ig_ids = @current_user.posts.collect { |post| post.instagram_id }

    @tags_json.each do |tag, hash|
      hash['data'].each do |post|
        if post['user']['id'] == @current_user.instagram_id.to_s
          @user_posts << post unless ig_ids.include?(post['id'])
        end
      end
    end

    return self
  end
  
  def self.make_journeys
    if @current_user.journeys.empty?
      current_journey = @current_user.journeys.create(          
        name: "My First Journey")
    else
      current_journey = @current_user.journeys.last
    end

    @user_posts.sort_by! { |post| post['created_time'] }
    unless @user_posts.empty?
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
      hi_res_img:   post['images']['standard_resolution']['url'],
      instagram_id: post['id'])
  end

end

