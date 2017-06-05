/*
 *	https://www.cnblogs.com/bigpo/p/4126806.html
 */
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
	return (x + y*w)*4;
}

function get_rgb(x, y, img_data) {
	var pos = xy_2_array_pos(x, y, img_data.width);
	var rgb = new Array();
	rgb[0] = img_data.data[pos];
	rgb[1] = img_data.data[pos+1];
	rgb[2] = img_data.data[pos+2];
	rgb[3] = img_data.data[pos+3];

	if (x==1000) {
		console.log(y+ " "+ pos + " " + img_data.data[pos] + " " + rgb);
	}

	return rgb;
}

function set_rgb(rgb, x, y, img_data) {
	var pos = xy_2_array_pos(x, y, img_data.width);
	img_data.data[pos] = rgb[0];
	img_data.data[pos+1] = rgb[1];
	img_data.data[pos+2] = rgb[2];
	img_data.data[pos+3] = rgb[3];
}

function thumbnail_nearest(canvas_img_data, step_w, step_h, dest_w, dest_h) {
	var new_img_data = g_my_canvas_cxt_algo.createImageData(dest_w, dest_h);
	var sum_x = 0;
	var sum_y = 0;


	for (let i=0; i<dest_w*dest_h*4;i++)
		new_img_data.data[i] = 200;

	for (let x=0; x<dest_w; x++) {
		sum_x++;
		sum_y = 0;
		for (let y=0; y<dest_h; y++) {
			var x_d = Math.round(x*step_w);
			var y_d = Math.round(y*step_h);
			var rgb = get_rgb(x_d,y_d, canvas_img_data);
			set_rgb(rgb, x, y, new_img_data);
			sum_y++;

			if (x==1000) {
				console.log(rgb);
			}
		}
	}

	console.log("nearest " + sum_x + " " + sum_y + " " + new_img_data.width + "," + dest_w);
	return new_img_data;
}

function algo_thumbnail(canvas_img_data, ratio_w, ratio_h)  {

	var dest_width = Math.round(canvas_img_data.width * ratio_w);
	var dest_heigth = Math.round(canvas_img_data.height * ratio_h);
	var step_w = canvas_img_data.width/dest_width;
	var step_h = canvas_img_data.height/dest_heigth;

	console.log(canvas_img_data.width + " " +  canvas_img_data.height+ " " +dest_width + " " + dest_heigth + " " + ratio_w+ " " + ratio_h);
	console.log("haha " +  " " + " " +dest_width + " " + dest_heigth + " " + step_w + " " + step_h);

	return thumbnail_nearest(canvas_img_data, step_w, step_h, dest_width, dest_heigth);
}


