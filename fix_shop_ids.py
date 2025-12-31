import os
import re

mapping = {
    "nexus.html": "695239d903973d55274b744d",
    "cyberplex.html": "695239d903973d55274b744e",
    "localstore.html": "695239d903973d55274b744f",
    "ultrastore.html": "695239d903973d55274b7450",
    "hyperstation.html": "695239d903973d55274b7451",
    "bestsquare.html": "695239d903973d55274b7452",
    "fastmart.html": "695239d903973d55274b7453",
    "elitelink.html": "695239d903973d55274b7454",
    "easyhub.html": "695239d903973d55274b7455",
    "megatech.html": "695239d903973d55274b7456",
    "globalgadget.html": "695239d903973d55274b7457",
    "primemarket.html": "695239d903973d55274b7458",
    "zenithelectronics.html": "695239d903973d55274b7459",
    "swiftsystems.html": "695239d903973d55274b745a",
    "futureforge.html": "695239d903973d55274b745b"
}

public_dir = "/home/batman/Documents/PriceScout_DPP/client/public"

for filename, new_id in mapping.items():
    filepath = os.path.join(public_dir, filename)
    if not os.path.exists(filepath):
        print(f"File not found: {filename}")
        continue
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Replace const SHOP_ID = "...";
    new_content = re.sub(r'const SHOP_ID = "[a-f0-9]+"', f'const SHOP_ID = "{new_id}"', content)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filename}")
    else:
        print(f"No match found for SHOP_ID in {filename} or already updated")
