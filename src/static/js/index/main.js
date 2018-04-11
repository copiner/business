
$(function(){
    // let smk = "we";
    // alert(smk);
    var people = ['geddy', 'neil', 'alex'];
    var html = ejs.render('<%= people.join(", "); %>', {people: people});
    $("#appcontent").html(html);

});
