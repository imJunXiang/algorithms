//
//  JXProblemController.swift
//  algorithms
//
//  Created by leying on 2017/7/20.
//  Copyright © 2017年 俊祥. All rights reserved.
//

import Foundation
import UIKit
class JXProblemController : BaseViewController,UITableViewDataSource,UITableViewDelegate {
    
    var sorts = ["BubbleSort","SelectSort","InsertSort","QuickSort","MergeSort"]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = "算法题"
        self.view.backgroundColor = .white
    }
    
    override func findView() {
        super.findView()
        let table = UITableView(frame: JXScreenRect)
        table.delegate = self
        table.dataSource = self
        view .addSubview(table)
    }
    
    /// tableViewDelegate. tableViewDataSource
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return sorts.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {

        let cell = ListCell.cellForTableView(tableView: tableView)
        
        cell.textLabel?.text = sorts[indexPath.row]
        
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let typeClass = JXTools.goToVC(sorts[indexPath.row])
        let sortVC = typeClass?.init()
        sortVC?.title = sorts[indexPath.row]
        self.navigationController?.pushViewController(sortVC!, animated: true)
    }

}
