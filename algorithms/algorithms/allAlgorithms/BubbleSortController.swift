//
//  BubbleSort.swift
//  algorithms
//
//  Created by 俊祥 on 2017/6/24.
//  Copyright © 2017年 俊祥. All rights reserved.
//

import Foundation
import UIKit

class BubbleSortController: UIViewController {
    
    let beforeL = UILabel(frame: CGRect(x: 0, y: 0, width: JXScreenWidth, height: JXScreenHeight * 0.5))
    let afterL = UILabel(frame: CGRect(x: 0, y: JXScreenHeight * 0.5, width: JXScreenWidth, height: JXScreenHeight*0.5))
    var datas:Array<Int> = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        self.title = "Bubble Sort"
        view.backgroundColor = .white
        findView()
        sortDatas(nums: &datas)
    }
    
    func findView() {
        
        beforeL.numberOfLines = 0
        afterL.numberOfLines = 0
        beforeL.textAlignment = NSTextAlignment.center
        afterL.textAlignment = NSTextAlignment.center
        view.addSubview(beforeL)
        view.addSubview(afterL)
    }
    
    func sortDatas( nums:inout Array<Int>) {
        var count = nums.count
        var tempDate:Int = nums[0]
        beforeL.text = String(describing: nums)
        print(nums)
        
        for _ in 0..<nums.count {
            for i in 0..<count-1 {
                if nums[i] > nums[i+1] {
                    tempDate = nums[i]
                    nums[i] = nums[i+1]
                    nums[i+1] = tempDate
                }
            }
            count -= 1
        }
        afterL.text = String(describing: nums)
        print(nums)
     }
    
    
}
