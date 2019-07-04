//
//  LengthOfLongestSubstring.swift
//  linklistSwift
//
//  Created by leying on 2019/7/4.
//  Copyright © 2019年 junxiang. All rights reserved.
//

import Foundation

//给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度
func lengthOfLongestSubstring(_ s:String) -> Int {
    guard s.count > 0 else {
        return 0
    }
    // 创建长度26 默认值-1 的数组
    var chars = [String:Int]()
    var maxLength = 0,currentLength = 0
    for index in 0 ..< s.count {
        let char = s[s.index(s.startIndex, offsetBy: index)]
        if (chars[String(char)] != nil) {
            // 说明出现过 和当前长度进行判断
            let oldIndex = chars[String(char)]!
            if (index - oldIndex) > currentLength {
                // 大于可以忽略 直接当前长度加1
                currentLength += 1
                chars[String(char)] = index
            } else {
                if (maxLength < currentLength) {
                    maxLength = currentLength
                }
                currentLength = index - oldIndex
                chars[String(char)] = index
            }
        } else {
            // 说明没出现过 直接长度加1
            currentLength += 1
            chars[String(char)] = index
        }
    }
    if (maxLength < currentLength) {
        maxLength = currentLength
    }
    return maxLength
}
