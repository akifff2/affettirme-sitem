# app.py -- KINTSUGI SÜRÜMÜ

from flask import Flask, render_template, request, url_for
import urllib.parse

app = Flask(__name__)

# ANA SAYFA ARTIK YÖNETİM PANELİ OLACAK.
# Bu, 404 hatasını ve kafa karışıklığını ortadan kaldırır.
@app.route('/', methods=['GET', 'POST'])
def panel_page():
    generated_url = None
    if request.method == 'POST':
        # Formdan gelen verileri alıyoruz
        gonderen = request.form.get('gonderen', 'Bir Dost')
        alici = request.form.get('alici', 'Özel Biri')
        resim_url = request.form.get('resim_url', '')
        sarki_url = request.form.get('sarki_url', '')
        not_icerik_raw = request.form.get('not_icerik', '...')
        
        # Not içeriğini URL'de güvenle taşımak için kodluyoruz
        not_icerik_encoded = urllib.parse.quote(not_icerik_raw)
        
        # Kişiye özel linki "İz" (Trace) rotasına yönlendiriyoruz
        generated_url = url_for('trace_page',
                                g=gonderen,
                                a=alici,
                                r=resim_url,
                                n=not_icerik_encoded,
                                s=sarki_url,
                                _external=True)

    return render_template('panel.html', generated_url=generated_url)

# Adım 1: İz - Kullanıcıyı hikayeye davet etme
@app.route('/trace')
def trace_page():
    gonderen = request.args.get('g')
    alici = request.args.get('a')
    # Sonraki adıma tüm parametreleri aktarıyoruz
    next_url = url_for('recollect_page', **request.args)
    return render_template('1_trace.html', gonderen=gonderen, alici=alici, next_url=next_url)

# Adım 2: Hatırlama - Soruya hazırlık
@app.route('/recollect')
def recollect_page():
    alici = request.args.get('a')
    next_url = url_for('kintsugi_page', **request.args)
    return render_template('2_recollect.html', alici=alici, next_url=next_url)

# Adım 3: Kintsugi - İnteraktif affetme ekranı
@app.route('/kintsugi')
def kintsugi_page():
    alici = request.args.get('a')
    final_url = url_for('reunion_page', **request.args)
    return render_template('3_kintsugi.html', alici=alici, final_url=final_url)

# Adım 4: Kavuşma - Sonuç ekranı
@app.route('/reunion')
def reunion_page():
    resim = request.args.get('r')
    sarki = request.args.get('s')
    encoded_note = request.args.get('n', '')
    
    # Notu tekrar okunabilir hale getiriyoruz
    kisi_notu = urllib.parse.unquote(encoded_note)
    
    return render_template('4_reunion.html', resim=resim, sarki=sarki, notu=kisi_notu)
