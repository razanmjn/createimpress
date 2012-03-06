var slide_count=0;
function die_slide(obj){
//obj.parentNode.parentNode.removeChild(obj.parentNode);
//slide_count-=1;
alert('this feature in not yet ready ! will be soon');
}
$(document).ready(
function(){

$('#pack_form_view').hide();
$('#new_impress').hide();

$('label.focused').click(function(){
$(this).addClass('styled');
$(this).siblings().removeClass('styled');
});

$('#new_impress_slide').click(function(){
	var e = $(document.createElement('div'));
	eClass = 'slide'+slide_count;
	slide_count+=1;
	e.addClass(eClass);
	$('#impress_buffer').append(e);
	$('.'+eClass).attr('id','slide'+slide_count).parent('div').append('<div class="delete-slide btn btn-danger" onclick="javascript: die_slide(this)">Delete This Slide</div><span class="count-info">Slide#'+slide_count+'</span>').css('width','800');
	$('.'+eClass).parent('div').append(g_option(slide_count));
	scrollTo('.'+eClass,500);

	area = new nicEditor({fullPanel : true}).panelInstance('slide'+slide_count,{hasPanel : true});
});



$('#save_and_download').click(function(){
	var slides = $('.nicEdit-main');
	var pack_div = "";
	var r_x,r_y,r_z,scale,rotate;
	if(slides.length<1){ alert('No Slides Created'); return false; } else
	{
		slides.each(function(index) {
		if(index>0){
		r_x=Math.floor(Math.random()*1000);
		r_y=Math.floor(Math.random()*1000);
		if ($('#rotate'+index).attr('checked')){
		rotate = "data-rotate='"+Math.floor(Math.random()*360)+"'";
		}else { rotate=""; }
		if ($('#scale'+index).attr('checked')){
		scale = "data-scale='"+Math.floor(Math.random()*10)+"'";
		}else { scale=""; }
		if ($('#3d'+index).attr('checked')){
		r_z = "data-z='"+Math.floor(Math.random()*1000)+"'";
		}else { r_z=""; }
		}
		else{
		r_x=0;
		r_y=100;
		r_z="";
		rotate="";
		scale="";
		}
		pack_div += "<div class='step' data-x='"+r_x+"' data-y='"+r_y+"'"+r_z+scale+rotate+">"+$(this).html()+"</div>";
		});
	}

	pack_div;

	$('#pack').attr('value',pack_div);
	$('#pack_pack').attr('value',pack_div);
	$('#pack_form_view').fadeIn('slow');
	$('#new_impress').fadeIn('slow');

});

function g_option(i){
i=i-1;
var opt='&nbsp; <label class="checkbox inline"><input type="checkbox" id="rotate'+i+'"> Rotate</label><label class="checkbox inline"><input type="checkbox" id="scale'+i+'"> Scale</label><label class="checkbox inline"><input type="checkbox" id="3d'+i+'"> 3D </label><hr />';
return opt;
}

function scrollTo(o,s){ var d = $(o).offset().top; $("html:not(:animated),body:not(:animated)").animate({ scrollTop: d-200}, s); }


});

