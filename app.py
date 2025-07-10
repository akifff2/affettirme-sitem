# app.py -- SÜRÜM 3.0: İNTERAKTİF DESTAN

from flask import Flask, render_template, request, url_for
import urllib.parse

app = Flask(__name__)

# ANA SAYFA: Profesyonel Yönetim Paneli
@app.route('/', methods=['GET', 'POST'])
def panel_page():
    if request.method == 'POST':
        params = {
            'g': request.form.get('gonderen'),
            'a': request.form.get('alici'),
            'r': request.form.get('resim_url'),
            's': request.form.get('sarki_url'),
            'n': urllib.parse.quote(request.form.get('not_icerik')),
            'theme': request.form.get('theme', 'night_sky') # Yeni tema seçeneği
        }
        experience_url = url_for('intro_page', **params, _external=True)
        return render_template('panel.html', generated_url=experience_url)
    return render_template('panel.html', generated_url=None)

# Adım 1: Sinematik Giriş
@app.route('/intro')
def intro_page():
    next_url = url_for('main_event_page', **request.args)
    return render_template('1_intro.html', args=request.args, next_url=next_url)

# Adım 2: Ana Olay - İnteraktif Oyun
@app.route('/decision')
def main_event_page():
    final_url = url_for('reconciliation_page', **request.args)
    return render_template('2_main.html', args=request.args, final_url=final_url)

# Adım 3: Uzlaşma - Kalbin Onarılması
@app.route('/reconciliation')
def reconciliation_page():
    final_url = url_for('finale_page', **request.args)
    return render_template('3_reconciliation.html', args=request.args, final_url=final_url)

# Adım 4: Final - Kavuşma
@app.route('/finale')
def finale_page():
    decoded_note = urllib.parse.unquote(request.args.get('n', ''))
    return render_template('4_finale.html', args=request.args, note=decoded_note)
