import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';
import * as _ from 'lodash';
import { Chart } from '../chart.class';

@Component({
    selector: 'app-force-directed-graph',
    templateUrl: './force-directed-graph.component.html',
    styleUrls: ['./force-directed-graph.component.scss']
})
export class ForceDirectedGraphComponent extends Chart implements OnInit {
    @ViewChild('chart') private chartContainer: ElementRef;
    private chart: any;
    private width: number;
    private height: number;
    private data: any;
    private simulation: any;
    private link: any;
    private node: any;
    private chartOptions: any;

    constructor() {
        super()
    }

    ngOnInit() {
        // Set data
        // FIXME
        this.data = this.dataInput[0];

        this.chartOptions = { ...this.configInput };

        this.init();
    }


    /**
     * Process json Data to D3.js Bar chart format
     * @param dataDims :  string[] Selected Dimentions
     * @param rawData : array<Object> Json data
     */
    public static convertData(dataDims: string[], rawData: any) {

        const hierarchy$ = depth => d => d[dataDims[0][depth]];
        const value$ = d => d[dataDims[1]];
        const depthDim = dataDims[0].length;

        const root = [{ id: _.head(dataDims[0]), value: 0 }];

        const level0 = _.chain(rawData)
            .groupBy(_.head(dataDims[0]))
            .flatMap(d => sum(d, 0, _.head(dataDims[0]) + '.', hierarchy$(0)))
            .value();

        function sum(d, depth, prefix, fetchId$) {
            let level = [];
            depth += 1;
            if (depth < depthDim) {
                level = _.chain(d)
                    .groupBy(dataDims[0][depth])
                    .flatMap(d1 => sum(d1, depth, prefix + fetchId$(d[0]) + '.', hierarchy$(depth)))
                    .value();
            }
            return level.concat({
                id: prefix + fetchId$(d[0]),
                value: _.reduce(d, (total, el) => total + value$(el), 0)
            })
        }
        let stratify = d3.stratify()
            .parentId(d => { return d['id'].substring(0, d['id'].lastIndexOf(".")); });

        let result = stratify(root.concat(level0))
            .sort((a, b) => { return (a.height - b.height) || a.id.localeCompare(b.id); });
        return result;

    }

    init() {
        if (this.configInput != null)
            this.data = ForceDirectedGraphComponent.convertData(this.chartOptions.dataDims, this.dataInput);
        else
            this.data = this.dataInput;
        let nodes = flatten(this.data);
        let Hierachylinks = d3.hierarchy(this.data).links();
        let links: { source: number; target: number }[] = simplizeLink(Hierachylinks);
        console.log(nodes, links)
        function flatten(root) {
            var nodes = [], i = 0;

            function recurse(node) {
                if (node.children) node.children.forEach(recurse);
                if (!node.id) node.id = ++i;
                nodes.push(node);
            }

            recurse(root);
            return nodes;
        }
        function simplizeLink(links) {
            let result = _.chain(links)
                .map(d => {
                    return {
                        source: d.source.data.id,
                        target: d.target.data.id
                    }
                })
                .value();
            return result;
        }
        let element = this.chartContainer.nativeElement;
        this.width = element.offsetWidth;
        this.height = element.offsetHeight;
        let svg = d3.select(element).append('svg')
            //    .attr('width', element.offsetWidth)
            //  .attr('height', element.offsetHeight);
            //    .atrr("overflow", "visible")
            .attr("preserveAspectRatio", "xMidYMid meet")
            .attr("viewBox", "100 0 " + (element.offsetWidth) + " " + element.offsetHeight)
            .classed("allow-overflow", true);

        //var width = +this.svg.attr("width");
        //var height = +this.svg.attr("height");

        let color = d3.scaleOrdinal(d3.schemeCategory20);

        this.simulation = d3.forceSimulation()

            .force("link", d3.forceLink().id(d => d['id']).distance(30).strength(1))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter((element.offsetWidth) / 2, element.offsetHeight / 2))
            .force("x", d3.forceX().strength(0).x(this.width / 2))
            .force("y", d3.forceY().strength(0).y(this.height / 2))

        console.log(element.offsetWidth, element.offsetHeight);
        this.link = svg.append("g")
            .attr("class", "links")
            .selectAll(".link")
            .data(links)
            .enter().append("line")
            .attr("class", "link")
            //  .attr("stroke-width", function(d) { return Math.sqrt(d['value']); })
            .attr("stroke", "#999")


