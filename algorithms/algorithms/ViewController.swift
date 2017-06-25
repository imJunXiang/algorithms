//
//  ViewController.swift
//  algorithms
//
//  Created by 俊祥 on 2017/6/24.
//  Copyright © 2017年 俊祥. All rights reserved.
//

import UIKit

class ViewController: UIViewController,UITableViewDelegate,UITableViewDataSource {

    let cellIdentifer:String = "cellIdentifer"
    var datas = [12,23,42,21,52,53,3,51,65,34,64]
    
    var sorts = ["BubbleSort","SelectSort","InsertSort"]
     
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        self.title = "算法练习"
        view.backgroundColor = .white
        findView()
    }
    
    func findView() {
        let table = UITableView(frame: JXScreenRect)
        table.delegate = self
        table.dataSource = self
        view .addSubview(table)
    }
    
    func gotoSortVC(_ sortName:String) {
        // 1:动态获取命名空间
        guard let name = Bundle.main.infoDictionary!["CFBundleExecutable"] as?String else {
            print("获取命名空间失败")
            return
        }
        
        let cls: AnyClass? = NSClassFromString(name+"."+sortName)
        
        // Swift中如果想通过一个Class来创建一个对象，必须告诉系统这个class的确切类型
        guard let typeClass = cls as? SortController.Type else {
            print("cls不能当做UIViewController")
            return
        }
        
        
        let sortVC = typeClass.init()
        sortVC.datas = datas
        sortVC.title = sortName
        self.navigationController?.pushViewController(sortVC, animated: true)
        
    }
    
    /// tableViewDelegate. tableViewDataSource
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return sorts.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifer) ?? UITableViewCell(style: UITableViewCellStyle.default, reuseIdentifier: cellIdentifer)
        
        cell.textLabel?.text = sorts[indexPath.row]
        
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        gotoSortVC(sorts[indexPath.row])
    }
    
    
}

