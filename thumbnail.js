
// 隔行采样，丢失信息
function algo_thumbnail_interlace_sample(canvas_img_data)  {
	var zoom=4;
	var new_img_data = g_my_canvas_cxt_algo.createImageData(canvas_img_data.width/zoom,canvas_img_data.height/zoom);

	var canvas_img_pos = 0;
	console.log("w: " + new_img_data.width + ", h: " + new_img_data.height + " " + new_img_data.width*new_img_data.height);
	for (var i=0;i<new_img_data.width*new_img_data.height*4;i+=4) {
		new_img_data.data[i] = canvas_img_data.data[canvas_img_pos]; 
		new_img_data.data[i+1] = canvas_img_data.data[canvas_img_pos+1]; 
		new_img_data.data[i+2] = canvas_img_data.data[canvas_img_pos+2]; 
		new_img_data.data[i+3] = canvas_img_data.data[canvas_img_pos+3]; 
		//new_img_data.data[i+3] = 255; 

		canvas_img_pos += 4*zoom;
		if ((i+4)%new_img_data.width == 0) {
			canvas_img_pos += 4*canvas_img_data.width*(zoom-1);
		}
	}
	console.log("i: " + i);

	console.log("w: " + new_img_data.width + ", h: " + new_img_data.height);
	console.log("new_img_data: " + new_img_data.data);
	console.log("w: " + canvas_img_data.width + ", h: " + canvas_img_data.height);
	console.log("canvas data: " + canvas_img_data.data);
	return new_img_data;
}

function xy_2_array_pos(x, y, w) {
	return (x*w + y)*4;
}

function get_rgb(x, y, img_data) {
	var pos = xy_2_array_pos(x, y, img_data.width);
	var rgb = new Array();
	rgb[0] = img_data.data[pos];
	rgb[1] = img_data.data[pos+1];
	rgb[2] = img_data.data[pos+2];
	rgb[3] = img_data.data[pos+3];

	return rgb;
}

var zoom = 2;
function algo_thumbnail(canvas_img_data, move_x, move_y)  {

	var dest_width = canvas_img_data.width + move_x;
	var dest_heigth = canvas_img_data.height + move_y;
	var ratio_w = canvas_img_data.width/dest_width;
	var ratio_h = canvas_img_data.width/dest_heigth;

	alert("haha " + move_x + " "+move_y + " " +dest_width + " " + dest_heigth + " " + ratio_w + " " + ratio_h);

	return new_img_data;
}

function thumbnail_nearest(canvas_img_data, ratio_w, ratio_h) {

}