        this.node = svg.append("g")
            .attr("class", "nodes")
            .selectAll(".node")
            .data(nodes)
            .enter().append("circle")
            .attr("class", "node")
            .attr("r", 8)
            .attr("fill", (d) => { return color(d['group']); })
            .on("click", _ => {
                let targetId = d3.select(d3.event.target).datum()['id'];
                //fade all node
                this.node.each(d => {
                    this.fade(d);
                    if (d.id == targetId) this.centerPoint(d);
                })
                //find relative links
                let connectedLink = this.link.each(d => {
                    this.fadeLink(d);
                    if (d.source.id == targetId || d.target.id == targetId) {
                        this.focus(d.target)
                        this.focus(d.source)
                        this.focusLink(d);
                    }
                })

            })
            .call(d3.drag()
                .on("start", (d) => { return this.dragstarted(d) })
                .on("drag", (d) => { return this.dragged(d) })
                .on("end", (d) => { return this.dragended(d) }))


        d3.select(element).on("click", _ => {

            if (d3.event.target.attributes.class && d3.event.target.attributes.class.nodeValue == "node") return;
            this.reset()
        });
        this.node.append("title")
            .text(function(d) { return d.id; });

        this.simulation
            .nodes(nodes)
            .on("tick", () => { return this.ticked() });

        this.simulation.force("link")
            .links(links)


        //*********legend
        /*  let legendBox = svg.append("g")
              .attr("class", "legends")
              .attr("transform", "translate(120,200)")



          let legendRectSize = 12;
          let legendSpacing = 24;
          let legends = legendBox.selectAll('.legend')
              .data(color.domain())
              .enter()
              .append('g')
              .attr('class', 'legend')
              .attr('transform', function(d, i) {
                  var height = legendRectSize + legendSpacing;
                  var offset = height * color.domain().length / 2;

                  var vert = i * height;
                  return 'translate(' + 0 + ',' + vert + ')';
              });

          legends.append('circle')
              .attr("r", legendRectSize / 2)
              .style('fill', color)
              .style('stroke', color);

          legends.append('text')
              .attr('x', legendRectSize + legendSpacing)
              .attr('y', legendRectSize - legendSpacing / 2)
              .attr("transform", "translate(0,5)")
              .text(d => "group" + d);
        */

        this.load();


    }

    ticked() {

        this.link
            .attr("x1", function(d) {
                return d.source.x;
            })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        this.node
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
    }

    dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    dragended(d) {
        if (!d3.event.active) this.simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    dragstarted(d) {
        if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    shrink() {
        this.simulation
            //.force("gravity", d3.forceManyBody())
            .force("x", d3.forceX().strength(1).x(this.width / 2))
            .force("y", d3.forceY().strength(1).y(this.height / 2))
        //  .force("charge", d3.forceManyBody().strength(30))
        this.simulation.alpha(0.1).restart();
    }
    expand() {
        this.simulation
            //.force("gravity", d3.forceManyBody())
            .force("x", d3.forceX().strength(0).x(this.width / 2))
            .force("y", d3.forceY().strength(0).y(this.height / 2));
        this.simulation.alpha(1).restart()
    }
    focusLink(link) {
        this.link.filter((d, i) => i == link["index"]).attr("opacity", 1);
    }
    fadeLink(link) {
        this.link.filter((d, i) => i == link["index"]).attr("opacity", .1);
    }
    centerPoint(node) {
        this.node.filter((d, i) => i == node["index"]).attr("r", 15).attr("opacity", 1);
    }
    focus(node) {
        this.node.filter((d, i) => i == node["index"]).attr("opacity", 1);
    }
    fade(node) {
        this.node.filter((d, i) => i == node["index"]).attr("r", 8).attr("opacity", .1);
    }
    reset() {
        console.log("reset");
        this.node.transition().duration(200).attr("r", 8).attr("opacity", 1);
        this.link.transition().duration(200).attr("opacity", 1);
    }
    transition() {
        this.shrink();
        setTimeout(_ => {
            this.expand()
        }, 500);
    }
    setData(data) {
        //  this.data=data[0];


    }
    load() {
        this.transition();

    }
    ease() {
        this.transition();

    }

}
