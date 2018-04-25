requirejs.config({
	"baseUrl": "/static/js/lib",
	"paths": {
		"publicTip": "/static/js/app/public-tip",
		"zepto": "zepto.min"
    }
});

requirejs(["jquery", "publicTip"], function($, publicTip){
	$(function() {
		$("#confirmBtn").click(function () {
			var mobile = $("#mobile").val();
			var password = $("#password").val(); 
			var passwordConfirm = $("#passwordConfirm").val();

			if (mobile.trim() == '' || password.trim() == '' || passwordConfirm.trim() == '') {
				publicTip.showTipForStr("手机号，密码和确认密码必填");
				return;
			}
			if ( !/^1\d{10}$/.test(mobile) ) {
				publicTip.showTipForStr("手机号格式不正确");
				return;
			}
			if (password != passwordConfirm) {
				publicTip.showTipForStr("密码和确认密码不一致");
				return;
			}

			if ( $("#confirmBtn").hasClass('weui-btn_loading') ) {
				return;
			}

			var userReq = {
                mobile: mobile,
				password: password,
				passwordConfirm: passwordConfirm
            };
			
			$("#confirmBtn").addClass('weui-btn_loading');
			$("#confirmLoading").addClass('weui-loading');
			$.ajax({
				type: 'post',
				dataType: 'json',
				contentType: 'application/json',
				url: '/zshop/api/regist',
				data: JSON.stringify(userReq)
			}).done(function (r) {
				window.location.href = '/zshop?actTabbar=my';
			}).fail(function (jqXHR, textStatus) { // Not 200
				publicTip.showTip(jqXHR.responseJSON);
				$("#confirmBtn").removeClass('weui-btn_loading');
				$("#confirmLoading").removeClass('weui-loading');
			});
			
		});
		
	});
	
})