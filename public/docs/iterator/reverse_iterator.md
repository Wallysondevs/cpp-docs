# std::reverse_iterator

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class Iter >
class reverse_iterator;
```

`std::reverse_iterator` é um adaptador de iterator que inverte a direção de um dado iterator, que deve ser no mínimo um [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>) ou modelar [`bidirectional_iterator`](<#/doc/iterator/bidirectional_iterator>)(desde C++20). Em outras palavras, quando fornecido com um iterator bidirecional, `std::reverse_iterator` produz um novo iterator que se move do fim para o início da sequência definida pelo iterator bidirecional subjacente.

Para um reverse iterator `r` construído a partir de um iterator `i`, a relação `&*r == &*(i - 1)` é sempre verdadeira (contanto que `r` seja [desreferenciável](<#/doc/iterator>)); assim, um reverse iterator construído a partir de um iterator "um-depois-do-fim" desreferencia para o último elemento em uma sequência.

Este é o iterator retornado pelas funções membro `rbegin()` e `rend()` dos [containers da standard library](<#/doc/container>).

### Tipos aninhados

| Tipo | Definição
---|---
`iterator_type` | `Iter`
`iterator_category` | [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;Iter&gt;::iterator_category[1](<#/doc/iterator/reverse_iterator>)
`value_type` | [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;Iter&gt;::value_type[1](<#/doc/iterator/reverse_iterator>)
`difference_type` | [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;Iter&gt;::difference_type
`pointer` | [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;Iter&gt;::pointer
`reference` | [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;Iter&gt;::reference
(até C++20)
| Tipo | Definição
---|---
`iterator_type` | `Iter`
`iterator_concept` |
  * [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>) se `Iter` modela [std::random_access_iterator](<#/doc/iterator/random_access_iterator>)
  * [std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>) caso contrário

`iterator_category` |
  * [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>) se [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;Iter&gt;::iterator_category modela [std::derived_from](<#/doc/concepts/derived_from>)<[std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>)>
  * [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;Iter&gt;::iterator_category caso contrário

`value_type` | [std::iter_value_t](<#/doc/iterator/iter_t>)&lt;Iter&gt;
---|---
`difference_type` | [std::iter_difference_t](<#/doc/iterator/iter_t>)&lt;Iter&gt;
`pointer` | [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;Iter&gt;::pointer
`reference` | [std::iter_reference_t](<#/doc/iterator/iter_t>)&lt;Iter&gt;
(desde C++20)

1. ↑ [1.0](<#/doc/iterator/reverse_iterator>) [1.1](<#/doc/iterator/reverse_iterator>) A definição é fornecida pela especialização base de [std::iterator](<#/doc/iterator/iterator>) até C++17.

### Membros de dados

Membro | Descrição
---|---
`Iter` `current` | o iterator subjacente
(objeto membro protegido)

### Funções membro

[ (construtor)](<#/doc/iterator/reverse_iterator/reverse_iterator>) | constrói um novo adaptador de iterator
(função membro pública)
[ operator=](<#/>) | atribui outro adaptador de iterator
(função membro pública)
[ base](<#/doc/iterator/reverse_iterator/base>) | acessa o iterator subjacente
(função membro pública)
[ operator*operator->](<#/doc/iterator/reverse_iterator/operator_star_>) | acessa o elemento apontado
(função membro pública)
[ operator[]](<#/doc/iterator/reverse_iterator/operator_at>) | acessa um elemento por índice
(função membro pública)
[ operator++operator++(int)operator+=operator+operator--operator--(int)operator-=operator-](<#/doc/iterator/reverse_iterator/operator_arith>) | avança ou decrementa o iterator
(função membro pública)

### Funções não-membro

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/iterator/reverse_iterator/operator_cmp>)(C++20) | compara os iterators subjacentes
(modelo de função)
[ operator+](<#/>) | avança o iterator
(modelo de função)
[ operator-](<#/doc/iterator/reverse_iterator/operator->) | calcula a distância entre dois adaptadores de iterator
(modelo de função)
[ iter_move](<#/doc/iterator/reverse_iterator/iter_move>)(C++20) | converte o resultado da desreferenciação do iterator subjacente ajustado para seu tipo de referência rvalue associado
(função)
[ iter_swap](<#/doc/iterator/reverse_iterator/iter_swap>)(C++20) | troca os objetos apontados por dois iterators subjacentes ajustados
(modelo de função)
[ make_reverse_iterator](<#/doc/iterator/make_reverse_iterator>)(C++14) | cria um **std::reverse_iterator** de tipo inferido a partir do argumento
(modelo de função)

### Modelos auxiliares

```cpp
template< class Iterator1, class Iterator2 >
requires (!std::sized_sentinel_for<Iterator1, Iterator2>)
inline constexpr bool disable_sized_sentinel_for
<std::reverse_iterator<Iterator1>, std::reverse_iterator<Iterator2>> = true;  // (desde C++20)
```

Esta especialização parcial de `std::disable_sized_sentinel_for` impede que especializações de `reverse_iterator` satisfaçam [`sized_sentinel_for`](<#/doc/iterator/sized_sentinel_for>) se seus iterators subjacentes não satisfazem o concept.

### Implementação possível

Abaixo está uma implementação parcial focando na forma como o iterator interno é armazenado, chamando [std::prev](<#/doc/iterator/prev>) apenas quando o conteúdo é obtido via `operator*`.
```cpp
    template<class It>
    class reverse_iterator
    {
    protected:
        It current = It();
    public:
        reverse_iterator() = default;
        constexpr explicit reverse_iterator(It itr) : current(itr) {}
        template<class U>
            requires (!std::is_same_v<U, It> && std::convertible_to<const U&, It>)
        constexpr explicit reverse_iterator(const U& other) : current(other.base()) {}
    
        constexpr decltype(auto) operator*() const
        {
            return *std::prev(current); // <== retorna o conteúdo de prev
        }
    
        constexpr reverse_iterator& operator++() { --current; return *this; }
        constexpr reverse_iterator operator++(int) { auto tmp = *this; ++(*this); return tmp; }
    
        constexpr reverse_iterator& operator--() { ++current; return *this; }
        constexpr reverse_iterator operator--(int) { auto tmp = *this; --(*this); return tmp; }
    
        constexpr It base() const { return current; }
    
        // Outras funções membro, funções friend e typedefs de membro não são mostrados aqui.
    };
