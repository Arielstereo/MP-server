import {User} from '../models/User.js'
import {Notification} from '../models/Notifications.js'

export const transfers = async (req, res) => {
  try {
    const {id, alias, cash} = req.body

    const remite = await User.findById(id)
    console.log(remite);
   
    const receptor = await User.findOne({alias})
    console.log(receptor);
    
    if(!receptor) {
      return res.json ({
        status: 'failed',
        message: 'Alias incorrecto!'
      })
    }

    if(remite.amount < cash) {
      return res.json({
        status: "failed",
        message: "Saldo insuficiente!"
      })
    }

    remite.amount -= cash
    receptor.amount += cash

    await remite.save()
    await receptor.save()

  const currentDate = new Date()
  const day = currentDate.getDate()
  const month = currentDate.getMonth()
  const year = currentDate.getFullYear()
  const date = `${day}/${month}/${year}`


    res.status(200).json({
      status: "success",
      message:"Transferencia realizada con exito!",
      receptor: `${receptor.username} ${receptor.lastName}`,
      remite: `${remite.username} ${remite.lastName}`,
      receptorId: `${receptor._id}`,
      remiteId: `${remite._id}`,
      cash: `${cash}`,
      type: "Transferencia",
      date
    })


    
  } catch (error) {
    console.log(error);
    res.status(500).json({error})
  }
}

export const enterCash = async (req, res) => {
  try {
    const {id, cash} = req.body
    
    const user = await User.findById(id)
    console.log(user);
  
    user.amount += cash
    await user.save()

    const currentDate = new Date()
    const day = currentDate.getDate()
    const month = currentDate.getMonth()
    const year = currentDate.getFullYear()
    const date = `${day}/${month}/${year}`

    res.status(200).json({
      status: "success",
      message: "operacion exitosa!!",
      type: "Ingreso de dinero",
      id: `${id}`,
      cash: `${cash}`,
      date
    })
  } catch (error) {
    console.log(error);
  }
}

export const createNotification = async (req, res) => {
  try {
    const {sender, receiver, message, date} = req.body

    const notification = new Notification ({
      sender,
      receiver,
      message,
      date
    })

    await notification.save()
    res.status(200).json({
      status: 'success',
      sender: `${sender}`,
      receiver: `${receiver}`,
      message: `${message}`,
      date: `${date}`

    })
  } catch (error) {
    console.log(error);
  }
}

export const getNotifications = async (req, res) => {
  try {
    const id = req.params.id
    
    const notifications = await Notification.find({receiver: id})
    .sort({date: -1})
    .populate('sender', 'username lastName')
   
    res.status(200).json(notifications)

  } catch (error) {
    console.log(error)
  }
}