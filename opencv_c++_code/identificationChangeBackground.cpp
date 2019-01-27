
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
//	imshow("ԭͼ", src);

	// 1.����άͼ���������Ի�
	Mat data;
	for (int i = 0; i < src.rows; i++)     //���ص���������
		for (int j = 0; j < src.cols; j++)
		{
			Vec3b point = src.at<Vec3b>(i, j);
			Mat tmp = (Mat_<float>(1, 3) << point[0], point[1], point[2]);
			data.push_back(tmp);
		}

	// 2.ʹ��K-means���ࣻ���������ɫ
	int numCluster = 4;
	Mat labels;
	TermCriteria criteria = TermCriteria(TermCriteria::EPS + TermCriteria::COUNT, 10, 0.1);
	kmeans(data, numCluster, labels, criteria, 3, KMEANS_PP_CENTERS);

	// 3.�����������ֵ��
	Mat mask = Mat::zeros(src.size(), CV_8UC3);
	int index = src.rows * 2 + 2;  //��ȡ�㣨2��2����Ϊ����ɫ
	int cindex = labels.at<int>(index);
	// ��ȡ��������
	int peripheralPoint = 0;  //��Ե��
	for (int row = 0; row < src.rows; row++) {
		//��mask ȫ�����ص���Ϊ  ��ɫ 80
		for (int col = 0; col < src.cols; col++) {
			mask.at<uchar>(row, col) = 80;
		}
		//����߱���ͼ��  ��������5�����Ǳ�����ɫʱ �˳�
		for (int col = 0; col < src.cols; col++) {
			index = row * src.cols + col;
			int label = labels.at<int>(index);
			if (label == cindex) { // ����
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
			if (peripheralPoint == 5) { //�����Եʱ������ѭ��
				peripheralPoint = -1;
				break;
			}
		}
		//���ұ߱���ͼ��
		if (peripheralPoint == -1) {
			// ��������5�����Ǳ�����ɫʱ �˳�
			for (int col = src.cols - 1; col > 0; col--) {
				index = row * src.cols + col;
				int label = labels.at<int>(index);
				if (label == cindex) { // ����
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
				if (peripheralPoint == 5) { //�����Եʱ������ѭ��
					peripheralPoint = 0;
					break;
				}
			}
			// �����л�δ��Ϊ 255����������Ϊ 255
			for (int col = 0; col < src.cols; col++) {
				if (mask.at<uchar>(row, col) != 0 && mask.at<uchar>(row, col) != 255) { // ����
					mask.at<uchar>(row, col) = 255;
				}
			}
		}
	}

	//���ϵ��±���ͼ��
	for (int col = 0; col < src.cols; col++) {
		//��mask ȫ�����ص���Ϊ  ��ɫ 80
		for (int row = 0; row < src.rows; row++) {
			index = row * src.cols + col;
			int label = labels.at<int>(index);
			if (label == cindex) { // ����
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
			if (peripheralPoint == 5) { //�����Եʱ������ѭ��
				peripheralPoint = -1;
				break;
			}
		}
		//���±����ϱ���ͼ��
		if (peripheralPoint == -1) {
			// ��������5�����Ǳ�����ɫʱ �˳�
			for (int row = src.cols - 1; row > 0; row --) {
				index = row * src.cols + col;
				int label = labels.at<int>(index);
				if (label == cindex) { // ����
					mask.at<uchar>(row, col) = 0;
				}
				else {
					mask.at<uchar>(row, col) = 255;
					peripheralPoint++;
				}
				if (peripheralPoint == 5) { //�����Եʱ������ѭ��
					peripheralPoint = 0;
					break;
				}
			}
		}

	}
//	imshow("mask", mask);

	// 4.��ʴ + ��˹ģ����ͼ���뱳�����㴦��˹ģ����
	Mat k = getStructuringElement(MORPH_RECT, Size(1, 1), Point(-1, -1));
	erode(mask, mask, k);
	dilate(mask, mask, k); //����
	//imshow("erode-mask", mask);
	GaussianBlur(mask, mask, Size(1, 1), 0, 0);
//	imshow("Blur Mask", mask);

	// 5.��������ɫ�Լ����㴦�ںϴ���
	RNG rng(12345);
	Vec3b color;  //���õı���ɫ
//    //��ɫ��
//      color[0] = 255;//rng.uniform(0, 255);
//      color[1] = 255;// rng.uniform(0, 255);
//      color[2] = 255;// rng.uniform(0, 255);
//    //��ɫ��
//      color[0] = 0;//rng.uniform(0, 255);
//      color[1] = 0;// rng.uniform(0, 255);
//      color[2] = 255;// rng.uniform(0, 255);
//	//��ɫ��
//	color[0] = 210;//rng.uniform(0, 255);
//	color[1] = 98;// rng.uniform(0, 255);
//	color[2] = 97;// rng.uniform(0, 255);
	//�Լ����Ƶ�ɫ
	color[0] = color1;//rng.uniform(0, 255);
	color[1] = color2;// rng.uniform(0, 255);
	color[2] = color3;// rng.uniform(0, 255);
	Mat result(src.size(), src.type());

	double w = 0.0;   //�ں�Ȩ��
	int b = 0, g = 0, r = 0;
	int b1 = 0, g1 = 0, r1 = 0;
	int b2 = 0, g2 = 0, r2 = 0;

	for (int row = 0; row < src.rows; row++) {
		for (int col = 0; col < src.cols; col++) {
			int m = mask.at<uchar>(row, col);
			if (m == 255) {
				result.at<Vec3b>(row, col) = src.at<Vec3b>(row, col); // ǰ��
			}
			else if (m == 0) {
				result.at<Vec3b>(row, col) = color; // ����
			}
			else {// �ںϴ�����
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
//	imshow("�����滻", result);

//	waitKey(0);
	return 0;
}

