# Selenium fallback worker placeholder.
# Used if Playwright compatibility fails.
from selenium import webdriver

def browser():
    return webdriver.Chrome()
