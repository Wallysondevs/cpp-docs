# std::ranges::views::istream, std::ranges::basic_istream_view, std::ranges::istream_view, std::ranges::wistream_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< std::movable Val, class CharT,
class Traits = std::char_traits<CharT> >
requires std::default_initializable<Val> &&
/*stream-extractable*/<Val, CharT, Traits>
class basic_istream_view
: public ranges::view_interface<basic_istream_view<Val, CharT, Traits>>
Templates auxiliares
template< class Val >
using istream_view = ranges::basic_istream_view<Val, char>;
template< class Val >
using wistream_view = ranges::basic_istream_view<Val, wchar_t>;
Objetos de ponto de customização
namespace views {
template< class T >
constexpr /* unspecified */ istream = /* unspecified */;
}
Concepts auxiliares
template< class Val, class CharT, class Traits >
concept /*stream-extractable*/ =
requires(std::basic_istream<CharT, Traits>& is, Val& t) {
is >> t;
};
```

  
1) Uma fábrica de ranges que gera uma sequência de elementos chamando repetidamente o operator>>.

2,3) Templates de alias de conveniência para os tipos de caractere char e wchar_t.

4) views::istream&lt;T&gt;(e) é [expression-equivalent](<#/doc/language/expressions>) a ranges::basic_istream_view<T, typename U::char_type, typename U::traits_type>(e) para quaisquer subexpressões e adequadas, onde `U` é [std::remove_reference_t](<#/doc/types/remove_reference>)<decltype(e)>.

O programa é malformado se `U` não for pública e inequivocamente derivada de [std::basic_istream](<#/doc/io/basic_istream>)&lt;typename U::char_type, typename U::traits_type&gt;, o que pode resultar em uma [falha de substituição](<#/doc/language/sfinae>).

5) O concept apenas para exposição /*stream-extractable*/<Val, CharT, Traits> é satisfeito quando um lvalue do tipo `Val` pode ser extraído de um lvalue do tipo [std::basic_istream](<#/doc/io/basic_istream>)<CharT, Traits>.

O tipo de iterator de `basic_istream_view` é move-only: ele não atende aos requisitos de [LegacyIterator](<#/doc/named_req/Iterator>), e, portanto, não funciona com [algoritmos](<#/doc/algorithm>) anteriores ao C++20.

### Objetos de ponto de customização

O nome `views::istream<T>` denota um _objeto de ponto de customização_, que é um [objeto de função](<#/doc/named_req/FunctionObject>) const de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`semiregular`](<#/doc/concepts/semiregular>). Para fins de exposição, a versão não qualificada por cv de seu tipo é denotada como `___istream_fn_ <T>`.

Todas as instâncias de `___istream_fn_ <T>` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___istream_fn_ <T>` nos mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser const-qualificada ou não (no entanto, uma instância volatile-qualificada não é exigida para ser invocável). Assim, `views::istream<T>` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atenderem aos requisitos para argumentos de `views::istream<T>` acima, `___istream_fn_ <T>` modela  

  * [std::invocable](<#/doc/concepts/invocable>)<__istream_fn&lt;T&gt;, Args...>, 
  * [std::invocable](<#/doc/concepts/invocable>)<const __istream_fn&lt;T&gt;, Args...>, 
  * [std::invocable](<#/doc/concepts/invocable>)<__istream_fn&lt;T&gt;&, Args...>, e 
  * [std::invocable](<#/doc/concepts/invocable>)<const __istream_fn&lt;T&gt;&, Args...>.  

Caso contrário, nenhum operador de chamada de função de `___istream_fn_ <T>` participa da resolução de sobrecarga. 

### Membros de dados

Membro  |  Definição   
---|---
[std::basic_istream](<#/doc/io/basic_istream>)<CharT, Traits>* `_stream__` |  um ponteiro para o stream de entrada  
(objeto membro apenas para exposição*)  
`Val` `_value__` |  o valor armazenado  
(objeto membro apenas para exposição*)  
  
### Funções membro

[ (construtor)](<#/doc/ranges/basic_istream_view>) |  constrói um `basic_istream_view`   
(função membro pública)  
[ begin](<#/doc/ranges/basic_istream_view>) |  retorna um iterator   
(função membro pública)  
[ end](<#/doc/ranges/basic_istream_view>) |  retorna [std::default_sentinel](<#/doc/iterator/default_sentinel>)   
(função membro pública)  
  
#####  Herdado de [std::ranges::view_interface](<#/doc/ranges/view_interface>)  
  
[ cbegin](<#/doc/ranges/view_interface/cbegin>)(C++23) |  retorna um iterator constante para o início do range.   
(função membro pública de `std::ranges::view_interface<D>`)  
[ cend](<#/doc/ranges/view_interface/cend>)(C++23) |  retorna um sentinel para o iterator constante do range.   
(função membro pública de `std::ranges::view_interface<D>`)  
Embora [`basic_istream_view`](<#/doc/ranges/basic_istream_view>) seja derivado de [std::ranges::view_interface](<#/doc/ranges/view_interface>), ele não pode usar nenhuma das funções membro herdadas.  | (até C++23)  
  
##  std::ranges::basic_istream_view::basic_istream_view

```cpp
constexpr explicit
basic_istream_view( std::basic_istream<CharT, Traits>& stream );  // (desde C++20)
```

  
Inicializa `_[stream_](<#/doc/ranges/basic_istream_view>)_` com [std::addressof](<#/doc/memory/addressof>)(stream), e value-inicializa `_[value_](<#/doc/ranges/basic_istream_view>)_` ﻿. 

##  std::ranges::basic_istream_view::begin

```cpp
constexpr auto begin();  // (desde C++20)
```

  
Equivalente a *`_[stream_](<#/doc/ranges/basic_istream_view>)_` `>>` ` _[value_](<#/doc/ranges/basic_istream_view>)_` ﻿; return` `[` _iterator_`](<#/doc/ranges/basic_istream_view/iterator>) ﻿{*this};. 

##  std::ranges::basic_istream_view::end

```cpp
constexpr std::default_sentinel_t end() const noexcept;  // (desde C++20)
```

  
Retorna [std::default_sentinel](<#/doc/iterator/default_sentinel>). 

### Classes aninhadas

[_iterator_](<#/doc/ranges/basic_istream_view/iterator>) |  o tipo de iterator de `basic_istream_view`  
(classe membro apenas para exposição*)  
  
### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iomanip>
    #include <iostream>
    #include <iterator>
    #include <ranges>
    #include <sstream>
    #include <string>
    
    int main()
    {
        auto words = std::istringstream{"today is yesterday’s tomorrow"};
        for (const auto& s : std::views::istream<std::string>(words))
            std::cout << std::quoted(s, '/') << ' ';
        std::cout << '\n';
    
        auto floats = std::istringstream{"1.1  2.2\t3.3\v4.4\f55\n66\r7.7  8.8"};
        std::ranges::copy
        (
            std::views::istream<float>(floats),
            std::ostream_iterator<float>{std::cout, ", "}
        );
        std::cout << '\n';
    }
```

Saída: 
```
    /today/ /is/ /yesterday’s/ /tomorrow/
    1.1, 2.2, 3.3, 4.4, 55, 66, 7.7, 8.8,
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto
---|---|---|---
[LWG 3568](<https://cplusplus.github.io/LWG/issue3568>) | C++20  | P2325R3 acidentalmente tornou o valor armazenado default-inicializado  | restaurado para value-initialization   
[P2325R3](<https://wg21.link/P2325R3>) | C++20  | construtor padrão foi fornecido como  
[`view`](<#/doc/ranges/view>) deve ser [`default_initializable`](<#/doc/concepts/default_initializable>) | removido junto com  
o requisito   
[P2432R1](<https://wg21.link/P2432R1>) | C++20  | `ranges::istream_view` era um function template  
e não seguia a convenção de nomenclatura | transformado em um alias template;  
objetos de ponto de customização adicionados   
  
### Veja também

[ istream_iterator](<#/doc/iterator/istream_iterator>) |  input iterator que lê de [std::basic_istream](<#/doc/io/basic_istream>)   
(class template)  