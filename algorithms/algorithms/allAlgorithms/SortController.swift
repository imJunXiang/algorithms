//
//  SortController.swift
//  algorithms
//
//  Created by 俊祥 on 2017/6/25.
//  Copyright © 2017年 俊祥. All rights reserved.
//

import Foundation

import UIKit

class SortController: UIViewController {
    
    let beforeL = UILabel(frame: CGRect(x: 0, y: 0, width: JXScreenWidth, height: JXScreenHeight * 0.5))
    let afterL = UILabel(frame: CGRect(x: 0, y: JXScreenHeight * 0.5, width: JXScreenWidth, height: JXScreenHeight*0.5))
    var datas:Array<Int> = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        view.backgroundColor = .white
        findView()
    }
    
    func findView() {
        
        beforeL.numberOfLines = 0
        afterL.numberOfLines = 0
        beforeL.textAlignment = NSTextAlignment.center
        afterL.textAlignment = NSTextAlignment.center
        view.addSubview(beforeL)
        view.addSubview(afterL)
    }
}
