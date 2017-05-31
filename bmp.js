
onmessage =function (evt) {
	var d = evt.data;//通过evt.data获得发送来的数据
	console.log(d);
	var img_data_array = (new Uint8Array(d)).subarray(0, d.byteLength);
	console.log(img_data_array);
	parser_BMP(img_data_array);
}



function byte2_to_int(input_array, pos) {
	return (input_array[pos+1] << 8)+ input_array[pos];
}

function byte4_to_int(input_array, pos) {
	return (input_array[pos+3] << 24)+ (input_array[pos+2]<<16) + (input_array[pos+1] << 8)+ input_array[pos];
}


var g_img_width = 0;
var g_img_height = 0;
var g_img_array_pos = 0;

var pixel_rbg = new Array();

//draw one row
function fill_pixels_func(input_array) {

	var post_flag = 0;
	var rgb_string = "0,0";
	console.log("data_pos: " + g_img_array_pos);
	postMessage("img_d");
	for (var y_index=0; y_index<g_img_height; y_index++) {	
		for (var i=0;i<g_img_width; i++) {	
			pixel_rbg[1] = input_array[g_img_array_pos].toString(16); //B
			pixel_rbg[2] = input_array[g_img_array_pos+1].toString(16);//G
			pixel_rbg[0] = input_array[g_img_array_pos+2].toString(16); //R
			g_img_array_pos += 3;

			rgb_string += ",#";
			for (var k=0;k<3;k++) {
				rgb_string += ("0" + pixel_rbg[k]).slice(-2);
			}

			post_flag++;
			if (post_flag == 10) {
				setTimeout(postMessage(rgb_string),20);
				rgb_string = i + "," + y_index;
				post_flag = 0;
			}
		}
	}

	postMessage("img_z");
}

function parser_BMP(input_array) {
	var array_pos = 0;

	//"BM"
	if (input_array[0] !=  0x42 || input_array[1] !=  0x4D ) {
		alert("bmp header error");
	}

	//file size byte
	var file_size = (input_array[5] << 24)+ (input_array[4]<<16) + (input_array[3] << 8)+ input_array[2];
	console.log("file_size: "+file_size);

	//bitmap offset
	var bitmap_offset = (input_array[0xd] << 24)+ (input_array[0xc]<<16) + (input_array[0xb] << 8)+ input_array[0xa];
	console.log("bitmap_offset: "+bitmap_offset);
	g_img_array_pos = bitmap_offset;

	//bitmap header
	var bisize = byte4_to_int(input_array, 0xe);
	console.log("bisize: "+bisize);
	
	var biWidth = byte4_to_int(input_array, 0x12);
	console.log("biWidth: "+biWidth);
	g_img_width = biWidth;
	postMessage("img_w" + g_img_width);

	var biHeight= byte4_to_int(input_array, 0x16);
	console.log("biHeight: "+biHeight);
	g_img_height = biHeight;
	postMessage("img_h" + g_img_height);

	var biPlanes = byte2_to_int(input_array, 0x1a);
	console.log("biPlanes: "+biPlanes);

	var biBitCount= byte2_to_int(input_array, 0x1c);
	console.log("biBitCount: "+biBitCount);

	var biCompression = byte4_to_int(input_array, 0x1e);
	console.log("biCompression: "+biCompression);

	var biSizeImage = byte4_to_int(input_array, 0x22);
	console.log("biSizeImage: "+biSizeImage);

	var biXpelsPerMeter = byte4_to_int(input_array, 0x26);
	console.log("biXpelsPerMeter : "+biXpelsPerMeter );

	var biYpelsPerMeter = byte4_to_int(input_array, 0x2a);
	console.log("biYpelsPerMeter : "+biYpelsPerMeter );

	var biClrUsed = byte4_to_int(input_array, 0x2e);
	console.log("biClrUsed : "+biClrUsed );

	var biClrImportant = byte4_to_int(input_array, 0x32);
	console.log("biClrImportant : "+biClrImportant );

	//Palette
	if (biBitCount == 24) {
		var paletee_flag = 0; //no palette
	}

	fill_pixels_func(input_array);
}
