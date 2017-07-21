//
//  BaseViewController.swift
//  algorithms
//
//  Created by leying on 2017/7/21.
//  Copyright © 2017年 俊祥. All rights reserved.
//

import Foundation
import UIKit
class BaseViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()

//        self.navigationController?.automaticallyAdjustsScrollViewInsets = false;
//        self.navigationController?.navigationBar.isTranslucent = true
        
        findView()
    }
    
    func findView() {
        print("hello world")
    }
}
