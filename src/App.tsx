import React, { useRef, useState } from 'react';
import { 
  IonApp, 
  IonHeader, 
  IonContent, 
  IonToolbar, 
  IonTitle, 
  IonRow, 
  IonCol, 
  IonItem, 
  IonGrid, 
  IonLabel, 
  IonInput,
  IonAlert
} from '@ionic/react';
import BmiControls from './components/BmiControls';
import BmiResult from './components/BmiResult';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import InputControl from './components/InputControl';

const App: React.FC = () => {

  const [ bmi, setBmi] = useState<number>();
  const [ error, setError] = useState<string>();
  const [ calcUnits, setCalcUnits ] = useState<'mkg'| 'ftlbs'>('mkg');

  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const heightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;

    if (!enteredHeight || !enteredWeight || +enteredWeight < 1 || +enteredHeight <1) {
      setError('Please check your inputs')
      return;
    }

    const weightConversionFactor = calcUnits === 'ftlbs' ? 2.2 : 1;
    const heightConversionFactor = calcUnits === 'ftlbs' ? 3.28 : 1;

    const weight = +enteredWeight /weightConversionFactor; 
    const height = +enteredHeight /heightConversionFactor; 

    const bmi = weight/ (height * height);
    setBmi(bmi);
  }

  const resetInputs = () => {
    weightInputRef.current!.value='';
    heightInputRef.current!.value='';
  }

  const clearError = () => {
    setError('');
  }

  const selectCalcUnitHandler = (selectedValue: 'mkg' | 'ftlbs') => {
    setCalcUnits(selectedValue);
    resetInputs();
  }

  return (
    <>
    <IonAlert 
      isOpen={!!error}
      message={error}
      buttons={[
        {
          text: 'Okay',
          handler: clearError
        }
      ]}
    />
    <IonApp>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonTitle>
            BMI Calculator
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating"> Your Height ({calcUnits === 'mkg' ? 'in meters' : 'in feet'}) </IonLabel>
                <IonInput type='number' ref={heightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating"> Your Weight ({calcUnits === 'mkg' ? 'in kgs' : 'in lbs'}) </IonLabel>
                <IonInput type='number' ref={weightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <BmiControls onCalculate={calculateBMI} onReset={resetInputs} />
          { bmi && <BmiResult bmi={bmi} /> }
        </IonGrid>
      </IonContent>
    </IonApp>
    </>
  )
};

export default App;
