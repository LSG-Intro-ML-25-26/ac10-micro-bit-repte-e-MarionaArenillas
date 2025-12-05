//  Constants
let Mode_Temperatura = 0
let Mode_Gota = 1
//  Mode
let mode = Mode_Temperatura
//  Posició inicial de la gota
let x = 2
let y = 2
//  ---------- FUNCIONS ----------
//  Mostrar el gràfic de barres de la temperatura, sobre 50
function mostra_grafic_temperatura() {
    led.plotBarGraph(input.temperature(), 50)
    let temp = input.temperature()
    led.plotBarGraph(temp, 50)
    serial.writeValue("temp", temp)
}

//  Reiniciar la gota al centre de la pantalla
function reinicia_gota() {
    
    x = 2
    y = 2
}

//  Moure la gota segons l'acceleròmetre
function mou_gota() {
    
    //  Encén el LED actual
    led.plot(x, y)
    basic.pause(50)
    //  L'apaga per poder moure-la
    led.unplot(x, y)
    let accX = input.acceleration(Dimension.X)
    let accY = input.acceleration(Dimension.Y)
    //  Moviment horitzontal (eix X)
    if (accX <= 150 && x > 0) {
        x = x - 1
    }
    
    if (accX > 150 && x < 4) {
        x = x + 1
    }
    
    //  Moviment vertical (eix Y)
    if (accY <= 150 && y > 0) {
        y = y - 1
    }
    
    if (accY > 150 && y < 4) {
        y = y + 1
    }
    
}

//  Mostrar indicador del mode actual on T = temperatura i G = gota
function mostra_mode() {
    basic.clearScreen()
    if (mode == Mode_Temperatura) {
        basic.showString("T")
    } else {
        basic.showString("G")
    }
    
    basic.pause(500)
    basic.clearScreen()
}

//  ---------- GESTIÓ DELS BOTONS ----------
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    mode = Mode_Temperatura
    mostra_mode()
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    mode = Mode_Gota
    reinicia_gota()
    mostra_mode()
})
//  ---------- BUCLE PRINCIPAL ----------
basic.forever(function on_forever() {
    if (mode == Mode_Temperatura) {
        mostra_grafic_temperatura()
    } else if (mode == Mode_Gota) {
        mou_gota()
    }
    
})
