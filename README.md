Cutter.js
========

Cut any elements from web page!

Visit <a href="http://likerrr.github.io/cutterjs">website</a> for more info

## Setup
```
$ git clone git@github.com:likerRr/cutterjs.git
```
1. Download .zip or clone .git
2. Extract or copy files to project scripts folder
3. Include downloaded files and jQuery library in your project
```
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="cutter.min.js">
```

## How to
You only need to initialize plugin with jQuery element, that wraps area where you want to cut:
```
$('body').cutter('init');
```
By default, init method have some default options:

1. Elements under cursor appear with border
2. On cut action element will change it display style to `display: none`
3. On restore action element returns inherit display property

## Customizing
You can override almost all actions used in plugin just in `init` method with second parameter
> All callback methods accept one parameter - element in action

### mouseOver
Handle, when mouse moves over element in target area:
```
$('body').cutter('init', {
  mouseOver: function(el) {
    el.data('border', el.css('border'));
    el.css('border', 'dotted gray 1px');
  },
});
```
Now hovered elements will have dotted gray border
> Please, note, you need to store default data with `data` method to be able to restore previous element state

### mouseOut
Handle, when mouse moves out from element in target area:
```
$('body').cutter('init', {
  mouseOut: function(el) {
    el.css('border', el.data('border'));
  },
});
```
> Now we can restore default value of `border` property

### onCut
You can use that option to set up, how elements will be removed
```
$('body').cutter('init', {
  onCut: function(el) {
    el.data('opacity', el.css('opacity'));
    el.css('opacity', '0.3');
  },
});
```
> Note! You need to store default element state to be able to restore it

### afterCut
You may need to do list with deleted elements to be able to restore them, so that method will help you
```
var deletedElements = [];
...
$('body').cutter('init', {
   afterCut: function(el) {deletedElements .push(el);},
});
```

### onRestore
Function will handle when you call `restore` method
```
$('body').cutter('init', {
  onRestore: function(el) {
    el.css('opacity', el.data('opacity'));
  }
});
```

## Methods

### stop
I think that "cut mode" will not be active all the time, so we need to be able to stop it
```
var bodyArea = $('body').cutter('init');
...
bodyArea.cutter('stop');
```
After calling this method all actions will be suspended

### start
To restore "cut mode" call `start` method
```
var bodyArea = $('body').cutter('init');
...
bodyArea.cutter('stop');
...
bodyArea.cutter('start');
```

### deleted
You can also get all deleted items for current area, just use `deleted` method
```
var bodyArea = $('body').cutter('init');
...
var deletedItems = bodyArea.cutter('deleted');
```

### restore
Finally you need to be able to restore deleted elements. Method `restore` will help you. It accepts one optional parameter - deleted jQuery element or empty to restore all elements
```
var $lastDeleted;
...
var bodyArea = $('body').cutter('init', {
   afterCut: function(el) {$lastDeleted = el;},
});
// restore one
bodyArea.cutter('restore', $lastDeleted);
// restore all
bodyArea.cutter('restore');
```

## Examples
Coming soon. Now you can try it yourself. Have fun!

## Licence
Project under MIT licence, feel free to use and edit
