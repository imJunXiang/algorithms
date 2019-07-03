//
//  AddTwoNum.swift
//  LinKListSwift
//
//  Created by leying on 2019/7/3.
//  Copyright © 2019年 junxiang. All rights reserved.
//

import Foundation

func addTwoNumbers(_ l1:ListNode?,_ l2:ListNode?) -> ListNode? {
    if l1 != nil || l2 != nil {
        return nil
    }
    
    var n1 = l1
    var n2 = l2
    
    let head = ListNode(0)
    var current:ListNode? = head
    var carry = 0
    
    while n1 != nil || n2 != nil {
        var x:Int?,y:Int?
        if n1 == nil {
            x = 0
        } else {
            x = n1?.val
        }
        
        if n2 == nil {
            y = 0
        } else {
            y = n2?.val
        }
        
        current?.next = ListNode((x! + y! + carry) % 10)
        current = current?.next!
        carry = (x! + y! + carry) / 10
        if n1 != nil {
            n1 = n1?.next
        }
        
        if n2 != nil {
            n2 = n2?.next
        }
    }
    
    if carry > 0 {
        current?.next = ListNode(carry % 10)
    }
    
    return head.next
}
