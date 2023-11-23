import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

interface Movie {
  avatar: string;
  titulo: string;
}

const App = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const requestMovies = async () => {
      setLoading(true);
      // Requisição
      // Ele vai esperar a resposta e armazenar em req
      const req = await fetch('https://api.b7web.com.br/cinema/');
      // Temos que transformar de JSON para o JSON que o JavaScript entende
      const json = await req.json();
      console.log(json);
      if (json) {
        setMovies(json);
      }

      setLoading(false);
    };

    requestMovies();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View style={styles.loadingArea}>
          <ActivityIndicator size={'large'} color={'#fff'} />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      )}

      {!loading && (
        <>
          <View style={styles.header}>
            <Text style={styles.headerText}>Filmes em cartaz</Text>
          </View>

          <View style={styles.headerButton}>
            <TouchableOpacity style={styles.headerButtonOp}>
              <Text style={styles.totalMoviesText}>
                Total de filmes: {movies.length}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.headerButtonOp2}>
              <Text style={styles.totalMoviesTextInfo}>Informações</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            style={styles.list}
            data={movies}
            renderItem={({item}) => (
              <View style={styles.movieItem}>
                <Text style={styles.movieTitle}>{item.titulo}</Text>
                <Image
                  source={{uri: item.avatar}}
                  style={styles.movieImage}
                  resizeMode="contain"
                />
              </View>
            )}
            keyExtractor={item => item.titulo}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  totalMoviesText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
  totalMoviesTextInfo: {
    color: '#CCCCCC',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
  list: {
    flex: 1,
  },
  movieItem: {
    marginBottom: 10,
  },
  movieImage: {
    height: 400,
  },
  movieTitle: {
    color: '#353535',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 5,
    fontWeight: 'bold',
  },
  loadingArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
  },
  headerButtonOp: {
    width: '45%',
    backgroundColor: '#F5B02B',
    marginVertical: 20,
    marginLeft: 15,
    borderRadius: 5,
  },
  headerButtonOp2: {
    width: '45%',
    backgroundColor: '#EEEEEE',
    marginVertical: 20,
    marginLeft: 15,
    borderRadius: 5,
  },
  header: {
    paddingVertical: 25,
    paddingLeft: 20,
  },
  headerText: {
    color: '#353535',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;
