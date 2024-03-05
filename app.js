console.log("Let's get this party started!");

//jQuery DOM selectors
const $searchTerm = $('#search-term');
const $searchBtn = $('#search');
const $removeBtn = $('#remove');
const $gifs = $('#gifs');


//simple jQuery styling (I know it's not best practice to style this way, but I wanted to try and apply my jQuery CSS knowledge)
$('body').css({
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Helvetica',
    background: '#222222'
});
$('form').css('margin', '10px');
$('input').css({
    padding:'10px', 
    borderRadius: '3px',
    border: 'none'
});
$('button').css({
    padding: '10px',
    borderRadius: '3px',
    border: 'none',
    color: 'white'
});
$('#search').css('background', '#555555');
$('#remove').css('background', 'red');
$gifs.css('display', 'inline-block' );


//form submission
$searchBtn.on('click', async function(e){
    e.preventDefault();
    const searchTerm = $searchTerm.val();
    const response = await axios.get('http://api.giphy.com/v1/gifs/search', 
    {params: {
        q: searchTerm, 
        api_key: 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym'
        }
    });
    console.log(response.data);
    addGif(response.data);
    $searchTerm.val("");
});


//adding gifs
function addGif(response){
    const randomIdx = Math.floor(Math.random()*response.data.length);
    const URLsource = response.data[randomIdx].images.downsized.url;
    const $gif = `<img src = ${URLsource}>`;
    $gifs.append($gif);
    $('img').css({
        margin: '5px',
        height: '300px'
    });
}


//remove all gifs
$removeBtn.on('click', function(e){
    e.preventDefault();
    $gifs.html("");
});
