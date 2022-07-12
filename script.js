var dragobj = null,
    focusObj = null;
var colorInput = document.getElementById("color");
var bgcolorInput =  document.getElementById("bg_color");
var fontsizeInput =  document.getElementById("font_size");
var paddingInput = document.getElementById("padding");
var borderRadiusInput = document.getElementById("border-radius");
var dropzone = rel('dropzone')
var settings = rel('settings')

const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

function rel(ob) {
    if (ob) {
        return document.getElementById(ob)
    } else {
        return null
    }
}

function gTxt(ob, txt) {
    rel(ob).innerHTML = txt;
}
  
function setFocus(obj) {
    setBlur();
    if (obj) {
      move = null;
      move = obj;
        dragobj = rel(obj);
        dragobj.style.borderStyle = 'ridge';
        dragobj.style.zIndex = 3;
        colorInput.value =   rgb2hex(dragobj.style.color);
        let padding = dragobj.style.padding;
        padding = padding.substring(0,padding.length - 2)
        paddingInput.value = padding;
        rangevalue2.value=padding+'px';
        if(dragobj.style.backgroundColor){
          bgcolorInput.value =   rgb2hex(dragobj.style.backgroundColor);
        }
        if(dragobj.style.fontSize){
         $('#font_size').val(dragobj.style.fontSize).attr('selected',true)
        }
        else{
             $('#font_size').val('').attr('selected',true)
        }

         if(dragobj.style.fontFamily){
         $('#font').val(dragobj.style.fontFamily).attr('selected',true)
        }
        else{
             $('#font').val('').attr('selected',true)
        }

        if(obj == 'college_logo' || obj == 'student_image'){
          $("input:radio[name=border]").attr("disabled",false);
             $("#font_size option").prop('disabled', true);
          if(dragobj.firstChild.style.borderRadius == '50%'){
            $("#radio2").prop("checked", true);
          }
          else{
            $("#radio1").prop("checked", true);
          }
        }
        else{
            borderRadiusInput.disabled = false;
               let radius = dragobj.style.borderRadius;
        radius = radius.substring(0,radius.length - 2)
        borderRadiusInput.value = radius;
         rangevalue1.value=radius+'px';
               $("#radio1").prop("checked", true);
            $("input:radio[name=border]").attr("disabled",true);
        }
        colorInput.disabled = false;
        bgcolorInput.disabled = false;
        paddingInput.disabled = false;
        $("#font_size option").prop('disabled', false);
        $("#font option").prop('disabled', false);
        $(document).keydown(function(e){
          pressedKey = e.which;
            switch (pressedKey) {
      case 37:
        $(`#`+move).css('margin-left', '-=5');
        break;
      case 38:
        $(`#`+move).css('margin-top', '-=5');
        break;
      case 39:
        $(`#`+move).css('margin-left', '+=5');
        break;
      case 40:
        $(`#`+move).css('margin-top', '+=5');
        break;
    }
});
        focusObj = dragobj;
    }
}

function setBlur() {
    if (focusObj) {
        focusObj.style.backgroundColor = 'none';
        focusObj.style.borderStyle = 'none';
        focusObj.style.zIndex = 1;
        focusObj = null;
        colorInput.value = '#000000'
        colorInput.disabled = true;
        bgcolorInput.value = '#ffffff'
        bgcolorInput.disabled = true;
        paddingInput.value = 0;
        paddingInput.disabled = true;
        rangevalue2.value=0;
         borderRadiusInput.value = 0;
        borderRadiusInput.disabled = true;
        rangevalue1.value=0;

           $('#font_size').val('').attr('selected',true)
            $("#font_size option").prop('disabled', true);
              $('#font').val('').attr('selected',true)
            $("#font option").prop('disabled', true);
            $("input:radio[name=border]").attr("disabled",true);
    }
}

document.addEventListener('click', function(event) {
  var ignoreClickOnMeElement = dragobj;

    var isClickInsideElement = ignoreClickOnMeElement.contains(event.target);
    var isClickedInSettings = settings.contains(event.target)
  
    if (!isClickInsideElement && !isClickedInSettings) {
        setBlur();
    }
});

