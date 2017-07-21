//
//  ViewController.swift
//  algorithms
//
//  Created by 俊祥 on 2017/6/24.
//  Copyright © 2017年 俊祥. All rights reserved.
//

import UIKit

class SortViewController: UIViewController,UITableViewDelegate,UITableViewDataSource {

    let cellIdentifer:String = "cellIdentifer"
    var datas = [12,23,42,21,52,53,3,51,65,34,64]
    
    var sorts = ["BubbleSort","SelectSort","InsertSort","QuickSort","MergeSort"]
     
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        self.title = "排序算法"
        view.backgroundColor = .white
        findView()
    }
    
    func findView() {
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
        let sortVC = typeClass?.init() as? SortController
        if (sortVC == nil) {
            return
        }
        sortVC?.datas = datas
        sortVC?.title = sorts[indexPath.row]
        self.navigationController?.pushViewController(sortVC!, animated: true)
    }
}

