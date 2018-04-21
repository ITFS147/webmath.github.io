//config to connect to firebase
var config = {
    apiKey: "AIzaSyDHN6epAFTpGwywxeqKpc1vzNERGLYfguE",
    authDomain: "math-web-kmitl.firebaseapp.com",
    databaseURL: "https://math-web-kmitl.firebaseio.com",
    projectId: "math-web-kmitl",
    storageBucket: "math-web-kmitl.appspot.com",
};
firebase.initializeApp(config);
//prepare to get image from firebase storage
var stRef = firebase.firestore();
//prepare to get teacher from firebase database
var tdRef = firebase.database().ref('teacher');
//load data once per refresh not realtime
var email_c = 0;
var phone_c = 0;
var education_c = 0;
var research_c = 0;
var spacial_c = 0;
var response_c = 0;
tdRef.once('value', function (snapshot) {
    count = 0;
    //for in every child of data
    snapshot.forEach(function (childSnapshot) {
        count += 1;
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        if (childData.uid == localStorage.getItem('uid')) {
            var fileName = 'user' + pad(count) + '.jpg';
            var imagesRef = 'user_pic%2F' + fileName;
            $('#avatar_p').attr('src', 'https://firebasestorage.googleapis.com/v0/b/math-web-kmitl.appspot.com/o/' + imagesRef + '?alt=media')
            $('#name-show').append(childData.name_en + ' ' + childData.surname_en + '<BR>' + childData.name + ' ' + childData.surname);
            document.getElementById('en_title').value = childData.title_en;
            document.getElementById('th_title').value = childData.title;
            document.getElementById('en_fname').value = childData.name_en;
            document.getElementById('en_lname').value = childData.surname_en;
            document.getElementById('th_fname').value = childData.name;
            document.getElementById('th_lname').value = childData.surname;
            email_lst = childData.email;
            for (i = 0; i < email_lst.length; i++) {
                $('#all-email').append(appendEmail(email_lst[i], i))
                email_c = i;
            }
            phone_lst = childData.tel;
            for (i = 0; i < phone_lst.length; i++) {
                $('#all-phone').append(appendPhone(phone_lst[i], i))
                phone_c = i;
            }
            document.getElementById('rest_room').value = childData.room;
            document.getElementById('homepage').value = childData.homepage;
            education_lst = childData.education;
            for (i = 0; i < education_lst.length; i++) {
                $('#all-education').append(appendEducation(education_lst[i], i))
                education_c = i;
            }
            spacial_lst = childData.specialized_interests;
            for (i = 0; i < spacial_lst.length; i++) {
                $('#all-spacial').append(appendSpacial(spacial_lst[i], i))
                spacial_c = i;
            }
            research_lst = childData.research_;
            for (i = 0; i < research__lst.length; i++) {
                $('#all-research_').append(appendResearch(research__lst[i], i))
                spacial_c = i;
            }

        }
        //     document.querySelector('#teacher-list')
        // .innerHTML += teacherCard(childData, count);
    });
    //retreive data for president
});

function signOut() {
    firebase.auth().signOut().then(function () {
        localStorage.clear();
        alert('Signed Out!! Complete');
        window.location.href = 'index.html';
    }).catch(function (error) {
        console.log(error);
    });
}

function resetPassword() {
    var email = localStorage.getItem('email');
    firebase.auth().sendPasswordResetEmail(email).then(
        function () {
            alert('Password Reset Email Sent to your Inbox!');
        }).catch(
            function (error) {
                console.log(error);
            }
        )
}

function appendEmail(email, id) {
    html = "";
    if (id == 0) {
        html += '<div id="email0">'
        html += '<input type="email" class="form-control border-input" placeholder="Email" value="' + email + '">'
        html += '</div>'
        return html
    } else {
        html += '<div id="email' + id + '">'
        html += '<input type="email" class="form-control border-input" placeholder="Email" value="' + email + '">'
        html += '<a href="#" onclick="removeEmail(&quot;email' + id + '&quot;)"><img src="images/icons/delete.png">ลบข้อมูล</a>'
        html += '</div>'
        return html
    }

}

