//
//  ViewController.swift
//  LinKListSwift
//
//  Created by leying on 2019/7/3.
//  Copyright © 2019年 junxiang. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        // 创建链表
        let link = ListNode.createLink([4,2,6,8,5])
        ListNode.printLink(link)
    }
}

