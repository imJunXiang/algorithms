//
//  XCPresentationController.swift
//  NetEaseMusic
//
//  Created by SAGESSE on 2019/4/29.
//  Copyright © 2019 SAGESSE. All rights reserved.
//

import UIKit


class XCPresentationController: UIViewController, UIGestureRecognizerDelegate {
    
    
    
    var levels: Array<CGFloat> = [] {
        willSet {
            orderedLevels = newValue.sorted()
        }
    }
    
    
    var headerView: UIView?
    
    var contentView: UIView?
    
    var fotterView: UIView?
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        levels = [
            64,
            256,//UIScreen.main.bounds.height / 2,
            UIScreen.main.bounds.height - UIApplication.shared.statusBarFrame.height - 56 - 34/* iPhone X bottom height. */
        ]
        
        view.backgroundColor = .white

        containerView.clipsToBounds = true
        let red = CGFloat(arc4random()%256)/255.0
        let green = CGFloat(arc4random()%256)/255.0
        let blue = CGFloat(arc4random()%256)/255.0
        containerView.backgroundColor = UIColor.init(red: red, green: green, blue: blue, alpha: 1)
        containerView.translatesAutoresizingMaskIntoConstraints = false
        containerView.addGestureRecognizer(dragGestureRecognizer)
        
        dragGestureRecognizer.delegate = self
        dragGestureRecognizer.addTarget(self, action: #selector(drag(_:)))
        dragGestureRecognizer.maximumNumberOfTouches = 1
        
        // Setup subview.
        view.addSubview(containerView)
        view.addLayoutGuide(containerLayoutGuide)

        // Setup Constants.
        NSLayoutConstraint.activate(
            [
                containerView.topAnchor.constraint(equalTo: containerLayoutGuide.topAnchor),
                containerView.leftAnchor.constraint(equalTo: view.leftAnchor),
                containerView.rightAnchor.constraint(equalTo: view.rightAnchor),
                containerView.bottomAnchor.constraint(equalTo: view.bottomAnchor),
                
                containerLayoutGuide.leftAnchor.constraint(equalTo: view.leftAnchor),
                containerLayoutGuide.widthAnchor.constraint(equalToConstant: 0),
                containerLayoutGuide.bottomAnchor.constraint(equalTo: bottomLayoutGuide.topAnchor)
            ]
        )
        
        // Setup Height Layout.
        let constraint = containerLayoutGuide.heightAnchor.constraint(equalToConstant: 0)
        NSLayoutConstraint.activate([constraint])
        heightLayoutGuide = constraint
        
        // Setup default height.
        heightLayoutGuide?.constant = levels[1]
        
        
        test()
        
    }
    
    
    func gestureRecognizer(_ gestureRecognizer: UIGestureRecognizer, shouldReceive touch: UITouch) -> Bool {
        
        // Only needs to do is process the drag gesture recognizer.
        guard let view = headerView, gestureRecognizer === dragGestureRecognizer else {
            return false
        }
        
        // The gesture recognizer valid in inside only the header view.
        return view.bounds.contains(touch.location(in: view))
    }
    
    
    func gestureRecognizer(_ gestureRecognizer: UIGestureRecognizer, shouldBeRequiredToFailBy otherGestureRecognizer: UIGestureRecognizer) -> Bool {
        
        // Only needs to do is process the drag gesture recognizer.
        guard gestureRecognizer === dragGestureRecognizer, otherGestureRecognizer is UIPanGestureRecognizer else {
            return false
        }
        
        // The gesture recognizer must include the view information.
        guard let view = gestureRecognizer.view, let subview = otherGestureRecognizer.view else {
            return false
        }
        
        return subview.isDescendant(of: view)
    }
    
    
    /// The gesture recognizer drag handler
    @objc private func drag(_ gestureRecognizer: UIPanGestureRecognizer) {
        
        // If the constraint is not created then no computation is required.
        guard let heightLayoutGuide = heightLayoutGuide else {
            return
        }
        
        // Calculates the offset of drag action.
        let translation = gestureRecognizer.translation(in: nil)

        // Process each state.
        switch gestureRecognizer.state {
        case .began:
            
            // Must update offset to the latest state before you can start dragging.
            dragContentOffset.y = heightLayoutGuide.constant

        case .changed:
            
            // The calculated content offset.
            let offset = dragContentOffset.y + -translation.y
            
            // Clamped content offset prevents overboundary.
            let constant = clamped(at: offset, bounces: true)
            
            // If the constant not any changes, ignore it.
            if heightLayoutGuide.constant != constant {
                heightLayoutGuide.constant = constant
            }
            
        case .ended,
             .cancelled,
             .failed:
            
            // Calculate the best display content offset.
            let velocity = gestureRecognizer.velocity(in: nil)
            let offset = closest(at: heightLayoutGuide.constant, velocity: velocity.y)
            
            // Add animation only if changes have been made.
            guard offset != heightLayoutGuide.constant else {
                return
            }
            
            // Velocity Per Second.
            let initialVelocity = -velocity.y / (offset - heightLayoutGuide.constant)

            logger.debug?.write("initialVelocity: \(initialVelocity)")
            //logger.debug?.write("ch: \(heightLayoutGuide.constant), eh: \(offset), vy: \(velocity.y), initialVelocity: \(initialVelocity)")
            
//            stiffness:312.1099853515625=xmm1=(%rcx,%rax,8); rcx=0x2aee53(%rip)
//            damping:31.959999084472656=xmm2=(%rcx,%rax,8); rcx=0x2aee57(%rip)
//            xmm3=initialVelocity:3.1102677004447652

            
            
//            ch=0x58=heightConstraint.constant ; 840
//            eh=0x70=heightForLayout: ; 402.66666666666669
//            vy=0x50=velocityInView; ; 2021.71917217695
//
//            xmm3=abs(-vy/(eh-ch))
//            if xmm3 > 4.0 {
//                xmm1 = 471.5
//                xmm2 = 30.700000762939453
//                ;xmm1=471.500000
//                ;xmm2=30.700001
//            } else {
//                xmm1 = 312.1099853515625
//                xmm2 = 31.959999084472656
//                ;xmm1=312.109985
//                ;xmm2=31.959999
//            }

            
            // Add animation.
//            UIView.animate(withDuration: 0.25, delay: 0, usingSpringWithDamping: 0.8, initialSpringVelocity: velocity.y/30, options: .curveEaseInOut, animations: {
//                heightLayoutGuide.constant = offset
//                self.view.layoutIfNeeded()
//            }, completion: nil)
            UIView.animate(withDuration: 0.25) {
                heightLayoutGuide.constant = offset
                self.view.layoutIfNeeded()
            }

        default:
            return
        }
    }
    
