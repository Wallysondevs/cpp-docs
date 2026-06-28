# std::experimental::make_ostream_joiner

Definido no cabeçalho `[<experimental/iterator>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/iterator&action=edit&redlink=1> "cpp/header/experimental/iterator \(page does not exist\)")`

```c
template< class CharT, class Traits, class DelimT >
std::experimental::ostream_joiner<std::decay_t<DelimT>, CharT, Traits>
make_ostream_joiner( std::basic_ostream<CharT, Traits>& os,
DelimT&& delimiter );
```

Cria um objeto `ostream_joiner`, deduzindo os argumentos de template a partir dos tipos dos argumentos da função.

### Parâmetros

- **os** — o objeto `basic_ostream` ao qual o iterator deve ser associado
- **delimiter** — o delimitador

### Valor de retorno

Um objeto `ostream_joiner`, criado como se por [std::experimental::ostream_joiner](<#/doc/experimental/ostream_joiner>)<[std::decay_t](<#/doc/types/decay>)&lt;DelimT&gt;, CharT, Traits>(os, [std::forward](<#/doc/utility/forward>)&lt;DelimT&gt;(delimiter))

### Exemplo

Run this code
```cpp
    #include <experimental/iterator>
    #include <iostream>
    #include <vector>
    
    int main()
    {
        std::vector<int> x{1, 2, 3, 4};
        std::copy(x.begin(), x.end(),
                  std::experimental::make_ostream_joiner(std::cout, ", "));
    }
```

Saída:
```
    1, 2, 3, 4
```