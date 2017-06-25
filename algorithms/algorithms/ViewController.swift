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
    
    var sorts = ["Bubble"]
     
    
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
    
    func gotoNextC() {
        
        
        let bubVC = BubbleSortController()
        bubVC.datas = datas
        self.navigationController?.pushViewController(bubVC, animated: true)
        
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
        gotoNextC()
    }
    
    
}

