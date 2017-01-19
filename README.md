**Key-Value jQuery plugin**
 
 **OPTIONS:**
 
 values           key-value object      [default=json parse input value]<br>
<br>
 placeholder      placeholder text      [default={key:"key",value:"value",delete:"remove"}]<br>
<br>
 wrapClass        wrap class            [default="keyvalue-wrap"]<br>
 lineClass        line class            [default="keyvalue-line"]<br>
 keyClass         key input class       [default="keyvalue-key"]<br>
 valueClass       value input class     [default="keyvalue-value"]<br>
 deleteClass      delete button class   [default="keyvalue-delete"]<br>
<br>
 onkeyadd         set event keyadd<br>
 onkeydelete      set event keydelete<br>
 onkeychange      set event keychange<br>
<br>
 **METHODS:**
 
 option([key])    get option<br>
 values()         get key-value object<br>
 focus()          set focus<br>
 remove(key)      remove key         * not implemented *<br>
 add(key, value)  add key            * not implemented *<br>
<br>
 **EVNETS:**
 
 keyadd           when key is added<br>
 keydelete        when key is deleted<br>
 keychange        when when key is changed<br>
<br>
 **HTML output example:**
 
 ````html
 <div class="keyvalue-wrap">
	 <div class="keyvalue-line" data-empty="1">
		 <input type="text" class="keyvalue-key" placeholder="key">
		 <input type="text" class="keyvalue-value" placeholder="value">
		 <span class="keyvalue-delete" title="remove">x</span>
	 </div>
 </div>
 ````
