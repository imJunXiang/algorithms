//
//  ViewController.m
//  input
//
//  Created by 俊祥 on 2018/7/16.
//  Copyright © 2018年 俊祥. All rights reserved.
//

#import "ViewController.h"
#import "JXPassAccessoryView.h"

@interface ViewController ()<UITextFieldDelegate>
@property (nonatomic ,strong) UITextField   *passField;
@property (nonatomic ,strong) JXPassAccessoryView        *accessoryView;
@end

@implementation ViewController

- (UIView *)accessoryView {
    if (!_accessoryView) {
        _accessoryView = [[JXPassAccessoryView alloc] initWithFrame:CGRectMake(0, 0, 100, 100)];
        typeof(self) weakSelf = self;
        _accessoryView.block = ^(){
            typeof(weakSelf) strongSelf = weakSelf;
            [strongSelf.view endEditing:YES];
        };
        _accessoryView.backgroundColor = [UIColor yellowColor];
    }
    return _accessoryView;
}

- (UITextField *)passField {
    if (!_passField) {
        _passField = [[UITextField alloc] initWithFrame:CGRectMake(0, 0, 100, 100)];
        
        _passField.inputAccessoryView = self.accessoryView;
        _passField.keyboardType = UIKeyboardTypeNumberPad;
        _passField.delegate = self;
    }
    return _passField;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    [self.view addSubview:self.passField];
}

- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    NSLog(@"你好");
    [self.passField becomeFirstResponder];
}

#pragma mark - UITextFieldDelegate
- (void)textFieldDidEndEditing:(UITextField *)textField {
    NSLog(@"%@",textField.text);
}

- (void)textFieldDidBeginEditing:(UITextField *)textField {
    NSLog(@"%@",textField.text);
}

- (BOOL)textField:(UITextField *)textField shouldChangeCharactersInRange:(NSRange)range replacementString:(NSString *)string {
    if (textField.text.length > 5 && string.length != 0) {
        return NO;
    }
    return YES;
}
@end
