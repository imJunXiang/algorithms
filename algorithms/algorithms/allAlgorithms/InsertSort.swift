//
//  InsertSort.swift
//  algorithms
//
//  Created by 俊祥 on 2017/6/25.
//  Copyright © 2017年 俊祥. All rights reserved.
//

import Foundation

class InsertSort: SortController {
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        insertSort(nums: &datas)
    }
    
    // 插入排序
    func insertSort(nums: inout Array<Int>) {
        // 假设第一个为有序，则从第二个开始
        var i:Int,j = 1
        var temp:Int
        beforeL.text = String(describing: nums)
        
        for _ in 0..<nums.count {
            
            if j > nums.count-1 {
                break
            }
            i = j
            temp = nums[i]
            
            while i > 0 {
                if temp < nums[i-1] {
                    nums[i] = nums[i-1]
                } else {
                    nums[i] = temp
                    break
                }
                
                if i-1 == 0 {
                    nums[i-1] = temp
                    break
                }
                i -= 1;
            }
            
            j+=1;
            
        }
        
        afterL.text = String(describing: nums)
    }

}
