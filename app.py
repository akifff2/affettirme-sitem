# app.py -- KINTSUGI 2.0: USTALIK ESERİ

from flask import Flask, render_template, request, url_for, redirect
import urllib.parse

app = Flask(__name__)

# ANA SAYFA: KİŞİSELLEŞTİRME PANELİ
@app.route('/', methods=['GET', 'POST'])
def panel_page():
    if request.method == 'POST':
        # Formdan tüm kişiselleştirme verilerini alıyoruz
        params = {
            'g': request.form.get('gonderen', 'Bir Dost'),
            'a': request.form.get('alici', 'Özel Biri'),
            'r': request.form.get('resim_url', ''),
            's': request.form.get('sarki_url', ''),
            'n': urllib.parse.quote(request.form.get('not_icerik', '...')),
            # Yeni Kişiselleştirme Seçenekleri
            'bg': request.form.get('background', 'stars'), # Arka plan tipi
            'icon': request.form.get('icon', 'heart'),      # İkon tipi
            'color': request.form.get('color', 'D4AF37')    # Ana renk (HEX kodu)
        }
        
        # Kişiye özel deneyim linkini oluştur
        experience_url = url_for('experience_step1', **params, _external=True)
        # Paneli, oluşturulan linkle birlikte tekrar render et
        return render_template('panel.html', generated_url=experience_url)

    # GET request için paneli normal şekilde göster
    return render_template('panel.html', generated_url=None)


# ADIM 1: Davet
@app.route('/begin')
def experience_step1():
    # Tüm parametreleri bir sonraki adıma aktar
    next_url = url_for('experience_step2', **request.args)
    return render_template('1_invite.html', args=request.args, next_url=next_url)

# ADIM 2: Soru
@app.route('/question')
def experience_step2():
    # Kırık objeyi onarma sayfasına yönlendir
    next_url = url_for('experience_step3_interactive', **request.args)
    return render_template('2_question.html', args=request.args, next_url=next_url)

# ADIM 3: İnteraktif Onarım
@app.route('/repair')
def experience_step3_interactive():
    # Final sayfasına yönlendir
    final_url = url_for('experience_step4_final', **request.args)
    return render_template('3_interactive.html', args=request.args, final_url=final_url)

# ADIM 4: Final Ekranı
@app.route('/reunion')
def experience_step4_final():
    # Notu URL'den alıp çöz
    decoded_note = urllib.parse.unquote(request.args.get('n', ''))
    return render_template('4_final.html', args=request.args, note=decoded_note)
