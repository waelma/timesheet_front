import React from 'react'
import { Result, Button } from 'antd'
import './AdminApprouve.css'
const AdminApprouve = () => {
  return (
    <div className="cont">
        <Result
    status="success"
    title="Votre demande a ete enregistrer avec Succé !"
    subTitle="L'approbation du compte peut prendre qulques minutes, merci d'attender."
  />,
      <Button type="primary">
        Done
      </Button>
    </div>
  )
}

export default AdminApprouve
