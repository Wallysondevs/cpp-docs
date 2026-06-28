# std::basic_const_iterator

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< std::input_iterator Iter >
class basic_const_iterator;
```

`std::basic_const_iterator` é um adaptador de iterator que se comporta exatamente como o iterator subjacente (que deve ser pelo menos um [LegacyInputIterator](<#/doc/named_req/InputIterator>) ou modelar [`input_iterator`](<#/doc/iterator/input_iterator>)), exceto que a desreferenciação converte o valor retornado pelo iterator subjacente como imutável. Especializações de `std::basic_const_iterator` são iterators constantes, ou seja, o iterator nunca pode ser usado como um output iterator porque a modificação de elementos não é permitida.

### Tipos Membro

Tipo Membro | Definição
`iterator_category`
(presente condicionalmente) | Se `Iter` modela [`forward_iterator`](<#/doc/iterator/forward_iterator>):

  * o membro `iterator_category` é do mesmo tipo que [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;Iter&gt;::iterator_category.

Caso contrário, não há membro `iterator_category`.
`iterator_concept` |

  * [std::contiguous_iterator_tag](<#/doc/iterator/iterator_tags>), se `Iter` modela [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>);

  * [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>), se `Iter` modela [`random_access_iterator`](<#/doc/iterator/random_access_iterator>);

  * [std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>), se `Iter` modela [`bidirectional_iterator`](<#/doc/iterator/bidirectional_iterator>);

  * [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>), se `Iter` modela [`forward_iterator`](<#/doc/iterator/forward_iterator>);

  * [std::input_iterator_tag](<#/doc/iterator/iterator_tags>) caso contrário.

`value_type` | [std::iter_value_t](<#/doc/iterator/iter_t>)&lt;Iter&gt;
---|---
`difference_type` | [std::iter_difference_t](<#/doc/iterator/iter_t>)&lt;Iter&gt;
`_reference_` (private) | [std::iter_const_reference_t](<#/doc/iterator/iter_t>)&lt;Iter&gt;
(tipo membro apenas para exposição*)

### Objetos Membro

Nome do Membro | Definição
---|---
`_current_` (private) | o iterator subjacente do qual [`base()`](<#/doc/iterator/basic_const_iterator/base>) copia ou move
(objeto membro apenas para exposição*)

### Funções Membro

[ (construtor)](<#/doc/iterator/basic_const_iterator/basic_const_iterator>) | constrói um novo adaptador de iterator
(função membro pública)
[ base](<#/doc/iterator/basic_const_iterator/base>) | acessa o iterator subjacente
(função membro pública)
[ operator*operator->](<#/doc/iterator/basic_const_iterator/operator_star_>) | acessa o elemento apontado
(função membro pública)
[ operator[]](<#/doc/iterator/basic_const_iterator/operator_at>) | acessa um elemento por índice
(função membro pública)
[ operator++operator++(int)operator+=operator--operator--(int)operator-=](<#/doc/iterator/basic_const_iterator/operator_arith>) | avança ou decrementa o iterator
(função membro pública)
[ operator _constant-iterator_](<#/doc/iterator/basic_const_iterator/operator_constant_iterator>) | converte para qualquer constant iterator para o qual um iterator subjacente possa ser conversível
(função membro pública)
[ operator==operator&lt;operator&gt;operator<=operator>=operator<=>](<#/doc/iterator/basic_const_iterator/operator_cmp>) | compara os iterators subjacentes
(função membro pública)

### Funções Não-Membro

[ operator&lt;operator&gt;operator<=operator>=operator<=>](<#/doc/iterator/basic_const_iterator/operator_cmp2>)(C++23) | compara `basic_const_iterator` com um não-`basic_const_iterator`
(modelo de função)
[ operator+operator-](<#/doc/iterator/basic_const_iterator/operator_arith2>)(C++23) | avança ou decrementa o iterator
(modelo de função)
[ operator-](<#/doc/iterator/basic_const_iterator/operator->)(C++23) | calcula a distância entre dois adaptadores de iterator
(modelo de função)
[ iter_move](<#/doc/iterator/basic_const_iterator/iter_move>)(C++23) | converte o resultado da desreferenciação do iterator subjacente para seu tipo de referência rvalue associado
(função)

### Classes Auxiliares

[ std::common_type<std::basic_const_iterator>](<#/doc/iterator/basic_const_iterator/common_type>)(C++23) | determina o tipo comum de um iterator e um tipo `basic_const_iterator` adaptado
(especialização de modelo de classe)

### Modelos de Alias Auxiliares

```cpp
template< std::input_iterator I >
using const_iterator = /* veja a descrição */;  // (desde C++23)
```

Se `I` modela [`_constant-iterator_`](<#/doc/ranges/constant_range>) (um concept apenas para exposição), então const_iterator&lt;I&gt; denota um tipo `I`. Caso contrário, basic_const_iterator&lt;I&gt;.

```cpp
template< std::semiregular S >
using const_sentinel = /* veja a descrição */;  // (desde C++23)
```

Se `S` modela [`input_iterator`](<#/doc/iterator/input_iterator>), então const_sentinel&lt;S&gt; denota um tipo const_iterator&lt;S&gt;. Caso contrário, `S`.

### Modelos de Função Auxiliares

```cpp
template< std::input_iterator T >
constexpr const_iterator<T> make_const_iterator( I it ) { return it; }  // (desde C++23)
template< std::semiregular S >
constexpr const_sentinel<S> make_const_sentinel( S s ) { return s; }  // (desde C++23)
```

### Notas

[Macro de teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_ranges_as_const`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | `std::basic_const_iterator`
[`202311L`](<#/>) | (C++23)
(DR) | `std::basic_const_iterator` deve seguir a conversibilidade de seu tipo subjacente

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <iterator>
    #include <vector>
    
    int main()
    {
        std::vector v{1, 2, 3};
        std::vector<int>::iterator i = v.begin();
        *i = 4;   // OK, v[0] agora é 4
        i[1] = 4; // OK, o mesmo que *(i + 1) = 4;
    
        auto ci = std::make_const_iterator(i);
        assert(*ci == 4);   // OK, pode ler o objeto subjacente
        assert(ci[0] == 4); // OK, idem
        // *ci = 13;        // Erro: localização é somente leitura
        // ci[0] = 13;      // Erro: idem
        ci.base()[0] = 42;  // OK, iterator subjacente é gravável
        assert(*ci == 42);  // OK, localização subjacente v[0] foi modificada
    }
```

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[P2836R1](<https://wg21.link/P2836R1>) | C++23 | `basic_const_iterator` não segue a conversibilidade de seu tipo subjacente | operador de conversão fornecido