    /// The offset align to the nearest level.
    private func closest(at offset: CGFloat, velocity: CGFloat) -> CGFloat {
        
        // If the drag is too small.
        guard abs(velocity) > 50 else {
            // Restore to position on started dragging.
            return growing(at: offset)
        }
        
        // Check the drag direction.
        if velocity < 0 {
            // The direction is up.
            return growing(at: offset - velocity / 100)
        }
        
        // The direction is down.
        return shrinking(at: offset - velocity / 20)
    }
    
    /// The offset align to the nearest level at up.
    private func growing(at offset: CGFloat) -> CGFloat {
        
        // Find the most appropriate level.
        return orderedLevels.first { offset <= $0 } ?? orderedLevels.last ?? 0
    }
    
    /// The offset align to the nearest level at down.
    private func shrinking(at offset: CGFloat) -> CGFloat {

        // Check all levels by order
        for level in 0 ..< orderedLevels.count - 1 {
            // Get to the lowest level.
            if offset < orderedLevels[level + 1] {
                return orderedLevels[level]
            }
        }
        
        // Other case always use the highest one.
        return orderedLevels.last ?? 0
    }
    
    /// Compute clamped content offset prevents overboundary.
    private func clamped(at offset: CGFloat, bounces: Bool) -> CGFloat {
        
        // Check if the lower bound is exceeded.
        if let lower = orderedLevels.first, offset < lower {
            return lower
        }
        
        // Check if the upper bound is exceeded.
        if let upper = orderedLevels.last, offset > upper {
            guard bounces else {
                return upper
            }
            return upper + bounced(at: offset - upper, range: 80)
        }

        return offset
    }
    
    /// Compute the offset of the effect of dragging the bounced.
    private func bounced(at offset: CGFloat, range: CGFloat) -> CGFloat {
        
        // Must need to prevent dividing by 0.
        guard offset != 0 && range != 0 else {
            return 0
        }
        
        // Magic number from `Maps.app`
        let scale = CGFloat(0.55)
        
        // https://www.desmos.com/calculator/mvnbadnt8u
        return (offset * scale * range) / (offset * scale + range)
    }
    
    
    private var heightLayoutGuide: NSLayoutConstraint?
    
