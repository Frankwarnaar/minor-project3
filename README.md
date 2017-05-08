# Project 3 - Catering Sustainability
#### Client: Watt-Now
#### Date: May 8 - 12, 2017
#### Team: Pierre, Frank, Roy & Tijs

## Introduction

This project is based on the knowledge gained from the courses: Real Time Web and Web of Things. The client for this project is Watt-Now, a company that makes off-grid energy more sustainable. They mostly work in the festival industry, so that will be the focus for this project.

## Problem

Every year millions of Diesel is wasted in the event industry. All festivals have food trucks, light shows and big music installations. The waste of energy is bad for the environment but also has economic disadvantages. Watt-Now visualizes detailed power consumption of festivals and created predictive technology that gets smarter with the data input of every festival. This way the festivals get the change to save 40% of the Diesel consumption and build a sustainable future in the event industry.

## Design challenge

The question from Watt-Now is: Given the baseline information of power consumption, what information do you need and how do you translate that into real time events, which are available for the end user, so they can react and reduce there power consumption

## Focus group

The focus group for this project is the festival catering of DGTL festival. In the near future the 9 festival caterers need to pay power consumption per hour. In this way the caterers are forced to be as sustainable as possible. Because doing so, the costs will automatically be reduced. Besides the economic fact, the assumption is made that caterers on a festival with a sustainable trademark, want to show the consumer how sustainable they are themselves.

## Solution

 To create a vibe of competition between the caterers for being the most sustainable, the solution lies in creating a leaderboard. The leaderboard will be physical and online visible. The (realtime) top 10 of the most sustainable caterers will be shown. When a caterer is being most power efficient and by that way most sustainable, the caterer will be ranked higher than others which don't undertake action. The assumption is that festival visitors who go to sustainable festivals, rather choose sustainable caterers instead of caterers who are not.

All caterers are being asked to create an inventory with all there devices. After uploading this to the festival platform, the caterers are divided in 3 consumption scales. By doing this, the average power consumption can be measured.

 Low consumption:

 Medium consumption:

 High consumption:

 For the caterers a light sensor is developed which shows the level of sustainability. The power consumption is measured every 15 minutes and calculated with the quantity of sold products. When the red light is on, it indicates that the caterer is not doing anything in order to be sustainable. When the green light is on, there is a 100% level of sustainability. Because of this the caterer gets reminded to undertake action. Every caterer gets a custom sheet with different solutions.

## Data

#### Input
- All caterers with included information (name, category, power consumption and products sold per minute)
    - This can be faked with a custom JSON dataset
- The amount of products they sell per hour
    - This can be faked by pressing a button per transaction

#### Output
- A online and physical leaderboard with the top 10 of most sustainable caterers
- A light sensor to see if the caterer is doing well or bad

## Actions

#### Festival
The festival's data is fully transparent and public to all online and physical audiences. As a result, the festival will get even more respect for their sustainability competition between their caterers.

#### Visitors
The festival visitors who prefer sustainable food, are able to make decisions based on a realtime data gained from the caterers's level of sustainability. Their decision is based on the leaderboard.

#### Caterers
The festival caterers who are forced to pay their power consumption per hour have big economic advantages in being as sustainable as possible. By looking at their status they can undertake actions to be more sustainable in critical moments. In addition, they can show that they are sustainable, what is good for their reputation.

## Use case

To build a real situation, the following use case has been created.

Bijvoorbeeld:
Druksensoren in het pad van stage A naar stage B vangen data op, deze data wordt naar een server gestuurd die dit omzet naar informatie (toename van druk -> x aantal mensen), dit triggered event Y, doelgroep Z vangt dit op en onderneemt handeling Q