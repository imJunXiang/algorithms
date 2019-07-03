//
//  ViewController.m
//  动态规划
//
//  Created by leying on 2018/10/11.
//  Copyright © 2018年 junxiang. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    [self numsOfUpStairs:20];
//    [self numsOfUpStairs2:10];
    [self numsOfUpStairs3:30];
}

// 动态规划求解(走楼梯问题，每次只能爬 1 ~ 2 步)
- (void)numsOfUpStairs:(NSInteger)n {
    NSInteger temp1 = 1,temp2 = 2;
    if (n < 1) {
        NSLog(@"0");
    } else if (n < 3) {
        NSLog(@"%ld",n);
    } else {
        NSInteger sum = 0;
        for (int i = 3; i <= n; i++) {
            sum = temp1 + temp2;
            temp1 = temp2;
            temp2 = sum;
        }
        NSLog(@"%ld",temp2);
    }
}

// 动态规划求解(走楼梯问题，每次只能爬 1 ~ 3 步)
- (void)numsOfUpStairs2:(NSInteger)n {
    // n 代表总层数
    NSInteger temp1 = 1,temp2 = 2,temp3 = 3;
    if (n < 1) {
        NSLog(@"0");
    } else if (n < 4) {
        NSLog(@"%@",@(n));
    } else {
        NSInteger sum = 0;
        for (int i = 4; i <= n; i++) {
            sum = temp1 + temp2 + temp3;
            temp1 = temp2;
            temp2 = temp3;
            temp3 = sum;
        }
        NSLog(@"%@",@(sum));
    }
}

// 动态规划求解(走楼梯问题，每次只能爬 2 ~ 3 步)
- (void)numsOfUpStairs3:(NSInteger)n {
    NSInteger temp2 = 1,temp3 = 1;
    if (n < 2) {
        NSLog(@"0");
    } else if (n < 4) {
        NSLog(@"1");
    } else {
        // 4的初始值
        NSInteger sum = 1;
        for (int i = 5; i <= n; i++) {
            // 记录之前的sum
            NSInteger tempSum = sum;
            sum = temp2 + temp3;
            temp2 = temp3;
            temp3 = tempSum;
        }
        NSLog(@"%@",@(sum));
    }
}

@end
