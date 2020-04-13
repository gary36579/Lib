class LibChecker {
    /**
    * How to better check data types in javascript
    * https://www.webbjocke.com/javascript-check-data-types/
    * by  Webbjocke - Updated 1 February 2018
    */

    static IsString(value) {
        return typeof value === "string" || value instanceof String;
    }

    static IsNumber(value) {
        return typeof value === "number" && isFinite(value);
    }

    static IsFunction(value) {
        return typeof value === "function";
    }

    static IsObject(value) {
        return (value && typeof value === "object" && value.constructor === Object);
    }

    static IsNull(value) {
        return value === null;
    }

    static IsUndefined(value) {
        return typeof value === "undefined";
    }

    static IsBoolean(value) {
        return typeof value === "boolean";
    }

    static IsRegExp(value) {
        return (value && typeof value === "object" && value.constructor === RegExp);
    }

    static IsError(value) {
        return value instanceof Error && typeof value.message !== "undefined";
    }

    static IsDate(value) {
        return value instanceof Date;
    }

    static IsSymbol(value) {
        return typeof value === "symbol";
    }

    static IsClass(value, stance) {
        return value instanceof stance;
    }

    static IsNullOrWhiteSpace(value) {
        if (LibChecker.IsUndefined(value) || LibChecker.IsNull(value)) {
            return true;
        }
        if (LibChecker.IsString(value)) {
            return value.trim().length === 0;
        }
        return false;
    }
}

class LibString {
    static Pad(str, length, mask = 0, type = "LEFT") {
        if (type !== "LEFT" && type !== "RIGHT") {
            type = "LEFT";
        }
        str = str.toString();
        if (str.length < length) {
            if (type === "LEFT") {
                return LibString.Pad(mask + str, length, mask, type);
            } else {
                return LibString.Pad(str + mask, length, mask, type);
            }
        }
        return str;
    }

    static ToUpperCaseFirst(str) {
        return str.toUpperCase().slice(0, 1) + str.toLowerCase().slice(1);
    }

    static IsNullOrSpace(str) {
        return !str || !/\S/.test(str);
    }

    static Replace(str, target, replace) {
        return str.replace(target, replace);
    }

    static ReplaceByArray(str, find_arr, replace_arr) {
        let regex;
        find_arr.forEach((value, index) => {
            regex = new RegExp(value, "g");
            str = str.toString().replace(regex, replace_arr[index]);
        });
        return str;
    }

    static Contains(str, find) {
        return str.includes(find);
    }

    static Split(str, split_by = ",", limit = undefined) {
        return str.split(split_by, limit);
    }

    static Join(str, join_by = ",") {
        return str.join(join_by);
    }

    static StartsWith(str, find) {
        return str.startsWith(find);
    }

    static EndsWith(str, find) {
        return str.endsWith(find);
    }

    static RemovePrefix(str, find) {
        let input = str;
        if (LibString.StartsWith(str, find)) {
            input = str.substr(find.length);
        }
        return input;
    }

    static RemoveSuffix(str, find) {
        let input = str;
        if (LibString.EndsWith(str, find)) {
            input = str.substr(0, (str.length - find.length));
        }
        return input;
    }

    static TrimStart(str, find = null) {
        let rg = null;
        if (find == null || find == '') {
            rg = /^\s+/;
        } else {
            rg = new RegExp(`^(${find})+`);
        }
        return str.replace(rg, '');
    }

    static TrimEnd(str, find = null) {
        let rg = null;
        if (find == null || find == '') {
            rg = /\s+$/;
        } else {
            rg = new RegExp(`(${find})+$`, 'g');
        }
        return str.replace(rg, '');
    }

    static TrimTrailingZeroes(str) {
        return str.indexOf('.') !== -1 ? LibString.TrimEnd(LibString.TrimEnd(str, '0'), '\\.') : str;
    }
}

class LibMath {
    static GetUniqueId() {
        return Math.round(new Date().getTime() + Math.random() * 100);
    }

    static IsNumber(num, use_float = false, use_negative = false) {
        let floating_point = "";
        if (use_float === true) {
            floating_point = "([.]?[\\d]+)?";
        }
        let negative_sign = "";
        if (use_negative === true) {
            negative_sign = "[-]?";
        }
        let patt = new RegExp(`^${negative_sign}[\\d]+${floating_point}$`);
        if (patt.test(num)) {
            return true;
        }
        return false;
    }

