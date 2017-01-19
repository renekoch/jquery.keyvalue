#Key-Value jQuery plugin#
=====================

A very vanilla key value editor - needs more documentation, but it works.

 
##OPTIONS##

````
values           key-value object      [default=json parse input value]

placeholder      placeholder text      [default={key:"key",value:"value",delete:"remove"}]
wrapClass        wrap class            [default="keyvalue-wrap"]
lineClass        line class            [default="keyvalue-line"]
keyClass         key input class       [default="keyvalue-key"]
valueClass       value input class     [default="keyvalue-value"]
deleteClass      delete button class   [default="keyvalue-delete"]

onkeyadd         set event keyadd
onkeydelete      set event keydelete
onkeychange      set event keychange
````

##METHODS##

````
destroy()    	 removes key value editor, and revert back to input
option([key])    get option
values()         get key-value object
focus()          set focus
remove(key)      remove key         * not implemented *
add(key, value)  add key            * not implemented *
````

##EVENTS##

````
keyadd           when key is added
keydelete        when key is deleted
keychange        when when key is changed
````

##Gettin started##

````html
<html>
<body>
	<input class="keyvalue">
</body>
<script type="text/javascript">
	$('input.keyvalue').keyvalue({values:{key1:"value"}});
	var values = $('input.keyvalue').keyvalue('values');
</script>
</html>
````

##HTML output example##

````html
<div class="keyvalue-wrap">
	<div class="keyvalue-line" data-empty="1">
		<input type="text" class="keyvalue-key" placeholder="key">
		<input type="text" class="keyvalue-value" placeholder="value">
	 	<span class="keyvalue-delete" title="remove">x</span>
	</div>
</div>
````
