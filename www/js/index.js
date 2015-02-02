/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

$(document).ready(function(){
    document.addEventListener("deviceready", onDeviceReady, false);
    $('#email-submit').submit(function(event){
        event.preventDefault();
        if(!IsEmail($('#user_email').val()) || $('#user_email').val() == null){
            $('#user_email').addClass('error');
            return false;
        }
        var postData = $(this).serialize();
        var deviceID = device.uuid;
        $.ajax({
            type: 'POST',
            data: postData+'&amp;token='+deviceID,
            crossDomain: true,
            url: 'http://prelaunchr-damnfinewine.herokuapp.com/api/api_user',
            success: function(data){
                if(data.confirmation){
                    window.location.replace("/refer.html?count="+data.referrals);
                }else{
                    $('#user_email').addClass('error');
                }
                
            },
            error: function(){
                $('#user_email').addClass('error');
            }
        });
        
        return false;
    });
    
    if(getParameterByName("count")){
        var count = getParameterByName("count");
        var length = 0; alert(count);
        if (count <= 5){
            length = 150 + ((150)*count/5);
        } else if (count > 5 && count <= 10 ){
            length = 300 + ((200)*(count-5)/5);
        } else if (count > 10 && count <= 25 ){
            length = 500 + ((220)*(count-10)/15);
        } else if (count > 25 && count <= 50 ){
            length = 720 + ((310)*(count-25)/25);
        }else{
            length = 1030;
        }
        $(".progress").height(length);
    }
});

function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getLength(count){
    
    return length;
}