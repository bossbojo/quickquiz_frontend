import { LanguageService } from '../services/language.service';
const lang = new LanguageService();
declare let $;

export function jalert(title: string, content: string = '') {
    //var textok = this.LanguageService.translage('ok');
    return new Promise(resolve => {
        $.alert({
            title: title || 'Alert!',
            content: content,
            buttons: {
                ok: {
                    text: lang.translage("ok"),
                    action: () => resolve()
                }
            }
        });
    });
}

export function jconfirm(title: string, content: string = ''): Promise<boolean> {
    return new Promise(resolve => {
        $.confirm({
            title: title || 'Confirm!',
            content: content,
            buttons: {
                confirm: {
                    text: lang.translage("confirm"),
                    action: () => resolve(true)
                },
                cancel: {
                    text: lang.translage("cancel"),
                    action: () => resolve(false)
                }
            }
        });
    });
}

export function jdialog(title: string, content: string = '') {
    $.dialog({
        title: title || 'Dialog!',
        content: content
    });
}

export function loadingPage(status: boolean) {
    let loading = $('#loading-page');
    if (loading.lenght == 0) return;
    if (status) loading.fadeIn();
    else loading.hide();
}

// somethingElse: {
//     text: 'Something else',
//     btnClass: 'btn-blue',
//     keys: ['enter', 'shift'],
//     action: function () {
//         $.alert('Something else?');
//     }
// }