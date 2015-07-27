require 'sinatra'
 
get '/hi' do
  "Hello World!"
end
 
get '/songs/:id' do
  erb :song, :locals => {:song_id => params['id']}
end
