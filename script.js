// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAt0eIpmEThNvBwFSOqRN6TeVaS296v88c",
    authDomain: "fir-auth-3168e.firebaseapp.com",
    databaseURL: "https://fir-auth-3168e.firebaseio.com",
    projectId: "fir-auth-3168e",
    storageBucket: "fir-auth-3168e.appspot.com",
    messagingSenderId: "103888511653",
    appId: "1:103888511653:web:b562d5680632a75134e34c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var commentsRef = firebase.database().ref('comments');
var videosRef = firebase.database().ref('videoURL');





firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        // var displayName = user.displayName;
        var email = user.email;
        // var emailVerified = user.emailVerified;
        // var photoURL = user.photoURL;
        // var isAnonymous = user.isAnonymous;
        // var uid = user.uid;
        // var providerData = user.providerData;
        console.log("LOGGED IN");
        var myRe = /([a-zA-Z0-9\.\_\-]*)@/;
        var myArr = myRe.exec(email);
        var displayName = (myArr[1]);
        $('.Nickname').text(displayName);
        $('.Nickname-text').text(displayName);
        $('.Login').css('display', 'none');
        $('.Nickname').css('display', 'initial');


        // ...
    } else {
        // User is signed out.
        // ...
        console.log("LOGGED OUT");

        $('.Nickname').text('UNDEFINED');
        $('.Nickname-text').text('UNDEFINED');
        $('.Login').css('display', 'initial');
        $('.Nickname').css('display', 'none');

    }
});

// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
//     .then(function () {
//         // Existing and future Auth states are now persisted in the current
//         // session only. Closing the window would clear any existing state even
//         // if a user forgets to sign out.
//         // ...
//         // New sign-in will be persisted with session persistence.
//         return firebase.auth().signInWithEmailAndPassword(email, password);
//     })
//     .catch(function (error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//     });


