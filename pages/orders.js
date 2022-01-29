import { useState, useEffect } from 'react'
import { packages } from '../packagelist'
import styles from '../styles/Order.module.css'

export default function Order() {
  const [text,setText] = useState('Generated here...')
  const [order,setOrder] = useState([])
  const [total,setTotal] = useState({
    point: 0,
    qty: 0,
    price: 0,
  })
  const addProduct = p => {
    /**
     * di cari dulu kalo ada orderan yang sama
     * di tambahin qty dan poin nya
     */
    const newOrder = []
    order.map(o => {
      switch (o.id) {
        case p.id:
          o.qty += 1
          o.point += p.point
          newOrder.push(o)
          break
        default:
          newOrder.push(o)
          break
      }
    })

    /**
     * di cari lagi klo gak ada produk nya
     * di tambahin produk dan qty 1 as default
     */
    const findOrder = order.find(o => o.id === p.id)
    if (!findOrder) {
      newOrder.push({ ...p, qty: 1 })
    }
    setOrder(newOrder)
  }

  const removeProduct = id => {
    const newOrder = order.filter(o => o.id !== id)
    setOrder(newOrder)
  }

  const generateOrder = () => {
    // opsi 1 : create by text
    if (order.length > 0) {
      let string = "*User ID:* "+"DNMUSERREFERAL"+"\n*Orderan saya:*\n"
      order.map(o => {
        string += `${o.qty} pieces | ${o.name} @ Rp${o.price} + Poin ${o.point}\n`
      })
      string += `\n*Total Barang:* ${total.qty}\n*Total Biaya:* Rp ${total.price}\n*Total Poin:* ${total.point}\n`
      string += `Mohon di verifikasi kembali!\n \n`
      string += `Harga diatas _belum termasuk_ ongkos kirim menggunakan kurir.`
      setText(string)
    } else {
      alert('Belum memilih produk')
      setText(`Generated here...`)
    }
    // opsi 2 : create di firebase terus di notif gak tau kemana
    // opsi 3 : insert di google sheet
  }

  const packagePoint = (id) => {
    let poin = 0
    packages.map((p) => {
      if (p.id === id) {
        poin = p.point
      }
    })
    if (!poin) {
      alert('Tidak menemukan package tersebut')
    }
    return poin
  }

  const subQty = (id) => {
    const newOrder = []
    order.map((o) => {
      if (o.id === id) {
        if (o.qty - 1 > 0) {
          newOrder.push({ ...o, qty: o.qty - 1, point: o.point - packagePoint(id) })
        }
      } else {
        newOrder.push(o)
      }
    })
    setOrder(newOrder)
  }

  const addQty = (id) => {
    const newOrder = []
    order.map((o) => {
      if (o.id === id) {
        newOrder.push({ ...o, qty: o.qty + 1, point: o.point + packagePoint(id) })
      } else {
        newOrder.push(o)
      }
    })
    setOrder(newOrder)
  }

  /**
   * totalin jumlah barang dulu
   */
  useEffect(() => {
    if (order.length > 0) {
      let qty = 0
      let point = 0
      let price = 0
      order.map(o => {
        qty += o.qty
        point += o.point
        price += o.price * o.qty
      })
      return setTotal({ point, qty, price })
    } else {
      return setTotal({ point: 0, qty: 0, price: 0 })
    }
  }, [order])
  return (
    <div style={{ padding: '1em', backgroundColor: 'blue' }}>
      <div style={{ fontSize: '2em', color: 'white' }}>TOOLKIT PEMESANAN RESELLER</div>
      <div style={{ backgroundColor: 'white', padding: '0.5em', marginTop: '0.3em' }}>
        <div>
          <div style={{ fontSize: '1.5em', fontVariant: 'small-caps' }}>ID Reseller:</div>
          <div>
            <input type={'text'} name='idReseller' />
          </div>
        </div>
        <div>
          <div style={{ fontSize: '1.5em', fontVariant: 'small-caps' }}>Produk:</div>
          <div style={{ display: 'flex' }}>
            {
              Array.isArray(packages) && packages.length > 0
              ? packages.map(p => {
                return (
                  <div key={p.id} onClick={() => addProduct(p)} className={styles.product}>
                    <div style={{ fontSize: '2em' }}>{p.name}</div>
                    <div style={{ fontVariant: 'small-caps', fontSize: '1.2em' }}>Rp{p.price}</div>
                    <div style={{ fontVariant: 'small-caps', fontSize: '0.8em' }}>Point: {p.point}</div>
                  </div>
                )
              })
              : ``
            }
          </div>
        </div>
        <div>
          <div style={{ fontSize: '1.5em', fontVariant: 'small-caps' }}>Order?</div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: '10%', fontWeight: 900, color: 'red' }}>Hapus?</th>
                <th style={{ width: '50%', fontWeight: 900 }}>Nama Paket</th>
                <th style={{ width: '30%', fontWeight: 900 }}>Harga Satuan</th>
                <th style={{ width: '10%', fontWeight: 900 }}>Qty</th>
                <th style={{ width: '10%', fontWeight: 900 }}>Poin</th>
              </tr>
            </thead>
            <tbody>
              {
                Array.isArray(order) && order.length > 0
                ? order.map((o, oi) => {
                  return (
                    <tr key={oi}>
                      <td style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => removeProduct(o.id)}>❌</td>
                      <td>{o.name}</td>
                      <td style={{ textAlign: 'end' }}>Rp {o.price}</td>
                      <td style={{ textAlign: 'end', display: 'flex', justifyContent: 'space-between' }}>
                        <div className={styles.minus} onClick={() => subQty(o.id)}>[-]</div>
                        {o.qty}
                        <div className={styles.plus} onClick={() => addQty(o.id)}>[+]</div>
                      </td>
                      <td style={{ textAlign: 'end' }}>{o.point}</td>
                    </tr>
                  )
                })
                : (
                  <tr>
                    <td colSpan={5} style={{ padding: '1em', textAlign: 'center' }}>Belum memilih produk</td>
                  </tr>
                )
              }
              <tr>
                <td colSpan={2} style={{ fontWeight: 900 }}>Subtotal</td>
                <td style={{ textAlign: 'end' }}>Rp {total.price}</td>
                <td style={{ textAlign: 'center' }}>{total.qty}</td>
                <td style={{ textAlign: 'end' }}>{total.point}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <div className={styles.generate} onClick={generateOrder}>Generate Order From Table</div>
          <div className={styles.generateText}>{text.split(/\n/).map((line, keyLine) => <div key={keyLine}>{line}</div>)}
            <div className={styles.copy}>Cara Transaksi ? Klik Disini</div>
          </div>
        </div>
      </div>
    </div>
  )
}