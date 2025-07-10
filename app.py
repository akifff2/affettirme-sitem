# app.py -- YÖNETMENİN KURGUSU (SIFIR HATA)

from flask import Flask, render_template, request, url_for
import urllib.parse

app = Flask(__name__)

# ANA SAYFA: Profesyonel Yönetim Paneli
@app.route('/', methods=['GET', 'POST'])
def panel_page():
    if request.method == 'POST':
        # Parametreleri al ve linki oluştur
        # Form etiket isimleri HTML ile eşleşmeli ('gonderen', 'alici', vb.)
        params = {
            'g': request.form.get('gonderen'),
            'a': request.form.get('alici'),
            'r': request.form.get('resim_url'),
            's': request.form.get('sarki_url'),
            'n': urllib.parse.quote(request.form.get('not_icerik')),
            'theme': request.form.get('theme', 'dark_love') 
        }
        experience_url = url_for('intro_page', **params, _external=True)
        # Paneli, oluşturulan linkle birlikte tekrar göster
        return render_template('panel.html', generated_url=experience_url)
    
    # Sayfa ilk açıldığında paneli göster
    return render_template('panel.html', generated_url=None)

# Adım 1: Sinematik Giriş
@app.route('/begin')
def intro_page():
    # URL'den gelen tüm argümanları args değişkenine ata
    args = request.args
    next_url = url_for('decision_page', **args)
    return render_template('1_intro.html', args=args, next_url=next_url)

# Adım 2: Karar Anı (Evet/Hayır Oyunu)
@app.route('/decision')
def decision_page():
    args = request.args
    reconciliation_url = url_for('reconciliation_page', **args)
    return render_template('2_decision.html', args=args, reconciliation_url=reconciliation_url)

# Adım 3: Uzlaşma (Animasyon Ekranı)
@app.route('/reconciliation')
def reconciliation_page():
    args = request.args
    finale_url = url_for('finale_page', **args)
    return render_template('3_reconciliation.html', args=args, finale_url=finale_url)

# Adım 4: Final Ekranı
@app.route('/finale')
def finale_page():
    args = request.args
    # Notu URL'den alıp okunabilir hale getir
    decoded_note = urllib.parse.unquote(args.get('n', ''))
    return render_template('4_finale.html', args=args, note=decoded_note)