interact('.resizable')
  .resizable({
    edges: { top: true, left: true, bottom: true, right: true },
    listeners: {
      move: function (event) {
        let { x, y } = event.target.dataset

        x = (parseFloat(x) || 0) + event.deltaRect.left
        y = (parseFloat(y) || 0) + event.deltaRect.top

        Object.assign(event.target.style, {
          width: `${event.rect.width}px`,
          height: `${event.rect.height}px`,
          transform: `translate(${x}px, ${y}px)`
        })

        Object.assign(event.target.dataset, { x, y })
      }
    }
  })

  interact('.resizable-right')
  .resizable({
    edges: { top: false, left: false, bottom: false, right: true },
    listeners: {
      move: function (event) {
        let { x, y } = event.target.dataset

        x = (parseFloat(x) || 0) + event.deltaRect.left
        y = (parseFloat(y) || 0) + event.deltaRect.top

        Object.assign(event.target.style, {
          width: `${event.rect.width}px`,
          height: `${event.rect.height}px`,
          transform: `translate(${x}px, ${y}px)`
        })

        Object.assign(event.target.dataset, { x, y })
      }
    }
  })

interact('.draggable').draggable({
  listeners: {
    start (event) {
      // console.log(event.type, event.target)
    },
    move (event) {
      const target = event.target;
      const dataX = target.getAttribute('data-x')
      const dataY = target.getAttribute('data-y')

      const initialX = parseFloat(dataX) || 0;
      const initialY = parseFloat(dataY) || 0;

      const deltaX = event.dx;
      const deltaY = event.dy;

      const newX = initialX + deltaX;
      const newY = initialY + deltaY;

      target.style.transform = `translate(${newX}px,${newY}px)`;
      target.setAttribute('data-x',newX)
      target.setAttribute('data-y',newY)
    },
    end(event){
      const dropzone = document.querySelector('.dropzone') 
      // console.log(dropzone)
    }
  }
})

$(document).ready(function() {    
  $(':checkbox').change(function(){
        var id = $(this).attr('value');
        if(this.checked)
            $(`#`+id).fadeIn('slow');
        else
            $(`#`+id).fadeOut('slow');
    });    
});

function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.dropzone').css('background', 'transparent url('+e.target.result +') no-repeat');
                 $('.dropzone').css('background-size', 'cover');
                 $('.bg_img').empty();
                 $('.bg_img').append('<button style="background:none; border:none;" onclick="removebg()">Remove background</button>');
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    function removebg(){
       $('.dropzone').css('background', '#fff');
       $('.bg_img').empty();
        $('.bg_img').append(`<input class="input-file" id="my-file" type="file"  onchange="readURL(this);">
                                    <label tabindex="0" for="my-file" class="input-file-trigger">Select background...</label>`);
    }


colorInput.addEventListener("input", function(){
  var color = colorInput.value;
  focusObj.style.color = color;
}, false);

bgcolorInput.addEventListener("input", function(){
  var bgcolor = bgcolorInput.value;
  focusObj.style.backgroundColor = bgcolor;
}, false);

$('select.font_size').on('change', function() {
  focusObj.style.fontSize = this.value;
});

$('select.font').on('change', function() {
  focusObj.style.fontFamily = this.value;
});

$('input[type=radio][name=border]').change(function() {
  imageObj = focusObj.firstChild;
    if (this.value == 'square') {
        imageObj.style.borderRadius="0%";j
    }
    else if (this.value == 'circle') {
        imageObj.style.borderRadius="50%";
    }
});

function showVal(val){
  focusObj.style.padding = val+'px';
}

function showValRadius(val){
  focusObj.style.borderRadius = val+'px';
}


function PrintElem()
{
    var printContents = document.getElementById('dropzone').innerHTML;
			var originalContents = document.body.innerHTML;

			document.body.innerHTML = printContents;

			window.print();

			document.body.innerHTML = originalContents;
}


