//
//  ViewController.m
//  testSort
//
//  Created by 俊祥 on 2018/9/1.
//  Copyright © 2018年 俊祥. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    NSMutableArray *nums = @[@(3),@5,@1,@7,@9,@4,@18,@23,@12,@20].mutableCopy;
    
//    [self sortArr:nums];
//    [self quickSortWithSortArr:nums andLeftIndex:0 andRightIndex:nums.count-1];
//    [self showArr:nums];
    
    [self mergeArrOne:@[@(1),@(4),@(5),@(8)] andArrTwo:@[@(2),@(4),@(9),@(10)]];
}

// 冒泡排序
- (void)sortArr:(NSMutableArray *)nums {

    if (nums.count <= 0) {
        return;
    }

    for (int i = 0; i < nums.count-1; i++) {
        for (int j = 0; j < nums.count-1-i; j++) {
            NSInteger a = [nums[j] integerValue];
            NSInteger b = [nums[j+1] integerValue];
            if (a > b) {
                // 换位置
                nums[j] = @(b);
                nums[j+1] = @(a);
            }
        }
    }

    NSLog(@"%@",nums);
}

- (void)quickSortWithSortArr:(NSMutableArray *)nums andLeftIndex:(NSInteger)left andRightIndex:(NSInteger)right{
    // 退出条件
    if (left >= right) {
        return; // 说明该组排完了
    }
    
    NSInteger i = left,j = right,key = [nums[left] integerValue];
    
    while (i < j) { // 如果 i 在 j 右边，就继续循环
        while (i < j && [nums[j] integerValue] >= key) {
            j --;           // 重后往前 以为 第一个是key 已经记录
        }
        
        nums[i] = nums[j];  // 后面的移到前面
        
        while (i < j && [nums[i] integerValue] <= key) {
            i ++;
        }
        
        nums[j] = nums[i];  // 前面的移到后面
    }
    
    nums[i] = @(key);
    // 下一圈 (左右)
    [self quickSortWithSortArr:nums andLeftIndex:left andRightIndex:i-1];
    [self quickSortWithSortArr:nums andLeftIndex:i+1 andRightIndex:right];
}

// 两个 两个有序数组取交际
- (void)mergeArrOne:(NSArray *)arr1 andArrTwo:(NSArray *)arr2 {
    NSMutableArray *newArr = [NSMutableArray array];
    NSInteger i = 0,j = 0;
    while (i < arr1.count || j < arr2.count) {
        NSInteger num1,num2;
        
        if (i < arr1.count) {
            num1 = [arr1[i] integerValue];
        } else {
            num2 = [arr2[j] integerValue];
            [newArr addObject:@(num2)];
            j++;
            continue;
        }
        
        if (j < arr2.count) {
            num2 = [arr2[j] integerValue];
        } else {
            num1 = [arr1[i] integerValue];
            [newArr addObject:@(num1)];
            i++;
            continue;
        }
        
        if (num1 < num2) {
            num1 = [arr1[i] integerValue];
            [newArr addObject:@(num1)];
            i++;
            continue;
        } else if (num1 == num2) {
            num1 = [arr1[i] integerValue];
            [newArr addObject:@(num1)];
            i++;
            j++;
            continue;
        } else {
            num2 = [arr2[j] integerValue];
            [newArr addObject:@(num2)];
            j++;
            continue;
        }
    }
    
    [self showArr:newArr];
    
}

- (void)showArr:(NSMutableArray *)nums {
    for (NSNumber *number in nums) {
        NSLog(@"%@",number);
    }
}

@end
