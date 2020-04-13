import React from 'react';
import {View,Text,StyleSheet,Dimensions} from 'react-native';
import {Card} from 'react-native-elements'
import {LineChart,PieChart} from 'react-native-chart-kit'
import { ScrollView } from 'react-native-gesture-handler';

export default class MonthlyScreen extends React.Component{
    render(){
        const data = [
            {
              name: "12am-6am",
              unitsConsumed: 15,
              color: "rgb(204, 204, 204)",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15
            },
            {
              name: "6am-12pm",
              unitsConsumed: 8,
              color: "rgb(153, 153, 153)",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15
            },
            {
              name: "12pm-6pm",
              unitsConsumed: 5,
              color: "rgb(51, 51, 51)",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15
            },
            {
              name: "6pm-12am",
              unitsConsumed: 17,
              color: "rgb(0,0,0)",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15
            },
          ];
        return(
            <View>
                <ScrollView>
                <Card title="Monthly Usage">
                <View>
                    <LineChart
                        data={{
                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","July","Aug","Sept","Oct","Nov","Dec"],
                        datasets: [
                            {
                            data: [
                                1000,
                                600,
                                765,
                                800,
                                900,
                                400,
                                1000,
                                600,
                                765,
                                800,
                                900,
                                200,
                            ]
                            }
                        ]
                        }}
                        width={350} // from react-native
                        height={220}
                        yAxisLabel="⚡️"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#f77062",
                            backgroundGradientTo: "#fe5196",
                            decimalPlaces: 0, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#202646"
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                    </View>
                </Card>
                <Card title="Daily Usage">
                    <PieChart
                        data={data}
                        width={350}
                        height={220}
                        chartConfig={{
                            backgroundGradientFrom: "#f77062",
                            backgroundGradientFromOpacity: 0,
                            backgroundGradientTo: "#fe5196",
                            backgroundGradientToOpacity: 0.5,
                            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                            strokeWidth: 2, // optional, default 3
                            barPercentage: 0.5,
                        }}
                        accessor="unitsConsumed"
                        paddingLeft="15"
                        absolute
                    /> 
                </Card>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({

})