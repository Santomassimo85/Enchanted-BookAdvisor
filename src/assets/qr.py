import qrcode

# Replace this with your actual local IP and port
local_ip_url = "http://10.62.8.133:5173/"

# Generate QR code
qr = qrcode.make(local_ip_url)
qr.show()