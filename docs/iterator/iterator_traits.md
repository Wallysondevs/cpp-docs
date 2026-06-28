# std::iterator_traits

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class Iter >
struct iterator_traits;
template< class T >
struct iterator_traits<T*>;
template< class T >
struct iterator_traits<const T*>;
```

`std::iterator_traits` é a classe de trait de tipo que fornece uma interface uniforme para as propriedades dos tipos [LegacyIterator](<#/doc/named_req/Iterator>). Isso torna possível implementar algoritmos apenas em termos de iteradores.

O template pode ser especializado para iteradores definidos pelo usuário, de modo que as informações sobre o iterador possam ser recuperadas mesmo que o tipo não forneça os typedefs usuais.

Especializações de usuário podem definir o tipo aninhado `iterator_concept` para uma das [tags de categoria de iterador](<#/doc/iterator/iterator_tags>), para indicar conformidade com os conceitos de iterador. | (desde C++20)

### Parâmetros de template

- **Iter** — o tipo de iterador para o qual recuperar as propriedades

### Tipos de membro

Tipo aninhado | Definição
---|---
`difference_type` | `Iter::difference_type`
`value_type` | `Iter::value_type`
`pointer` | `Iter::pointer`
`reference` | `Iter::reference`
`iterator_category` | `Iter::iterator_category`

Se `Iter` não tiver nenhum dos cinco tipos aninhados acima, então este template não possui membros com nenhum desses nomes (`std::iterator_traits` é SFINAE-friendly). | (desde C++17)
(até C++20)
Se `Iter` não tiver `pointer`, mas tiver todos os quatro tipos aninhados restantes, então esses quatro tipos aninhados são declarados da seguinte forma: | Tipo aninhado | Definição
---|---
`difference_type` | `Iter::difference_type`
`value_type` | `Iter::value_type`
`pointer` | void
`reference` | `Iter::reference`
`iterator_category` | `Iter::iterator_category`

Caso contrário, se `Iter` satisfizer o conceito apenas para exposição [`__LegacyInputIterator`](<#/doc/named_req/InputIterator>), os tipos aninhados são declarados da seguinte forma:

Tipo aninhado | Definição
---|---
`difference_type` | [std::incrementable_traits](<#/doc/iterator/incrementable_traits>)&lt;Iter&gt;::difference_type
`value_type` | [std::indirectly_readable_traits](<#/doc/iterator/indirectly_readable_traits>)&lt;Iter&gt;::value_type
`pointer` |
  * `Iter::pointer` se válido.
  * Caso contrário, decltype([std::declval](<#/doc/utility/declval>)<Iter&>().operator->()) se válido.
  * Caso contrário, void.

`reference` |
  * `Iter::reference` se válido.
  * Caso contrário, [std::iter_reference_t](<#/doc/iterator/iter_t>)&lt;Iter&gt;.

`iterator_category` |
  * `Iter::iterator_category` se válido.
  * Caso contrário, [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>) se `Iter` satisfizer [`__LegacyRandomAccessIterator`](<#/doc/named_req/RandomAccessIterator>).
  * Caso contrário, [std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>) se `Iter` satisfizer [`__LegacyBidirectionalIterator`](<#/doc/named_req/BidirectionalIterator>).
  * Caso contrário, [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>) se `Iter` satisfizer [`__LegacyForwardIterator`](<#/doc/named_req/ForwardIterator>).
  * Caso contrário, [std::input_iterator_tag](<#/doc/iterator/iterator_tags>).

Caso contrário, se `Iter` satisfizer o conceito apenas para exposição [`__LegacyIterator`](<#/doc/named_req/Iterator>), os tipos aninhados são declarados da seguinte forma:

Tipo aninhado | Definição
---|---
`difference_type` |
  * [std::incrementable_traits](<#/doc/iterator/incrementable_traits>)&lt;Iter&gt;::difference_type se válido.
  * Caso contrário, void.

`value_type` | void
---|---
`pointer` | void
`reference` | void
`iterator_category` | [std::output_iterator_tag](<#/doc/iterator/iterator_tags>)

Caso contrário, este template não possui membros com nenhum desses nomes (`std::iterator_traits` é SFINAE-friendly).

(desde C++20)

### Especializações

Este trait de tipo pode ser especializado para tipos fornecidos pelo usuário que podem ser usados como iteradores. A biblioteca padrão fornece especializações parciais para tipos de ponteiro `T*`, o que torna possível usar todos os algoritmos baseados em iteradores com ponteiros brutos.

A biblioteca padrão também fornece especializações parciais para alguns adaptadores de iterador padrão. | (desde C++20)

#### Tipos aninhados da especialização `T*`

Especializado apenas se [std::is_object_v](<#/doc/types/is_object>)&lt;T&gt; for verdadeiro. | (desde C++20)

Tipo aninhado | Definição
---|---
`difference_type` | [std::ptrdiff_t](<#/doc/types/ptrdiff_t>)
`value_type` | `T`(até C++20)[std::remove_cv_t](<#/doc/types/remove_cv>)&lt;T&gt;(desde C++20)
`pointer` | `T*`
`reference` | `T&`
`iterator_category` | [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>)
`iterator_concept` (desde C++20) | [std::contiguous_iterator_tag](<#/doc/iterator/iterator_tags>)

#### Tipos aninhados da especialização `const T*`

| Tipo aninhado | Definição
---|---
`difference_type` | [std::ptrdiff_t](<#/doc/types/ptrdiff_t>)
`value_type` | `T`
`pointer` | const T*
`reference` | const T&
`iterator_category` | [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>)
(até C++20)

#### Especializações para tipos de biblioteca

[ std::iterator_traits<std::common_iterator>](<#/doc/iterator/common_iterator/iterator_traits>)(C++20) | fornece interface uniforme para as propriedades do tipo [std::common_iterator](<#/doc/iterator/common_iterator>)
(especialização de template de classe)
[ std::iterator_traits<std::counted_iterator>](<#/doc/iterator/counted_iterator/iterator_traits>)(C++20) | fornece interface uniforme para as propriedades do tipo [std::counted_iterator](<#/doc/iterator/counted_iterator>)
(especialização de template de classe)

### Exemplo

Mostra uma implementação de propósito geral de `std::reverse()` para iteradores bidirecionais.

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <list>
    #include <vector>
    
    template<class BidirIt>
    void my_reverse(BidirIt first, BidirIt last)
    {
        typename std::iterator_traits<BidirIt>::difference_type n = std::distance(first, last);
        for (--n; n > 0; n -= 2)
        {
            typename std::iterator_traits<BidirIt>::value_type tmp = *first;
            *first++ = *--last;
            *last = tmp;
        }
    }
    
    int main()
    {
        std::vector<int> v{1, 2, 3, 4, 5};
        my_reverse(v.begin(), v.end());
        for (int n : v)
            std::cout << n << ' ';
        std::cout << '\n';
    
        std::list<int> l{1, 2, 3, 4, 5};
        my_reverse(l.begin(), l.end());
        for (int n : l)
            std::cout << n << ' ';
        std::cout << '\n';
    
        int a[]{1, 2, 3, 4, 5};
        my_reverse(a, a + std::size(a));
        for (int n : a)
            std::cout << n << ' ';
        std::cout << '\n';
    
    //  std::istreambuf_iterator<char> i1(std::cin), i2;
    //  my_reverse(i1, i2); // erro de compilação: i1, i2 são iteradores de entrada
    }
```

Saída:
```
    5 4 3 2 1
    5 4 3 2 1
    5 4 3 2 1
```

### Veja também

[ iterator](<#/doc/iterator/iterator>)(obsoleto em C++17) | classe base para facilitar a definição de tipos necessários para iteradores simples
(template de classe)
[ input_iterator_tagoutput_iterator_tagforward_iterator_tagbidirectional_iterator_tagrandom_access_iterator_tagcontiguous_iterator_tag](<#/doc/iterator/iterator_tags>)(C++20) | tipos de classe vazios usados para indicar categorias de iterador
(classe)
[ iter_value_titer_reference_titer_const_reference_titer_difference_titer_rvalue_reference_titer_common_reference_t](<#/doc/iterator/iter_t>)(C++20)(C++20)(C++23)(C++20)(C++20)(C++20) | calcula os tipos associados de um iterador
(template de alias)