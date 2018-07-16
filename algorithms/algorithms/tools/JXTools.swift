//
//  JXTools.swift
//  algorithms
//
//  Created by leying on 2017/7/20.
//  Copyright © 2017年 俊祥. All rights reserved.
//

import Foundation
import UIKit
class JXTools: NSObject {
    class func goToVC(_ sortName:String) -> UIViewController.Type?{
        // 1:动态获取命名空间
        guard let name = Bundle.main.infoDictionary!["CFBundleExecutable"] as?String else {
            print("获取命名空间失败")
            return nil
        }
        
        let cls: AnyClass? = NSClassFromString(name+"."+sortName)
        
        // Swift中如果想通过一个Class来创建一个对象，必须告诉系统这个class的确切类型
        guard let typeClass = cls as? UIViewController.Type else {
            print("cls不能当做UIViewController")
            return nil
        }
        
        return typeClass
    }
}


