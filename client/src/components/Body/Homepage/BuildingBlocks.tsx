import React from 'react';
import { WINDOWS } from './constants';
import LogoIcon from '../../styling/media/logo.png';

/* A JavaScript object that contains the data for each component. */
export const buildComponents = [
    {
        id: 1,
        data: {
            name: 'Title',
            content: 'Title',
        },
        jsx: function (ref: any, style: any, onClick: any): JSX.Element {
            return this.displayContext === WINDOWS.MAINWINDOW ? (
                <div
                    id={this.data.name}
                    ref={ref}
                    className={this.className}
                    style={style}
                    onClick={onClick}>
                    <h1>{this.data.content}</h1>
                </div>
            ) : (
                <div
                    id={this.data.name}
                    ref={ref}
                    className={this.className}
                    style={style}
                    onClick={onClick}>
                    {this.data.name}
                </div>
            );
        },
        position: {
            left: 0,
            right: 0,
        },
        displayContext: WINDOWS.SIDEBAR,
        className: 'movable-item title-item',
    },
    {
        id: 2,
        data: {
            name: 'Subtitle',
            content: 'Subtitle',
        },
        jsx: function (ref: any, style: any, onClick: any): JSX.Element {
            return this.displayContext === WINDOWS.MAINWINDOW ? (
                <div
                    id={this.data.name}
                    ref={ref}
                    className={this.className}
                    style={style}
                    onClick={onClick}>
                    <h3>{this.data.content}</h3>
                </div>
            ) : (
                <div
                    id={this.data.name}
                    ref={ref}
                    className={this.className}
                    style={style}
                    onClick={onClick}>
                    {this.data.name}
                </div>
            );
        },
        position: {
            left: 0,
            right: 0,
        },
        displayContext: WINDOWS.SIDEBAR,
        className: 'movable-item title-item',
    },
    {
        id: 3,
        data: {
            name: 'Text',
            content: 'Text',
        },
        jsx: function (ref: any, style: any, onClick: any): JSX.Element {
            return this.displayContext === WINDOWS.MAINWINDOW ? (
                <div
                    id={this.data.name}
                    ref={ref}
                    className={this.className}
                    style={style}
                    onClick={onClick}>
                    <p>{this.data.content}</p>
                </div>
            ) : (
                <div
                    id={this.data.name}
                    ref={ref}
                    className={this.className}
                    style={style}
                    onClick={onClick}>
                    {this.data.name}
                </div>
            );
        },
        position: {
            left: 0,
            right: 0,
        },
        displayContext: WINDOWS.SIDEBAR,
        className: 'movable-item text-item',
    },
    {
        id: 4,
        data: {
            name: 'Image',
            content: LogoIcon,
        },
        jsx: function (ref: any, style: any, onClick: any): JSX.Element {
            return this.displayContext === WINDOWS.MAINWINDOW ? (
                <div
                    id={this.data.name}
                    ref={ref}
                    className={this.className}
                    style={style}
                    onClick={onClick}>
                    <img src={this.data.content} alt="" />
                </div>
            ) : (
                <div
                    id={this.data.name}
                    ref={ref}
                    className={this.className}
                    style={style}
                    onClick={onClick}>
                    {this.data.name}
                </div>
            );
        },
        position: {
            left: 0,
            right: 0,
        },
        displayContext: WINDOWS.SIDEBAR,
        className: 'movable-item image-item',
    },
];
