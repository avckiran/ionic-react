import React from 'react';
import { IonRow, IonCol, IonCard, IonCardContent } from '@ionic/react';

const BmiResult: React.FC<{
    bmi: number
}> = (props) => {
    return (
        <IonRow>
            <IonCol>
              {/* BMI output card  */}
              <IonCard>
                <IonCardContent className="ion-text-center">
                    <h2>Your Body-Mass-Index is </h2>
                    <h3>{props.bmi.toFixed(2)}</h3>
                </IonCardContent>
              </IonCard>
            </IonCol>
        </IonRow>
    )
}

export default BmiResult;