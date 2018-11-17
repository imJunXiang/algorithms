//
//  ViewController.m
//  DPtest_3
//
//  Created by 俊祥 on 2018/11/17.
//  Copyright © 2018年 俊祥. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController
// 动态规划 题目 求两个字符串的最大公共子串
- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    NSString *maxString = [self maxCommonString:@"hghahasjfh" andString:@"agasjfjkhhga"];
    NSLog(@"%@",maxString);
}

- (NSString *)maxCommonString:(NSString *)s1 andString:(NSString *)s2 {
    NSString *res = @"";
    
    if (s1.length <= 0 || s2.length <= 0) {
        return res;
    }
    
    int max = 0,m = (int)s1.length,n = (int)s2.length;
    
    int dp[100][100] = {0}; // 记录最大公共子串的长度
    for (NSInteger i = 0; i < m; i++) {
        for (NSInteger j = 0; j < n; j++) {
            if ([s1 characterAtIndex:i] == [s2 characterAtIndex:j]) {
                // 说明相等了
                if (i == 0 || j == 0) {
                    dp[i][j] = 0;
                } else {
                    dp[i][j] = dp[i-1][j-1] + 1;
                }
                // 记录最大长度和子串
                if (dp[i][j] > max) {
                    max = dp[i][j];
                    NSLog(@"%@",@(max));
                    res = [s1 substringWithRange:(NSRange){i-max+1,max}];
                }
            }
        }
    }
    
    return res;
}

@end
