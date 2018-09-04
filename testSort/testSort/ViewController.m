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
    [self quickSortWithSortArr:nums andLeftIndex:0 andRightIndex:nums.count-1];
    [self showArr:nums];
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

- (void)showArr:(NSMutableArray *)nums {
    for (NSNumber *number in nums) {
        NSLog(@"%@",number);
    }
}

@end
