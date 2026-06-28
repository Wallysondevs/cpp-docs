# operator==,!=,&lt;,&lt;=,&gt;,&gt;=,&lt;=&gt;(std::forward_list)

Definido no header `[<forward_list>](<#/doc/header/forward_list>)`

```cpp
template< class T, class Alloc >
bool operator==( const std::forward_list<T, Alloc>& lhs,
const std::forward_list<T, Alloc>& rhs );  // (1) (desde C++11)
template< class T, class Alloc >
bool operator!=( const std::forward_list<T, Alloc>& lhs,
const std::forward_list<T, Alloc>& rhs );  // (2) (desde C++11)
(até C++20)
template< class T, class Alloc >
bool operator<( const std::forward_list<T, Alloc>& lhs,
const std::forward_list<T, Alloc>& rhs );  // (3) (desde C++11)
(até C++20)
template< class T, class Alloc >
bool operator<=( const std::forward_list<T, Alloc>& lhs,
const std::forward_list<T, Alloc>& rhs );  // (4) (desde C++11)
(até C++20)
template< class T, class Alloc >
bool operator>( const std::forward_list<T, Alloc>& lhs,
const std::forward_list<T, Alloc>& rhs );  // (5) (desde C++11)
(até C++20)
template< class T, class Alloc >
bool operator>=( const std::forward_list<T, Alloc>& lhs,
const std::forward_list<T, Alloc>& rhs );  // (6) (desde C++11)
(até C++20)
template< class T, class Alloc >
synth-three-way-result<T>
operator<=>( const std::forward_list<T, Alloc>& lhs,
const std::forward_list<T, Alloc>& rhs );  // (7) (desde C++20)
```

Compara o conteúdo de duas `forward_list`s.

1,2) Verifica se o conteúdo de lhs e rhs é igual, ou seja, se eles têm o mesmo número de elementos e cada elemento em lhs se compara como igual ao elemento em rhs na mesma posição.

3-6) Compara o conteúdo de lhs e rhs lexicograficamente. A comparação é realizada por uma função equivalente a [std::lexicographical_compare](<#/doc/algorithm/lexicographical_compare>).

7) Compara o conteúdo de lhs e rhs lexicograficamente. A comparação é realizada como se fosse por uma chamada a [std::lexicographical_compare_three_way](<#/doc/algorithm/lexicographical_compare_three_way>)(lhs.begin(), lhs.end(),
` `rhs.begin(), rhs.end(),` `[` _synth-three-way_`](<#/doc/standard_library/synth-three-way>)).

O tipo de retorno é o tipo de retorno de [` _synth-three-way_`](<#/doc/standard_library/synth-three-way>) (ou seja, [` _synth-three-way-result_`](<#/doc/standard_library/synth-three-way>) ﻿&lt;T&gt;).

Se nenhuma das seguintes condições for satisfeita, o comportamento é indefinido:

* `T` modela [`three_way_comparable`](<#/doc/utility/compare/three_way_comparable>).
* `<` é definido para valores do tipo `T` (possivelmente qualificado com const), e `<` é uma relação de ordenação total.

```cpp
Os operadores `<`, `<=`, `>`, `>=`, e `!=` são sintetizados a partir de operator<=> e operator== respectivamente.  // (desde C++20)
```

### Parâmetros

- **lhs, rhs** — `forward_list`s cujo conteúdo comparar
-`T` deve satisfazer os requisitos de [EqualityComparable](<#/doc/named_req/EqualityComparable>) para usar as sobrecargas (1,2).
-`T` deve satisfazer os requisitos de [LessThanComparable](<#/doc/named_req/LessThanComparable>) para usar as sobrecargas (3-6). A relação de ordenação deve estabelecer uma ordem total.

### Valor de retorno

1) true se o conteúdo das `forward_list`s for igual, false caso contrário.

2) true se o conteúdo das `forward_list`s não for igual, false caso contrário.

3) true se o conteúdo de lhs for lexicograficamente _menor_ que o conteúdo de rhs, false caso contrário.

4) true se o conteúdo de lhs for lexicograficamente _menor_ ou _igual_ ao conteúdo de rhs, false caso contrário.

5) true se o conteúdo de lhs for lexicograficamente _maior_ que o conteúdo de rhs, false caso contrário.

6) true se o conteúdo de lhs for lexicograficamente _maior_ ou _igual_ ao conteúdo de rhs, false caso contrário.

7) A ordem relativa do primeiro par de elementos não equivalentes em lhs e rhs, se houver tais elementos, lhs.size() <=> rhs.size() caso contrário.

### Complexidade

Linear no tamanho da `forward_list`.

### Notas

```cpp
Os operadores relacionais são definidos em termos do operator< do tipo do elemento.  // (até C++20)
Os operadores relacionais são definidos em termos de ` _synth-three-way_`, que usa operator<=> se possível, ou operator< caso contrário. Notavelmente, se o elemento não fornecer operator<=> por si só, mas for implicitamente conversível para um tipo three-way comparable, essa conversão será usada em vez de operator<.  // (desde C++20)
```

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <compare>
    #include <forward_list>
    
    int main()
    {
        const std::forward_list
            a{1, 2, 3},
            b{1, 2, 3},
            c{7, 8, 9, 10};
    
        assert(
            "Compare equal containers:" &&
            (a != b) == false &&
            (a == b) == true &&
            (a < b) == false &&
            (a <= b) == true &&
            (a > b) == false &&
            (a >= b) == true &&
            (a <=> b) != std::weak_ordering::less &&
            (a <=> b) != std::weak_ordering::greater &&
            (a <=> b) == std::weak_ordering::equivalent &&
            (a <=> b) >= 0 &&
            (a <=> b) <= 0 &&
            (a <=> b) == 0 &&
    
            "Compare non equal containers:" &&
            (a != c) == true &&
            (a == c) == false &&
            (a < c) == true &&
            (a <= c) == true &&
            (a > c) == false &&
            (a >= c) == false &&
            (a <=> c) == std::weak_ordering::less &&
            (a <=> c) != std::weak_ordering::equivalent &&
            (a <=> c) != std::weak_ordering::greater &&
            (a <=> c) < 0 &&
            (a <=> c) != 0 &&
            (a <=> c) <= 0 &&
        "");
    }
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 3431](<https://cplusplus.github.io/LWG/issue3431>) | C++20 | operator<=> não exigia que `T` modelasse [`three_way_comparable`](<#/doc/utility/compare/three_way_comparable>) | exige