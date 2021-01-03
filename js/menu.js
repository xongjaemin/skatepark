function slide(Id, interval, to) {
    var obj = document.getElementById(Id);
    var H, step = 5;

    if (obj == null) return;
    if (to == undefined) { // user clicking
        if (obj._slideStart == true) return;
        if (obj._expand == true) {
            to = 0;
            obj.style.overflow = "hidden";
        } else {
            slide.addId(Id);
            for(var i=0; i < slide.objects.length; i++) {
                if (slide.objects[i].id != Id && slide.objects[i]._expand == true) {
                    slide(slide.objects[i].id);
                }
            }

            obj.style.height = "";
            obj.style.overflow = "";
            obj.style.display = "block";
            to = obj.offsetHeight; // 이거이거
            obj.style.overflow = "hidden";
            obj.style.height = "1px";
        }
        obj._slideStart = true;
    }
   
    step            = ((to > 0) ? 1:-1) * step;
    interval        = ((interval==undefined)?1:interval);

    obj.style.height = (H=((H=(isNaN(H=parseInt(obj.style.height))?0:H))+step<0)?0:H+step)+"px";
    
   
   
    if (H <= 0) {
        obj.style.display = "none";
        obj.style.overflow = "hidden";
        obj._expand = false;
        obj._slideStart = false;
    } else if (to > 0 && H >= to) {
        obj.style.display = "block";
        obj.style.overflow = "visible";
        obj.style.height = H + "px";
        obj._expand = true;
        obj._slideStart = false;
    } else {
        setTimeout("slide('"+Id+"' , "+interval+", "+to+");", interval);
    }
}
slide.objects = new Array();
slide.addId = function(Id)
{
    for (var i=0; i < slide.objects.length; i++) {
        if (slide.objects[i].id == Id) return true;
    }
    slide.objects[slide.objects.length] = document.getElementById(Id);
}
