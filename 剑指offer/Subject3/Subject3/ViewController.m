//
//  ViewController.m
//  Subject3
//
//  Created by 俊祥 on 2018/10/5.
//  Copyright © 2018年 俊祥. All rights reserved.
//

#import "ViewController.h"
// 题目 找出数组中重复的数字
@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self showDuplicateNum:@[@(5),@(3),@(4),@(3),@(1),@(5)].mutableCopy];
}

// 求出无序数组 中 重复的数字
- (void)showDuplicateNum:(NSMutableArray *)nums {
    // 1.无序变有序(这个方法有问题哎)
#pragma mark - 我的做法 先排序 在找 （nlogn + n）的时间复杂度
//    [self quickSortWithNum:nums];
#pragma mark - 方法二 直接构建哈希表 (n)时间复杂度 加n空间复杂度
    
#pragma mark - 方法三 剑指offer 做法（挖掘条件，运用技巧 （n）时间复杂度）
    [self offerShowDuplicateNum:nums];
}

- (void)offerShowDuplicateNum:(NSMutableArray *)nums {
    
    if (nums.count < 1) {
        return;
    }
    
    for (NSNumber *num in nums) {
        if ([num integerValue] < 0 || [num integerValue] > nums.count - 1) {
            // 说明输入错误
            return;
        }
    }
    
    // 通过不断交换来解题(这里才是正题，前面是错误判断)
    NSInteger i = 0;
    while (i < nums.count) {
        while ([nums[i] integerValue] != i) {
            if ([nums[i] integerValue] == [nums[[nums[i] integerValue]] integerValue]) {
                // 说明找到相同
                NSLog(@"%@",nums[i++]);
                continue;
//                return;
            }
            
            // swap nums
            NSNumber *temp = nums[i];
            nums[i] = nums[[temp integerValue]];
            nums[[temp integerValue]] = temp;
        }
    }
}

#pragma mark - 我的做法
// 1.进行排序（用快排吧）
- (void)quickSortWithNum:(NSMutableArray *)nums {
    [self quichSortWithStartPoint:0 andEndPoint:nums.count-1 andNums:nums];
    [self showArr:nums];
}

// 快排核心方法
- (void)quichSortWithStartPoint:(NSInteger)start andEndPoint:(NSInteger)end andNums:(NSMutableArray *)nums{
    // 退出条件
    if (start >= end) {
        return;
    }
    
    NSInteger i = start , j = end , key = [nums[start] integerValue];
    
    // 进行游标判断
    while (i < j) {
        
        while (i < j && [nums[j] integerValue] >= key) {
            j--;
        }
        nums[i] = nums[j];
        
        while (i < j && [nums[i] integerValue] <= key) {
            i++;
        }
        nums[j] = nums[i];
    }
    
    nums[i] = @(key);
    
    // 下一圈（分左右）
    [self quichSortWithStartPoint:start andEndPoint:i andNums:nums];
    [self quichSortWithStartPoint:i+1 andEndPoint:end andNums:nums];
}

- (void)showArr:(NSMutableArray *)nums {
    for (NSNumber *number in nums) {
        NSLog(@"%@",number);
    }
}


@end
