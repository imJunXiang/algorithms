//
//  SelectSort.swift
//  algorithms
//
//  Created by 俊祥 on 2017/6/25.
//  Copyright © 2017年 俊祥. All rights reserved.
//

import Foundation

class SelectSort: SortController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        selectSort(nums: &datas)
    }
    
    // 选择排序
    func selectSort(nums: inout Array<Int>) {
        var count = 0
        var min = count
        
        beforeL.text = String(describing: nums)
        
        for _ in 0..<nums.count {
            for i in count..<nums.count {
                if nums[min] > nums[i] {
                    min = i
                }
            }
            // 交换第一个位置和最小值
            if min != count {
                // 避免相同位置的情况
                nums[min]   =   nums[min] ^ nums[count]
                nums[count] =   nums[min] ^ nums[count]
                nums[min]   =   nums[min] ^ nums[count]
            }
            
            count += 1
            min = count
        }
        
        afterL.text = String(describing: nums)
    }
}
