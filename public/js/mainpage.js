var voteCount = 0;
var voteCount2 = 0;
var voteCount3 = 0;
function changeVote(val, fileNum) {
    var upElem = document.getElementById("upvote"+fileNum);
    var downElem = document.getElementById("downvote"+fileNum);
    var num = parseInt(document.getElementById("vote-number"+fileNum).textContent);
    if (num == null)
        num = 0;

    if (val == 1) {
        upElem.style.backgroundImage = "url('images/color-up.png')";
        downElem.style.backgroundImage = "url('images/down.png')";
        
        if (voteCount == -1) {
            num = num + 2;
            voteCount = 1;
        }
            
        else if (voteCount == 1) {
            upElem.style.backgroundImage = "url('images/up.png')";
            num = num - 1;
            voteCount = 0;
        }
        else {
            num = num + 1;
            voteCount = 1;
        }
    } else {
        upElem.style.backgroundImage = "url('images/up.png')";
        downElem.style.backgroundImage = "url('images/color-down.png')";

        if (voteCount == 1) {
            num = num - 2;
            voteCount = -1;
        }
        else if (voteCount == -1) {
            downElem.style.backgroundImage = "url('images/down.png')";
            num = num + 1;
            voteCount = 0;
        }
        else {
            num = num - 1;
            voteCount = -1;
        }
    }

    if (num < 0) {
        document.getElementById("vote-number"+fileNum).style.backgroundColor = '#f1f2f6';
        document.getElementById("vote-number"+fileNum).style.color = 'black';
    }
    else {
        document.getElementById("vote-number"+fileNum).style.backgroundColor = '#0e3768';
        document.getElementById("vote-number"+fileNum).style.color = '#f1f2f6';
    }

    document.getElementById("vote-number"+fileNum).innerHTML = num;
}

function changeVote2(val, fileNum) {
    var upElem = document.getElementById("upvote2"+fileNum);
    var downElem = document.getElementById("downvote2"+fileNum);
    var num = parseInt(document.getElementById("vote-number2"+fileNum).textContent);
    if (num == null)
        num = 0;

    if (val == 1) {
        upElem.style.backgroundImage = "url('images/color-up.png')";
        downElem.style.backgroundImage = "url('images/down.png')";
        
        if (voteCount2 == -1) {
            num = num + 2;
            voteCount2 = 1;
        }
            
        else if (voteCount2 == 1) {
            upElem.style.backgroundImage = "url('images/up.png')";
            num = num - 1;
            voteCount2 = 0;
        }
        else {
            num = num + 1;
            voteCount2 = 1;
        }
    } else {
        upElem.style.backgroundImage = "url('images/up.png')";
        downElem.style.backgroundImage = "url('images/color-down.png')";

        if (voteCount2 == 1) {
            num = num - 2;
            voteCount2 = -1;
        }
        else if (voteCount2 == -1) {
            downElem.style.backgroundImage = "url('images/down.png')";
            num = num + 1;
            voteCount2 = 0;
        }
        else {
            num = num - 1;
            voteCount2 = -1;
        }
    }

    if (num < 0) {
        document.getElementById("vote-number2"+fileNum).style.backgroundColor = '#f1f2f6';
        document.getElementById("vote-number2"+fileNum).style.color = 'black';
    }
    else {
        document.getElementById("vote-number2"+fileNum).style.backgroundColor = '#0e3768';
        document.getElementById("vote-number2"+fileNum).style.color = '#f1f2f6';2
    }

    document.getElementById("vote-number2"+fileNum).innerHTML = num;
}

function changeVote3(val, fileNum) {
    var upElem = document.getElementById("upvote3"+fileNum);
    var downElem = document.getElementById("downvote3"+fileNum);
    var num = parseInt(document.getElementById("vote-number3"+fileNum).textContent);
    if (num == null)
        num = 0;

    if (val == 1) {
        upElem.style.backgroundImage = "url('images/color-up.png')";
        downElem.style.backgroundImage = "url('images/down.png')";
        
        if (voteCount3 == -1) {
            num = num + 2;
            voteCount3 = 1;
        }
            
        else if (voteCount3 == 1) {
            upElem.style.backgroundImage = "url('images/up.png')";
            num = num - 1;
            voteCount3 = 0;
        }
        else {
            num = num + 1;
            voteCount3 = 1;
        }
    } else {
        upElem.style.backgroundImage = "url('images/up.png')";
        downElem.style.backgroundImage = "url('images/color-down.png')";

        if (voteCount3 == 1) {
            num = num - 2;
            voteCount3 = -1;
        }
        else if (voteCount3 == -1) {
            downElem.style.backgroundImage = "url('images/down.png')";
            num = num + 1;
            voteCount3 = 0;
        }
        else {
            num = num - 1;
            voteCount3 = -1;
        }
    }

    if (num < 0) {
        document.getElementById("vote-number3"+fileNum).style.backgroundColor = '#f1f2f6';
        document.getElementById("vote-number3"+fileNum).style.color = 'black';
    }
    else {
        document.getElementById("vote-number3"+fileNum).style.backgroundColor = '#0e3768';
        document.getElementById("vote-number3"+fileNum).style.color = '#f1f2f6';
    }

    document.getElementById("vote-number3"+fileNum).innerHTML = num;
}
function urlHandler(value) {                               
    window.location.assign(`${value}`);
}

function upVote(postId, username){
    console.log('upvoted')
    console.log(username)
    fetch('/upVote/' +postId +'/vote/' + username, {method: 'GET'})
    .then(function(response) {
        if(response.ok) {
          return;
        }
        throw new Error('Request failed.');
      })
      .catch(function(error) {
        console.log(error);
      });

    setInterval(function() {
        fetch('/countVote/'+ postId, {method: 'GET'})
          .then(function(response) {
            if(response.ok) return response.json();
            throw new Error('Request failed.');
          })
          .then(function(data) {
            document.getElementById('vote-number'+ postId).innerHTML = data;
          })
          .catch(function(error) {
            console.log(error);
          });
      }, 1000);
}

function downVote(postId, username){
    console.log('upvoted')
    console.log(username)
    fetch('/downVote/' +postId +'/vote/' + username, {method: 'GET'})
    .then(function(response) {
        if(response.ok) {
          return;
        }
        throw new Error('Request failed.');
      })
      .catch(function(error) {
        console.log(error);
      });

    setInterval(function() {
        fetch('/countVote/'+ postId, {method: 'GET'})
          .then(function(response) {
            if(response.ok) return response.json();
            throw new Error('Request failed.');
          })
          .then(function(data) {
            document.getElementById('vote-number' + postId).innerHTML = data;
          })
          .catch(function(error) {
            console.log(error);
          });
      }, 500);
}

/*
function search(username){
    const searchquery = document.getElementById('query').value;

    if (searchquery != '')
    {
        fetch(`/searchresult/${username}/results?query=${searchquery}`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response =>{
            if(response.ok) {
                return response.text();
            }
            throw new Error('Request failed.');
        })
        .catch(function(error) {
            console.log(error);
        });
    }
    else{
        alert('That is empty.')
    }
    
}
*/

