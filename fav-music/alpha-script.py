import tkinter
from tkinter import *

def func_go_button():
    print(text_entry.get("1.0", END))

root = tkinter.Tk()
root.geometry('400x400')
root.title("alphabetizing")

top_label = Label(root, text='alphabetizing script')
top_label.pack()

text_entry = Text(root, width=300, height=300)
text_entry.pack()

go_button = Button(root, text="alphabetize", command=func_go_button)
go_button.pack()

root.mainloop()