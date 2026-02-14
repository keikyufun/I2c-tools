//% color=#2E8BFF icon="\uf2db" block="I2Cツール"
namespace I2CTools {

    //% block="I2C 書き込み アドレス %addr レジスタ %reg 値 %val"
    export function writeReg(addr: number, reg: number, val: number) {
        const buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = val
        pins.i2cWriteBuffer(addr, buf)
    }

    //% block="I2C 読み取り1バイト アドレス %addr レジスタ %reg"
    export function readReg(addr: number, reg: number): number {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE)
        return pins.i2cReadNumber(addr, NumberFormat.UInt8BE)
    }

    //% block="I2C 読み取り2バイト アドレス %addr レジスタ %reg"
    export function read16(addr: number, reg: number): number {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE)
        let low = pins.i2cReadNumber(addr, NumberFormat.UInt8BE)
        pins.i2cWriteNumber(addr, reg + 1, NumberFormat.UInt8BE)
        let high = pins.i2cReadNumber(addr, NumberFormat.UInt8BE)
        return (high << 8) | low
    }
}
