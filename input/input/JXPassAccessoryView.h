//
//  JXPassAccessoryView.h
//  input
//
//  Created by 俊祥 on 2018/7/16.
//  Copyright © 2018年 俊祥. All rights reserved.
//

#import <UIKit/UIKit.h>
/**
 *  卡密码显示控件
 */
@interface JXPassAccessoryView : UIView
@property (nonatomic ,copy) void (^block)(void);
@end
