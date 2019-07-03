//
//  ViewController.m
//  DPtest_1
//
//  Created by leying on 2018/10/12.
//  Copyright © 2018年 junxiang. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    
    // 求找零总数问题，和爬楼梯问题很像
    [self getMoneyWithTotalMoney:50 andCoins:nil];
    // 硬币找零(1.求最少需要多少硬币 )
//    [self getMineLeagthWithTotalMoney:50];
    // 硬币找零 2.打印最小路径 (递归了第二步)
    [self getMineLengthWithMoney:50];
}

// 动态规划 硬币找零(1.求有多少种找法)
- (void)getMoneyWithTotalMoney:(NSInteger)totalMoney andCoins:(NSArray *)coins {
        // 几个小前提
        coins = @[@1,@3,@4];
    NSInteger temp0 = 1, temp1 = 1,temp2 = 1,temp3 = 2;
    if (totalMoney <= 0) {
        NSLog(@"0");
    } else if (totalMoney <= 2) {
        NSLog(@"1");
    } else if (totalMoney <= 3) {
        NSLog(@"2");
    } else if (totalMoney <= 4) {
        NSLog(@"2");
    } else {
        NSInteger sum = 0;
        
        for (NSInteger i = 4; i <= totalMoney; i++) {
            sum = temp0 + temp1 + temp3;
            temp0 = temp1;
            temp1 = temp2;
            temp2 = temp3;
            temp3 = sum;
        }
        NSLog(@"总共%@种找零法",@(sum));
    }
}

// 动态规划 硬币找零(1.求最少需要多少硬币  2.打印最小路径)
- (NSArray *)getMineLeagthWithTotalMoney:(NSInteger)totalMoney {
    NSArray *coins = @[@1,@3,@4];
    // key 为钱数  value 为最小张数
//    NSMutableDictionary *changeDic = [NSMutableDictionary dictionary];
    NSMutableArray  *changeArr = [NSMutableArray arrayWithObject:@0];
    // 记录路径
    NSInteger s = 0;
    
    for (NSInteger money = 1; money <= totalMoney; money++) {
        // 遍历钱数
        NSInteger num_of_coins = NSIntegerMax;
        
        for (NSNumber *coin in coins) {
            if (money >= [coin integerValue]) {
                // 判断是否能 兑换
                // 记录每次所用的硬币数量
                if ([changeArr[money-[coin integerValue]] integerValue] + 1  < num_of_coins) {
                    // 如果小的话，说明找到了小的，替换(在这里只是替换，后面才存储)
                    num_of_coins = [changeArr[money-[coin integerValue]] integerValue] + 1;
                    s = [coin integerValue];
                }
            }
            changeArr[money] = @(num_of_coins);
        }
        
    }
    
    return @[changeArr.lastObject,@(s)];
    
}

// 求出最小路径
- (void)getMineLengthWithMoney:(NSInteger)totalMoney {
    NSArray *arr = [self getMineLeagthWithTotalMoney:totalMoney];
    NSInteger nums = [arr[0] integerValue];
    NSInteger path = [arr[1] integerValue];
    
    NSLog(@"最小找零数:%@",arr[0]);
    NSLog(@" -> %@",@(path));
    while (totalMoney - path > 0) {
        totalMoney -= path;
        arr = [self getMineLeagthWithTotalMoney:totalMoney];
        nums = [arr[0] integerValue];
        path = [arr[1] integerValue];
        NSLog(@" -> %@",@(path));
    }
}
@end
