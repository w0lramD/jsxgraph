/*
    Copyright 2010
        Matthias Ehmann,
        Michael Gerhaeuser,
        Carsten Miller,
        Bianca Valentin,
        Alfred Wassermann,
        Peter Wilfahrt

    This file is part of JSXGraph.

    JSXGraph is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    JSXGraph is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with JSXGraph. If not, see <http://www.gnu.org/licenses/>.
*/

/** 
 * @fileoverview In this file the conic sections defined.
 */
JXG.createEllipse = function(board, parents, atts) {
    if (atts==null) { atts = {}; };
    atts['curveType'] = 'parameter';

    var F1 = parents[0], 
        F2 = parents[1];
    var M = board.create('point', [
                function(){return (F1.X()+F2.X())*0.5;},
                function(){return (F1.Y()+F2.Y())*0.5;}
            ],{name:'', withLabel:false});

    var transformFunc = function() {
            var ax = F1.X();
            var ay = F1.Y();
            var bx = F2.X();
            var by = F2.Y();
            var beta; 
            // Rotate by the slope of the line [F1,F2]
            var sgn = (bx-ax>0)?1:-1;
            if (Math.abs(bx-ax)>0.0000001) {
                beta = Math.atan((by-ay)/(bx-ax))+ ((sgn<0)?Math.PI:0);  
            } else {
                beta = ((by-ay>0)?0.5:-0.5)*Math.PI;
            }
            var m = [
                        [1,    0,             0],
                        [M.X(),Math.cos(beta),-Math.sin(beta)],
                        [M.Y(),Math.sin(beta), Math.cos(beta)]
                    ];
            return m;
        };

    var conicCoords = function(phi,leave) {
                var a = parents[2],
                    e = F2.coords.distance(JXG.COORDS_BY_USER, F1.coords)*0.5,
                    b = Math.sqrt(a*a-e*e);
                return JXG.Math.matVecMult(transformFunc(),[1,a*Math.cos(phi),b*Math.sin(phi)]);
        };
           
    var curve = board.create('curve', 
                    [function(phi) {return conicCoords(phi)[1];},
                     function(phi) {return conicCoords(phi)[2];},0,2.001*Math.PI],atts);        
    return curve;
};

JXG.createHyperbola = function(board, parents, atts) {
    if (atts==null) { atts = {}; };
    atts['curveType'] = 'parameter';

    var F1 = parents[0],
        F2 = parents[1],
        M = board.create('point', [
                function(){return (F1.X()+F2.X())*0.5;},
                function(){return (F1.Y()+F2.Y())*0.5;}
            ],{name:'', withLabel:false});

    var transformFunc = function() {
            var ax = F1.X();
            var ay = F1.Y();
            var bx = F2.X();
            var by = F2.Y();
            var beta; 
            // Rotate by the slope of the line [F1,F2]
            var sgn = (bx-ax>0)?1:-1;
            if (Math.abs(bx-ax)>0.0000001) {
                beta = Math.atan((by-ay)/(bx-ax))+ ((sgn<0)?Math.PI:0);  
            } else {
                beta = ((by-ay>0)?0.5:-0.5)*Math.PI;
            }
            var m = [
                        [1,    0,             0],
                        [M.X(),Math.cos(beta),-Math.sin(beta)],
                        [M.Y(),Math.sin(beta), Math.cos(beta)]
                    ];
            return m;
        };

    var conicCoords = function(phi,leave) {
                var a = parents[2],
                    e = F2.coords.distance(JXG.COORDS_BY_USER, F1.coords)*0.5,
                    b = Math.sqrt(a*a-e*e);
                return JXG.Math.matVecMult(transformFunc(),[1,leave*a*board.cosh(phi),leave*b*board.sinh(phi)]);
            };
           
    var curves = [board.create('curve', 
                    [function(phi) {return conicCoords(phi,1)[1];},
                     function(phi) {return conicCoords(phi,1)[2];},-2.001*Math.PI,2.001*Math.PI],atts),
                  board.create('curve', 
                    [function(phi) {return conicCoords(phi,-1)[1];},
                     function(phi) {return conicCoords(phi,-1)[2];},-2.001*Math.PI,2.001*Math.PI],atts)];
    return curves;
};

JXG.JSXGraph.registerElement('ellipse', JXG.createEllipse);
JXG.JSXGraph.registerElement('hyperbola', JXG.createHyperbola);

