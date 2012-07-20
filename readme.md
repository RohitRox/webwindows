# jQuery webwindows | create windows ui in web
### Author: @roxxypoxxy & @xtranophilist
### Uses DragResize v1.0 by Angus Turnbull - http://www.twinhelix.com.

USAGE: 
```javascript 
$(document).ready(function() {
    $('div#some_id').webwindows();
});
// Binds an click event to div#some_id to fire a webwindow and put there its inner html , webwindows's title is set by the title of div#some_id

PROGRAMMATICAL CONTROL:

// fire up webwindow anywhere from the code
$.webwindows({ title: 'my title', content: 'be gud do gud'});

// fire up throw in the content of some div
$.webwindows({ title: 'my title', div: '#mydiv'});
$.webwindows({ title: 'my title', div: '.mydiv'});


// close the latest webwindow
$.closewebwindows();


//TODO
Callbacks