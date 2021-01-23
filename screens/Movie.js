import React, { Component } from 'react';
import { View, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import { Text, Card, Input, Button, Modal } from "@ui-kitten/components";
import { connect } from 'react-redux';

import { fetch_data, search_movie } from '../redux/actions/actions';

class Movie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search_string : '',
            visible : false,
            text_overview : ''
        }
    }

    /* running for first time */
    componentDidMount() {
        this.props.fetchMovieExplore()


    }

    searchMovie() {
        let { SearchMoview } = this.props
        let { search_string } = this.state
        SearchMoview(search_string);
    }

    /* search bar config */
    searchIcon = () => {
        let { search_string } = this.state
        return (
            <Button onPress={search_string.length > 0 ? this.searchMovie.bind(this) : null}>
                Search
            </Button> 
        );
    };

    /* list component config */

    Header = (title, props) => (
        <View {...props}>
          <Text category='s1'>{title}</Text>
        </View>
    );
    // header={this.Header.bind(this, `${item.title}`)} -> calling this on props (unused)

    ItemView = ({ item }) => {
        return (
            // Flat List Item
            <TouchableOpacity onPress={() => this.setState({visible: true, text_overview: `${item.overview}`}) }>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", margin: 3}}>
                    <View style={{ backgroundColor: "#FFFFFF", borderRadius: 10, overflow: "hidden" }}>
                    <View>
                        <Image style={{
                            height: 300,
                            width: 200, 
                            borderRadius: 5
                        }} source={{uri: `https://image.tmdb.org/t/p/w200${item.poster_path}`}}/>
                    </View>
                    <View style={{ padding: 10, width: 155, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text>{item.title}</Text>
                            <Text style={{ color: "#777", paddingTop: 5 }}>
                            {item.release_date}
                            </Text>
                        </View>
                    </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        let { search_string, visible, text_overview } = this.state
        let { list_movie_explore, not_found_status, error_status } = this.props // destructing state value from props

        if(list_movie_explore.length > 0) {

            return (   
                <SafeAreaView style={{ flex: 1 , flexDirection : 'column'}}>
                    
                    <Input
                    placeholder='Search Your movie'
                    style={{ margin: 5 }}
                    value={search_string}
                    onChangeText={ text => this.setState({ search_string : text })}
                    accessoryRight={this.searchIcon}
                    />

                    { not_found_status ? 
                        <View style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Text> Data Not Found </Text>
                        </View>
                    :
                        <FlatList
                            data={list_movie_explore}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this.ItemView}
                        />
                    }

                    <Text style={{textAlign: 'center'}}>Danill Yudhistira Setiawan</Text>
                    
                    <Modal
                        key={Math.random()}
                        style={{margin: 7}}
                        visible={visible}
                        backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                        onBackdropPress={() => this.setState({visible: false, text_overview: ''})}>
                        <Card disabled={true}>
                            <View style={{margin: 5}}>
                                <Text>{text_overview}</Text>
                            </View>
                            <Button onPress={() => this.setState({visible: false, text_overview: ''}) }>
                                Close
                            </Button>
                        </Card>
                    </Modal>

                </SafeAreaView>
            );

        } else {

            if(error_status) {
                return(
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }} >
                        <Text> Please Check Your Connection then reopen this app </Text>
                    </View>
                );
            } else {
                return(
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }} >
                        <Text> Loading ... </Text>
                    </View>
                );
            }

        }
    }
}


const mapStateToProps = (state) => {
    return { 
        list_movie_explore : state.list, 
        not_found_status : state.not_found,
        error_status : state.error_status
    }
}

const mapDispatchToProps = (dispatch) =>  { 
    return {
        fetchMovieExplore: () => dispatch(fetch_data()),
        SearchMoview: (text) => dispatch(search_movie(text))
    } 
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);