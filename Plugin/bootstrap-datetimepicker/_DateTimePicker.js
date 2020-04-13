const DATE_FORMAT = 'yyyy-mm-dd';
const DATETIME_FORMAT = 'yyyy-mm-dd hh:ii:ss';
const DATETIME_FROM_FORMAT = 'yyyy-mm-dd 00:00:00';
const DATETIME_TO_FORMAT = 'yyyy-mm-dd 23:59:59';

const FormatChange = function (format = 'yyyy-mm-dd hh:ii:ss') {
    const anonymous_arr = [
        'yyyy-mm-dd',
        'yyyy-mm-dd hh:ii:ss',
        'yyyy-mm-dd 00:00:00',
        'yyyy-mm-dd 23:59:59'
    ];
    const iso8601_arr = [
        'YYYY-MM-DD',
        'YYYY-MM-DD HH:mm:ss',
        'YYYY-MM-DD 00:00:00',
        'YYYY-MM-DD 23:59:59'
    ];
    let key = false;
    $.each(anonymous_arr, function (index, value) {
        if (value === format) {
            key = index;
            return false;
        }
    });
    return key ? iso8601_arr[key] : iso8601_arr[0];
};

const GetOption = function (format = DATETIME_FORMAT, language = 'en') {
    const date_time_arr = format.split(' ');
    const option = {
        format: format,
        endDate: moment().format(FormatChange(format)),
        minView: date_time_arr.length > 1 ? 0 : 2,
        todayHighlight: true,
        todayBtn: true,
        autoclose: true,
        language: language
    };
    return option;
};

$(function () {
    const SetPicker_Date = function () {
        $('.date-from[data-type="date"]').datetimepicker(GetOption(DATE_FORMAT, CURRENT_LANG));
        $('.date-to[data-type="date"]').datetimepicker(GetOption(DATE_FORMAT, CURRENT_LANG));
    }();
    const SetPicker_Datetime = function () {
        $('.date-from[data-type="datetime"]').datetimepicker(GetOption(DATETIME_FORMAT, CURRENT_LANG));
        $('.date-to[data-type="datetime"]').datetimepicker(GetOption(DATETIME_FORMAT, CURRENT_LANG));
    }();
    const SetPicker_SingleDate = function () {
        $('.date-single[data-type="date"]').datetimepicker(GetOption(DATE_FORMAT, CURRENT_LANG));
    }();
    const SetPicker_SingleDatetime = function () {
        $('.date-single[data-type="datetime"]').datetimepicker(GetOption(DATETIME_FORMAT, CURRENT_LANG));
    }();

    const select_date_filter = $('.selectpicker.select-date_filter');
    if (select_date_filter.length) {
        const type = select_date_filter.data('type');
        window.DateFilterList = LibDateFilter.GetList(CURRENT_LANG, type, true);
        let list = '';
        $.each(DateFilterList, function (index, value) {
            list += `<option value="${index}">${value['title']}</option>`;
        });
        select_date_filter.children('option').eq(0).after(list);
        select_date_filter.selectpicker('refresh');
    }

    $('.date-to[data-type="date"], .date-to[data-type="datetime"]').on('show', function (e) {
        const thisTo = $(this);
        const thisFrom = thisTo.closest('.form-inline').find('.date-from');

        const currentDate = moment().toDate();
        const startDate = thisFrom.data('datetimepicker').date;
        const startDateMin = moment(startDate).startOf('month').toDate();
        const startDateMax = moment(startDate).endOf('month').toDate();

        if (moment(currentDate).isBetween(startDateMin, startDateMax)) {
            if (moment(startDate).isSameOrAfter(startDateMin)) {
                thisTo.datetimepicker('setStartDate', startDate);
            } else {
                thisTo.datetimepicker('setStartDate', startDateMin);
            }
            thisTo.datetimepicker('setEndDate', currentDate);
        } else {
            if (moment(currentDate).isSameOrAfter(startDateMin)) {
                if (moment(startDate).isSameOrAfter(startDateMin)) {
                    thisTo.datetimepicker('setStartDate', startDate);
                } else {
                    thisTo.datetimepicker('setStartDate', startDateMin);
                }
                thisTo.datetimepicker('setEndDate', startDateMax);
            }
        }
    });
    $('.date-from[data-type="date"], .date-from[data-type="datetime"]').on('changeDate', function (e) {
        const thisFrom = $(this);
        const thisTo = thisFrom.closest('.form-inline').find('.date-to');

        let format = DATETIME_TO_FORMAT;
        if (thisFrom.data('type') === 'date') {
            format = DATE_FORMAT;
        }

        const currentDate = moment().toDate();
        const startDate = thisFrom.data('datetimepicker').date;
        const startDateMin = moment(startDate).startOf('month').toDate();
        const startDateMax = moment(startDate).endOf('month').toDate();

        if (moment(currentDate).isBetween(startDateMin, startDateMax)) {
            if (moment(startDate).isSameOrAfter(startDateMin)) {
                thisTo.datetimepicker('setStartDate', startDate);
            } else {
                thisTo.datetimepicker('setStartDate', startDateMin);
            }
            thisTo.datetimepicker('setEndDate', currentDate);
            thisTo.val(moment(currentDate).format(FormatChange(format)));
        } else {
            if (moment(currentDate).isSameOrAfter(startDateMin)) {
                if (moment(startDate).isSameOrAfter(startDateMin)) {
                    thisTo.datetimepicker('setStartDate', startDate);
                } else {
                    thisTo.datetimepicker('setStartDate', startDateMin);
                }
                thisTo.datetimepicker('setEndDate', startDateMax);
                thisTo.val(moment(startDateMax).format(FormatChange(format)));
            }
        }
    });

    $(document).on('changed.bs.select', '.selectpicker.select-date_filter', function (e) {
        var DateFilter = $(this).val();
        if ($.trim(DateFilter) === '') {
            return false;
        }
        var Current = window.DateFilterList[DateFilter];
        $('.date-from').val(Current.Start);
        $('.date-to').val(Current.End);
    });
    $(document).on('changeDate', '.date-from, .date-to', function (e) {
        $('.selectpicker.select-date_filter').selectpicker('val', '');
    });
});