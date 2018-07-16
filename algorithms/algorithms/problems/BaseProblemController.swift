//
//  BaseProblemController.swift
//  algorithms
//
//  Created by leying on 2017/7/21.
//  Copyright © 2017年 俊祥. All rights reserved.
//

import Foundation
import UIKit
class BaseProblemController: BaseViewController {
    var problemLabel:UILabel?
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = UIColor.white
    }
    
    override func findView() {
        super.findView()
        problemLabel = UILabel(frame: CGRect(x: 0, y: 0, width: JXScreenWidth, height: (JXScreenHeight-64) / 3));
        problemLabel?.font = UIFont.systemFont(ofSize: 14)
        problemLabel?.backgroundColor = UIColor.cyan
        problemLabel?.textAlignment = NSTextAlignment.center
        problemLabel?.numberOfLines = 0
        
        self.view.addSubview(problemLabel!)
    }
    
    
    
}
