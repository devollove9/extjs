/**
 * Created by Yaxin on 5/15/2015.
 */
! function(e) {
    function t(a) {
        if (n[a]) return n[a].exports;
        var r = n[a] = {
            exports: {},
            id: a,
            loaded: !1
        };
        return e[a].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "//static2.ele.me/eleme/account/", t(0)
}
([function(e, t, n) {
    n(3), n(5)
}, , , function(e, t, n) {}, , function(e, t, n) {
    n(25), n(26), n(30), n(21);
    var a = n(12).name,
        r = n(8).name,
        i = n(6).name,
        o = n(9).name,
        c = n(7).name,
        s = angular.module("account", ["ngRoute", "ngResource", "ng.shims.placeholder", "UBT", a, r, i, o, c]);
    s.run(["$rootScope", function(e) {
        var t = document.domain.replace(/^(.+?\.)??(?=(test\.)?[^.]+\.\w+$)/, "");
        e.DOMAIN = t, e.MAINHOST = "http://" + t, e.ROOTHOST = "//account." + t
    }]), s.factory("setLoginCookie", ["$rootScope", function(e) {
        return function(t, n) {
            "undefined" == typeof n && (n = !0);
            var a = new Date,
                r = n ? ";expires=" + new Date(a.setMonth(a.getMonth() + 1)).toUTCString() : "";
            document.cookie = "USERID=" + t + ";domain=" + e.DOMAIN + r
        }
    }]), s.config(["$locationProvider", "$routeProvider", "$provide", function(e, t, n) {
        n.decorator("$sniffer", ["$delegate", function(e) {
            var t = Number(document.documentMode),
                n = document.createElement("div"),
                a = {};
            return e.hasEvent = function(e) {
                return "input" === e && 11 >= t ? !1 : (angular.isUndefined(a[e]) && (a[e] = "on" + e in n), a[e])
            }, e
        }]), e.html5Mode(!0), t.when("/login", {
            templateUrl: "/app/templates/login.tpl.html",
            controller: "LoginViewCtrl"
        }), t.when("/login/iframe", {
            templateUrl: "/app/templates/login_iframe.tpl.html",
            controller: "LoginViewCtrl"
        }), t.when("/register", {
            templateUrl: "/app/templates/register.tpl.html",
            controller: "RegisterViewCtrl"
        }), t.when("/register/confirm", {
            templateUrl: "/app/templates/mail_confirm.tpl.html",
            controller: "ConfirmViewCtrl"
        }), t.when("/forget", {
            templateUrl: "/app/templates/forget.tpl.html",
            controller: "ForgetViewCtrl"
        }), t.when("/auth/connect/:authplat", {
            template: "<div>{{errTip}}</div>",
            controller: "AuthConnectCtrl"
        }), t.when("/ilogin", {
            redirectTo: "/login/iframe"
        }), t.otherwise({
            redirectTo: "/login"
        })
    }]), e.exports = s
}, function(e, t, n) {
    n(15), e.exports = angular.module("account.auth", []).controller("AuthConnectCtrl", ["$scope", "$rootScope", "$location", "setLoginCookie", "AuthConnect", function(e, t, n, a, r) {
        t.pageTitle = "第三方验证中";
        var i = n.path().split("/"),
            o = i[i.length - 1],
            c = n.search().code,
            s = n.absUrl().split("?")[0],
            l = {
                device: "web",
                sns_type: o,
                code: c,
                redirect_url: s
            };
        r.save(l, function(e) {
            a(e.user_id), location.href = t.MAINHOST
        }, function(e) {
            window.alert(e.data.message), location.href = t.ROOTHOST
        }), t.noGlobalWrap = 1
    }]).controller("AuthLinksCtrl", ["$scope", "$rootScope", function(e, t) {
        var n = "https:" + t.ROOTHOST;
        e.connectRenren = "http://graph.renren.com/oauth/grant?client_id=d8599a91632b4f5290708672bfc499ab&redirect_uri=" + n + "/auth/connect/renren&response_type=code&display=page&secure=true&origin=00000", e.connectWeibo = "https://api.weibo.com/oauth2/authorize?client_id=1772937595&response_type=code&redirect_uri=" + n + "/auth/connect/weibo", e.connectWechat = "https://open.weixin.qq.com/connect/qrconnect?appid=wx95a12be8f43eb13b&redirect_uri=" + encodeURIComponent(n + "/auth/connect/weixin") + "&response_type=code&scope=snsapi_login&state=fdfaefd#wechat_redirect", e.connectQQ = "https://graph.qq.com/oauth2.0/authorize?client_id=101204453&redirect_uri=" + encodeURIComponent(n + "/auth/connect/qq") + "&response_type=code&scope=get_user_info&state=e215d9bc90ea76307f7aaf830b6cb351216e716b"
    }]).factory("AuthConnect", ["$resource", function(e) {
        return e("/restapi/v1/login/sns")
    }])
}, function(e, t, n) {
    n(16), n(17), n(18), n(19), n(20), e.exports = angular.module("account.forget", []).controller("ForgetViewCtrl", ["$scope", "$rootScope", function(e, t) {
        t.pageTitle = "找回密码", e.complete = !1, e.forget = {}, e.forget.step = 1, e.forget.retrieveWay = "email"
    }]).controller("inputInfoCtrl", ["$scope", "$q", "modelUpdated", "Forget", function(e, t, n, a) {
        e.accountPattern = /(^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$)|(^1[3|4|5|8|7]\d{9}$)/, e.forgetInfoSubmit = function() {
            e.forget.error = "", e.submitted = !1, e.$broadcast("forgetInfoSubmit"), n(e.account)["catch"](function() {
                return e.submitted = !0, t.reject()
            }).then(function() {
                var t = e.forget.account;
                e.forget.submitting = !0, t.match(/^1[3|4|5|8]\d{9}$/) && (e.forget.retrieveWay = "mobile");
                var n = e.forget.retrieveWay,
                    i = {
                        type: n
                    };
                i[n] = e.forget.account, a.exists.get(i, function(t) {
                    t.is_exists ? r() : (e.submitted = !0, e.forget.submitting = !1, e.forget.error = "email" === n ? "此Email没有被注册，请检查" : "此手机号没有被注册，请检查", e.$broadcast("captcha.refresh"))
                }, function(t) {
                    e.submitted = !0, e.forget.error = t.data ? t.data.message : "服务器出错啦"
                })
            })
        };
        var r = function() {
            var t = e.forget.retrieveWay,
                n = {
                    device: t
                };
            n[t] = e.forget.account, n.sendName = "send_with_captcha", n.captcha_code = e.forget.captcha_code, "mobile" === t && (n.type = "sms"), a.sendVerify.save(n, function(t) {
                e.forget.submitting = !1, e.forget.step = 2, e.forget.validateToken = t.validate_token, e.forget.error = ""
            }, function(t) {
                e.submitted = !0, e.forget.submitting = !1, e.forget.error = t.data.message, e.$broadcast("captcha.refresh")
            })
        }
    }]).controller("verifyAccountCtrl", ["$scope", "Forget", "$q", "modelUpdated", function(e, t, n, a) {
        var r = e.forget.retrieveWay;
        "mobile" === r ? e.smsForgetCountdown = "start" : e.emailForgetCountdown = "start", e.ForgetSendVerify = function(n) {
            var a = n + "ForgetCountdown";
            if ("running" !== e[a]) {
                e[a] = "start";
                var i = e.forget.account,
                    o = {
                        device: r
                    };
                o[r] = i, o.sendName = "send", "mobile" === r && (o.type = n), t.sendVerify.save(o, function(t) {
                    e.forget.validateToken = t.validate_token
                }, function(t) {
                    e[a] = "stop", e.forget.error = t.data.message
                })
            }
        }, e.verifyInfo = function() {
            e.submitted = !1, e.forget.error = "", e.$broadcast("forget.verifyInfo"), a(e.verifyAccount)["catch"](function() {
                return e.submitted = !0, n.reject()
            }).then(function() {
                if (!e.forget.submitting) {
                    e.forget.submitting = !0;
                    var n = e.forget.retrieveWay;
                    t.validateCode.save({
                        device: n,
                        validate_token: e.forget.validateToken,
                        validate_code: e.forget.validateCode
                    }, function(t) {
                        e.forget.submitting = !1, t.validate ? (e.forget.step = 3, "email" === n ? e.forget.validateToken = t.email_token : e.forget.validateToken = t.mobile_token, e.forget.error = "") : (e.submitted = !0, e.forget.error = "验证码错误，请输入正确的验证码")
                    }, function(t) {
                        e.forget.submitting = !1, e.submitted = !0, e.forget.error = t.data.message
                    })
                }
            })
        }, e.back = function() {
            for (var t in e.forget) e.forget[t] = "";
            e.forget.step = 1, e.forget.retrieveWay = "email"
        }
    }]).controller("resetCtrl", ["$scope", "$q", "modelUpdated", "Forget", function(e, t, n, a) {
        e.reset = function() {
            e.forget.error = "", e.submitted = !1, e.$broadcast("forget.reset"), n(e.resetForm)["catch"](function() {
                return e.submitted = !0, t.reject()
            }).then(function() {
                if (e.forget.newPwd !== e.forget.newPwdConfirm) return e.submitted = !0, e.forget.error = "两次输入密码不一致，请确认", !1;
                if (!e.forget.submitting) {
                    var t = "email" === e.forget.retrieveWay ? "email_token" : "mobile_token",
                        n = {
                            type: t
                        };
                    n[t] = e.forget.validateToken, n.new_password = e.forget.newPwd, a.resetPwd.save(n, function() {
                        e.forget.step = 4, e.forget.complete = !0, e.forget.error = ""
                    }, function(t) {
                        e.submitted = !0, e.forget.error = t.data.message
                    })
                }
            })
        }
    }]).factory("Forget", ["$resource", function(e) {
        var t = {};
        return t.sendVerify = e("/restapi/v1/:device/verify_code/:sendName", {
            device: "@device",
            sendName: "@sendName"
        }), t.exists = e("/restapi/v1/users/exists"), t.validateCode = e("/restapi/v1/:device/verify_code/validate", {
            device: "@device"
        }), t.resetPwd = e("/restapi/v1/users/password/reset"), t
    }]).filter("MailServer", function() {
        return function(e) {
            var t = e.split("@")[1];
            switch (t) {
                case "gmail.com":
                    return "https://mail.google.com";
                default:
                    return "http://mail." + t
            }
        }
    }).filter("phoneProtect", function() {
        return function(e) {
            return e.replace(/^(\w{3})(\w{4})/, "$1****")
        }
    })
}, function(e, t, n) {
    n(22), n(23), n(24), e.exports = angular.module("account.login", []).controller("LoginViewCtrl", ["$scope", "$rootScope", "$location", function(e, t, n) {
        if (t.pageTitle = "登录", "/login/iframe" === n.path() && (t.noGlobalWrap = 1), e.iframe = {}, e.normalMode = 1, e.changeMode = function() {
                e.normalMode = !e.normalMode
            }, document.cookie.match("USERID")) {
            if (t.noGlobalWrap) return parent.postMessage(JSON.stringify({
                success: !0
            }), "*");
            location.href = t.MAINHOST
        }
    }]).controller("LoginNormalCtrl", ["$scope", "$rootScope", "$q", "Login", "setLoginCookie", "LogTips", "modelUpdated", function(e, t, n, a, r, i, o) {
        e.submitted = 0, e.submitting = 0, e.$watch("submitted", function(t) {
            e.iframe.hideAuth = t
        }), e.loginNormal = function() {
            return document.cookie.match("USERID") ? (e.errTip = "已有账户登录，正在跳转到首页...", void(location.href = t.MAINHOST)) : (e.errTip = 0, e.$broadcast("loginnormal.submit"), void o(e.loginnormal)["catch"](function() {
                return e.submitted = 1, n.reject()
            }).then(function() {
                e.submitting = 1, a.login.save({
                    username: e.normalForm.username,
                    password: e.normalForm.password,
                    captcha_code: e.normalForm.captcha_code
                }, function(e) {
                    return r(e.user_id), t.noGlobalWrap ? parent.postMessage(JSON.stringify({
                        success: !0
                    }), "*") : void(location.href = t.MAINHOST)
                }, function(n) {
                    return e.submitted = 1, "ACCOUNT_HAS_LOGIN" === n.data.name ? (e.errTip = "已有账户登录，正在跳转到首页...", t.noGlobalWrap ? parent.postMessage(JSON.stringify({
                        success: !0
                    }), "*") : void(location.href = t.MAINHOST)) : (e.submitting = 0, e.normalForm.captcha_code = "", e.$broadcast("captcha.refresh"), e.loginnormal.captcha_code.$setPristine(), void(e.errTip = i(n.data)))
                })
            }))
        }
    }]).controller("LoginMobileCtrl", ["$scope", "$rootScope", "$q", "modelUpdated", "Login", "setLoginCookie", "LogTips", function(e, t, n, a, r, i, o) {
        e.mobilePattern = /^1[3-9]\d{9}$/, e.submitted = 0, e.gotToken = 0, e.submitting = 0, e.mobileForm = {}, e.validate_token = 0, e.hideTip = function() {
            e.submitted = 0, e.gotToken = 0
        }, e.getToken = function(t) {
            e.hideTip();
            var i = t + "LoginCountdown";
            "running" !== e.countStatus && (e.errTip = 0, e.$broadcast("loginmobile.getToken"), a(e.loginmobile.mobile).then(function() {
                return e[i] = "start", r.mobileExists.get({
                    type: "mobile",
                    mobile: e.mobileForm.mobile
                }).$promise
            })["catch"](function() {
                return n.reject("invalid")
            }).then(function(n) {
                n.is_exists === !1 && (e[t + "LoginCountdown"] = "stop", e.gotToken = 1, e.errTip = {
                    errorExists: 1
                })
            }).then(function() {
                r.mobileVerify.save({
                    mobile: e.mobileForm.mobile,
                    type: t
                }, function(t) {
                    e.validate_token = t.validate_token
                }, function(n) {
                    e[t + "LoginCountdown"] = "stop", e.gotToken = 1, e.errTip = o(n.data)
                })
            })["catch"](function(t) {
                if (e.gotToken = 1, t && t.data) throw e.errTip = t.data.message, t
            }))
        }, e.loginMobile = function() {
            return document.cookie.match("USERID") ? (e.errTip = "已有账户登录，正在跳转到首页...", void(location.href = t.MAINHOST)) : (e.hideTip(), e.errTip = 0, e.$broadcast("loginmobile.submit"), void a(e.loginmobile)["catch"](function() {
                return e.submitted = 1, n.reject()
            }).then(function() {
                e.submitting = 1, r.login.save({
                    way: "mobile",
                    validate_token: e.validate_token,
                    code: e.mobileForm.code
                }, function(e) {
                    return i(e.user_id), t.noGlobalWrap ? parent.postMessage(JSON.stringify({
                        success: !0
                    }), "*") : void(location.href = t.MAINHOST)
                }, function(n) {
                    return e.submitted = 1, "ACCOUNT_HAS_LOGIN" === n.data.name ? (e.errTip = "已有账户登录，正在跳转到首页...", t.noGlobalWrap ? parent.postMessage(JSON.stringify({
                        success: !0
                    }), "*") : void(location.href = t.MAINHOST)) : (e.submitting = 0, void(e.errTip = o(n.data)))
                })
            }))
        }
    }]).factory("LogTips", [function() {
        return function(e) {
            if (e.name) switch (e.name) {
                case "VALIDATION_FAILED":
                    return "验证码错误，请输入正确的验证码！";
                case "INVALID_VALIDATE_TOKEN":
                    return "验证码错误，请输入正确的短信验证码！";
                case "USER_AUTH_FAIL":
                    return "用户名或密码有误，请重新输入，注意大小写";
                default:
                    return e.message
            }
        }
    }]).factory("Login", ["$resource", function(e) {
        return {
            login: e("/restapi/v1/login/:way", {
                way: "@way"
            }),
            mobileVerify: e("/restapi/v1/mobile/verify_code/send"),
            mobileExists: e("/restapi/v1/users/exists")
        }
    }])
}, function(e, t, n) {
    n(27), n(28), n(29), e.exports = angular.module("account.register", []).controller("RegisterViewCtrl", ["$scope", "$rootScope", function(e, t) {
        t.pageTitle = "注册", e.mobileMode = 1, e.register = {}, e.pwShow = 0, e.changeMode = function() {
            e.mobileMode = !e.mobileMode
        }, document.cookie.match("USERID") && (location.href = t.MAINHOST)
    }]).controller("registerFormCtrl", ["$scope", "$rootScope", "$q", "Register", "RegTips", "modelUpdated", function(e, t, n, a, r, i) {
        e.sendMobileVerify = function(t) {
            e.submitted = !1, e.$broadcast("registerForm.getToken"), i(e.registerForm.account)["catch"](function() {
                return n.reject("mobile_invalid")
            }).then(function() {
                return a.exists.get({
                    type: "mobile",
                    mobile: e.register.mobile
                }).$promise
            }).then(function(t) {
                return t.is_exists ? (e.gotToken = 1, e.errInfo = {
                    errorExists: 1
                }, n.reject("account_exists")) : void 0
            }).then(function() {
                var n = t + ["RegisterCountdown"];
                return "running" === e.audioRegisterCountdown ? !1 : (e[n] = "start", void a.sendVerify.save({
                    device: "mobile",
                    mobile: e.register.mobile,
                    type: t
                }, function(t) {
                    e.mobileVerify = !0, e.register.mobileToken = t.validate_token
                }, function(t) {
                    e[n] = "stop", e.errInfo = t.data.message
                }))
            })["catch"](function(t) {
                e.gotToken = !0, "mobile_invalid" !== t && t && t.data && (e.errInfo = t.data.message)
            })
        }, e.registerSubmit = function() {
            return document.cookie.match("USERID") ? (e.errInfo = "已有账户登录，正在跳转到首页...", void(location.href = t.MAINHOST)) : (e.submitted = !1, e.gotToken = !1, e.registered = !1, e.errInfo = "", e.$broadcast("registerForm.submit"), void i(e.registerForm)["catch"](function() {
                return e.submitted = !0, n.reject()
            }).then(function() {
                if (e.mobileMode && !e.mobileVerify) return console.log(".."), e.submitted = !0, e.errInfo = "请先获取手机验证码", !1;
                if (e.register.submitting) return !1;
                e.register.submitting = !0;
                var t = {};
                e.mobileMode ? (t.device = "mobile", t.validate_token = e.register.mobileToken, t.code = e.register.code) : (t.email = e.register.email, t.captcha_code = e.register.captcha), t.password = e.register.password, a.post.save(t, function() {
                    e.register.submitting = !1, e.register.mailConfirm = !0, e.mobileMode || o()
                }, function(t) {
                    return e.submitted = !0, e.register.submitting = !1, "ACCOUNT_HAS_LOGIN" === t.data.name && (e.errInfo = "已有账户登录，注册前请退出登录"), e.$broadcast("captcha.refresh"), "EMAIL_OCCUPIED" === t.data.name ? (e.submitted = !1, e.registered = !0, void(e.errInfo = 0)) : void(e.errInfo = r(t.data))
                })
            }))
        };
        var o = function() {
            a.sendVerify.save({
                device: "email",
                email: e.register.email
            }, function(t) {
                e.register.validateToken = t.validate_token
            })
        }
    }]).controller("confirmMailCtrl", ["$scope", "$rootScope", "Register", function(e, t, n) {
        e.newVerify = "start", e.sendEmailVerify = function() {
            return "running" === e.newVerify ? !1 : (e.newVerify = "start", void n.sendVerify.save({
                device: "email",
                email: e.register.email
            }, function(t) {
                e.register.validateToken = t.validate_token
            }, function(t) {
                e.submitted = !0, e.confirmMailTip = t.data.message
            }))
        };
        var a = function() {
            return n.emailValidate.save({
                validate_token: e.register.validateToken,
                validate_code: e.register.validateCode
            }).$promise
        };
        e.confirmMailSubmit = function() {
            if (e.confirmMailTip = "", e.submitted = !1, e.confirmMail.$invalid) return e.submitted = !0, !1;
            if (e.submitting) return !1;
            e.submitting = !0;
            var r = a();
            r.then(function(t) {
                return t.validate ? t.email_token : (e.submitting = !1, e.submitted = !0, void(e.confirmMailTip = "邮箱验证码错误，请检查"))
            }, function(t) {
                e.submitting = !1, e.submitted = !0, e.confirmMailTip = t.data.message
            }).then(function(a) {
                a && n.bindEmail.save({
                    email_token: a
                }, function() {
                    location.href = t.MAINHOST
                }, function(t) {
                    e.submitting = !1, e.submitted = !0, e.confirmMailTip = t.data.message
                })
            })
        }
    }]).filter("MailServer", function() {
        return function(e) {
            var t = e.split("@")[1];
            switch (t) {
                case "gmail.com":
                    return "https://mail.google.com";
                default:
                    return "http://mail." + t
            }
        }
    }).factory("RegTips", [function() {
        return function(e) {
            if (e.name) switch (e.name) {
                case "VALIDATION_FAILED":
                    return "验证码错误，请输入正确的验证码！";
                case "INVALID_VERIFY_CODE":
                    return "短信验证码错误，请输入正确的短信验证码！";
                case "UNSAFE_PASSWORD":
                    return "密码过于简单，请重新设置";
                default:
                    return e.message
            }
        }
    }]).factory("Register", ["$resource", function(e) {
        var t = {};
        return t.post = e("/restapi/v1/register/:device", {
            device: "@device"
        }), t.sendVerify = e("/restapi/v1/:device/verify_code/send", {
            device: "@device"
        }), t.emailValidate = e("/restapi/v1/email/verify_code/validate"), t.exists = e("/restapi/v1/users/exists"), t.bindEmail = e("/restapi/v1/user/email?_method=PUT"), t
    }])
}, function(e, t, n) {
    e.exports = angular.module("UBT").config(["$httpProvider", function(e) {
        e.interceptors.push(["tracking", "$q", function(e, t) {
            var n = /^\/restapi\/v1/,
                a = [],
                r = function(e) {
                    return a.push({
                        beginstamp: Date.now(),
                        config: e
                    }), e
                },
                i = function(r) {
                    for (var i = function(t) {
                        return function() {
                            e.send("API", {
                                status: r.status,
                                url: r.config.url,
                                duration: Date.now() - t.beginstamp
                            })
                        }
                    }, o = 0; o < a.length; o++)
                        if (a[o].config === r.config) {
                            n.test(r.config.url) && setTimeout(i(a[o])), a.splice(o, 1);
                            break
                        }
                    var c = t.defer();
                    return 2 === (r.status / 100 | 0) ? c.resolve(r) : c.reject(r), c.promise
                };
            return {
                request: r,
                response: i,
                responseError: i
            }
        }])
    }]).factory("tracking", ["$rootScope", "UBT", function(e, t) {
        var n = t,
            a = document.referrer,
            r = document.documentElement;
        return e.$on("$routeChangeStart", function() {
            n.send("PV", {
                resolution: Math.max(r.clientWidth, window.innerWidth || 0) + "x" + Math.max(r.clientHeight, window.innerHeight || 0),
                location: location.href,
                referrer: a
            }), a = location.href
        }), n
    }])
}, function(e, t, n) {
    n(31), e.exports = angular.module("components.captcha", ["ngResource"]).factory("Captcha", ["$resource", function(e) {
        return e("/restapi/v1/captchas/:param", {
            param: "@param"
        }, {
            get: {
                method: "GET",
                param: "@param"
            }
        })
    }]).directive("captcha", ["Captcha", function(e) {
        return {
            restrict: "EA",
            templateUrl: "/components/templates/captcha.tpl.html",
            link: function(t) {
                t.refreshCaptcha = function() {
                    e.save(function(e) {
                        t.imgUrl = "/restapi/v1/captchas/" + e.code
                    })
                }, t.refreshCaptcha(), t.$on("captcha.refresh", t.refreshCaptcha)
            }
        }
    }])
}, function(e, t, n) {
    e.exports = angular.module("components", [n(14).name, n(10).name, n(11).name, n(13).name])
}, function(e, t, n) {
    e.exports = angular.module("components.countdown", []).directive("countdown", ["$timeout", function(e) {
        return {
            restrict: "EA",
            scope: {
                status: "=",
                mode: "@"
            },
            link: function(t, n, a) {
                var r, i, o = n.html(),
                    c = +a.time,
                    s = a.tpl ? a.tpl.split("?time") : ["倒计时", "秒"],
                    l = function() {
                        return "stop" === t.status ? u() : (n.text(s[0] + --r + s[1]), r > 0 ? void(i = e(l, 1e3)) : u())
                    },
                    u = function() {
                        n.removeClass("disabled"), n.html(o), e.cancel(i), r = -1, t.status = "end"
                    },
                    d = function() {
                        return r > 0 ? function() {
                            t.status = "running"
                        } : (t.status = "running", r = c, n.addClass("disabled"), void l())
                    };
                t.mode && "button" !== t.mode || n.on("click", d), t.$watch("status", function(e) {
                    "start" === e && d(), "stop" === e && u()
                }), t.$on("$destroy", function() {
                    i && e.cancel(i)
                })
            }
        }
    }])
}, function(e, t, n) {
    e.exports = angular.module("components.updateModelOn", []).directive("updateModelOn", ["$timeout", function(e) {
        return {
            priority: 1,
            restrict: "A",
            require: ["ngModel"],
            link: function(t, n, a, r) {
                var i = a.updateModelOn.split(/\s+/),
                    o = n[0].nodeName.toLowerCase() + (a.type || ""),
                    c = function(i) {
                        if (!i || (i.preventDefault(), !i.relatedTarget || "BUTTON" !== i.relatedTarget.nodeName)) {
                            var c;
                            switch (o) {
                                case "inputradio":
                                    c = a.ngValue ? t.$eval(a.ngValue) : n.val();
                                    break;
                                case "inputcheckbox":
                                    c = n.prop("checked");
                                    break;
                                case "select":
                                    throw "Not support select yet. Sorry.";
                                default:
                                    c = n.val(), a.ngTrim && "false" === a.ngTrim.toLowerCase() || (c = c.replace(/^\s+|\s+$/g, ""))
                            }
                            e(function() {
                                t.$apply(function() {
                                    r[0].$setViewValue(c)
                                })
                            })
                        }
                    },
                    s = [];
                s = "inputtext" === o || "textarea" === o ? ["keydown", "input", "change"] : "inputradio" === o || "inputcheckbox" === o ? ["click"] : "select" === o ? ["change"] : ["keydown", "input", "change"], angular.forEach(s, function(e) {
                    n.off(e)
                }), angular.forEach(i, function(e) {
                    "blur" === e ? n.on(e, c) : t.$on(e, c)
                }), c()
            }
        }
    }]).factory("modelUpdated", ["$q", "$timeout", function(e, t) {
        return function(n) {
            var a = e.defer();
            return t(function() {
                n.$invalid ? a.reject() : a.resolve()
            }), a.promise
        }
    }])
}, function(e, t, n) {
    var a = '<div ng-controller="AuthLinksCtrl"> <h4 class="auth-linktitle">可使用以下账号直接登录</h4>   <a class="auth-link weibo" ng-href="{{connectWeibo}}" target="_blank">微博</a>\n<a class="auth-link renren" ng-href="{{connectRenren}}" target="_blank">人人</a> </div>';
    window.angular.module(["ng"]).run(["$templateCache", function(e) {
        e.put("/app/templates/_auth_links.tpl.html", a)
    }]), e.exports = a
}, function(e, t, n) {
    var a = '<div class="forget-tip"> <p class="forget-tip-title">请填写你需要找回的账号信息</p> </div> <form class="account-form forget" name="account" ng-controller="inputInfoCtrl" ng-submit="forgetInfoSubmit()" autocomplete="off" novalidate> <div class="form-group error-group" ng-show="submitted && (account.$invalid || forget.error)"> <p class="account-errtip" ng-show="forget.error" ng-bind="forget.error"></p> <p class="account-errtip" ng-show="account.username.$invalid">请输入正确的邮箱/手机号</p> <p class="account-errtip" ng-show="account.captcha_code.$invalid">请输入验证码</p> </div> <div class="form-group"> <label class="account-label">邮箱/手机号</label> <input class="account-input" type="text" name="username" placeholder="输入账号使用的手机号或邮箱" update-model-on="blur forgetInfoSubmit" ng-pattern="accountPattern" ng-model="forget.account" required/> </div> <div class="form-group account-verify"> <label class="account-label">验证码</label> <input class="account-input verify" name="captcha_code" type="text" update-model-on="blur forgetInfoSubmit" ng-model="forget.captcha_code" placeholder="验证码" ng-keydown="submitted = false" required/>\n<span captcha class="account-captcha"></span> </div> <div class="form-group"> <button class="account-btn submit" ng-class="{disabled: forget.submitting}" ng-bind="forget.submitting ? \'提交中...\': \'下一步\'">下一步</button> </div> </form>';
    window.angular.module(["ng"]).run(["$templateCache", function(e) {
        e.put("/app/templates/_forget_input.tpl.html", a)
    }]), e.exports = a
}, function(e, t, n) {
    var a = '<div class="forget-tip"> <h3 class="forget-tip-title">恭喜，账号验证成功</h3> <p>请重置你的登陆密码并妥善保管</p> </div> <form class="account-form forget" name="resetForm" ng-controller="resetCtrl" ng-submit="reset()" autocomplete="off" novalidate> <div class="form-group error-group" ng-show="submitted && (resetForm.$invalid || forget.error)"> <p class="account-errtip" ng-show="forget.error" ng-bind="forget.error"></p> <p class="account-errtip" ng-show="resetForm.pwd.$invalid">密码需要是字母或数字，最小6位，最大20位</p> <p class="account-errtip" ng-show="resetForm.confirmPwd.$invalid">请确认密码</p> </div> <div class="form-group"> <label class="account-label">新密码</label> <input class="account-input" type="password" name="pwd" ng-minlength="6" ng-maxlenth="20" update-model-on="forget.reset blur" ng-model="forget.newPwd" ng-keydown="submitted = false" required/> </div> <div class="form-group"> <label class="account-label">确认密码</label> <input class="account-input" type="password" name="confirmPwd" update-model-on="forget.reset blur" ng-model="forget.newPwdConfirm" ng-keydown="submitted = false" required/> </div> <div class="form-group"> <button class="account-btn submit" type="submit" ng-class="{disabled: forget.submitting}" ng-bind="forget.submitting ? \'提交中...\': \'完成\'">完成</button> </div> </form>';
    window.angular.module(["ng"]).run(["$templateCache", function(e) {
        e.put("/app/templates/_forget_reset.tpl.html", a)
    }]), e.exports = a
}, function(e, t, n) {
    var a = '<div class="forget-reset forget-tip"> <h3 class="forget-tip-title">恭喜，密码重置成功</h3> <p class="weak">你的密码已经设置成功，你现在可以</p> </div> <a class="account-btn login-now" href="/login">立即登录</a>';
    window.angular.module(["ng"]).run(["$templateCache", function(e) {
        e.put("/app/templates/_forget_reset_success.tpl.html", a)
    }]), e.exports = a
}, function(e, t, n) {
    var a = '<div ng-controller="verifyAccountCtrl"> <div class="forget-tip"> <h3 class="forget-tip-title">请验证你的邮箱</h3> <p class="weak">已向你的邮箱<a href="javascript:">{{forget.account}}</a>发送了一封验证邮件。</p> <p class="weak">请将邮件中的6位验证码输入下方的输入框内，完成邮箱验证。</p> </div> <form class="account-form forget" name="verifyAccount" ng-submit="verifyInfo()" autocomplete="off" novalidate> <div class="form-group"> <label class="account-label">邮箱验证码</label> <input class="account-input email-verify verify" type="text" update-model-on="forget.verifyInfo blur" ng-model="forget.validateCode" ng-keydown="submitted = false" required/>\n<button class="account-btn short fr" ng-class="{disabled: forget.submitting}" ng-bind="forget.submitting ? \'提交中...\' : \'验证邮箱\'">验证邮箱</button>\n<a class="text-to-email-verify" ng-href="{{forget.account | MailServer}}" target="_blank">去邮箱查阅</a> </div> <div class="form-group error-group" ng-show="submitted && (verifyAccount.$invalid || forget.error)"> <p class="account-errtip" ng-show="forget.error" ng-bind="forget.error"></p> <p class="account-errtip" ng-show="verifyAccount.$invalid">请输入邮箱验证码</p> </div> </form> <div class="forget-tip bottom"> <h4 class="forget-tip-title fs14">没有收到邮件？</h4> <ol class="forget-tip-ol weak"> <li> <span class="color-red" countdown time="60" tpl="?time 秒后 " status="emailForgetCountdown"></span>如果你没有收到验证邮件，\n<a class="forget-tip-link" href="javascript:" ng-disabled="emailForgetCountdown === \'running\'" ng-click="ForgetSendVerify(\'email\')">请点击此处重新发送验证邮件</a> </li> <li>你的邮件系统可能会误将激活邮件识别为垃圾邮件，请到垃圾邮件目录找找。</li> </ol> </div> </div>';
    window.angular.module(["ng"]).run(["$templateCache", function(e) {
        e.put("/app/templates/_forget_verify_email.tpl.html", a)
    }]), e.exports = a
}, function(e, t, n) {
    var a = '<div class="forget-tip"> <h3 class="forget-tip-title">请验证你的手机</h3> <p>若当前号码已不用/丢失，或无法收到验证码？请联系客服：<a href="javascript:">4000-557-117</a></p> </div> <form class="account-form forget" name="verifyAccount" ng-controller="verifyAccountCtrl" ng-submit="verifyInfo()" autocomplete="off" novalidate> <div class="form-group"> <label class="account-label">手机号</label> <p class="account-text"><strong ng-bind="forget.account | phoneProtect"></strong></p> </div> <div class="form-group"> <label class="account-label">手机验证码</label> <input class="account-input" type="text" name="code" update-model-on="forget.verifyInfo blur" ng-model="forget.validateCode" ng-keydown="submitted = false" required/>\n<button countdown tpl="重新发送(?time)" mode="text" time="60" ng-class="{disabled: smsForgetCountdown === \'running\' || audioRegisterCountdown === \'running\'}" status="smsForgetCountdown" class="account-btn verify" ng-click="ForgetSendVerify(\'sms\')" type="button">获取验证码</button>  <section> <p class="countdown-tip" ng-show="smsForgetCountdown === \'running\'">短信已发送，请输入短信中的验证码</p> <p class="countdown-tip" ng-show="smsForgetCountdown === \'end\' && audioForgetCountdown !== \'running\'"> 收不到短信？使用<a href="javascript:" ng-class="{disabled: audioForgetCountdown === \'running\'}" ng-click="ForgetSendVerify(\'audio\')">语音验证码</a> </p> <div class="account-line countdown-tip" ng-show="smsForgetCountdown === \'end\' && audioForgetCountdown === \'running\'"> <p>电话拨打中... 请留意你的手机来电</p> <p class="tip-lower" countdown mode="text" time="60" tpl="?time 秒后可重新拨打" status="audioForgetCountdown"></p> </div> </section> </div> <div class="form-group error-group" ng-show="submitted && (verifyAccount.$invalid || forget.error)"> <p class="account-errtip" ng-show="forget.error" ng-bind="forget.error"></p> <p class="account-errtip" ng-show="verifyAccount.$invalid">请输入短信验证码</p> </div> <div class="form-group"> <button class="account-btn submit short" ng-class="{disabled: forget.submitting}" ng-bind="forget.submitting ? \'提交中...\': \'验证手机\'">验证手机</button>\n<a class="forget-back" href="javascript:" ng-click="back()">返回上一页</a> </div> </form>';
    window.angular.module(["ng"]).run(["$templateCache", function(e) {
        e.put("/app/templates/_forget_verify_mobile.tpl.html", a)
    }]), e.exports = a
}, function(e, t, n) {
    var a = '<section class="account-main full forget"> <header class="forget-header" ng-class="{\'hidden\': complete}"> <h3 class="forget-header-title">找回密码</h3> <ul class="forget-header-guide"> <li class="item cur" ng-class="{}"> <span class="num">1</span>\n<span>输入账号信息</span> </li> <li class="item line"></li> <li class="item" ng-class="{\'cur\': forget.step>=2}"> <span class="num">2</span>\n<span>验证信息</span> </li> <li class="item line"></li> <li class="item" ng-class="{\'cur\': forget.step>=3}"> <span class="num">3</span>\n<span>重置密码</span> </li> </ul> </header> <section> <div ng-if="forget.step===1" ng-include="\'/app/templates/_forget_input.tpl.html\'"></div> <div ng-if="forget.step===2&&forget.retrieveWay===\'mobile\'" ng-include="\'/app/templates/_forget_verify_mobile.tpl.html\'"></div> <div ng-if="forget.step===2&&forget.retrieveWay===\'email\'" ng-include="\'/app/templates/_forget_verify_email.tpl.html\'"></div> <div ng-if="forget.step===3" ng-include="\'/app/templates/_forget_reset.tpl.html\'"></div> <div ng-if="forget.step===4" ng-include="\'/app/templates/_forget_reset_success.tpl.html\'"></div> </section> </section>';
    window.angular.module(["ng"]).run(["$templateCache", function(e) {
        e.put("/app/templates/forget.tpl.html", a)
    }]), e.exports = a
}, function(e, t, n) {
    var a = '<div class="account-line"> <h3 class="account-title line-left">登录</h3> <a class="login-mode-toggle line-right" href="javascript:" ng-click="changeMode()" ng-if="normalMode">手机验证登录<span class="icon icon-mobile"></span></a>\n<a class="login-mode-toggle line-right" href="javascript:" ng-click="changeMode()" ng-if="!normalMode">普通方式登录<span class="icon icon-user"></span></a> </div> <div ng-show="normalMode" class="login-form" ng-include src="\'/app/templates/_login_normal.tpl.html\'"></div> <div ng-show="!normalMode" class="login-form" ng-include src="\'/app/templates/_login_mobile.tpl.html\'"></div> <div class="account-line"> <a href="/register" target="_blank">新用户注册</a>\n<a class="line-right" href="/forget" target="_blank">忘记密码</a> </div> <div class="account-authlink" ng-include="\'/app/templates/_auth_links.tpl.html\'" ng-hide="noGlobalWrap && iframe.hideAuth"></div>';
    window.angular.module(["ng"]).run(["$templateCache", function(e) {
        e.put("/app/templates/_login_main.tpl.html", a)
    }]), e.exports = a
}, function(e, t, n) {
    var a = '<form name="loginmobile" class="account-form" ng-submit="loginMobile()" ng-controller="LoginMobileCtrl" novalidate> <div class="form-group error-group" ng-show="!gotToken && submitted && (loginmobile.$invalid || errTip)"> <div class="account-errtip" ng-show="errTip" ng-bind="errTip"></div> <div class="account-errtip" ng-show="loginmobile.mobile.$error.required">请输入正确的手机号</div> <div class="account-errtip" ng-show="loginmobile.mobile.$error.pattern">请输入正确的手机号</div> <div class="account-errtip" ng-show="loginmobile.code.$error.required">请输入短信验证码</div> </div> <div class="form-group error-group" ng-show="gotToken && !submitted"> <div class="account-errtip" ng-show="errTip && errTip.errorExists">手机号还未注册，是否 <a href="{{ROOTHOST}}/register">立即注册</a></div> <div class="account-errtip" ng-show="errTip" ng-bind="errTip"></div> <div class="account-errtip" ng-show="loginmobile.mobile.$error.required">请输入正确的手机号</div> <div class="account-errtip" ng-show="loginmobile.mobile.$error.pattern">请输入正确的手机号</div> </div> <div class="form-group compact"> <input name="mobile" ng-model="mobileForm.mobile" class="account-input withicon" type="text" placeholder="手机号" ng-class="{error: (submitted || gotToken) && loginmobile.mobile.$dirty && loginmobile.mobile.$invalid}" update-model-on="loginmobile.submit loginmobile.getToken blur" ng-pattern="mobilePattern" required>\n<span class="account-inputicon icon icon-mobile"></span> </div> <div class="form-group"> <input name="code" ng-model="mobileForm.code" class="account-input withicon" type="text" placeholder="手机验证码" ng-class="{error: submitted && loginmobile.code.$dirty && loginmobile.code.$invalid}" update-model-on="loginmobile.submit blur" required>\n<span class="account-inputicon icon icon-lock"></span>\n<button type="button" countdown mode="text" tpl="重新发送(?time)" time="60" status="smsLoginCountdown" class="account-btn verify" ng-class="{disabled: smsLoginCountdown === \'running\' || audioLoginCountdown === \'running\'}" ng-click="getToken(\'sms\')">获取验证码</button> <div class="account-line countdown-tip" ng-show="smsLoginCountdown === \'running\'">短信已发送，请输入短信中的验证码</div> <div class="account-line countdown-tip" ng-show="smsLoginCountdown === \'end\' && !gotToken && audioLoginCountdown !== \'running\'"> 收不到短信？使用 <a href="javascript:" ng-click="getToken(\'audio\')">语音验证码</a> </div> <div class="account-line countdown-tip" ng-show="smsLoginCountdown === \'end\' && !gotToken && audioLoginCountdown === \'running\'"> 电话拨打中... 请留意你的手机来电 <div class="tip-lower" countdown mode="text" time="60" tpl="?time 秒后可重新拨打" status="audioLoginCountdown"></div> </div> </div> <div class="form-group compact"> <label> <input class="account-checkbox" type="checkbox" checked="checked">下次自动登录 </label> </div> <div class="form-group"> <button class="account-btn submit" ng-class="{disabled: submitting}" type="submit" ng-bind="submitting ? \'提交中...\' : \'登录\'"></button> </div> </form>';
    window.angular.module(["ng"]).run(["$templateCache", function(e) {
        e.put("/app/templates/_login_mobile.tpl.html", a)
    }]), e.exports = a
}, function(e, t, n) {
    var a = '<form ng-controller="LoginNormalCtrl" name="loginnormal" class="account-form" ng-submit="loginNormal()" novalidate> <div class="form-group error-group" ng-show="(loginnormal.$invalid || errTip) && submitted"> <div class="account-errtip" ng-show="errTip" ng-bind="errTip"></div> <div class="account-errtip" ng-show="loginnormal.username.$error.required">请输入手机号/邮箱/用户名</div> <div class="account-errtip" ng-show="loginnormal.password.$error.required">请输入密码</div> <div class="account-errtip" ng-show="loginnormal.password.$error.minlength">密码长度不对</div> <div class="account-errtip" ng-show="loginnormal.captcha_code.$error.required">请输入验证码</div> <div class="account-errtip" ng-show="loginnormal.captcha_code.$error.minlength">验证码位数不对</div> </div> <div class="form-group compact"> <input name="username" ng-model="normalForm.username" class="account-input withicon" type="text" placeholder="手机号/邮箱/用户名" ng-class="{error: submitted && loginnormal.username.$dirty && loginnormal.username.$invalid}" update-model-on="loginnormal.submit blur" required>\n<span class="account-inputicon icon icon-user"></span> </div> <div class="form-group"> <input name="password" ng-model="normalForm.password" class="account-input withicon" type="password" placeholder="密码" ng-class="{error: submitted && loginnormal.password.$dirty && loginnormal.password.$invalid}" update-model-on="loginnormal.submit blur" ng-minlength="6" maxlength="20" required>\n<span class="account-inputicon icon icon-lock"></span> </div> <div class="form-group account-verify"> <input name="captcha_code" ng-model="normalForm.captcha_code" class="account-input verify" placeholder="验证码" update-model-on="loginnormal.submit blur" ng-class="{error: submitted && loginnormal.captcha_code.$dirty && loginnormal.captcha_code.$invalid}" ng-minlength="4" maxlength="4" required>\n<span captcha class="account-captcha"></span> </div> <div class="form-group compact"> <label> <input class="account-checkbox" type="checkbox" checked="checked">下次自动登录 </label> </div> <div class="form-group"> <button class="account-btn submit" ng-class="{disabled: submitting}" type="submit" ng-bind="submitting ? \'提交中...\' : \'登录\'"></button> </div> </form>';
    window.angular.module(["ng"]).run(["$templateCache", function(e) {
        e.put("/app/templates/_login_normal.tpl.html", a)
    }]), e.exports = a
}, function(e, t, n) {
    var a = '<div class="login"> <img class="account-illustration" src="' + n(42) + '"> <div class="account-main aside" ng-include src="\'/app/templates/_login_main.tpl.html\'"></div> </div>';
    window.angular.module(["ng"]).run(["$templateCache", function(e) {
        e.put("/app/templates/login.tpl.html", a)
    }]), e.exports = a
}, function(e, t, n) {
    var a = "<div ng-include=\"'/app/templates/_login_main.tpl.html'\"></div>";
    window.angular.module(["ng"]).run(["$templateCache", function(e) {
        e.put("/app/templates/login_iframe.tpl.html", a)
    }]), e.exports = a
}, function(e, t, n) {
    var a = '<form class="account-form" name="registerForm" ng-controller="registerFormCtrl" ng-submit="registerSubmit()" novalidate autocomplete="off"> <div class="form-group error-group" ng-show="submitted && (registerForm.$invalid || errInfo)"> <p class="account-errtip" ng-show="errInfo && errTip.errorExists">该邮箱已注册，请<a href="./login">直接登录</a></p> <p class="account-errtip" ng-show="errInfo" ng-bind="errInfo"></p> <p class="account-errtip" ng-show="registerForm.account.$invalid" ng-bind="mobileMode ? \'请输入正确的手机号\' : \'请输入正确的邮箱地址\';"></p> <p class="account-errtip" ng-show="registerForm.password.$error.required">请输入密码</p> <p class="account-errtip" ng-show="registerForm.password.$invalid">密码需要是字母或数字，最小6位，最大20位</p> <p class="account-errtip" ng-show="registerForm.verify.$invalid">请输入验证码</p> </div> <div class="form-group compact"> <label class="account-label" for="email">邮箱地址</label> <input id="email" class="account-input" type="email" name="account" placeholder="请输入你的常用电子邮箱" update-model-on="registerForm.submit blur" ng-model="register.email" ng-keydown="submitted = false" required/> </div> <div class="form-group"> <label class="account-label" for="password">设置密码</label>  <input type="text" hidden/>\n<input id="password" class="account-input" type="password" name="password" placeholder="密码长度6-20字符" update-model-on="registerForm.submit blur" ng-minlength="6" ng-maxlength="20" ng-show="!pwShow" ng-keydown="submitted = false" ng-model="register.password" required/>\n<input class="account-input input-shadow" type="text" ng-show="pwShow" ng-value="registerForm.password.$viewValue" placeholder="密码长度6-20字符"/> <div class="password-eye icon icon-eye" ng-mouseup="pwShow = 0" ng-mousedown="pwShow = 1"></div> </div> <div class="form-group account-verify"> <label class="account-label" for="verify">验证码</label> <input id="verify" class="account-input verify" type="text" name="verify" placeholder="验证码" update-model-on="registerForm.submit blur" ng-keydown="submitted = false" ng-model="register.captcha" required/>\n<span captcha class="account-captcha"></span> </div> <div class="form-group"> <button class="account-btn submit" ng-class="{disabled : register.submitting}" ng-bind="register.submitting ? \'提交中...\' : \'同意协议并注册\'">同意协议并注册</button> </div> </form>';
    window.angular.module(["ng"]).run(["$templateCache", function(e) {
        e.put("/app/templates/_register_email.tpl.html", a)
    }]), e.exports = a
}, function(e, t, n) {
    var a = '<form class="account-form" name="registerForm" ng-controller="registerFormCtrl" ng-submit="registerSubmit()" novalidate autocomplete="off"> <div class="form-group error-group" ng-show="!gotToken && submitted && (registerForm.$invalid || errInfo)"> <p class="account-errtip" ng-show="errInfo" ng-bind="errInfo"></p> <p class="account-errtip" ng-show="registerForm.account.$invalid">请填写正确的手机号</p> <p class="account-errtip" ng-show="registerForm.verify.$invalid">请输入短信验证码</p> <p class="account-errtip" ng-show="registerForm.password.$error.required">密码需要是字母或数字，最小6位，最大20位</p> <p class="account-errtip" ng-show="registerForm.password.$invalid">密码需要是字母或数字，最小6位，最大20位</p> </div> <div class="form-group" ng-show="gotToken && !submitted"> <div class="account-errtip" ng-show="errInfo && errInfo.errorExists">该手机号已注册，请<a href="./login">直接登录</a></div> <p class="account-errtip" ng-show="registerForm.account.$invalid">请填写正确的手机号</p> </div> <div class="form-group compact"> <label class="account-label" for="mobile">手机号码</label> <input id="mobile" class="account-input" type="text" name="account" placeholder="请输入你的手机号" update-model-on="registerForm.getToken registerForm.submit blur" ng-model="register.mobile" ng-keydown="submitted = false" ng-pattern="/^1[3|4|5|8|7][0-9]{9}$/" required/> </div> <div class="form-group"> <label class="account-label" for="mobileVerify">手机验证码</label> <input id="mobileVerify" name="verify" class="account-input" type="text" ng-model="register.code" update-model-on="registerForm.submit blur" required/>\n<button class="account-btn verify" countdown tpl="重新发送(?time)" mode="text" time="60" status="smsRegisterCountdown" ng-class="{disabled: smsLoginCountdown === \'running\' || audioRegisterCountdown === \'running\'}" ng-click="sendMobileVerify(\'sms\')" ng-keydown="submitted = false" type="button">获取验证码</button>  <section> <p class="countdown-tip" ng-show="smsRegisterCountdown === \'running\'">短信已发送，请输入短信中的验证码</p> <p class="countdown-tip" ng-show="smsRegisterCountdown === \'end\' && audioRegisterCountdown !== \'running\'"> 收不到短信？使用<a href="javascript:" ng-class="{disabled: audioRegisterCountdown === \'running\'}" ng-click="sendMobileVerify(\'audio\')">语音验证码</a> </p> <div class="countdown-tip" ng-show="smsRegisterCountdown === \'end\' && audioRegisterCountdown === \'running\'"> <p>电话拨打中... 请留意你的手机来电</p> <p class="tip-lower" countdown mode="text" time="60" tpl="?time 秒后可重新拨打" status="audioRegisterCountdown"></p> </div> </section> </div> <div class="form-group"> <label class="account-label" for="password">设置密码</label>  <input type="text" hidden/>\n<input id="password" class="account-input" name="password" type="password" placeholder="密码长度6-20字符" update-model-on="registerForm.submit blur" ng-model="register.password" ng-show="!pwShow" ng-keydown="submitted = false" ng-minlength="6" ng-maxlength="20" required/>\n<input class="account-input input-shadow" type="text" ng-show="pwShow" ng-value="registerForm.password.$viewValue" placeholder="密码长度6-20字符"/> <div class="password-eye icon icon-eye" ng-mouseup="pwShow = 0" ng-mousedown="pwShow = 1"></div> </div> <div class="form-group"> <button class="account-btn submit" ng-class="{disabled: register.submitting}" ng-bind="register.submitting ? \'提交中...\': \'同意协议并注册\'">同意协议并注册</button> </div> </form>';
    window.angular.module(["ng"]).run(["$templateCache", function(e) {
        e.put("/app/templates/_register_mobile.tpl.html", a)
    }]), e.exports = a
}, function(e, t, n) {
    var a = '<div class="account-main full" ng-controller="confirmMailCtrl"> <div class="mailconfirm"> <h3 class="mailconfirm-title">恭喜，你已成功注册饿了么</h3> <p class="mailconfirm-info">为了你的账户安全，我们向你的邮箱\n<a href="javascript:" ng-bind="register.email"></a> 发送了一封验证邮件。 </p> <p class="mailconfirm-info">请将邮件中的 6 位验证码输入下方的输入框内，完成邮箱验证。</p> <form class="mailconfirm-form account-form" name="confirmMail" ng-submit="confirmMailSubmit()" autocomplete="off" novalidate> <div class="form-group error-group" ng-show="submitted"> <p class="account-errtip comfirm-tip" ng-show="confirmMailTip" ng-bind="confirmMailTip"></p> <p class="account-errtip comfirm-tip" ng-show="confirmMail.$invalid">请输入验证码</p> </div> <div class="form-group"> <label for="mailVerify">邮箱验证码</label> <input id="mailVerify" class="account-input mailconfirm-verify" name="validateCode" type="text" ng-model="register.validateCode" required/>\n<button class="account-btn mailconfirm-confirm" ng-class="{disabled: register.submitting}" ng-bind="register.submitting ? \'提交中...\' : \'验证\'">验证</button>\n<a href="{{MAINHOST}}" class="mailconfirm-linelink">下次再验证</a> </div> <a class="mailconfirm-maillink" ng-href="{{register.email | MailServer}}" target="_blank">登录邮箱查看</a> </form> <div class="mailconfirm-tips"> <h4 class="tips-title">没有收到验证邮件 ？</h4> <ol> <li> <span class="color-red" countdown time="60" tpl="?time秒后" status="newVerify"></span>\n如果你没有收到验证邮件，\n<a href="javascript:" ng-class="{\'disabled tips-link\': newVerify === \'running\'}" ng-click="sendEmailVerify()">请点击此处重新发送验证邮件</a> </li> <li>你的邮箱系统可能会误将激活邮件识别为垃圾，请到垃圾邮件目录找找</li> </ol> </div> </div> </div>';
    window.angular.module(["ng"]).run(["$templateCache", function(e) {
        e.put("/app/templates/mail_confirm.tpl.html", a)
    }]), e.exports = a
}, function(e, t, n) {
    var a = '<div class="register"> <div class="account-main full" ng-show="!register.mailConfirm"> <div class="account-line"> <h3 class="account-title line-left">使用<span ng-bind="mobileMode ? \'手机\' : \'邮箱\'"></span>注册</h3> </div> <div class="register-aside"> <h3 class="register-title">已经注册过 ？</h3> <p class="register-info">请点击 <a href="/login">直接登录</a></p> <div class="register-auth" ng-include="\'/app/templates/_auth_links.tpl.html\'"></div> </div> <div class="register-form"> <div ng-if="mobileMode" ng-include src="\'/app/templates/_register_mobile.tpl.html\'"></div> <div ng-if="!mobileMode" ng-include src="\'/app/templates/_register_email.tpl.html\'"></div> <div ng-if="mobileMode" class="account-line register"> <a href="http://m.ele.me/app/about/agreement" target="_blank">《使用条款和协议》</a>\n<span class="line-right"> <i class="icon icon-message"></i>\n<a class="register-change" ng-click="changeMode()" href="javascript:">使用邮箱注册</a> </span> </div> <div ng-if="!mobileMode" class="account-line register"> <a href="http://m.ele.me/app/about/agreement" target="_blank">《使用条款和协议》</a>\n<span class="line-right"> <i class="icon icon-mobile"></i>\n<a class="register-change" ng-click="changeMode()" href="javascript:">使用手机注册</a> </span> </div> </div> </div> <div class="register-mailconfirm" ng-if="register.mailConfirm" ng-include="\'/app/templates/mail_confirm.tpl.html\'"></div> </div>';
    window.angular.module(["ng"]).run(["$templateCache", function(e) {
        e.put("/app/templates/register.tpl.html", a)
    }]), e.exports = a
}, function(e, t, n) {
    var a = '<span> <img ng-show="imgUrl" class="captcha-img" ng-click="refreshCaptcha()" ng-src="{{imgUrl}}" title="图片验证码">\n<a class="captcha-refresh" ng-click="refreshCaptcha()" href="javascript:" ubt-click="captcha_refresh">看不清换一张</a> </span>';
    window.angular.module(["ng"]).run(["$templateCache", function(e) {
        e.put("/components/templates/captcha.tpl.html", a)
    }]), e.exports = a
}, , , , , , , , , , , function(e, t, n) {
    e.exports = n.p + "media/img/banner-app.682d34.png"
}]);