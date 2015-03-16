module Instagram
  @access_token = "295738699.1fb234f.fda44f9e854f4083acc3b024e883aeaa"
  @user_posts = Hash.new
  @current_user = User.new
  @locative_posts = Array.new
 
  def self.get_user_id(user)
    user_profile = HTTParty.get("https://api.instagram.com/v1/users/search?q=#{user.instagram_name}&access_token=#{@access_token}")
    user.update_attribute(:instagram_id, user_profile['data'][0]['id'].to_i)
  end

  # def self.test_user_id(user)
  #   user_profile = HTTParty.get("https://api.instagram.com/v1/users/search?q=#{user.instagram_name}&access_token=#{@access_token}")
  #   return user_profile['data'][0]['id'].to_i
  #   # user.instagram_id = user_profile['data'][0]['id'].to_i
  # end

  def self.get_posts(user)
    get_user_posts(user).collect_new_locative.make_journeys
  end

  def self.test(user)
    get_user_posts(user).collect_new_locative
    @locative_posts.sort_by! { |post| post['created_time'] }
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
          unless old_ig_ids.include?(post['id']) || post['type'] == 'video'  
            @locative_posts << post 
          end
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
      low_res_img:  post['images']['low_resolution']['url'].sub!('http', 'https'),
      med_res_img:  post['images']['thumbnail']['url'].sub!('http', 'https'),
      hi_res_img:   post['images']['standard_resolution']['url'].sub!('http', 'https'),
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
  
end

