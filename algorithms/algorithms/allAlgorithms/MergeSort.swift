//
//  MergeSort.swift
//  algorithms
//
//  Created by leying on 2017/6/27.
//  Copyright © 2017年 俊祥. All rights reserved.
//

import Foundation

class MergeSort: SortController {
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        if datas.count > 0 {
            beforeL.text = String(describing: datas)
            let arr = mergeDatas(nums: datas)
        
            print(datas)
            afterL.text = String(describing: arr)
            print(arr)
        }
        
    }
    
    // 冒泡排序
    func mergeDatas( nums:Array<Int>) -> [Int]{
        var helper = Array(repeating: 0, count: nums.count)
        var arr = nums
        mergeSort(array: &arr, helper: &helper, low: 0, high: arr.count - 1)
        
        return arr
    }
    
    func mergeSort( array:inout [Int], helper:inout [Int],low:Int,high:Int) {
        guard low < high else {
            return
        }
        let middle = (high - low)/2 + low
        mergeSort(array: &array, helper: &helper, low: low, high: middle)
        mergeSort(array: &array, helper: &helper, low: middle+1, high: high)
        merge(array: &array, helper: &helper, low: low, middle: middle, high: high)
        
    }
    
    func merge( array:inout [Int], helper:inout [Int],low:Int,middle:Int,high:Int) {
        for i in low...high {
            helper[i] = array[i]
        }
        var helperLeft = low
        var helperRight = middle+1
        var current = low
        while helperLeft <= middle && helperRight <= high{
            if helper[helperLeft] <= helper[helperRight] {
                array[current] = helper[helperLeft]
                helperLeft += 1
            } else {
                array[current] = helper[helperRight]
                helperRight += 1
            }
            current += 1
        }
        
        guard middle - helperLeft >= 0 else {
            return
        }
        
        for i in 0...middle - helperLeft {
            array[current + i] = helper[helperLeft + i]
        }
    }
}
