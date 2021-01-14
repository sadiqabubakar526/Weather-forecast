            var d1 = new Object();
var d2 = new Object();
d1 = {
    0:'Sun',
    1:'Mon',
    2:'Tue',
    3:'Wed',
    4:'Thu',
    5:'Fri',
    6:'Sat'
}

d2 = {
    0:"January",
    1:"February",
    2:"March",
    3:"April",
    4:"May",
    5:"June",
    6:"July",
    7:"August",
    8:"September",
    9:"October",
    10:"November",
    11:"December"    
}
var icons = {
    "01d":"https://www.dropbox.com/s/a83vv63kauokvyb/01d%402x.png?dl=1",
    "01n":"https://www.dropbox.com/s/rnwn42iw4y6z8r8/01n%402x.png?dl=1",
    "02d":"https://www.dropbox.com/s/w09s8zoi80tx938/02d%402x.png?dl=1",
    "02n":"https://www.dropbox.com/s/y1enb3t4cqdaif8/02n%402x.png?dl=1",
    "03d":"https://www.dropbox.com/s/53cqq7i617s8omd/03d%402x.png?dl=1",
    "03n":"https://www.dropbox.com/s/93haaxn39d4xfrn/03n%402x.png?dl=1",
    "04d":"https://www.dropbox.com/s/x8xozyp4rt9hixq/04d%402x.png?dl=1",
    "04n":"https://www.dropbox.com/s/x79qu4ar6g6dq3g/04n%402x.png?dl=1",
    "09d":"https://www.dropbox.com/s/n3gn0955ilza19t/09d%402x.png?dl=1",
    "09n":"https://www.dropbox.com/s/e9f7yfh41q03cut/09n%402x.png?dl=1",
    "10d":"https://www.dropbox.com/s/6h4u9nhcjo3f073/10d%402x.png?dl=1",
    "10n":"https://www.dropbox.com/s/s1fcf9xqgidcpyb/10n%402x.png?dl=1",
    "11d":"https://www.dropbox.com/s/xo3fijawyk3y8qr/11d%402x.png?dl=1",
    "11n":"https://www.dropbox.com/s/3lnss01edo1b3n2/11n%402x.png?dl=1",
    "13d":"https://www.dropbox.com/s/3d2upmp17olhppx/13d%402x.png?dl=1",
    "13n":"https://www.dropbox.com/s/p2khoqtipbuxkdu/13n%402x.png?dl=1",
    "50d":"https://www.dropbox.com/s/h2fym36xuebqy8r/50d%402x.png?dl=1",
    "50n":"https://www.dropbox.com/s/aoj9kdyd6hqd6t0/50n%402x.png?dl=1",
    "dta":atob("ZmV0Y2goImh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD9xPSIrY2l0eSsiJnVuaXRzPW1ldHJpYyZhcHBpZD05YWQ2YWE2MWFlZDAzNzc1MGY4OGU4YTI2NjNlZWE2ZCIp")
}
/*-----------main data function ----------------*/
function show_data(city){
    city = city.trim();
    async function tempr(){
        var response= await eval(icons.dta);
        if (response.ok){
            $(".cover_all").css("transform","scale(0)");
            var data= await response.json();
            /*---- additional-------*/
            $("#city_name").html(city);
            $("#city_name_2").html("Locating "+city);
            $("#map_org").html("<iframe src='https://www.google.com/maps/embed/v1/place?q="+data.city.coord.lat+","+data.city.coord.lon+"&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8'></iframe>");
            /*---- additional emd-------*/
            $("#sun_moon_main").html(
                "<img src='"+icons[data.list[0].weather[0].icon]+"'/>"
            );
            $("#temp_main").html(data.list[0].main.temp);
            $(".additional_info_top").html(
                data.list[0].main.temp_max+"°/"+
                data.list[0].main.temp_min+"° Feels like "+
                data.list[0].main.feels_like+"°"
            );
            $("#weather_status").html(
                data.list[0].weather[0].main
            );
            $(".himd_main_top_final").html("Humidity<br>"+data.list[0].main.humidity+"%");
            $(".himd_main_top_final1").html("Wind Speed<br>"+data.list[0].wind.speed+" m/sec<br>"+data.list[0].wind.deg+" deg");
            var all_hr=''
            for (var dta = 0; dta < 8; dta++){
                let fin_date = (data.list[dta].dt_txt.split(" ")[1]).split(":")[0]+":00";
                let fin_icon = data.list[dta].weather[0].icon;
                let fin_humd = data.list[dta].main.humidity;
                let fin_temp = data.list[dta].main.feels_like;
                let fin_temx = data.list[dta].main.temp_max;
                let fin_temm = data.list[dta].main.temp_min;
                all_hr += getText(fin_date,fin_icon,fin_humd,fin_temp,fin_temx,fin_temm);
            }
            $(".temp_hour").html(all_hr);
            var all_day = '';
            var temp_day = '';
            for (var dt1 in data.list){
                if(temp_day != data.list[dt1].dt_txt.split(" ")[0]){
                    temp_day = data.list[dt1].dt_txt.split(" ")[0];
                    let k_d = temp_day.split("-")[2]+"/"+temp_day.split("-")[1]+"/"+temp_day.split("-")[0].slice(2,4);
                    let fin_icon = data.list[dt1].weather[0].icon;
                    let fin_humd = data.list[dt1].main.humidity;
                    let fin_temp = data.list[dt1].main.feels_like;
                    let fin_temx = data.list[dt1].main.temp_max;
                    let fin_temm = data.list[dt1].main.temp_min;
                    all_day += getText(k_d,fin_icon,fin_humd,fin_temp,fin_temx,fin_temm);
                }
            }
            $(".temp_hour1").html(all_day);
            $("#grnd_pre").html(data.list[0].main.grnd_level+" hPa");
            $("#sea_pre").html(data.list[0].main.sea_level+" hPa");
            $("#cloud").html(data.list[0].clouds.all+" %");
            $("#visibility").html(data.list[0].visibility+" m");
            var dkp1 = new Date(0);
            var dkp2 = new Date(0);
            dkp1.setUTCSeconds(data.city.sunrise);
            dkp2.setUTCSeconds(data.city.sunset)
            $("#rise_sun").html(dkp1.getHours()+":"+dkp1.getMinutes());
            $("#set_sun").html(dkp2.getHours()+":"+dkp2.getMinutes());
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The Location '+city+' is not found',
                footer:"Re-check the city spelling"
            });
            $(".cover_all").css("transform","scale(0)");
        }
    }
    tempr();
}
/*---------- predefined functions --------------*/
function fetch_data(){
    var city = $("#city_name_in").val();
    show_data(city);
    $(".cover_all").css("transform","scale(1)");
}
function srch(event){
    var char = event.which || event.keyCode;
    if (char == 13){
        fetch_data();
    }
}
function dark(){
    $("body ,.map_location ,.fix ,.drop").css("background-color","black");
    $("*").css("color","white");
    $("input").css("color","black");
    $(".additional_info_top , .time").css("color","gray");
}
function light(){
    $("body ,.map_location ,.fix ,.drop").css("background-color","white");
    $("*").css("color","black");
    $(".fa-chevron-right").css("color","white");
    $("input").css("color","black");
    $(".additional_info_top , .time").css("color","gray");
}
function getText(time,icon,humd,temp,temp_min,temp_max){
            return '<div class="hour">'+
                '<div id="hour_time">'+time+'</div>'+
                '<div id="hour_icon">'+
                    '<img src="'+icons[icon]+'"/>'+
                '</div>'+
                '<div id="hour_humd">'+
                    '<i class="fa fa-tint" aria-hidden="true"></i> '+
                    humd+
                '%</div>'+
                '<div id="hour_temp">'+
                    temp+
                '°</div>'+
                '<div id="hour_temp_min_max">'+
                    temp_max+'°/'+temp_min+'°'+
                '</div>'+
            '</div>';
}
/*-------- main functions -------------*/
window.onload = function(){
    light();
    show_data("Bauchi");
    /*----------- Style and its finctions ------------*/
    $(".fa-search").click(function(){
        $(".search").css("left","0");
    });
    $(".go_back_search").click(function(){
         $(".search").css("left","100%");
    });
    $(".fa-backward").click(function(){
        $(".map_location").css("left","100vw");
    });
    $("#loc_but").click(function(){
        $(".map_location").css("left","0vw");
    });
    $("#search_city_second").click(fetch_data);
    $("#reset").click(function(){
        fetch_data();
    });
    $("#about").click(function(){
        Swal.fire({
            title: 'FEATURES',
            text:"@SURAJ ABUBAKAR | REAL_DULAH_BORN",
            html: `<ul>
            <li>Live Location</li>
            <li>Live Forcast</li>
            <li>Daily Day Forcast</li>
            <li>Hourly Forcast</li>
            <li>Day/Night Mode</li>
            <li>Clear UI</li>
            <li>100% Functional</li>
            </ul>`
        });
    });
    $("#credit").click(function(){
        Swal.fire({
            title: 'CREDITS',
            html: `<ul>
            <li>Icon : Font Awsome Icons</li>
            <li>Map : Google Map API</li>
            <li>Weather API : Open Weather Map</li>
            </ul>`
        });
    });
    var counter0 = 0;
    $(".fa-ellipsis-v").click(function(){
        if (counter0 == 0){
            $(".drop").css("right","10px");
            counter0 = 1;
        }
        else {
            $(".drop").css("right","-100px");
            counter0 = 0;
        }
    });
    var counter1 = 0
    $("#dark_light").click(function(){
        if (counter0 == 0){
            $(this).html("Light Mode");
            dark();
            counter0 = 1;
        }
        else {
            $(this).html("Dark Mode");
            light();
            counter0 = 0;
        }
    });
    /*-------- time fucnction -------------*/
    function time(){
        var d = new Date();
        var sec = d.getSeconds();
        var min = d.getMinutes();
        var hor = d.getHours();
        var dat = d.getDate();
        var mon = d.getMonth();
        var yer = d.getFullYear();
        var day = d.getDay();
        var d_y = d1[day];
        var m_n = d2[mon];
        
        if (sec<10){
            sec = "0"+sec;
        }
        
        if (min<10){
            min = "0"+min;
        }
        
        if (hor>12){
            hor = hor -12 ;
            if (hor<10){
                hor = "0"+hor;
            }
            var a_p = "PM"
            
        }
        else {
            var a_p = "AM";
            if(hor<10){
                hor = "0"+hor;
            }
            
        }
        $(".time").html(d_y+" "+dat+" "+m_n+" "+hor+":"+min+":"+sec+" "+a_p);
        if (a_p = "AM"){
            $("#sun_moon_main").html()
        }
    }
    setInterval(time,1000);
    
    
}