    private let containerView: UIView = .init()
    private let containerLayoutGuide: UILayoutGuide = .init()
    
    private var dragContentOffset: CGPoint = .zero
    private var dragGestureRecognizer: UIPanGestureRecognizer = .init()
    
    // Gets the sorted levels.
    private var orderedLevels: Array<CGFloat> = []
}


extension XCPresentationController: UITableViewDelegate, UITableViewDataSource {
    func test() {
        
        
        let contentView = UIView(frame: containerView.bounds)
        contentView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        containerView.addSubview(contentView)
        
        let headerView = UISearchBar().then {
            
            $0.backgroundColor = .random
            $0.translatesAutoresizingMaskIntoConstraints = false
            $0.searchBarStyle = .minimal
            
            
            contentView.addSubview($0)
            
            NSLayoutConstraint.activate(
                [
                    $0.topAnchor.constraint(equalTo: contentView.topAnchor),
                    $0.leftAnchor.constraint(equalTo: contentView.leftAnchor),
                    $0.rightAnchor.constraint(equalTo: contentView.rightAnchor),
                    
                    $0.heightAnchor.constraint(equalToConstant: 64)
                ]
            )
        }
        
        let scrollView = UITableView().then {
            
            $0.backgroundColor = .random
            $0.translatesAutoresizingMaskIntoConstraints = false
            $0.dataSource = self
            $0.delegate = self
            
            contentView.addSubview($0)
            NSLayoutConstraint.activate(
                [
                    $0.topAnchor.constraint(equalTo: headerView.bottomAnchor),
                    $0.leftAnchor.constraint(equalTo: contentView.leftAnchor),
                    $0.rightAnchor.constraint(equalTo: contentView.rightAnchor),
                    $0.bottomAnchor.constraint(equalTo: bottomLayoutGuide.topAnchor),
                ]
            )
        }
        
        self.headerView = headerView
        self.contentView = scrollView
        self.fotterView = nil
    }
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return 10
    }
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 9
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 88
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: "AB") {
            cell.contentView.backgroundColor = .random
            return cell
        }
        let cell = UITableViewCell(style: .default, reuseIdentifier: "AB")
        cell.contentView.backgroundColor = .random
        return cell
    }
    
    //    func scrollViewWillBeginDragging(_ scrollView: UIScrollView) {
    //        logger.trace?.write()
    //    }
    //
    //    func scrollViewWillEndDragging(_ scrollView: UIScrollView, withVelocity velocity: CGPoint, targetContentOffset: UnsafeMutablePointer<CGPoint>) {
    //        logger.trace?.write()
    //    }
    //
    //    func scrollViewDidScroll(_ scrollView: UIScrollView) {
    //        logger.trace?.write()
    //    }

}


//struct VelocityFilter {
//
//    var velocity: Double {
//
//        var result = 0.0
//        if sample.dt >= 0.001 {
//            result = (sample.end - sample.start) / sample.dt
//        }
//        if previousSample.dt > 0 {
//            var result2 = 0.0
//            if previousSample.dt >= 0.001 {
//                result2 = (previousSample.end - previousSample.start) / previousSample.dt
//                result2 = result2 * 0.75
//            }
//            result = result * 0.25 + result2
//        }
//        return result
//    }
//
//    mutating func add(_ value: Double, time: CFTimeInterval = CACurrentMediaTime()) {
//        print("\(value) => \(time)")
//
//        let t1 = time - previousTime
//        if t1 > 0.008 {
//
//            previousSample = sample
//            sample = (previousValue, value, t1)
//        }
//
//        previousValue = value
//        previousTime = time
//    }
//
//    mutating func reset(_ value: Double) {
//
//        sample = (0, 0, 0)
//        previousSample = (0, 0, 0)
//
//        previousTime = 0
//        previousValue = value
//
//    }
//
//    var sample: (start: Double, end: Double, dt: Double) = (0, 0, 0)
//    var previousSample: (start: Double, end: Double, dt: Double) = (0, 0, 0)
//
//    var previousValue: Double = 0
//    var previousTime: CFTimeInterval = 0
//}
//
//var heightVelocityFilter: VelocityFilter = .init()
//var heightAccelerationFilter: VelocityFilter = .init()
//
