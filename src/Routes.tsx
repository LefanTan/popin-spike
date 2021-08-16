import { NavigationContainer } from '@react-navigation/native';
import React from 'react'

interface RoutesProps {}

/**
 * Container for all the navigation components (bottom tabs, stack navs)
 * Authentications can be done here as well
 */
export const Routes: React.FC<RoutesProps> = ({ }) => {
    return (
        <NavigationContainer>
        </NavigationContainer>
    );
}