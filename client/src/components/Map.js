import {connect} from 'react-redux'
import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import {MAPBOXGL_ACCESS_TOKEN as accessToken} from './secrets'
import axios from 'axios'
import key from './secrets'
import {setLocation} from '../store/poll'
mapboxgl.accessToken = accessToken

class Map extends Component {
    constructor(props) {
        super()
        this.state = {
            coords: props.coords,
            zoom: 14.5,
            interactive: props.interactive
        }
        this.createInteractiveMap = this.createInteractiveMap.bind(this)
        this.createMultiPointMap = this.createMultiPointMap.bind(this)
        this.createSinglePointMap = this.createSinglePointMap.bind(this)
        this.getGeocode = this.getGeocode.bind(this)
        this.getAddress = this.getAddress.bind(this)
    }

    componentDidMount() {
        if (this.state.interactive) {
            this.createInteractiveMap()
        } else if (this.state.coords.length > 1) {
            this.createMultiPointMap()
        } else {
            this.createSinglePointMap()
        }
    }

    async createInteractiveMap() {
        const geocode = await this.getGeocode(this.state.coords)
        const coords = [geocode.longitude, geocode.latitude]
        await this.setState({coords})
        const mapOptions = {
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v10',
            center: coords,
            zoom: this.state.zoom
        }
        this.map = new mapboxgl.Map(mapOptions)
        const staticMarker = new mapboxgl.Marker()
            .setLngLat(coords)
            .addTo(this.map)
        this.map.on('move', async () => {
            const { lng, lat } = this.map.getCenter()
            const zoom = this.map.getZoom().toFixed(2)
            const coords = [lng.toFixed(4), lat.toFixed(4)]
            staticMarker.setLngLat(coords)
            await this.setState({coords, zoom})
        })
        //listener type may need to be 'touchend' for app, needs to be 'mouseup' for web
        this.map.on('touchend', async () => {
            const address = await this.getAddress(this.state.coords)
            await this.props.setLoc(address)
        })
    }

    async createMultiPointMap() {
        const coordPromises = this.state.coords.map(async (coord) => {
            const geocode = await this.getGeocode(coord.coords)
            return {coords: [geocode.longitude, geocode.latitude], title: coord.title}
        })
        const places = await Promise.all(coordPromises)
        const longitudes = places.map(place => {
            return Number(place.coords[0])
        })
        const latitudes = places.map(place => {
            return Number(place.coords[1])
        })
        let maxLong = longitudes[0]
        let maxLat = latitudes[0]
        let minLat = latitudes[0]
        let minLong = longitudes[0]
        for (let i=0; i<longitudes.length; i++) {
            if (longitudes[i] > maxLong) maxLong = longitudes[i]
            if (longitudes[i] < minLong) minLong = longitudes[i]
            if (latitudes[i] > maxLat) maxLat = latitudes[i]
            if (latitudes[i] < minLat) minLat = latitudes[i]
        }
        const avgLong = (minLong + maxLong) / 2
        const avgLat = (minLat + maxLat) / 2
        const coords = [avgLong, avgLat]
        const mapOptions = {
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v10',
            center: coords,
            zoom: this.state.zoom
        }
        this.map = new mapboxgl.Map(mapOptions)
        for (let i=0; i<places.length; i++) {
            const title = places[i].title
            const addressPopUp = new mapboxgl.Popup({offset: [0, -15]})
                .setLngLat(places[i].coords)
                .setHTML('<p>' + title + '</p>')
                .setLngLat(places[i].coords)
            const addressMarker = new mapboxgl.Marker()
                .setLngLat(places[i].coords)
                .addTo(this.map)
                .setPopup(addressPopUp)
        }
        this.map.fitBounds([[minLong - 0.005, minLat - 0.005],[maxLong + 0.005, maxLat + 0.005]])
    }

    async createSinglePointMap() {
        const geocode = await this.getGeocode(this.state.coords.coords)
        const coords = [geocode.longitude, geocode.latitude]
        const title = this.state.coords.title
        const mapOptions = {
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v10',
            center: coords,
            zoom: this.state.zoom
        }
        this.map = new mapboxgl.Map(mapOptions)
        const singlePopUp = new mapboxgl.Popup({offset: [0, -15]})
            .setLngLat(coords)
            .setHTML('<p>' + title + '</p>')
            .setLngLat(coords)
        const singleMarker = new mapboxgl.Marker()
            .setLngLat(coords)
            .addTo(this.map)
            .setPopup(singlePopUp)
    }

    async getGeocode (address) {
        const location = address.split().join('+')
        const {data} = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${key}`)
        const latitude = data.results[0].geometry.location.lat
        const longitude = data.results[0].geometry.location.lng
        return {latitude, longitude}
    }

    async getAddress (coords) {
        const lat = coords[1]
        const lng = coords[0]
        const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`)
        return res.data.results[0].formatted_address
    }

    render() {
        const style = {
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '100%',
            height: '300px'
        }
        return <div id='mapbox-map' style={style} ref={el => this.mapContainer = el} />;
    }
}

const mapDispatch = dispatch => {
    return {
        setLoc: (location) => dispatch(setLocation(location))
    }
}

export default connect(null, mapDispatch)(Map)
