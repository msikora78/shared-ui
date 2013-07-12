define(['jquery', 'widget!tm/widgets/modalDialog'], function($) {
    'use strict';

    var data = {
        legend: 'Markup',
        description: '<p>You can create the modalDialog body completely via html markup.</p><p>Note that you can force the action to be used when the user hits the ENTER <code>data-primary-action</code> and ESC <code>data-secondary-action</code> keys.</p>',
        html: '\
            <div id="all-markup" class="large">\n\
                <div class="modal-header">\n\
                    <h3>My header</h3>\n\
                </div>\n\
                <div class="modal-body">\n\
                    <p>In his tractibus navigerum nusquam visitur flumen sed in locis plurimis aquae suapte natura calentes emergunt ad usus aptae multiplicium medelarum. verum has quoque regiones pari sorte Pompeius Iudaeis domitis et Hierosolymis captis in provinciae speciem delata iuris dictione formavit.</p>\n\
                    <p>Iam virtutem ex consuetudine vitae sermonisque nostri interpretemur nec eam, ut quidam docti, verborum magnificentia metiamur virosque bonos eos, qui habentur, numeremus, Paulos, Catones, Galos, Scipiones, Philos; his communis vita contenta est; eos autem omittamus, qui omnino nusquam reperiuntur.</p>\n\
                    <p>Dum haec in oriente aguntur, Arelate hiemem agens Constantius post theatralis ludos atque circenses ambitioso editos apparatu diem sextum idus Octobres, qui imperii eius annum tricensimum terminabat, insolentiae pondera gravius librans, siquid dubium deferebatur aut falsum, pro liquido accipiens et conperto, inter alia excarnificatum Gerontium Magnentianae comitem partis exulari maerore multavit.</p>\n\
                    <p>Hac ex causa conlaticia stipe Valerius humatur ille Publicola et subsidiis amicorum mariti inops cum liberis uxor alitur Reguli et dotatur ex aerario filia Scipionis, cum nobilitas florem adultae virginis diuturnum absentia pauperis erubesceret patris.</p>\n\
                    <p>Dum haec in oriente aguntur, Arelate hiemem agens Constantius post theatralis ludos atque circenses ambitioso editos apparatu diem sextum idus Octobres, qui imperii eius annum tricensimum terminabat, insolentiae pondera gravius librans, siquid dubium deferebatur aut falsum, pro liquido accipiens et conperto, inter alia excarnificatum Gerontium Magnentianae comitem partis exulari maerore multavit.</p>\n\
                    <p>Post hoc impie perpetratum quod in aliis quoque iam timebatur, tamquam licentia crudelitati indulta per suspicionum nebulas aestimati quidam noxii damnabantur. quorum pars necati, alii puniti bonorum multatione actique laribus suis extorres nullo sibi relicto praeter querelas et lacrimas, stipe conlaticia victitabant, et civili iustoque imperio ad voluntatem converso cruentam, claudebantur opulentae domus et clarae.</p>\n\
                    <p>Hac ex causa conlaticia stipe Valerius humatur ille Publicola et subsidiis amicorum mariti inops cum liberis uxor alitur Reguli et dotatur ex aerario filia Scipionis, cum nobilitas florem adultae virginis diuturnum absentia pauperis erubesceret patris.</p>\n\
                </div>\n\
                <div class="modal-footer">\n\
                    <button type="button" data-secondary-action class="btn">No</button>\n\
                    <button type="button" class="btn" >Maybe</button>\n\
                    <button type="button" data-primary-action class="btn btn-primary" onclick="alert(\'Yes\');">Yes</button>\n\
                </div>\n\
            </div>\n\
            <p><button type="button" class="btn btn-primary" id="all-markup-button">Click me</button></p>',
        js: function() {
            var dialog = $('#all-markup').tmModalDialog();

            dialog.find('.btn[data-secondary-action]').click(function() {
                dialog.tmModalDialog('hide');
                alert('No')
            });
            
            $('#all-markup-button').click(function() {
                dialog.tmModalDialog('show');
            });
        }
    };

    return data;
});