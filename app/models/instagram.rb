module Instagram
  @access_token = "295738699.1fb234f.fda44f9e854f4083acc3b024e883aeaa"
  # @tags_json = Hash.new

  @user_posts = Hash.new
  @current_user = User.new
  @locative_posts = Array.new
 
  # TODO method to get a new user's Instagram id number
  # user search url, for finding a user's id:
  # https://api.instagram.com/v1/users/search?q=jack&access_token=ACCESS-TOKEN

  # Alternate Approach:

  def self.get(user)
    get_user_posts(user).collect_new_locative.make_journeys
  end

    def self.test(user)
    get_user_posts(user).collect_new_locative
    return @locative_posts
  end

  def self.get_user_posts(user)
    @current_user = user
    @user_posts = HTTParty.get("https://api.instagram.com/v1/users/#{@current_user.instagram_id}/media/recent/?access_token=#{@access_token}")
    return self
  end

  def self.collect_new_locative
    tags = ['locativego', 'locative', 'locativeend']
    old_ig_ids = @current_user.posts.collect { |post| post.instagram_id }
    tags.each do |tag|
      @user_posts['data'].each do |post| 
        if post['tags'].include?(tag)
          @locative_posts << post unless old_ig_ids.include?(post['id'])
        end
      end
    end
    return self
  end

  def self.make_journeys
    @locative_posts.sort_by! { |post| post['created_time'] }
    unless @locative_posts.empty?
      @locative_posts.each do |post|
        case 
        when post['tags'].include?('locativego')
          if new_user?
            journey = create_first_journey(post)
            add_post_to_journey(journey, post)
          else
            journey = create_new_journey(post)
            add_post_to_journey(journey, post)
          end
        when post['tags'].include?('locative')
          if new_user?
            journey = create_first_journey(post)
            add_post_to_journey(journey, post)
          else
            journey = @current_user.journeys.last
            add_post_to_journey(journey, post)
          end
          when post['tags'].include?('locativeend')
            journey = @current_user.journeys.last 
            add_post_to_journey(journey, post)      
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

  def self.new_user?
    @current_user.journeys.empty?
  end

  def self.create_first_journey(post)
    @current_user.journeys.create(          
      name: "My First Journey",
      date: Time.at(post['created_time'].to_i).strftime("%A, %B %d, %Y"))
      return @current_user.journeys.last
  end

  def self.create_new_journey(post)
    @current_user.journeys.create(          
      name: "New Journey",
      date: Time.at(post['created_time'].to_i).strftime("%A, %B %d, %Y"))
      return @current_user.journeys.last
  end


  # def self.get_locative
  #   tags = ['locativego', 'locative', 'locativeend']
  #   tags.each do |tag|
  #     @tags_json[tag] = HTTParty.get("https://api.instagram.com/v1/tags/#{tag}/media/recent?access_token=#{@access_token}")
  #   end
  #   return self
  # end

  # def self.get_locative_for_testing
  #   tags = ['locativego', 'locative', 'locativeend']
  #   tags.each do |tag|
  #     @tags_json[tag] = HTTParty.get("https://api.instagram.com/v1/tags/#{tag}/media/recent?access_token=#{@access_token}")
  #   end
  #   return @tags_json
  # end

  # def self.collect_user_posts(user)
  #   @current_user = user
  #   @user_posts = []
  #   ig_ids = @current_user.posts.collect { |post| post.instagram_id }

  #   @tags_json.each do |tag, hash|
  #     hash['data'].each do |post|
  #       if post['user']['id'] == @current_user.instagram_id.to_s
  #         @user_posts << post unless ig_ids.include?(post['id'])
  #       end
  #     end
  #     # TODO Add logic to continue searches if nothing found
  #   end

  #   return self
  # end
  
  

end

