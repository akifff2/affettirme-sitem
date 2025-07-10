# flask_app.py -- SIFIR NOKTASI VERSİYONU

from flask import Flask, render_template

# Flask uygulamasını başlat
app = Flask(__name__)

# Sadece ve sadece /panel adresine gelen istekleri karşıla
@app.route('/panel')
def panel_page():
    # panel.html dosyasını render et ve tarayıcıya gönder.
    # Başka hiçbir mantık, değişken veya işlem yok.
    return render_template('panel.html')

# DİKKAT: Diğer tüm route'ları (@app.route(...)) sildim.
# Şimdilik sadece panelin çalışmasına odaklanıyoruz.
