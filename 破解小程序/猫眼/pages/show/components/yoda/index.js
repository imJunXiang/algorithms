Component({
    externalClasses: [ "my-class" ],
    options: {
        addGlobalClass: !0
    },
    properties: {
        requestCode: {
            type: String,
            value: "",
            observer: function(e, s) {
                e !== s && this.initYodaSlider();
            }
        }
    },
    data: {
        showCloseBtn: !0
    },
    methods: {
        initYodaSlider: function() {
            var e = this.data, s = e.requestCode, t = e.showCloseBtn;
            this.Slider = this.selectComponent("#slider"), this.Slider.showSlider({
                requestCode: s,
                showCloseBtn: t
            });
        }
    }
});