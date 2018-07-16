//
//  One.swift
//  algorithms
//
//  Created by leying on 2017/7/21.
//  Copyright © 2017年 俊祥. All rights reserved.
//

import Foundation
import UIKit
class OneProblem: BaseProblemController {
    override func viewDidLoad() {
        super.viewDidLoad()
        showSubject()
        answerTheSubject()
    }
    
    func showSubject() {
        let subject:String?
        subject = "N（N为偶数）个数字，把数字平分 N/2 组，使得每组的数字和相等。"
        self.problemLabel?.text = subject
    }
    
    func answerTheSubject() {
        var nums = [7,6,10,8,5,2,1,4,9,3]
        algorithmTools.quickSort(nums: &nums,beginIndex: 0,endIndex: nums.count-1)
        for i in 0..<nums.count/2 {
            print(String(nums[i])+"----"+String(nums[nums.count-1-i]))
        }
    }
    
}
