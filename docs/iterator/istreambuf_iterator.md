# std::istreambuf_iterator

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class CharT, class Traits = std::char_traits<CharT> >
class istreambuf_iterator
: public std::iterator<std::input_iterator_tag,
CharT, typename Traits::off_type,
/* unspecified */, CharT>
template< class CharT, class Traits = std::char_traits<CharT> >
class istreambuf_iterator;
```

`std::istreambuf_iterator` é um iterator de entrada de passagem única que lê caracteres sucessivos do objeto [std::basic_streambuf](<#/doc/io/basic_streambuf>) para o qual foi construído.

O `std::istreambuf_iterator` construído por padrão é conhecido como o iterator _fim-de-stream_. Quando um `std::istreambuf_iterator` atinge o fim do stream subjacente, ele se torna igual ao iterator fim-de-stream. Desreferenciá-lo ou incrementá-lo posteriormente invoca comportamento indefinido.

```cpp
`std::istreambuf_iterator` possui um construtor de cópia trivial, um construtor padrão constexpr e um destrutor trivial.  // (desde C++11)
```

### Tipos de membros

```cpp
Tipo de membro | Definição
`iterator_category` | std::input_iterator_tag
`value_type` | CharT
`difference_type` | typename Traits::off_type
`pointer` | /* unspecified */
`reference` | CharT
`char_type` | `CharT`
`traits_type` | `Traits`
`int_type` | typename Traits::int_type
`streambuf_type` | std::basic_streambuf<CharT, Traits>
`istream_type` | std::basic_istream<CharT, Traits>
`_/* proxy */_` | Tipo de classe definido pela implementação.
Um objeto `_proxy_` contém um caractere `char_type` e um ponteiro `streambuf_type*`.
Desreferenciar um objeto `_proxy_` com `operator*` retorna o caractere armazenado.
(tipo de membro apenas para exposição*)
Os tipos de membros `iterator_category`, `value_type`, `difference_type`, `pointer` e `reference` são exigidos para serem obtidos por herança de std::iterator<std::input_iterator_tag, CharT, typename Traits::off_type, /* unspecified */, CharT>.  // (até C++17)
```

O tipo de membro `pointer` é geralmente `CharT*` (veja [abaixo](<#/doc/iterator/istreambuf_iterator>)).

### Funções de membro

[ (construtor)](<#/doc/iterator/istreambuf_iterator/istreambuf_iterator>) | constrói um novo `istreambuf_iterator`
(função de membro pública)
(destrutor)(declarado implicitamente) | destrói um `istreambuf_iterator`
(função de membro pública)
[ operator*](<#/doc/iterator/istreambuf_iterator/operator_star_>) | obtém uma cópia do caractere atual
(função de membro pública)
[ operator++operator++(int)](<#/doc/iterator/istreambuf_iterator/operator_arith>) | avança o iterator
(função de membro pública)
[ equal](<#/doc/iterator/istreambuf_iterator/equal>) | testa se ambos os `istreambuf_iterator`s são fim-de-stream ou se ambos são válidos
(função de membro pública)

### Funções não-membro

[ operator==operator!=](<#/doc/iterator/istreambuf_iterator/operator_cmp>)(removido em C++20) | compara dois `istreambuf_iterator`s
(modelo de função)

### Notas

A resolução do [LWG issue 659](<https://cplusplus.github.io/LWG/issue659>) introduziu `operator->`. Espera-se que, dado um `std::istreambuf_iterator` i, as expressões `(*i).m` e `i->m` tenham o mesmo efeito.

No entanto, a resolução não fornece uma especificação formal de seu comportamento. Assim, é implementado de forma diferente, incluindo retornar `nullptr`, retornar o endereço de um temporário, ou nem mesmo fornecer o membro. Seu comportamento pretendido dificilmente pode ser alcançado, e ele é removido pela resolução do [LWG issue 2790](<https://cplusplus.github.io/LWG/issue2790>).

A resolução do [LWG issue 659](<https://cplusplus.github.io/LWG/issue659>) também tornou o tipo de membro `pointer` não especificado para permitir que `operator->` retorne um proxy. Isso é para permitir que `operator->` compile quando `CharT` não é um tipo de classe.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <sstream>
    #include <string>
    
    int main()
    {
        // typical use case: an input stream represented as a pair of iterators
        std::istringstream in{"Hello, world"};
        std::istreambuf_iterator<char> it{in}, end;
        std::string ss{it, end};
        std::cout << "ss has " << ss.size() << " bytes; "
                     "it holds \"" << ss << "\"\n";
    
        // demonstration of the single-pass nature
        std::istringstream s{"abc"};
        std::istreambuf_iterator<char> i1{s}, i2{s};
        std::cout << "i1 returns '" << *i1 << "'\n"
                     "i2 returns '" << *i2 << "'\n";
    
        ++i1;
        std::cout << "after incrementing i1, but not i2:\n"
                     "i1 returns '" << *i1 << "'\n"
                     "i2 returns '" << *i2 << "'\n";
    
        ++i2;
        std::cout << "after incrementing i2, but not i1:\n"
                     "i1 returns '" << *i1 << "'\n"
                     "i2 returns '" << *i2 << "'\n";
    }
```

Saída:
```
    ss has 12 bytes; it holds "Hello, world"
    i1 returns 'a'
    i2 returns 'a'
    after incrementing i1, but not i2:
    i1 returns 'b'
    i2 returns 'b'
    after incrementing i2, but not i1:
    i1 returns 'c'
    i2 returns 'c'
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
[LWG 659](<https://cplusplus.github.io/LWG/issue659>) | C++98 | 1. `std::istreambuf_iterator` não possuía operator->
2. o tipo de membro `pointer` era especificado como `CharT*` | 1. adicionado
2. tornado não especificado
[LWG 2790](<https://cplusplus.github.io/LWG/issue2790>) | C++98 | o operator-> adicionado pelo [LWG issue 659](<https://cplusplus.github.io/LWG/issue659>) não era útil | removido

### Veja também

[ ostreambuf_iterator](<#/doc/iterator/ostreambuf_iterator>) | iterator de saída que escreve para [std::basic_streambuf](<#/doc/io/basic_streambuf>)
(modelo de classe)
[ istream_iterator](<#/doc/iterator/istream_iterator>) | iterator de entrada que lê de [std::basic_istream](<#/doc/io/basic_istream>)
(modelo de classe)