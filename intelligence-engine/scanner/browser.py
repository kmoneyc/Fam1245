from playwright.sync_api import sync_playwright

def create_browser(headless=True):
    return sync_playwright()
