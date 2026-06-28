# std::istream_iterator&lt;T,CharT,Traits,Distance&gt;::istream_iterator

```cpp
  // (1)
istream_iterator();  // (até C++11)
constexpr istream_iterator();  // (desde C++11)
constexpr istream_iterator( std::default_sentinel_t );  // (2) (desde C++20)
istream_iterator( istream_type& stream );  // (3)
  // (4)
istream_iterator( const istream_iterator& other );  // (até C++11)
istream_iterator( const istream_iterator& other ) = default;  // (desde C++11)
```

  
1,2) Constrói o iterator de fim de stream, inicializa por valor o valor armazenado. Este construtor é `constexpr` se o inicializador na definição `auto x = T();` for um inicializador constante (desde C++11).

3) Inicializa o iterator, armazena o endereço de `stream` em um membro de dados e realiza a primeira leitura do `input stream` para inicializar o membro de dados do valor em cache.

4) Constrói uma cópia de `other`. Se `[std::is_trivially_copy_constructible](<#/doc/types/is_copy_constructible>)<T>::value` for `true`, este construtor de cópia é um construtor de cópia trivial (desde C++11).

### Parâmetros

stream  |  \-  |  stream para inicializar o `istream_iterator` com   
---|---|---
other  |  \-  |  outro `istream_iterator` do mesmo tipo   
  
### Exemplo

Execute este código
```
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <sstream>
     
    int main()
    {
        std::istringstream stream("1 2 3 4 5");
        std::copy(
            std::istream_iterator<int>(stream),
            std::istream_iterator<int>(),
            std::ostream_iterator<int>(std::cout, " ")
        );
    }
```

Saída: 
```
    1 2 3 4 5
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 1280](<https://cplusplus.github.io/LWG/issue1280>) | C++98  | sobrecarga (3) armazenava o stream diretamente  | armazena seu endereço em vez disso   
[P0738R2](<https://wg21.link/P0738R2>) | C++98  | a primeira leitura poderia ser adiada para a primeira desreferência  | sempre realizada no construtor 