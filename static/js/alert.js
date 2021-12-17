//封装确认取消提示框
(function ($) {

    window.Popconfirm = function () {
        var html = '<div id="[Id]" class="modal fade" role="dialog" aria-labelledby="modalLabel">' +
            '<div class="modal-dialog modal-sm">' +
            '<div class="modal-content">' +
            '<div class="modal-header" style="padding:9px 15px 0 15px;border-bottom:none;">' +
            '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>' +
            '</div>' +
            '<div class="modal-body" style="padding-left:30px;padding-right:30px;">' +
            '<p><i style="display: inline-block;margin-right:5px;"><svg style="margin-bottom:-4px;" t="1625623373554" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2675" width="20" height="20"><path d="M887.982 353.621c-20.511-48.423-49.759-91.872-87.139-129.251s-80.828-66.628-129.251-87.139c-50.123-21.238-103.402-31.918-158.257-31.918s-108.134 10.801-158.257 31.918c-48.423 20.511-91.872 49.759-129.251 87.139-37.379 37.379-66.628 80.828-87.139 129.251-21.238 50.123-31.918 103.402-31.918 158.257s10.801 108.134 31.918 158.257c20.511 48.423 49.759 91.872 87.139 129.251 37.379 37.379 80.828 66.628 129.251 87.139 50.123 21.238 103.402 31.918 158.257 31.918s108.134-10.801 158.257-31.918c48.423-20.511 91.872-49.759 129.251-87.139 37.379-37.379 66.628-80.828 87.139-129.251C909.22 620.012 919.9 566.733 919.9 511.878s-10.681-108.134-31.918-158.257zM683.364 645.499c11.286 11.286 11.286 29.855 0 41.142s-29.855 11.286-41.142 0L509.694 554.235 377.288 686.763c-11.286 11.286-29.855 11.286-41.142 0s-11.286-29.855 0-41.142l132.406-132.406-132.528-132.528c-11.286-11.286-11.286-29.855 0-41.142 11.286-11.286 29.855-11.286 41.142 0l132.406 132.406 132.406-132.406c11.286-11.286 29.855-11.286 41.142 0s11.286 29.855 0 41.142L550.956 513.093l132.406 132.406z" p-id="2676" data-spm-anchor-id="a313x.7781069.0.i2" class="selected" fill="#f5212c"></path></svg></i>[Message]</p>' +
            '</div>' +
            '<div class="modal-footer" style="border-top:none;text-align:center;padding:0 0 25px 0;">' +
            '<button type="button" class="btn btn-default cancel" data-dismiss="modal" style="padding:2px 12px;">[BtnCancel]</button>' +
            '<button type="button" class="btn btn-primary ok" data-dismiss="modal" style="padding:2px 12px;">[BtnOk]</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        var html1 = `<div id="[Id]" class="delete-box" style="background: #fff;width: 250px;padding:30px;border-radius: 10px;box-shadow: 0 4px 16px 4px rgba(0,0,0,0.08);display: none;position:absolute;left: [OffsetLeft]px;top:[OffsetTop]px;z-index: 1100;">
            <p><i style="display: inline-block;margin-right:5px;"><svg style="margin-bottom:-4px;" t="1625623373554" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2675" width="20" height="20"><path d="M887.982 353.621c-20.511-48.423-49.759-91.872-87.139-129.251s-80.828-66.628-129.251-87.139c-50.123-21.238-103.402-31.918-158.257-31.918s-108.134 10.801-158.257 31.918c-48.423 20.511-91.872 49.759-129.251 87.139-37.379 37.379-66.628 80.828-87.139 129.251-21.238 50.123-31.918 103.402-31.918 158.257s10.801 108.134 31.918 158.257c20.511 48.423 49.759 91.872 87.139 129.251 37.379 37.379 80.828 66.628 129.251 87.139 50.123 21.238 103.402 31.918 158.257 31.918s108.134-10.801 158.257-31.918c48.423-20.511 91.872-49.759 129.251-87.139 37.379-37.379 66.628-80.828 87.139-129.251C909.22 620.012 919.9 566.733 919.9 511.878s-10.681-108.134-31.918-158.257zM683.364 645.499c11.286 11.286 11.286 29.855 0 41.142s-29.855 11.286-41.142 0L509.694 554.235 377.288 686.763c-11.286 11.286-29.855 11.286-41.142 0s-11.286-29.855 0-41.142l132.406-132.406-132.528-132.528c-11.286-11.286-11.286-29.855 0-41.142 11.286-11.286 29.855-11.286 41.142 0l132.406 132.406 132.406-132.406c11.286-11.286 29.855-11.286 41.142 0s11.286 29.855 0 41.142L550.956 513.093l132.406 132.406z" p-id="2676" data-spm-anchor-id="a313x.7781069.0.i2" class="selected" fill="#f5212c"></path></svg></i>[Message]</p>
            <div class="footer-btn" style="text-align: center;">
                <button type="button" class="btn btn-default cancel" data-dismiss="modal" style="padding:2px 12px;">[BtnCancel]</button>
                <button type="button" class="btn btn-primary ok" data-dismiss="modal" style="padding:2px 12px;">[BtnOk]</button>
            </div>
            <div class="alow" style="width: 0;height: 0;border: 8px solid transparent;border-top-color: #fff;position: absolute;right:22px ;bottom:-16px;"></div>
            </div>`;
        var html2 = `<div id="[Id]" class="messages-tips-box" style="width: auto;height: auto;position: fixed;left: 50%;top: 40%;z-index:9999;transform: translate(-50%, -50%);border-radius: 4px;background: #fff;box-shadow: 0 4px 16px 4px rgba(0,0,0,0.08);padding: 10px 15px;width: 145px;display: none;">
                <div class="messages-body" style="width: 100%; height: auto;display: flex;align-items: flex-start;">
                    <i style="min-width: 22px;font-size: 14px;padding-top: 3px;"><svg t="1626848352994" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1212" width="16" height="16"><path d="M510.645654 959.349561c-247.25636 0-447.691345-200.446241-447.691345-447.700555 0-247.24715 200.436008-447.692369 447.691345-447.692369 247.25636 0 447.693392 200.445218 447.693392 447.692369C958.339046 758.90332 757.902014 959.349561 510.645654 959.349561zM784.191774 354.236883l-14.387685-14.387685c-7.949043-7.949043-20.826328-7.949043-28.77537 0L442.600909 632.086006 333.044724 517.430686c-3.597945-3.596921-12.958126-0.060375-20.908192 7.888667l-14.387685 14.389732c-7.949043 7.949043-11.465123 17.309224-7.869225 20.895913L436.064029 713.574948c3.576455 3.597945 12.936637 0.049119 20.886703-7.888667l14.368242-14.388708c2.542916-2.523473 4.411473-5.136997 5.960759-7.710612l306.913065-300.56345C792.142863 375.083677 792.142863 362.185926 784.191774 354.236883z" p-id="1213" data-spm-anchor-id="a313x.7781069.0.i0" class="selected" fill="#52c41a"></path></svg></i>
                    <div class="messages-con" style="line-height: 1.6;color: #333;flex-grow: 1;">[Message]</div>
                </div>
            </div>`;
        var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
        var generateId = function () {
            var date = new Date();
            return 'mdl' + date.valueOf();
        }
        var init = function (options) {
            options = $.extend({}, {
                message: "提示内容",
                btnok: "确定",
                btncl: "取消",
                width: 200,
                auto: false
            }, options || {});
            var modalId = generateId();
            //var thishtml = html;
            var content = html.replace(reg, function (node, key) {
                return {
                    Id: modalId,
                    Message: options.message,
                    BtnOk: options.btnok,
                    BtnCancel: options.btncl
                }[key];
            });
            $('body').append(content);
            $('#' + modalId).modal({
                width: options.width,
                backdrop: 'static'
            });
            $('#' + modalId).on('hide.bs.modal', function (e) {
                $('body').find('#' + modalId).remove();
            });
            return modalId;
        }
        var intdelete = function (x, y, options) {
            options = $.extend({}, {
                Id: modalId,
                message: "提示内容",
                btnok: "确定",
                btncl: "取消",
                offsetleft: x,
                offsettop: y
            }, options || {});
            var modalId = generateId();
            var content = html1.replace(reg, function (node, key) {
                return {
                    Id: modalId,
                    Message: options.message,
                    BtnOk: options.btnok,
                    BtnCancel: options.btncl,
                    OffsetTop: options.offsettop,
                    OffsetLeft: options.offsetleft
                }[key];
            });
            $(".delete-box").remove();
            $('body').append(content);
            var viewBoxHeight = options.offsettop - $("#" + modalId).height() - 70;
            $("#" + modalId).css("top", viewBoxHeight + "px");
            $("#" + modalId).fadeIn();
            $('#' + modalId).on('click', function (e) {
                $('body').find('#' + modalId).remove();
            });
            return modalId;
        }
        var inttips = function (options) {
            options = $.extend({}, {
                Id: modalId,
                message: "提示内容",
            }, options || {});
            var modalId = generateId();
            var content = html2.replace(reg, function (node, key) {
                return {
                    Id: modalId,
                    Message: options.message,
                }[key];
            });
            $(".messages-tips-box").remove();
            $('body').append(content);
            $("#" + modalId).fadeIn();
            setTimeout(()=>{
                $("#" + modalId).fadeOut(0,()=>{
                    $("#" + modalId).remove();
                })
            },2000)
            return modalId;
        }
        return {
            confirm: function (options) {
                var id = init(options, null);
                var modal = $('#' + id);
                modal.find('.ok');
                modal.find('.cancel').show();
                modal.find('i').html('<svg style="margin-bottom:-4px;"  t="1625626611641" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2403" width="20" height="20"><path d="M512 0C229.2224 0 0 229.2224 0 512s229.2224 512 512 512 512-229.2224 512-512S794.7776 0 512 0z m34.133333 711.4752a34.133333 34.133333 0 0 1-68.266666 0v-17.066667a34.133333 34.133333 0 0 1 68.266666 0v17.066667z m0-142.9504a34.133333 34.133333 0 0 1-68.266666 0v-256a34.133333 34.133333 0 0 1 68.266666 0v256z" fill="#faad14" p-id="2404"></path></svg>');
                return {
                    id: id,
                    on: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.find('.ok').click(function () { callback(true); });
                            //modal.find('.cancel').click(function () { callback(false); });
                        }
                    },
                    hide: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.on('hide.bs.modal', function (e) {
                                callback(e);
                            });
                        }
                    }
                };
            },
            deleteAll: function (options) {
                var id = init(options, 'deleteAll');
                var modal = $('#' + id);
                modal.find('.ok');
                modal.find('.cancel').show();
                return {
                    id: id,
                    on: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.find('.ok').click(function () { callback(true); });
                        }
                    },
                    hide: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.on('hide.bs.modal', function (e) {
                                callback(e);
                            });
                        }
                    }
                };
            },
            delete: function (e, options) {
                var thiswidth = $(e).width() / 2;
                if ($(e).parents(".modal-footer").text() != '') {
                    thiswidth = thiswidth - 20;
                }
                else if ($(e).text() == '取消订单') {
                    thiswidth = thiswidth - 30;
                }
                else {
                    thiswidth = thiswidth + 5;
                }
                var x = $(e).offset().left - 200 - thiswidth;
                var y = $(e).offset().top;
                var id = intdelete(x, y, options);
                var modal = $('#' + id);
                modal.find('.ok');
                modal.find('.cancel').show();
                return {
                    id: id,
                    on: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.find('.ok').click(function () { callback(true); });
                            //modal.find('.cancel').click(function () { callback(false); });
                        }
                    },
                    hide: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.on('click', function (e) {
                                callback(e);
                            });
                        }
                    }
                };
            },
            deleteOther: function (e, options) {
                var thiswidth = $(e).width() / 2;
                if ($(e).parents(".modal-footer").text() != '') {
                    thiswidth = thiswidth - 20;
                }
                var x = $(e).offset().left - 200 - thiswidth;
                var y = $(e).offset().top;
                var id = intdelete(x, y, options);
                var modal = $('#' + id);
                modal.find('.ok');
                modal.find('.cancel').show();
                modal.find('i').html('<svg style="margin-bottom:-4px;"  t="1625626611641" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2403" width="20" height="20"><path d="M512 0C229.2224 0 0 229.2224 0 512s229.2224 512 512 512 512-229.2224 512-512S794.7776 0 512 0z m34.133333 711.4752a34.133333 34.133333 0 0 1-68.266666 0v-17.066667a34.133333 34.133333 0 0 1 68.266666 0v17.066667z m0-142.9504a34.133333 34.133333 0 0 1-68.266666 0v-256a34.133333 34.133333 0 0 1 68.266666 0v256z" fill="#faad14" p-id="2404"></path></svg>');
                return {
                    id: id,
                    on: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.find('.ok').click(function () { callback(true); });
                            //modal.find('.cancel').click(function () { callback(false); });
                        }
                    },
                    hide: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.on('click', function (e) {
                                callback(e);
                            });
                        }
                    }
                };
            },
            success:function(options){
                var id = inttips(options);
            },
            failure:function(options){
                var id = inttips(options);
                var modal = $('#' + id);
                modal.find('i').html('<svg t="1626849715672" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2106" width="16" height="16"><path d="M512.697 63.445c-247.538 0-448.208 200.67-448.208 448.208 0 247.54 200.67 448.208 448.208 448.208 247.54 0 448.208-200.668 448.208-448.208 0-247.539-200.668-448.208-448.208-448.208z m177.99 581.763c12.264 12.273 12.264 32.17 0 44.427-12.284 12.273-32.172 12.273-44.454 0L512.916 556.318 379.59 689.635c-12.274 12.273-32.162 12.273-44.445 0-12.266-12.256-12.266-32.154 0-44.427l133.334-133.353-133.334-133.318c-12.266-12.256-12.266-32.17 0-44.444 12.282-12.256 32.17-12.256 44.445 0l133.326 133.335 133.317-133.335c12.282-12.256 32.17-12.256 44.453 0 12.265 12.274 12.265 32.19 0 44.444L557.351 511.855l133.335 133.353z" p-id="2107" fill="#f04134"></path></svg>');
            }
        }
    }();
})(jQuery);
