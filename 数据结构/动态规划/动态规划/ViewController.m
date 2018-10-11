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
    
    [self numsOfUpStairs:10];
}

// 动态规划求解(走楼梯问题)
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

@end
