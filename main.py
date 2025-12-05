# Constants
Mode_Temperatura = 0
Mode_Gota = 1

# Mode
mode = Mode_Temperatura

# Posició inicial de la gota
x = 2
y = 2

# ---------- FUNCIONS ----------

# Mostrar el gràfic de barres de la temperatura, sobre 50
def mostra_grafic_temperatura():
    led.plot_bar_graph(input.temperature(), 50)
    temp = input.temperature()
    led.plot_bar_graph(temp, 50)
    serial.write_value("temp", temp)

# Reiniciar la gota al centre de la pantalla
def reinicia_gota():
    global x, y
    x = 2
    y = 2

# Moure la gota segons l'acceleròmetre
def mou_gota():
    global x, y

    # Encén el LED actual
    led.plot(x, y)
    basic.pause(50)
    # L'apaga per poder moure-la
    led.unplot(x, y)

    accX = input.acceleration(Dimension.X)
    accY = input.acceleration(Dimension.Y)

    # Moviment horitzontal (eix X)
    if accX <= 150 and x > 0:
        x = x - 1
    if accX > 150 and x < 4:
        x = x + 1

    # Moviment vertical (eix Y)
    if accY <= 150 and y > 0:
        y = y - 1
    if accY > 150 and y < 4:
        y = y + 1

# Mostrar indicador del mode actual on T = temperatura i G = gota
def mostra_mode():
    basic.clear_screen()
    if mode == Mode_Temperatura:
        basic.show_string("T")
    else:
        basic.show_string("G")
    basic.pause(500)
    basic.clear_screen()


# ---------- GESTIÓ DELS BOTONS ----------
def on_button_pressed_a():
    global mode
    mode = Mode_Temperatura
    mostra_mode()
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global mode
    mode = Mode_Gota
    reinicia_gota()
    mostra_mode()
input.on_button_pressed(Button.B, on_button_pressed_b)


# ---------- BUCLE PRINCIPAL ----------

def on_forever():
    if mode == Mode_Temperatura:
        mostra_grafic_temperatura()
    elif mode == Mode_Gota:
        mou_gota()
basic.forever(on_forever)
