
#include <opencv2/opencv.hpp>
#include <iostream>
using namespace std;
using namespace cv;

int main(int argc, char** argv) {
	cout << "argc=" << argc << endl;
	for(int i = 0; i < argc;i++){
       	   printf("%s\n",argv[i]);
    	}
//	char *s = argv[1];
//	printf("%s\n",s);
	string str(argv[1]);
	str = "/usr/java/tomcat/webapps/identificationChangeBackground/upload/" + str + ".jpg";
	cout << str << endl;
	string c1(argv[2]);
	string c2(argv[3]);
	string c3(argv[4]);
	int color1 = atoi(c1.c_str());
	int color2 = atoi(c2.c_str());
	int color3 = atoi(c3.c_str());
	Mat src = imread(str);
	if (src.empty()) {
		printf("could not load image...\n");
		return -1;
	}
//	imshow("原图", src);

	// 1.将二维图像数据线性化
	Mat data;
	for (int i = 0; i < src.rows; i++)     //像素点线性排列
		for (int j = 0; j < src.cols; j++)
		{
			Vec3b point = src.at<Vec3b>(i, j);
			Mat tmp = (Mat_<float>(1, 3) << point[0], point[1], point[2]);
			data.push_back(tmp);
		}

	// 2.使用K-means聚类；分离出背景色
	int numCluster = 4;
	Mat labels;
	TermCriteria criteria = TermCriteria(TermCriteria::EPS + TermCriteria::COUNT, 10, 0.1);
	kmeans(data, numCluster, labels, criteria, 3, KMEANS_PP_CENTERS);

	// 3.背景与人物二值化
	Mat mask = Mat::zeros(src.size(), CV_8UC3);
	int index = src.rows * 2 + 2;  //获取点（2，2）作为背景色
	int cindex = labels.at<int>(index);
	// 提取背景特征
	int peripheralPoint = 0;  //边缘点
	for (int row = 0; row < src.rows; row++) {
		//将mask 全部像素点置为  颜色 80
		for (int col = 0; col < src.cols; col++) {
			mask.at<uchar>(row, col) = 80;
		}
		//从左边遍历图像  当遇到有5个不是背景颜色时 退出
		for (int col = 0; col < src.cols; col++) {
			index = row * src.cols + col;
			int label = labels.at<int>(index);
			if (label == cindex) { // 背景
				mask.at<uchar>(row, col) = 0;
			}
			else if(peripheralPoint<2){
				mask.at<uchar>(row, col) = 0;
				peripheralPoint++;
			}
			else {
				mask.at<uchar>(row, col) = 255;
				peripheralPoint++;
			}
			if (peripheralPoint == 5) { //到达边缘时，跳出循环
				peripheralPoint = -1;
				break;
			}
		}
		//从右边遍历图像
		if (peripheralPoint == -1) {
			// 当遇到有5个不是背景颜色时 退出
			for (int col = src.cols - 1; col > 0; col--) {
				index = row * src.cols + col;
				int label = labels.at<int>(index);
				if (label == cindex) { // 背景
					mask.at<uchar>(row, col) = 0;
				}
				else if(peripheralPoint<2){
					mask.at<uchar>(row, col) = 0;
					peripheralPoint++;
				}
				else {
					mask.at<uchar>(row, col) = 255;
					peripheralPoint++;
				}
				if (peripheralPoint == 5) { //到达边缘时，跳出循环
					peripheralPoint = 0;
					break;
				}
			}
			// 将本行还未置为 255的像数点置为 255
			for (int col = 0; col < src.cols; col++) {
				if (mask.at<uchar>(row, col) != 0 && mask.at<uchar>(row, col) != 255) { // 背景
					mask.at<uchar>(row, col) = 255;
				}
			}
		}
	}

	//从上到下遍历图像
	for (int col = 0; col < src.cols; col++) {
		//将mask 全部像素点置为  颜色 80
		for (int row = 0; row < src.rows; row++) {
			index = row * src.cols + col;
			int label = labels.at<int>(index);
			if (label == cindex) { // 背景
				mask.at<uchar>(row, col) = 0;
			}
			else if(peripheralPoint<4){
				mask.at<uchar>(row, col) = 0;
				peripheralPoint++;
			}
			else {
				mask.at<uchar>(row, col) = 255;
				peripheralPoint++;
			}
			if (peripheralPoint == 5) { //到达边缘时，跳出循环
				peripheralPoint = -1;
				break;
			}
		}
		//从下边向上遍历图像
		if (peripheralPoint == -1) {
			// 当遇到有5个不是背景颜色时 退出
			for (int row = src.cols - 1; row > 0; row --) {
				index = row * src.cols + col;
				int label = labels.at<int>(index);
				if (label == cindex) { // 背景
					mask.at<uchar>(row, col) = 0;
				}
				else {
					mask.at<uchar>(row, col) = 255;
					peripheralPoint++;
				}
				if (peripheralPoint == 5) { //到达边缘时，跳出循环
					peripheralPoint = 0;
					break;
				}
			}
		}

	}
//	imshow("mask", mask);

	// 4.腐蚀 + 高斯模糊：图像与背景交汇处高斯模糊化
	Mat k = getStructuringElement(MORPH_RECT, Size(1, 1), Point(-1, -1));
	erode(mask, mask, k);
	dilate(mask, mask, k); //膨胀
	//imshow("erode-mask", mask);
	GaussianBlur(mask, mask, Size(1, 1), 0, 0);
//	imshow("Blur Mask", mask);

	// 5.更换背景色以及交汇处融合处理
	RNG rng(12345);
	Vec3b color;  //设置的背景色
//    //白色底
//      color[0] = 255;//rng.uniform(0, 255);
//      color[1] = 255;// rng.uniform(0, 255);
//      color[2] = 255;// rng.uniform(0, 255);
//    //红色底
//      color[0] = 0;//rng.uniform(0, 255);
//      color[1] = 0;// rng.uniform(0, 255);
//      color[2] = 255;// rng.uniform(0, 255);
//	//蓝色底
//	color[0] = 210;//rng.uniform(0, 255);
//	color[1] = 98;// rng.uniform(0, 255);
//	color[2] = 97;// rng.uniform(0, 255);
	//自己控制底色
	color[0] = color1;//rng.uniform(0, 255);
	color[1] = color2;// rng.uniform(0, 255);
	color[2] = color3;// rng.uniform(0, 255);
	Mat result(src.size(), src.type());

	double w = 0.0;   //融合权重
	int b = 0, g = 0, r = 0;
	int b1 = 0, g1 = 0, r1 = 0;
	int b2 = 0, g2 = 0, r2 = 0;

	for (int row = 0; row < src.rows; row++) {
		for (int col = 0; col < src.cols; col++) {
			int m = mask.at<uchar>(row, col);
			if (m == 255) {
				result.at<Vec3b>(row, col) = src.at<Vec3b>(row, col); // 前景
			}
			else if (m == 0) {
				result.at<Vec3b>(row, col) = color; // 背景
			}
			else {// 融合处理部分
				w = m / 255.0;
				b1 = src.at<Vec3b>(row, col)[0];
				g1 = src.at<Vec3b>(row, col)[1];
				r1 = src.at<Vec3b>(row, col)[2];

				b2 = color[0];
				g2 = color[1];
				r2 = color[2];

				b = b1 * w + b2 * (1.0 - w);
				g = g1 * w + g2 * (1.0 - w);
				r = r1 * w + r2 * (1.0 - w);

				result.at<Vec3b>(row, col)[0] = b;
				result.at<Vec3b>(row, col)[1] = g;
				result.at<Vec3b>(row, col)[2] = r;
			}
		}
	}
	string writePath (argv[1]);
	writePath = "/usr/java/tomcat/webapps/identificationChangeBackground/download" + writePath + c1 + c2 +c3+".jpg";
	cout << writePath << endl;
	imwrite(writePath, result);
//	imshow("背景替换", result);

//	waitKey(0);
	return 0;
}

