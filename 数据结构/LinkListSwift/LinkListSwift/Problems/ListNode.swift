//
//  ListNode.swift
//  LinKListSwift
//
//  Created by leying on 2019/7/3.
//  Copyright © 2019年 junxiang. All rights reserved.
//

import Foundation
public class ListNode {
    public var val: Int
    public var next: ListNode?
    
    /** 初始化方法 */
    public init(_ val: Int) {
        self.val = val
        self.next = nil
    }
    
    /** 创建链表 没数据的话返回 */
    public class func createLink(_ nums:[Int]) -> ListNode? {
        guard nums.count > 0 else {
            return nil
        }
        
        let head = ListNode(nums[0])
        var current = head
        
        for num in 1 ..< nums.count {
            current.next = ListNode(nums[num])
            current = current.next!
        }
        
        return head
    }
    
    /** 遍历链表 */
    public class func printLink(_ link:ListNode?) {
        guard link != nil else {
            return
        }
        
        var printLink = link
        
        while printLink != nil {
            print(printLink!.val)
            printLink = printLink?.next
        }
    }
}
