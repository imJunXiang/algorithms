//
//  BaseCell.swift
//  algorithms
//
//  Created by leying on 2017/7/21.
//  Copyright © 2017年 俊祥. All rights reserved.
//

import Foundation
import UIKit

@objc(BaseCell) class BaseCell : UITableViewCell {
    class func cellForTableView(tableView:UITableView) -> BaseCell {
        let  cellID = NSStringFromClass(self)
        var  cell = tableView.dequeueReusableCell(withIdentifier: cellID)
        if cell == nil {
            cell = BaseCell(style: UITableViewCellStyle.default, reuseIdentifier: cellID)
            cell?.selectionStyle = UITableViewCellSelectionStyle.none
        }
        return cell as! BaseCell
    }
    
    override init(style: UITableViewCellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        findView()
        
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func findView() {
//        print("hello world")
    }
    
}

class ListCell: BaseCell {
    
}
