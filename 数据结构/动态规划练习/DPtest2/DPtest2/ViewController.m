//
//  ViewController.m
//  DPtest2
//
//  Created by 俊祥 on 2018/11/16.
//  Copyright © 2018年 俊祥. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController
/** 题目 盒子里有2M(16)个球，M(8)白，M(8)黑，依次取球。要求黑的始终不小于白的*/

- (void)viewDidLoad {
    [super viewDidLoad];
    // 1.拆子问题
    // F1.1黑1白  F1 = 1 一种 先黑后白
    // F2.2黑2白  F2 = F1 + 1 = 2
    // F3.3黑3白  F3 = F2 + F1 + 1
    // F4.4黑4白  F4 = F3 + F2 + F1 + 1
    
    // H1.1黑8白  H1 = 8 + 1 - 1 = 8种
    // H2.1黑7白  H2 = 7 + 1 - 1 = 7种
    // H3.1黑N白  H3 = N + 1 - 1 = N种
    
    // H4.2黑8白  1黑8白 + 2黑7白 = 1黑8白 + 1黑7白 + 2黑6白 = 1黑8白+...2黑2白
    // H5.m黑n白（m < n,m==0 时等1）  = m-1黑n白 + m-2黑n白 。。。 + n黑n白
    
    // 剩余:
    // 情况1 黑=白
    // 情况2 黑<白
    
    // F1 1黑1白 = 1 一种
    // F2 2黑2白 = F1 + 0黑2白 = F1 + 1
    
    // F3 3黑3白 = 2黑2白 + 1黑3白 = F2 + 1黑2白 + 0黑3白
    //                           = F2 + 1 + F1 + 1
    
    // F4 4黑4白 = 3黑3白 + 2黑4白 = F3 + 1黑4白 + 2黑3白
    //                           = F3 + f1+3 + F2 + f1+2
    // F5 5黑5白 = 4黑4白 + 3黑5白 = F4 + 3黑4白 + 2黑5白
    //                           = F4 + F3 + 2黑4白 + 2黑4白 + 1黑5白
    
    // 2黑8白 = 2黑7白 + 1黑八白
    
    // 3黑8白 = 3黑3白 + 2黑7白 + 2黑6白、、、+2黑4白
    
    NSInteger temp1 = 1,temp2 = 2;
    NSInteger sum;
    for (NSInteger i = 3; i < 8; i++) {
        sum = temp1 + temp2;
        temp1 = temp2;
        temp2 = sum;
    }
    
//    NSLog(@"%@",@(sum));
    showTotalNum(9);
}

void showTotalNum (int n) {
    // n 单种球的数量
    // 1维黑 2维白
    int map[n][n];
    for (int i = 0; i < n; i ++) {
        // 第一行赋初始值
        map[0][i] = 1;
        if (i >= 1) {
            map[1][i] = i;
        }
    }
    // 外层黑 内层白
    // i黑j白 = i-1黑j-1白 + i-1黑j白
    for (int i = 2; i < n; i ++) {
        for (int j = i ; j < n; j ++) {
            if (i == j) {
                map[i][j] = map[i-1][j-1] + map[i-2][j];
            } else if (i < j) {
                map[i][j] = map[i-1][j] + map[i][j-1];
            }
            
            printf("%d--%d == %d\n",i,j,map[i][j]);
        }
    }
    
    printf("%d",map[n-1][n-1]);
}


@end
