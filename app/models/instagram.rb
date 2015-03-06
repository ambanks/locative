module Instagram
  @access_token = "295738699.1fb234f.fda44f9e854f4083acc3b024e883aeaa"
  @tag_json = Hash.new

  # def self.get_tag(tag)
  #   HTTParty.get("https://api.instagram.com/v1/tags/#{tag}/media/recent?access_token=#{@access_token}")
  # end

  def self.get_locative
    @tag_json = HTTParty.get("https://api.instagram.com/v1/tags/locative/media/recent?access_token=#{@access_token}")
    return self
  end

  def self.collect_user_posts(instagram_id)
    locative_posts = Array.new
    @tag_json['data'].each do |post|
      locative_posts << post if post['user']['id'].to_i == instagram_id
    end
    return locative_posts
  end
    
  def self.filter_json
  end


  def self.say_hello
    "Hello, I'm Instagram"
  end

# user search url, for finding a user's id when they sign in
# https://api.instagram.com/v1/users/search?q=jack&access_token=ACCESS-TOKEN
end


