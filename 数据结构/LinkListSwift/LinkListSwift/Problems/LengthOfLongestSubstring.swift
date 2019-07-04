//
//  LengthOfLongestSubstring.swift
//  linklistSwift
//
//  Created by leying on 2019/7/4.
//  Copyright © 2019年 junxiang. All rights reserved.
//

import Foundation

// 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度
func lengthOfLongestSubstring(_ s:String) -> Int {
    var left = 0
    var right = 0
    var dic = [String : Int]()
    let characters : [String] = s.map{String($0)}
    var lenths : [Int] = []
    
    for (index, value) in characters.enumerated() {
        if dic.keys.contains(value) && left <= dic[value]! {
            left = dic[value]! + 1
        }
        dic.updateValue(index, forKey: value)
        right = index
        lenths.append(right - left + 1)
    }
    return lenths.max() ?? 0
}
