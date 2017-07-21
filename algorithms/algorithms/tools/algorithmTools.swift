//
//  algorithmTools.swift
//  algorithms
//
//  Created by leying on 2017/7/21.
//  Copyright © 2017年 俊祥. All rights reserved.
//

import Foundation
class algorithmTools: NSObject {
    /**
     *  数组快速排序
     */
    class func quickSort(nums: inout Array<Int>,beginIndex:Int,endIndex:Int) {
        // 1.退出条件
        if beginIndex >= endIndex {
            return
        }
        // 2.第一趟
        var i = beginIndex , j = endIndex
        let key = nums[beginIndex]
        
        while i < j {
            // 循环次数
            // 先从大往小
            while i < j && key <= nums[j] {
                j-=1
            }
            // 跳出上面循环，说明雨大num[i] > nums[j] 的了（或者循环完了(即i=j)）
            nums[i] = nums[j]
            
            // 然后从小往大
            while i < j && key >= nums[i] {
                i+=1
            }
            // 跳出上面循环，说明雨大num[i] > nums[j] 的了（或者循环完了(即i=j)）
            nums[j] = nums[i]
        }
        // 第一圈走完，确定了一个位置
        nums[i] = key
        // 递归方法确定其他位置
        quickSort(nums: &nums, beginIndex: beginIndex, endIndex: i-1)
        quickSort(nums: &nums, beginIndex: i+1, endIndex: endIndex)
    }

    
}
