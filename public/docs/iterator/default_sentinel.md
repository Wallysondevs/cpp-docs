# std::default_sentinel_t, std::default_sentinel

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
struct default_sentinel_t {};
inline constexpr default_sentinel_t default_sentinel{};
```

1) `default_sentinel_t` é um tipo de classe vazia usado para denotar o fim de um range. Pode ser usado em conjunto com tipos de iterator que conhecem o limite do seu range (por exemplo, [std::counted_iterator](<#/doc/iterator/counted_iterator>)).

2) `default_sentinel` é uma constante do tipo `default_sentinel_t`.

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <list>
    
    int main()
    {
        std::list<int> l{3, 1, 4, 1, 5, 9, 2, 6};
    
        std::ranges::copy(std::counted_iterator(std::begin(l), 4),
            std::default_sentinel, std::ostream_iterator<int>{std::cout, " "});
        std::cout << '\n';
    }
```

Saída:
```
    3 1 4 1
```

### Veja também

[ istream_iterator](<#/doc/iterator/istream_iterator>) | iterator de entrada que lê de [std::basic_istream](<#/doc/io/basic_istream>)
(modelo de classe)
[ istreambuf_iterator](<#/doc/iterator/istreambuf_iterator>) | iterator de entrada que lê de [std::basic_streambuf](<#/doc/io/basic_streambuf>)
(modelo de classe)
[ counted_iterator](<#/doc/iterator/counted_iterator>)(C++20) | adaptador de iterator que rastreia a distância até o fim do range
(modelo de classe)