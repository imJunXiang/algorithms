//
//  twoNumSum.swift
//  linklistSwift
//
//  Created by 俊祥 on 2019/7/3.
//  Copyright © 2019 junxiang. All rights reserved.
//

import Foundation

//给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

//你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

func twoSun(_ nums:[Int],_ target: Int) -> [Int] {
    
    var indexOne = 0;
    for _ in 0 ..< nums.count - 1 {
        for i in 0 ..< nums.count {
            if (i != indexOne) {
                if (nums[indexOne] + nums[i] == target) {
                    return [indexOne,i]
                }
            }
        }
        indexOne += 1
    }
    
    
    return [];
}
