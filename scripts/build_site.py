"""
build_site.py - Checks GHL for new submissions, builds site via Claude API, commits and notifies.
"""
import json, os, re, subprocess, sys
import anthropic, requests

GHL_API_KEY = os.environ["GHL_API_KEY"]
GHL_LOCATION_ID = os.environ["GHL_LOCATION_ID"]
GHL_FORM_ID = os.environ["GHL_FORM_ID"]
ANTHROPIC_API_KEY = os.environ["ANTHROPIC_API_KEY"]
NOTIFY_EMAIL = os.environ.get("NOTIFY_EMAIL", "rprtgrggg@gmail.com")
GITHUB_PAGES_BASE = "https://rprtgrgg.github.io/claudecode"
GHL_HEADERS = {"Authorization": f"Bearer {GHL_API_KEY}", "Version": "2021-07-28", "Content-Type": "application/json"}
PROCESSED_FILE = "processed_ids.json"

def load_processed_ids():
    if os.path.exists(PROCESSED_FILE):
        with open(PROCESSED_FILE) as f: return set(json.load(f))
    return set()

def save_processed_ids(ids):
    with open(PROCESSED_FILE, "w") as f: json.dump(list(ids), f, indent=2)

def fetch_submissions():
    resp = requests.get("https://services.leadconnectorhq.com/forms/submissions",
        headers=GHL_HEADERS, params={"locationId": GHL_LOCATION_ID, "formId": GHL_FORM_ID, "limit": 50})
    resp.raise_for_status()
    return resp.json().get("submissions", [])

def slugify(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")

def parse_brief(s):
    o = s.get("others", {})
    return {"id": s.get("id"), "contact_id": s.get("contactId"),
        "client_name": o.get("full_name", ""), "client_email": o.get("email", ""),
        "business_name": o.get("dAWWddYgXnR689Nk0anI", ""),
        "industry": o.get("XHOjNzhBr7sTuhT1dmPD", ""),
        "goal": o.get("HHZs0yaOcD2casBn6BYn", ""),
        "site_type": o.get("YWUhxEX27vWNVzSYwt0Q", "Single Landing Page"),
        "target_audience": o.get("O2ZVNAy84kdx0g6G5qdT", ""),
        "logo_available": o.get("sS6kVrQ7yKyOR43rKPEY", "No"),
        "copy_ready": o.get("h0NenOcaFUS2LgBIbQhC", "No"),
        "brand_colors": o.get("4whuCKVPRwvsqxyXLfqC", ""),
        "additional_notes": o.get("o08Z6Ha7NutfZHWUQLxD", ""),
        "reference_sites": o.get("Znqh3388ROdknC9VYf5n", ""),
        "submitted_at": s.get("createdAt", "")}

def build_site(brief):
    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
    goal = brief["goal"] if isinstance(brief["goal"], str) else ", ".join(brief["goal"])
    colors = brief["brand_colors"] or "choose a professional palette for the industry"
    copy_note = "Write compelling conversion-focused copy." if "No" in str(brief["copy_ready"]) else "Use client copy as basis."

    prompt = f"""Build a high-converting landing page as a single self-contained HTML file.

Client Brief:
- Business: {brief["business_name"]}
- Industry: {brief["industry"]}
- Goal: {goal}
- Audience: {brief["target_audience"]}
- Colors: {colors}
- Notes: {brief["additional_notes"]}

CRITICAL RULES:
1. Output ONLY valid HTML — no markdown, no code fences, no explanation
2. Start with <!DOCTYPE html> and end with </html>
3. Put ALL CSS inside a <style> tag in <head> — keep it concise
4. Put ALL JS inside a <script> tag before </body>
5. Keep CSS under 200 lines — use shorthand, avoid redundancy
6. {copy_note}

REQUIRED SECTIONS (in this order inside <body>):
1. Nav — logo (text-based) + CTA button
2. Hero — bold headline, subheadline, primary CTA button, trust badge
3. Benefits — 3 key benefits with icons (use emoji)
4. How it works — 3 steps
5. Testimonials — 2-3 placeholder quotes
6. Final CTA — section with headline + button
7. Footer — copyright

Design: modern, bold, professional. Mobile-responsive using flexbox/grid. No external dependencies."""

    msg = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=16000,
        messages=[{"role": "user", "content": prompt}])

    html = msg.content[0].text.strip()
    if html.startswith("```"):
        html = re.sub(r"^```[a-z]*\n?", "", html)
        html = re.sub(r"\n?```$", "", html)

    # Validate it has a body
    if "<body" not in html:
        raise ValueError("Generated HTML missing <body> tag — output was likely truncated")

    return html

def send_ghl_email(contact_id, business_name, preview_url, site_type, follow_ups):
    payload = {"type": "Email", "contactId": contact_id, "emailFrom": "noreply@mail.msgsndr.com",
        "emailTo": NOTIFY_EMAIL, "subject": f"Site Built: {business_name}",
        "html": f"<h2>Site built for {business_name}</h2><p><strong>Preview:</strong> <a href='{preview_url}'>{preview_url}</a></p><p><em>GitHub Pages takes 1-2 min to go live.</em></p><p><strong>Type:</strong> {site_type}</p><p><strong>Next steps:</strong> {follow_ups}</p>"}
    try:
        requests.post("https://services.leadconnectorhq.com/conversations/messages", headers=GHL_HEADERS, json=payload).raise_for_status()
        print(f"Notified {NOTIFY_EMAIL}")
    except Exception as e:
        print(f"Email failed: {e}\nPreview URL: {preview_url}")

def main():
    submissions = fetch_submissions()
    processed_ids = load_processed_ids()
    new = sorted([s for s in submissions if s.get("id") not in processed_ids], key=lambda s: s.get("createdAt",""))

    if not new:
        print("No new submissions.")
        sys.exit(0)

    for s in new:
        b = parse_brief(s)
        print(f"Building: {b['business_name']}")
        html = build_site(b)

        slug = slugify(b["business_name"])
        site_dir = f"client-sites/{slug}"
        os.makedirs(site_dir, exist_ok=True)

        with open(f"{site_dir}/index.html", "w") as f: f.write(html)

        follow_ups = []
        if "No" in str(b["logo_available"]): follow_ups.append("Logo needed")
        follow_ups.append("Get FTP/hosting credentials to deploy")

        with open(f"{site_dir}/brief.md", "w") as f:
            f.write(f"# {b['business_name']}\n\n- Client: {b['client_name']} ({b['client_email']})\n- Submitted: {b['submitted_at']}\n- Type: {b['site_type']}\n- Goal: {b['goal']}\n- Follow-ups: {', '.join(follow_ups)}\n")

        processed_ids.add(b["id"])
        save_processed_ids(processed_ids)

        subprocess.run(["git", "config", "user.email", "agent@claudecode.ai"], check=True)
        subprocess.run(["git", "config", "user.name", "Claude Web Agent"], check=True)
        subprocess.run(["git", "add", site_dir, PROCESSED_FILE], check=True)
        subprocess.run(["git", "commit", "-m", f"Build site for {b['business_name']}"], check=True)
        subprocess.run(["git", "push"], check=True)

        url = f"{GITHUB_PAGES_BASE}/client-sites/{slug}/"
        print(f"Done: {url}")
        send_ghl_email(b["contact_id"], b["business_name"], url, b["site_type"], " | ".join(follow_ups))

if __name__ == "__main__":
    main()
