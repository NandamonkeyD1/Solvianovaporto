import os

BASE = r"c:\xampp\htdocs\Portofolio Solvia"

def w(path, content):
    full = os.path.join(BASE, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"  wrote: {path}")

print("Building Solvia Nova files...")