    static IsNaturalNumber(num) {
        if (/^[1-9][0-9]*$/.test(num)) {
            return true;
        }
        return false;
    }

    static numberRemoveCommas(x) {
        if ($.type(x) !== 'string' && $.type(x) !== 'number') {
            return 0;
        }
        return x.toString().replace(/,/g, '');
    }

    static P(n, r) {
        if (n >= r) {
            if (r) {
                return n * LibMath.P(n - 1, r - 1);
            } else {
                return 1;
            }
        } else {
            return 0;
        }
    }

    static C(n, r) {
        if (n >= r) {
            if (n - r < r) {
                return LibMath.C(n, n - r);
            } else {
                var value = 1;
                for (var i = 0; i < r; i++) {
                    value *= (n - i) / (i + 1);
                }
                return Math.round(value);
            }
        } else {
            return 0;
        }
    }
}

class LibUrl {
    static Content(url) {
        return Config.Root + url;
    }

    static Js(url) {
        return Config.CdnPath + LibUrl.Content(`Content/js/${url}?v=` + Config.Version);
    }

    static Img(url) {
        return Config.CdnPath + LibUrl.Content(`Content/img/${$url}?v=` + Config.Version);
    }

    static Action(action, controller = '', obj = null) {
        if (LibString.IsNullOrSpace(controller)) {
            $controller = LibRoute.Current().controller;
        }
        if (!LibChecker.IsObject(obj)) {
            obj = {};
        }
        obj['action'] = action;
        obj['controller'] = controller;
        const query_string = LibUrl.GetQueryString(obj);
        const root = Config.Root;
        const resultUrl = `${root}index.php?${query_string}`;
        return resultUrl;
    }

    static GetQueryString(obj) {
        if (!LibChecker.IsObject(obj)) {
            return '';
        }

        return Object.keys(obj)
            .filter((key) => obj[key] != undefined && obj[key] != null)
            .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
            .join('&');
    }
}

class LibRoute {
    static Current() {
        return {
            'controller': LibRoute.getUrlParameter('controller'),
            'action': LibRoute.getUrlParameter('action')
        }
    }

