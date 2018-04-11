$(function(){
  Handlebars.registerPartial('header', function () {
      return new Handlebars.SafeString('<div>This is header</div>')
  });
  Handlebars.registerPartial('lefter', function () {
      return new Handlebars.SafeString('<div>This is lefter</div>')
  });
	//Step 2: Define the data
  var context = {
    author: {firstName: "Alan", lastName: "Johnson"},
    body: "I Love Handlebars",
    comments: [{
      author: {firstName: "Yehuda", lastName: "Katz"},
      body: "Me too!"
    }]
  };

  Handlebars.registerHelper('fullName', function(person) {
    return person.firstName + " " + person.lastName;
  });

	//Step 3: Compile the <script> template with HandleBars -- returns func
  var tpl =  $("#tpl").html();
  var template = Handlebars.compile(tpl);

	//Step 4: Pass the data into the func -- returns the final HTML
  var html = template(context);

	//Step 5: add the final HTML to desired tag
	$("#body").html(html);
	//$( ".container" ).append( $( "h2" ) );

});
