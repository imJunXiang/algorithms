//
//  JXPassAccessoryView.m
//  input
//
//  Created by 俊祥 on 2018/7/16.
//  Copyright © 2018年 俊祥. All rights reserved.
//

#import "JXPassAccessoryView.h"
@interface JXPassAccessoryView ()<UITableViewDelegate,UITableViewDataSource>
@property (nonatomic ,strong) UILabel       *titleLable;
@property (nonatomic ,strong) UIButton      *closeBtn;
@property (nonatomic ,strong) UITableView   *pointView;     // 6个黑点view
@end

@implementation JXPassAccessoryView
- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        [self findViewWithFrame:frame];
    }
    return self;
}

- (void)findViewWithFrame:(CGRect)frame {
    CGSize size = [UIScreen mainScreen].bounds.size;
    self.titleLable = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, size.width, 50)];
    self.titleLable.textAlignment = NSTextAlignmentCenter;
    self.titleLable.text = @"请设置会员卡密码";
    self.titleLable.userInteractionEnabled = YES;
    
    self.closeBtn = [[UIButton alloc] initWithFrame:CGRectMake(0, 0, 50, 50)];
    self.closeBtn.backgroundColor = [UIColor blueColor];
    [self.closeBtn addTarget:self action:@selector(clickCloceBtn:) forControlEvents:UIControlEventTouchUpInside];
    
    [self.titleLable addSubview:self.closeBtn];
    
    // 横向 table 需要衡转的
    self.pointView = [[UITableView alloc] initWithFrame:CGRectMake(0, 0, size.width *0.7, 50)];
    self.pointView.delegate = self;
    self.pointView.dataSource = self;
    
    [self addSubview:self.titleLable];
    [self addSubview:self.pointView];
}

- (void)clickCloceBtn:(UIButton *)closeBtn {
    if (self.block) {
        self.block();
    }
}

#pragma mark - UITableViewDelegate
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return 6;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    UITableViewCell *cell = [[UITableViewCell alloc] init];
    return cell;
}
@end
