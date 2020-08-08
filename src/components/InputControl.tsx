import React from 'react';
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';

const InputControl: React.FC<{
    selectedValue: 'mkg' | 'ftlbs'
    onSelectValue: (value: 'mkg' | 'ftlbs') => void;
}> = (props) => {

    const inputChangeHandler = (event: CustomEvent) => {
        props.onSelectValue(event.detail.value);
    }

    return (
        <IonSegment value={props.selectedValue} onIonChange={inputChangeHandler} >
            <IonSegmentButton value="mkg">
                <IonLabel>M/Kgs</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="ftlbs">
                <IonLabel>Ft/Lbs</IonLabel>
            </IonSegmentButton>
        </IonSegment>
    )
};

export default InputControl;