    static getUrlParameter(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        const results = regex.exec(window.location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}

class LibTaskResult {
    constructor() {
        this.IsSuccess = false;
        this.Message = "";
        this.Value = null;
    }

    SetSuccess(value = null, msg = "") {
        this.IsSuccess = true;
        this.Message = msg;
        this.Value = value;
        return this;
    }

    SetUnsuccess(msg = "", value = null) {
        this.IsSuccess = false;
        this.Message = msg;
        this.Value = value;
        return this;
    }
}

class LibLocalStorage {
    static Contains(name) {
        if (localStorage.getItem(name) === null) {
            return false;
        }
        return true;
    }

    static Get(name) {
        return localStorage.getItem(name);
    }

    static Set(name, value) {
        localStorage.setItem(name, value);
    }

    static Remove(name) {
        localStorage.removeItem(name);
    }
}

class LibSessionStorage {
    static Contains(name) {
        if (sessionStorage.getItem(name) === null) {
            return false;
        }
        return true;
    }

    static Get(name) {
        return sessionStorage.getItem(name);
    }

    static Set(name, value) {
        sessionStorage.setItem(name, value);
    }

    static Remove(name) {
        sessionStorage.removeItem(name);
    }
}

class LibCheckAPIResult {
    static get ERROR_API_NO_RESPONSE() {
        return 7410;
    }

    static get ERROR_API_ERROR_RESPONSE() {
        return 7411;
    }

    static get ERROR_API_LOGOUT() {
        return 7412;
    }

    static CheckResponse(result) {
        let task_result = new LibTaskResult();
        if (LibChecker.IsNull(result)) {
            task_result.SetUnsuccess("API No Response.", LibCheckAPIResult.ERROR_API_NO_RESPONSE);
        } else {
            if (LibChecker.IsObject(result) || LibChecker.IsClass(result, LibTaskResult)) {
                if (result.hasOwnProperty("IsSuccess")) {
                    if (result.hasOwnProperty("IsLogout")) {
                        task_result.SetUnsuccess(result.Message, LibCheckAPIResult.ERROR_API_LOGOUT);
                    } else {
                        if (true === result.IsSuccess) {
                            task_result.SetSuccess(result.Value, result.Message);
                        } else {
                            task_result.SetUnsuccess(result.Message, result.Value);
                        }
                    }
                } else {
                    task_result.SetUnsuccess("API Response Error.", LibCheckAPIResult.ERROR_API_ERROR_RESPONSE);
                }
            } else {
                task_result.SetUnsuccess("API Response Error.", LibCheckAPIResult.ERROR_API_ERROR_RESPONSE);
            }
        }
        return task_result;
    }
}

class LibRequest {
    static Fetch(settings) {
        const _content_type = settings.content_type || 'urlencoded';
        const _url = settings.url || null;
        const _body = settings.body || null;
        const _cache = settings.cache || 'no-cache';
        const _credentials = settings.credentials || 'same-origin';
        const _headers = settings.headers || new Headers();
        const _method = settings.method || 'POST';
        const _mode = settings.mode || 'same-origin';
        const _redirect = settings.redirect || 'follow';
        const _referrer = settings.referrer || 'client';
        const _debug = settings.debug || false;

        switch (_content_type) {
            case 'urlencoded':
                _headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                break;
            case 'json':
                _headers.append('Content-Type', 'application/json; charset=utf-8');
                break;
            case 'file':
                // upload file do not add 'Content-Type'
                break;
        }

        return new Promise((resolve, reject) => {
            fetch(_url, {
                body: _body,
                cache: _cache,
                credentials: _credentials,
                headers: _headers,
                method: _method,
                mode: _mode,
                redirect: _redirect,
                referrer: _referrer
            }).then((response) => {
                if (true === response.ok) {
                    if (_debug) {
                        return response.text();
                    } else {
                        return response.json();
                    }
                } else {
                    const task_result = new LibTaskResult();
                    task_result.SetUnsuccess(`[${response.status}] ${response.statusText}`, response);
                    return task_result;
                }
            }).then((result) => {
                if (_debug) {
                    resolve(result);
                } else {
                    const task_result = LibCheckAPIResult.CheckResponse(result);
                    if (true === task_result.IsSuccess) {
                        resolve(task_result);
                    } else {
                        if (task_result.Value === LibCheckAPIResult.ERROR_API_LOGOUT) {
                            $.SetSystemAlert.WithoutTitle(task_result.Message, () => {
                                location = 'index.php';
                            });
                        } else {
                            reject(task_result);
                        }
                    }
                }
            });
        });
    }
}

class LibAjax {
    static Ajax(settings) {
        return new Promise((resolve, reject) => {
            $.ajax(
                settings
            ).done((result) => {
                const task_result = LibCheckAPIResult.CheckResponse(result);
                if (true === task_result.IsSuccess) {
                    resolve(result);
                } else {
                    if (task_result.Value === LibCheckAPIResult.ERROR_API_LOGOUT) {
                        $.SetSystemAlert.WithoutTitle(result.Message, () => {
                            location = 'index.php';
                        });
                        return false;
                    } else {
                        reject(result);
                    }
                }
            }).fail((result) => {
                const taskResult = new LibTaskResult();
                reject(taskResult.SetUnsuccess('Unknow Error.'));
            })
        });
    }
}

class LibDateFilter {
    static GetFormat(type = 0, week_type = 'week') {
        this.type = parseInt(type);
        this.week_type = week_type;

        switch (this.type) {
            case 0:
                this.format = { start: 'YYYY-MM-DD 00:00:00', end: 'YYYY-MM-DD 23:59:59' };
                break;
            case 1:
                this.format = { start: 'YYYY-MM-DD', end: 'YYYY-MM-DD' };
                break;
            default:
                this.format = { start: 'YYYY-MM-DD 00:00:00', end: 'YYYY-MM-DD 23:59:59' };
                break;
        }
    }

    static GetLang(lang = 'zh_cn') {
        this.lang = lang;
        const list = {
            zh_cn: {
                Today: '今天',
                Yesterday: '昨天',
                ThisWeek: '本周',
                PrevWeek: '上周',
                ThisMonth: '本月',
                PrevMonth: '上月',
            },
            zh_tw: {
                Today: '今天',
                Yesterday: '昨天',
                ThisWeek: '本周',
                PrevWeek: '上周',
                ThisMonth: '本月',
                PrevMonth: '上月',
            },
            en: {
                Today: 'Today',
                Yesterday: 'Yesterday',
                ThisWeek: 'This Week',
                PrevWeek: 'Previous Week',
                ThisMonth: 'This Month',
                PrevMonth: 'Previous Month',
            }
        };
        return list[this.lang];
    }

    static GetList(lang = 'zh_cn', type = 0, is_isoWeekday = false, custom_today = null, is_prev_week_step_month = false) {
        this.lang = lang;
        this.type = parseInt(type);
        if (!LibChecker.IsNumber(this.type)) {
            this.type = 0;
        }
        this.is_isoWeekday = is_isoWeekday;
        this.week_type = 'week';
        if (is_isoWeekday) {
            this.week_type = 'isoWeek';
        }
        this.custom_today = custom_today;
        this.is_prev_week_step_month = is_prev_week_step_month;

        LibDateFilter.GetFormat(type, this.week_type);
        const lang_list = LibDateFilter.GetLang(lang);

        return {
            Today: {
                Start: LibDateFilter.TodayStart,
                End: LibDateFilter.TodayEnd,
                title: lang_list['Today']
            },
            Yesterday: {
                Start: LibDateFilter.YesterdayStart,
                End: LibDateFilter.YesterdayEnd,
                title: lang_list['Yesterday']
            },
            ThisWeek: {
                Start: LibDateFilter.ThisWeekStart,
                End: LibDateFilter.ThisWeekEnd,
                title: lang_list['ThisWeek']
            },
            // PrevWeek: {
            //     Start: LibDateFilter.PrevWeekStart,
            //     End: LibDateFilter.PrevWeekEnd,
            //     title: lang_list['PrevWeek']
            // },
            ThisMonth: {
                Start: LibDateFilter.ThisMonthStart,
                End: LibDateFilter.ThisMonthEnd,
                title: lang_list['ThisMonth']
            },
            PrevMonth: {
                Start: LibDateFilter.PrevMonthStart,
                End: LibDateFilter.PrevMonthEnd,
                title: lang_list['PrevMonth']
            }
        };
    };

    static get TodayStart() {
        let today_start;
        if (this.custom_today === null) {
            today_start = moment().format(this.format['start']);
        } else {
            today_start = this.custom_today;
        }
        return today_start;
    }

    static get TodayEnd() {
        const today_start = moment(LibDateFilter.TodayStart).format(this.format['end']);

        if (this.type === 1) {
            return today_start;
        } else if (this.type === 2) {
            return moment(today_start).add(1, 'days').format(this.format['end']);
        }

        return moment(today_start).format(this.format['end']);
    }

    static get YesterdayStart() {
        return moment(LibDateFilter.TodayStart).subtract(1, 'days').format(this.format['start']);
    }

    static get YesterdayEnd() {
        return moment(LibDateFilter.TodayEnd).subtract(1, 'days').format(this.format['end']);
    }

    static get ThisWeekStart() {
        const this_month_start = LibDateFilter.ThisMonthStart;
        const this_week_start = moment(LibDateFilter.TodayStart).startOf(this.week_type).format(this.format['start']);

        return moment.max(moment(this_month_start), moment(this_week_start)).format(this.format['start']);
    }

    static get ThisWeekEnd() {
        const this_month_end = LibDateFilter.ThisMonthEnd;
        let this_week_end = moment(LibDateFilter.ThisWeekStart).endOf(this.week_type).format(this.format['end']);
        if (this.type === 1) {
            this_week_end = moment(this_week_end).format(this.format['end']);
        }

        return moment.min(moment(this_month_end), moment(this_week_end)).format(this.format['end']);
    }

    //not ready
    static get PrevWeekStart() {
        let real_prev_week_start;
        if (this.is_prev_week_step_month) {
            if (this.is_isoWeekday) {
                real_prev_week_start = moment(LibDateFilter.ThisWeekStart).isoWeekday(1).format(this.format['start']);
            } else {
                real_prev_week_start = moment(LibDateFilter.ThisWeekStart).day(0).format(this.format['start']);
            }
        } else {
            const this_month_start = LibDateFilter.ThisMonthStart;
            const prev_week_start = moment(LibDateFilter.ThisWeekStart).subtract(7, 'days').format(this.format['start']);
            real_prev_week_start = moment.max(moment(this_month_start), moment(prev_week_start)).format(this.format['start']);
        }
        return real_prev_week_start;
    }

    //not ready
    static get PrevWeekEnd() {
        const this_month_start = LibDateFilter.ThisMonthStart;
        let real_prev_week_start;
        if (this.is_isoWeekday) {
            real_prev_week_start = moment(LibDateFilter.PrevWeekStart).isoWeekday(1).format(this.format['start']);
        } else {
            real_prev_week_start = moment(LibDateFilter.PrevWeekStart).day(0).format(this.format['start']);
        }
        const prev_week_end = moment(real_prev_week_start).subtract(7, 'days').format(this.format['end']);
        if (this.is_prev_week_step_month) {
            return prev_week_end;
        } else {
            return moment.max(moment(this_month_start), moment(prev_week_end)).format(this.format['end']);
        }
    }

    static get ThisMonthStart() {
        return moment(LibDateFilter.TodayStart).startOf('month').format(this.format['start']);
    }

    static get ThisMonthEnd() {
        let this_month_end = moment(LibDateFilter.ThisMonthStart).endOf('month').format(this.format['end']);

        if (this.type === 1) {
            return this_month_end;
        } else if (this.type === 2) {
            return moment(this_month_end).add(1, 'days').format(this.format['end']);
        }

        return moment(this_month_end).format(this.format['end']);
    }

    static get PrevMonthStart() {
        return moment(LibDateFilter.ThisMonthStart).subtract(1, 'months').format(this.format['start']);
    }

    static get PrevMonthEnd() {
        let prev_month_end = moment(LibDateFilter.PrevMonthStart).endOf('month').format(this.format['end']);

        if (this.type === 1) {
            return prev_month_end;
        } else if (this.type === 2) {
            return moment(prev_month_end).add(1, 'days').format(this.format['end']);
        }

        return moment(prev_month_end).format(this.format['end']);
    }

}

class LibDom {
    static GetTextWidth(text = "", font = '"Arial", "PingFang SC", "PingFang TC", "Heiti SC", "Heiti TC", "STHeiti", "LiHei Pro", "Microsoft YaHei", "Microsoft JhengHei", "DFKai-SB", "sans-serif"') {
        const fakeEle = $('<span>').hide().appendTo(document.body);
        fakeEle.text(text).css('font', font);

        const width = fakeEle.width();
        fakeEle.remove();
        return width;
    }
}

class LibMcrypt {
    static b64EncodeUnicode(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
    }

    static b64DecodeUnicode(str) {
        return decodeURIComponent(atob(str).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }
}

class LibLoadingBtn {
    static get SpinnerIcon() {
        return '<i class="fas fa-spinner fa-fw fa-lg fa-spin"></i>';
    }

    static Set(btn, spinner = this.SpinnerIcon) {
        const btn_icon = btn.find('i:eq(0)');
        const icon_str = btn_icon[0].outerHTML;
        btn.data('org-icon', icon_str);
        btn_icon.replaceWith(spinner);
        btn.addClass('disabled');
    }

    static Revert(btn) {
        const btn_icon = btn.find('i:eq(0)');
        const icon_str = btn.data('org-icon');
        btn.removeData('org-icon');
        btn_icon.replaceWith(icon_str);
        btn.removeClass('disabled');
    }
}

class LibSearchGroup {
    static Submit(url) {
        $(document).on('click', '.search-group .btn-submit', function () {
            LibSearchGroup._Submit(url);
        }).on('keyup', '.search-group', function (evt) {
            if (evt.keyCode === 13) {
                evt.preventDefault();
                LibSearchGroup._Submit(url);
            }
        });
    }

    static _Submit(url_base) {
        const query = $('.search-group :input').serialize();
        location = `${url_base}&${query}`;
    }
}

class LibExport {
    static ConvertToCSV(header = {}, datas = []) {
        const csv_header = Object.keys(header).map((code) => {
            return `"${header[code]}-${code}"`;
        }).join(',');

        const csv_datas = datas.map((data) => {
            return Object.keys(header).map((code) => {
                return (data[code] === null ? '""' : `"${data[code]}"`);
            }).join(',');
        }).join('\r\n');

        return `${csv_header}\r\n${csv_datas}`;
    }

    static SaveToCSV(file_name, header = {}, datas = []) {
        const csvData = LibExport.ConvertToCSV(header, datas);
        const blob = new Blob([csvData], {
            type: "text/csv;charset=utf-8"
        });

        saveAs(blob, `${file_name}_${moment().format('YYYYMMDDHHmmss')}.csv`);
    }
}

class LibRandom {
    static Color() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }
}

/**
 * 建立分頁功能
 * @syntax new LibPagination(TotalItems, CurrentPage, CountPerPage, MaxPage)
 * @param {Number} TotalItems 總資料筆數
 * @param {Number} CurrentPage 目前頁數
 * @param {Number} CountPerPage 每頁筆數
 * @param {Number} MaxPage 最多頁數
 */
class LibPagination {
    constructor(TotalItems = 1, CurrentPage = 1, CountPerPage = 30, MaxPage = 10) {
        this._TotalItems = parseInt(TotalItems);
        this._CurrentPage = parseInt(CurrentPage);
        this._CountPerPage = parseInt(CountPerPage);
        this._MaxPage = parseInt(MaxPage);
    }

    /**
     * @syntax LibPagination.SetTotalItems()
     * @param {Number} TotalItems 總資料筆數
     */
    SetTotalItems(TotalItems = 1) {
        this._TotalItems = parseInt(TotalItems);
    }

    /**
     * @syntax LibPagination.GetTotalItems()
     * @returns {Number} TotalItems
     */
    GetTotalItems() {
        return this._TotalItems;
    }

    /**
     * @syntax LibPagination.GetCurrentPage()
     * @returns {Number} CurrentPage
     */
    GetCurrentPage() {
        return this._CurrentPage;
    }

    /**
     * @syntax LibPagination.GetCountPerPage()
     * @returns {Number} CountPerPage
     */
    GetCountPerPage() {
        return this._CountPerPage;
    }

    /**
     * 取得分頁組第一頁
     * @syntax LibPagination.GetStartPage()
     * @returns {Number} StartPage
     */
    GetStartPage() {
        return (parseInt(Math.floor((this._CurrentPage - 1) / this._MaxPage) * this._MaxPage) + 1);
    }

    /**
     * 取得分頁組最後一頁
     * @syntax LibPagination.GetEndPage()
     * @returns {Number} EndPage
     */
    GetEndPage() {
        const TotalPages = this.GetTotalPages();
        let result = this.GetStartPage() + this._MaxPage - 1;
        if (result > TotalPages) {
            result = TotalPages;
        }
        return result;
    }

    /**
     * 取得分頁組總頁數
     * @syntax LibPagination.GetTotalPages()
     * @returns {Number} TotalPages
     */
    GetTotalPages() {
        const result = Math.ceil(this._TotalItems / parseFloat(this._CountPerPage));
        const pages = parseInt(result);
        return (pages < 1) ? 1 : pages;
    }

    /**
     * 取得前十頁（的第一頁）
     * @syntax LibPagination.GetPrevTenPage()
     * @return {Number} PrevTenPage
     */
    GetPrevTenPage() {
        const startPage = this.GetStartPage();
        return ((startPage - this._MaxPage) < 1) ? 1 : (startPage - this._MaxPage);
    }

    /**
     * 是否有前十頁
     * @syntax LibPagination.HasPrevTenPages()
     * @return {boolean}
     */
    HasPrevTenPages() {
        return this.GetStartPage() > 10;
    }

    /**
     * 取得前一頁
     * @syntax LibPagination.GetPrevPage()
     * @return {Number} PrevPage
     */
    GetPrevPage() {
        return ((this._CurrentPage - 1) < 1) ? 1 : (this._CurrentPage - 1);
    }

    /**
     * 是否有前一頁
     * @syntax LibPagination.HasPrevPage()
     * @return {boolean}
     */
    HasPrevPage() {
        return this._CurrentPage > 1;
    }

    /**
     * 取得後十頁（的第一頁）
     * @syntax LibPagination.HasNextTenPages()
     * @return {Number} NextTenPages
     */
    GetNextTenPage() {
        const endPage = this.GetEndPage();
        const totalPages = this.GetTotalPages();
        return ((endPage + 1) > totalPages) ? totalPages : (endPage + 1);
    }

    /**
     * 是否有後十頁
     * @syntax LibPagination.HasNextTenPages()
     * @return {boolean}
     */
    HasNextTenPages() {
        return this.GetTotalPages() > this.GetEndPage();
    }

    /**
     * 取得後一頁
     * @syntax LibPagination.HasNextPage()
     * @return {Number} NextPage
     */
    GetNextPage() {
        const totalPage = this.GetTotalPages();
        const result = (this._CurrentPage + 1) > totalPage;
        return result ? totalPage : (this._CurrentPage + 1);
    }

    /**
     * 是否有後一頁
     * @syntax LibPagination.HasNextPage()
     * @return {boolean}
     */
    HasNextPage() {
        if (this.GetTotalPages() > this._CurrentPage) {
            return true;
        }
        return false;
    }

    /**
     * 起始筆數（假設第一頁則為1第二頁則為11）
     * @syntax LibPagination.HasNextPage()
     * @return {Number} NextPage
     */
    GetStartIndex() {
        if (this._TotalItems === 0) {
            return 0;
        }
        return this.GetSkipCount() + 1;
    }

    /**
     * 結尾筆數（假設第一頁為10第二頁則為20）
     * @syntax LibPagination.GetEndIndex()
     * @return {Number} EndIndex
     */
    GetEndIndex() {
        const totalPage = this.GetTotalPages();
        let result = this.GetStartIndex() + this._CountPerPage - 1;
        if (result > totalPage) {
            result = totalPage;
        }
        return result;
    }

    /**
     * 需跳過的資料數（若每頁十筆時 第一頁則為0，第二頁則為10）
     * @syntax LibPagination.GetSkipCount()
     * @return {Number} SkipCount
     */
    GetSkipCount() {
        const totalPage = this.GetTotalPages();
        if (this._CurrentPage > totalPage) {
            this._CurrentPage = totalPage;
        }
        return this._CountPerPage * (this._CurrentPage - 1);
    }

    /**
     * Ajax分頁時需跳過的資料數（若每頁十筆時 第一頁則為0，第二頁則為10 若超過Totalpage將不會自動調整）
     * @syntax LibPagination.GetSkipCountAjaxPage()
     * @return {Number} SkipCount
     */
    GetSkipCountAjaxPage() {
        return this._CountPerPage * (this._CurrentPage - 1);
    }

    /**
     * 建立分頁模組HTML
     * @syntax LibPagination.CreateModule()
     * @return {String} HTML
     */
    CreateModule(linkBase = '', preFix = '&') {
        let prevPages = '';
        let middlePages = '';
        let nextPages = '';

        if (this.HasPrevPage()) {
            prevPages = `
                <a class="btn btn-info" href="${linkBase}${preFix}page=1"><i class="fas fa-angle-double-left fa-fw fa-lg"></i></a>
                <a class="btn btn-info" href="${linkBase}${preFix}page=${this.GetPrevPage()}"><i class="fas fa-angle-left fa-fw fa-lg"></i></a>
            `;
        }
        for (let i = this.GetStartPage(); i <= this.GetEndPage(); i++) {
            if (i === this._CurrentPage) {
                middlePages += `<a class="btn btn-info active">${i}</a>`;
            } else {
                middlePages += `<a class="btn btn-info" href="${linkBase}${preFix}page=${i}">${i}</a>`;
            }
        }
        if (this.HasNextPage()) {
            nextPages = `
                <a class="btn btn-info" href="${linkBase}${preFix}page=${this.GetNextPage()}"><i class="fas fa-angle-right fa-fw fa-lg"></i></a>
                <a class="btn btn-info" href="${linkBase}${preFix}page=${this.GetTotalPages()}"><i class="fas fa-angle-double-right fa-fw fa-lg"></i></a>
            `;
        }

        return `
            <div role="toolbar" class="btn-toolbar" style="display: inline-block;">
                <div role="group" class="btn-group">
                    ${prevPages}
                    ${middlePages}
                    ${nextPages}
                </div>
            </div>
        `;
    }

    /**
     * 建立語言
     * @syntax LibPagination.Language()
     * @return {Object} Language
     */
    Language() {
        return {
            PrevTenPage: '前十頁',
            NextTenPage: '後十頁',
            PrevPage: '前一頁',
            NextPage: '後一頁'
        };
    }
}
