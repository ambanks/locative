module Instagram
  @access_token = "295738699.1fb234f.fda44f9e854f4083acc3b024e883aeaa"
  
  def self.get_tag( )
    HTTParty.get("https://api.instagram.com/v1/tags/#{tag}/media/recent?access_token=#{@access_token}")
  end

  def self.get_locative
    HTTParty.get("https://api.instagram.com/v1/tags/locative/media/recent?access_token=#{@access_token}")
  end

  def self.say_hello
    "Hello, I'm Instagram"
  end

end