function appendPhone(phone, id) {
    html = "";
    if (id == 0) {
        html += '<div id="phone0">'
        html += '<input type="text" class="form-control border-input" placeholder="Phone" value="' + phone + '">'
        html += '</div>'
        return html
    } else {
        html += '<div id="phone' + id + '">'
        html += '<input type="text" class="form-control border-input" placeholder="Phone" value="' + phone + '">'
        html += '<a href="#" onclick="removePhone(&quot;phone' + id + '&quot;)"><img src="images/icons/delete.png">ลบข้อมูล</a>'
        html += '</div>'
        return html
    }

}

function appendEducation(education, id) {
    html = "";
    if (id == 0) {
        html += '<div id="education0">'
        html += '<input type="text" class="form-control border-input" placeholder="Education" value="' + education + '">'
        html += '</div>'
        return html
    } else {
        html += '<div id="education' + id + '">'
        html += '<input type="text" class="form-control border-input" placeholder="Education" value="' + education + '">'
        html += '<a href="#" onclick="removeEducation(&quot;education' + id + '&quot;)"><img src="images/icons/delete.png">ลบข้อมูล</a>'
        html += '</div>'
        return html
    }

}

function appendSpacial(spacial, id) {
    html = "";
    if (id == 0) {
        html += '<div id="spacial0">'
        html += '<input type="text" class="form-control border-input" placeholder="Interest" value="' + spacial + '">'
        html += '</div>'
        return html
    } else {
        html += '<div id="spacial' + id + '">'
        html += '<input type="text" class="form-control border-input" placeholder="Interest" value="' + spacial + '">'
        html += '<a href="#" onclick="removeSpacial(&quot;spacial' + id + '&quot;)"><img src="images/icons/delete.png">ลบข้อมูล</a>'
        html += '</div>'
        return html
    }

}

function appendResearh(spacial, id) {
    html = "";
    if (id == 0) {
        html += '<div id="spacial0">'
        html += '<input type="text" class="form-control border-input" placeholder="Interest" value="' + spacial + '">'
        html += '</div>'
        return html
    } else {
        html += '<div id="spacial' + id + '">'
        html += '<input type="text" class="form-control border-input" placeholder="Interest" value="' + spacial + '">'
        html += '<a href="#" onclick="removeSpacial(&quot;spacial' + id + '&quot;)"><img src="images/icons/delete.png">ลบข้อมูล</a>'
        html += '</div>'
        return html
    }

}

function createEmail() {
    email_c += 1;
    html = "";
    html += '<div id="email' + email_c + '">'
    html += '<input type="email" class="form-control border-input" placeholder="Email">'
    html += '<a href="#" onclick="removeEmail(&quot;email' + email_c + '&quot;)"><img src="images/icons/delete.png">ลบข้อมูล</a>'
    html += '</div>'
    $('#all-email').append(html);
}

function createPhone() {
    phone_c += 1;
    html = "";
    html += '<div id="phone' + phone_c + '">'
    html += '<input type="text" class="form-control border-input" placeholder="Phone">'
    html += '<a href="#" onclick="removePhone(&quot;phone' + phone_c + '&quot;)"><img src="images/icons/delete.png">ลบข้อมูล</a>'
    html += '</div>'
    $('#all-phone').append(html);
}

function createEducation() {
    education_c += 1;
    html = "";
    html += '<div id="education' + education_c + '">'
    html += '<input type="text" class="form-control border-input" placeholder="Education">'
    html += '<a href="#" onclick="removeEducation(&quot;education' + education_c + '&quot;)"><img src="images/icons/delete.png">ลบข้อมูล</a>'
    html += '</div>'
    $('#all-education').append(html);
}

function createSpacial() {
    spacial_c += 1;
    html = "";
    html += '<div id="spacial' + spacial_c + '">'
    html += '<input type="text" class="form-control border-input" placeholder="Interest">'
    html += '<a href="#" onclick="removeSpacial(&quot;spacial' + spacial_c + '&quot;)"><img src="images/icons/delete.png">ลบข้อมูล</a>'
    html += '</div>'
    $('#all-spacial').append(html);
}


function removeEmail(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
    email_c -= 1;
}

function removePhone(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
    phone_c -= 1;
}

function removeEducation(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
    phone_c -= 1;
}

function removeSpacial(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
    spacial_c -= 1;
}

//pad number one length with zero
function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }