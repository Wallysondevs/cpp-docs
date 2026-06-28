# std::ostream_iterator&lt;T,CharT,Traits&gt;::ostream_iterator

```cpp
ostream_iterator( ostream_type& stream, const CharT* delim );  // (1)
ostream_iterator( ostream_type& stream );  // (2)
```

  
Constrói o iterator com `stream` como o stream associado, armazenando o endereço de `stream`. 

1) Usa `delim` como o delimitador.

2) Usa um ponteiro nulo como o delimitador.

### Parâmetros

stream  |  \-  |  o stream de saída a ser acessado por este iterator   
---|---|---
delim  |  \-  |  a string de caracteres terminada em nulo a ser inserida no stream após cada saída   
  
### Exemplo

Run this code
```
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <numeric>
     
    int main()
    {
        std::ostream_iterator<char> oo{std::cout};
        std::ostream_iterator<int> i1{std::cout, ", "};
        std::fill_n(i1, 5, -1);
        *oo++ = '\n';
     
        std::ostream_iterator<double> i2{std::cout, "; "};
        *i2++ = 3.14;
        *i2++ = 2.71;
        *oo++ = '\n';
     
        std::common_iterator<std::counted_iterator<std::ostream_iterator<float>>,
                             std::default_sentinel_t>
            first{std::counted_iterator{std::ostream_iterator<float>{std::cout," ~ "}, 5}},
            last{std::default_sentinel};
        std::iota(first, last, 2.2);
        *oo++ = '\n';
    }
```

Saída: 
```
    -1, -1, -1, -1, -1,
    3.14; 2.71;
    2.2 ~ 3.2 ~ 4.2 ~ 5.2 ~ 6.2 ~
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto
---|---|---|---
[LWG 1280](<https://cplusplus.github.io/LWG/issue1280>) | C++98  | `stream` era armazenado diretamente  | armazena seu endereço em vez disso   
[P2325R3](<https://wg21.link/P2325R3>) | C++20  | construtor padrão foi fornecido como C++20  
iterators devem ser [`default_initializable`](<#/doc/concepts/default_initializable>) | removido junto com  
o requisito 