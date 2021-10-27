import useNotyf from '../useNotyf'
const notif = useNotyf()
class useErrorNotification {
  error({ errors }: any) {
    console.log(errors)
    const vals = Object.keys(errors).map((key) => errors[key])
    vals.forEach((e) => {
      if (e.length > 1) {
        e.forEach((element: any) => {
          notif.error(`${element}`)
        })
        return
      }
      notif.error(`${e}`)
    })
  }
}

export default new useErrorNotification()
