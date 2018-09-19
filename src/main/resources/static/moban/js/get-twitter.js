jQuery.fn.exists = function(){return this.length>0;}

$(document).ready(function(){
	
	if($('#tweetbox').exists()) {
		$.getJSON('/includes/twitter-cache/get-twitter.php',
		function(data) {
			if(data.length >= 1)
			{
				tweetsdone = 0;
				$.each(data, function(i, item){
					if(tweetsdone < 1)
					{
						var tweet = '<p>';
						var tweettext = item.text;
						var tweettime = item.timestamp;
						var tweetid = item.id;
						var tweetuser = item.user_screen_name;
						tweettext = tweettext.replace(/(http\:\/\/[A-Za-z0-9\/\.\?\=\-]*)/g,'<a href="$1">$1</a>');
						tweettext = tweettext.replace(/(https\:\/\/[A-Za-z0-9\/\.\?\=\-]*)/g,'<a href="$1">$1</a>');
						tweettext = tweettext.replace(/@([A-Za-z0-9\/_]+)/g,'<a href="http://twitter.com/$1">@$1</a>');
						tweettext = tweettext.replace(/#([A-Za-z0-9\/\.]+)/g,'<a href="http://twitter.com/search?q=$1">#$1</a>');
						tweet += tweettext;
						tweet += '</p>';
						tweet += ' <p class="meta"><time><a href="http://twitter.com/'+tweetuser+'/status/'+tweetid+'">'+relative_time(tweettime)+' &rsaquo;</a></time></p>';
						$('#tweetbox').append(tweet);
						tweetsdone++;
					}
				});
			}
		});
	}
	
	if($('#followers_number').exists()) {
		$.getJSON('/includes/twitter-cache/get-twitter-userdata.php',
		function(data) {
			var followers = data.followers_count;
			$('#followers_number').html(addCommas(followers));
		});
	}
	
});

// Convert Twitter API Timestamp to "Time Ago"  
function relative_time(time_value) {  
	var values = time_value.split(" ");  
	time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];  
	var parsed_date = Date.parse(time_value);  
	var relative_to = (arguments.length > 1) ? arguments[1] : new Date();  
	var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);  
	delta = delta + (relative_to.getTimezoneOffset() * 60);
	var r = '';  
	if (delta < 60) r = 'a minute ago';  
	else if(delta < 120) r = 'couple of minutes ago';  
	else if(delta < (45*60)) r = (parseInt(delta / 60)).toString() + ' minutes ago';  
	else if(delta < (120*60)) r = 'an hour ago';  
	else if(delta < (24*60*60)) r = '' + (parseInt(delta / 3600)).toString() + ' hours ago';  
	else if(delta < (48*60*60)) r = '1 day ago';  
	else r = (parseInt(delta / 86400)).toString() + ' days ago';
	return r;  
}

// commas in integers
function addCommas(n){
    var rx=  /(\d+)(\d{3})/;
    return String(n).replace(/^\d+/, function(w){
        while(rx.test(w)){
            w= w.replace(rx, '$1,$2');
        }
        return w;
    });
}