```

---

### Notas

`std::reverse_iterator` não funciona com iterators cuja desreferenciação retorna uma referência a um membro de `*this` (os chamados "stashing iterators"). Um exemplo de stashing iterator é [`std::filesystem::path::iterator`](<#/doc/filesystem/path>) da [MSVC STL](<https://github.com/microsoft/STL/blob/ac129e595f762f11551663f1c7fa5f51444a8c6c/stl/inc/filesystem#L1387-L1585>).

### Exemplo

Execute este código
```cpp
    #include <cstddef>
    #include <iostream>
    #include <iterator>
    
    template<typename T, std::size_t SIZE>
    class Stack
    {
        T arr[SIZE];
        std::size_t pos = 0;
    public:
        T pop()
        {
            return arr[--pos];
        }
    
        Stack& push(const T& t)
        {
            arr[pos++] = t;
            return *this;
        }
    
        // desejamos que a iteração em Stack seja na ordem LIFO
        // assim, usamos std::reverse_iterator como um adaptador para iterators existentes
        // (que neste caso são os ponteiros simples: [arr, arr + pos)
        auto begin() { return std::reverse_iterator(arr + pos); }
        auto end() { return std::reverse_iterator(arr); }
    };
    
    int main()
    {
        Stack<int, 8> s;
        s.push(5).push(15).push(25).push(35);
        for (int val : s)
            std::cout << val << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    35 25 15 5
```

### Veja também

[ make_reverse_iterator](<#/doc/iterator/make_reverse_iterator>)(C++14) | cria um **std::reverse_iterator** de tipo inferido a partir do argumento
(modelo de função)
[ iterator](<#/doc/iterator/iterator>)(obsoleto desde C++17) | classe base para facilitar a definição de tipos necessários para iterators simples
(modelo de classe)