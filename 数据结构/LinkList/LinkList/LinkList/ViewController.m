//
//  ViewController.m
//  LinkList
//
//  Created by leying on 2018/10/9.
//  Copyright © 2018年 junxiang. All rights reserved.
//

#import "ViewController.h"
// 链表
@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    hello();
}

// 定义个节点结构而已
typedef struct LNode {
    int data;
    struct LNode *next;
} LNode,*linkList;

void getElem_L(linkList L,int i ,int data) {
    LNode *p = L->next;
    int j = 1;
    while (p && j < i) {
        p = p->next;
        ++j;
    }
    
    if(!p||j>i) return;
    data = p->data;
}

void hello() {
    printf("你好");
}

@end
