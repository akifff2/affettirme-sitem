# app.py -- "NİHAİ KONTROL" SÜRÜMÜ

from flask import Flask, render_template, request, url_for
import urllib.parse

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def panel_page():
    if request.method == 'POST':
        # URL parametrelerini daha kısa ve anlaşılır hale getiriyoruz
        params = {
            'g': request.form.get('gonderen'),
            'a': request.form.get('alici'),
            'r': request.form.get('resim_url'),
            's': request.form.get('sarki_url'),
            'n': urllib.parse.quote(request.form.get('not_icerik')),
            # YENİ KİŞİSELLEŞTİRME ALANLARI
            'q': urllib.parse.quote(request.form.get('question_text')), # Ana Soru
            'y': urllib.parse.quote(request.form.get('yes_text')),      # Evet Butonu Metni
            'x': urllib.parse.quote(request.form.get('no_text'))        # Hayır Butonu Metni
        }
        experience_url = url_for('intro_page', **params, _external=True)
        return render_template('panel.html', generated_url=experience_url)
    
    return render_template('panel.html', generated_url=None)


@app.route('/begin')
def intro_page():
    args = request.args
    next_url = url_for('decision_page', **args)
    # 1_intro.html'de args.g (gönderen) ve args.a (alıcı) kullanılacak
    return render_template('1_intro.html', args=args, next_url=next_url)


@app.route('/decision')
def decision_page():
    args = {
        # Tüm metinleri URL'den alıp decode ederek şablona gönderiyoruz
        'g': request.args.get('g'),
        'a': request.args.get('a'),
        'question': urllib.parse.unquote(request.args.get('q')),
        'yes_text': urllib.parse.unquote(request.args.get('y')),
        'no_text': urllib.parse.unquote(request.args.get('x'))
    }
    # Diğer parametreleri de sonraki linke taşımak için hazırlıyoruz
    forward_args = request.args
    reconciliation_url = url_for('reconciliation_page', **forward_args)
    
    return render_template('2_decision.html', args=args, reconciliation_url=reconciliation_url)


@app.route('/reconciliation')
def reconciliation_page():
    args = request.args
    finale_url = url_for('finale_page', **args)
    return render_template('3_reconciliation.html', args=args, finale_url=finale_url)


@app.route('/finale')
def finale_page():
    args = request.args
    decoded_note = urllib.parse.unquote(args.get('n', ''))
    return render_template('4_finale.html', args=args, note=decoded_note)