$(document).ready(function () {
    var random_id = Math.floor(Math.random() * 100000);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.themoviedb.org/3/movie/" + random_id + "?language=en-US&api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb",
        "method": "GET",
        "headers": {},
        "data": "{}"
    };

    $.ajax(settings).done(function (response) {
        if (!response.adult) {
            $('.poster').attr('src', 'http://image.tmdb.org/t/p/w500' + response.poster_path);
            $('.banner').css('display', 'block');
            // setVideo(random_id);
            // if (response.video) {
            //     $('.banner-a').attr('href', '/vhstube.html');
            // } else {
            // }
            $('.banner-a').attr('href', 'https://www.themoviedb.org/movie/' + random_id);
        }
    });

    // setTimeout(function () {
    //     let viewheight = $(window).height();
    //     let viewwidth = $(window).width();
    //     let viewport = document.querySelector("meta[name=viewport]");
    //     viewport.setAttribute("content", "height=" + viewheight + "px, width=" + viewwidth + "px, initial-scale=1.0");
    // }, 300);


    $('.menu-btn').click(function (e) {
        e.preventDefault();
        $('.menu').toggleClass('menu_active');
        $('.menu-btn').toggleClass('menu-btn_active');
        var lastScrollTop = 0;
        $(window).scroll(function (event) {
            var st = $(this).scrollTop();
            if (st > lastScrollTop) {
                $('.menu-btn_active').click();
            }
            lastScrollTop = st;
        });
    });

    $('.close-banner-btn').click(function () {
        $('.banner').hide();
    });

    $('.close-login-window-btn').click(function () {
        $('.login-window').css('transform', 'translateX(-200%)');
    });

    $('.Login').click(function () {
        $('.login-window').css('transform', 'translateX(0)');
    });

    $('.Nickname').click(function () {
        $('.profile').css('transform', 'translateX(0)');
    });

    $('.close-profile-window-btn').click(function () {
        $('.profile').css('transform', 'translateX(-300%');
    });

    $('.Exit').click(function () {
        firebase.auth().signOut().then(
            $('.close-profile-window-btn').click()
        ).catch(error => console.log(error));
    });

    $('.registration-btn').click(function () {
        $('#login-title').text('Зарегистрироваться');
        $('#submit').val('Зарегистрироваться');
        $('.login-window').css('height', '70%');
        $('#e-mail').css('display', 'block');
        $('#repeat_password').css('display', 'block');
        $('.registration-btn').css('display', 'none');
        $('.login-btn').css('display', 'block');
    });
    $('.login-btn').click(function () {
        $('#login-title').text('Войти в личный кабинет');
        $('#submit').val('Войти');
        $('.login-window').css('height', '50%');
        $('#repeat_password').css('display', 'none');
        $('.registration-btn').css('display', 'block');
        $('.login-btn').css('display', 'none');
    });

    $('#submit').click(function () {
        if ($('#login-title').text() === 'Войти в личный кабинет') {
            var email = $('#e-mail').val();
            var password = $('#password').val();
            firebase.auth().signInWithEmailAndPassword(email, password).then(args => {
                $('.close-login-window-btn').click();
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                $('.alert').text(errorCode + ' ' + errorMessage);
                $('.alert').css('display', 'block');
                // ...
            });
        } else {
            var email = $('#e-mail').val();
            var password = $('#password').val();
            var repeat_password = $('#repeat_password').val();
            if (repeat_password === password) {
                firebase.auth().createUserWithEmailAndPassword(email, password).then(
                    args => {
                        $('.close-login-window-btn').click();
                    }
                ).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    $('.alert').text(errorCode + ' ' + errorMessage);
                    $('.alert').css('display', 'block');
                    // ...
                });
            } else if (repeat_password !== password) {
                $('.alert').text('Повторный пароль введен неверно');
                $('.alert').css('display', 'block');
            }
        }
    });

    var fileName = location.href.split("/").slice(-1)[0];
    // console.log(fileName);
    if (fileName.includes('reviews.html')) {
        commentsRef.on('value', function (snapshot) {
            var comments = [];
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                var p = `<p class="commentP">${childData.Comment}</p>`;
                var userP = `<div><p class="NicknameP">${childData.Nickname}</p><p class="DateP">${new Date(childData.CommentDate).toGMTString()}</p></div>`;
                var div = `<div class="comment">${userP+p}</div>`;
                comments.push(div);
            });
            comments.reverse();
            comments = comments.join("");
            $('#sectionComment').css('height', 'auto');
            $('#comments').html(comments);
        });
    }

    if (fileName.includes('vhstube.html')) {
        videosRef.on('value', function (snapshot) {
            var videoTable = "<tr>";
            var c = 0;
            snapshot.forEach(function (childSnapshot) {
                if (c % 3 == 0) {
                    videoTable += "</tr><tr>";
                }
                var childData = childSnapshot.val();
                var nicknameP = `<p class="NicknameV">Опубликовано: ${childData.Nickname}</p`;
                var dateP = `<p class="DateV">${new Date(childData.Date).toGMTString()}</p>`;
                var video = `<iframe src="https://www.youtube.com/embed/${childData.URL}" frameborder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen></iframe>`;
                videoTable += `<td><div class="videoSection">${nicknameP}<br>${dateP}${video}</div></td>`;
                c++;
            });
            videoTable += "</tr>"
            $('#videos').html(videoTable);
        });
    }

    $('#Send').click(function () {
        var newCommentsRef = commentsRef.push();
        newCommentsRef.set({
            Nickname: $('.Nickname').text(),
            CommentDate: "" + new Date(),
            Comment: $('#commentText').val()
        });

        $('#commentText').val('');
    });

    // function setVideo(random_id) {
    //     var settings = {
    //         "async": true,
    //         "crossDomain": true,
    //         "url": "https://api.themoviedb.org/3/movie/" + random_id + "/videos?language=en-US&api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb",
    //         "method": "GET",
    //         "headers": {},
    //         "data": "{}"
    //     }

    //     $.ajax(settings).done(function (response) {
    //         if (response.results.length != 0) {
    //             $('#vhstube').attr('src', 'https://www.youtube.com/embed/' + response.results[0].key);
    //         }
    //         // console.log(response.results[0].key);
    //     });
    // }

    $('#submitVideo').click(function () {
        var url = $('#videoURL').val();
        console.log(url);
        if (url === "") {
            $('#videoURL').val('Your field is empty.');
        } else {
            var myRe = /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\-_]+)/;
            if (myRe.test(url)) {
                console.log("It's fine");
                var newvideosRef = videosRef.push();
                newvideosRef.set({
                    Date: "" + new Date(),
                    Nickname: $('.Nickname').text(),
                    URL: url.match(myRe)[url.match(myRe).length - 1]
                });
                $('#videoURL').val("");
            } else {
                console.log("Bruuh");
            }
        }

    });
});