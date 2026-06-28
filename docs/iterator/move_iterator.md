# std::move_iterator

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class Iter >
class move_iterator;
```

`std::move_iterator` é um adaptador de iterador que se comporta exatamente como o iterador subjacente (que deve ser pelo menos um [LegacyInputIterator](<#/doc/named_req/InputIterator>) ou modelar [`input_iterator`](<#/doc/iterator/input_iterator>)(desde C++20), ou um concept de iterador mais forte(desde C++23)), exceto que a desreferenciação converte o valor retornado pelo iterador subjacente em um rvalue. Se este iterador for usado como um iterador de entrada, o efeito é que os valores são movidos, em vez de copiados.

### Tipos aninhados

| Tipo | Definição
---|---
`iterator_type` | `Iter`
`iterator_category` | [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;Iter&gt;::iterator_category
`value_type` | [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;Iter&gt;::value_type
`difference_type` | [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;Iter&gt;::difference_type
`pointer` | `Iter`
`reference` |

  * a versão de referência rvalue de [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;Iter&gt;::reference se [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;Iter&gt;::reference for um tipo de referência
  * [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;Iter&gt;::reference caso contrário

(até C++20)
| Tipo | Definição
`iterator_type` | `Iter`
`iterator_category`
(presente condicionalmente) |

  * indefinido se [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;Iter&gt;::iterator_category for inválido ou não denotar um tipo
  * [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>) se [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;Iter&gt;::iterator_category modelar [std::derived_from](<#/doc/concepts/derived_from>)<[std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>)>
  * [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;Iter&gt;::iterator_category caso contrário

`iterator_concept` | | [std::input_iterator_tag](<#/doc/iterator/iterator_tags>) | (até C++23)

  * [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>) se `Iter` modelar [std::random_access_iterator](<#/doc/iterator/random_access_iterator>)
  * [std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>) se `Iter` modelar apenas [std::bidirectional_iterator](<#/doc/iterator/bidirectional_iterator>)
  * [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>) se `Iter` modelar apenas [std::forward_iterator](<#/doc/iterator/forward_iterator>)
  * [std::input_iterator_tag](<#/doc/iterator/iterator_tags>) caso contrário

| (desde C++23)
---|---
`value_type` | [std::iter_value_t](<#/doc/iterator/iter_t>)&lt;Iter&gt;
`difference_type` | [std::iter_difference_t](<#/doc/iterator/iter_t>)&lt;Iter&gt;
`pointer` | `Iter`
`reference` | [std::iter_rvalue_reference_t](<#/doc/iterator/iter_t>)&lt;Iter&gt;
(desde C++20)

### Membros de dados

Membro | Descrição
---|---
`Iter` `_current_` | o iterador subjacente
(objeto membro apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/iterator/move_iterator/move_iterator>)(C++11) | constrói um novo adaptador de iterador
(função membro pública)
[ operator=](<#/>)(C++11) | atribui outro adaptador de iterador
(função membro pública)
[ base](<#/doc/iterator/move_iterator/base>)(C++11) | acessa o iterador subjacente
(função membro pública)
[ operator*operator->](<#/doc/iterator/move_iterator/operator_star_>)(C++11)(C++11)(obsoleto em C++20) | acessa o elemento apontado
(função membro pública)
[ operator[]](<#/doc/iterator/move_iterator/operator_at>)(C++11) | acessa um elemento por índice
(função membro pública)
[ operator++operator++(int)operator+=operator+operator--operator--(int)operator-=operator-](<#/doc/iterator/move_iterator/operator_arith>)(C++11) | avança ou decrementa o iterador
(função membro pública)

### Funções não-membro

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/iterator/move_iterator/operator_cmp>)(C++11)(C++11)(removido em C++20)(C++11)(C++11)(C++11)(C++11)(C++20) | compara os iteradores subjacentes
(modelo de função)
[ operator==(std::move_sentinel)](<#/doc/iterator/move_iterator/operator_cmp2>)(C++20) | compara o iterador subjacente e o sentinel subjacente
(modelo de função)
[ operator+](<#/>)(C++11) | avança o iterador
(modelo de função)
[ operator-](<#/doc/iterator/move_iterator/operator->)(C++11) | calcula a distância entre dois adaptadores de iterador
(modelo de função)
[ operator-(std::move_sentinel)](<#/doc/iterator/move_iterator/operator-2>)(C++20) | calcula a distância entre o iterador subjacente e o sentinel subjacente
(modelo de função)
[ iter_move](<#/doc/iterator/move_iterator/iter_move>)(C++20) | converte o resultado da desreferenciação do iterador subjacente para seu tipo de referência rvalue associado
(função)
[ iter_swap](<#/doc/iterator/move_iterator/iter_swap>)(C++20) | troca os objetos apontados por dois iteradores subjacentes
(modelo de função)
[ make_move_iterator](<#/doc/iterator/make_move_iterator>)(C++11) | cria um **std::move_iterator** do tipo inferido a partir do argumento
(modelo de função)

### Modelos auxiliares

```cpp
template< class Iterator1, class Iterator2 >
requires (!std::sized_sentinel_for<Iterator1, Iterator2>)
constexpr bool disable_sized_sentinel_for
<std::move_iterator<Iterator1>, std::move_iterator<Iterator2>> = true;  // (desde C++20)
```

Esta especialização parcial de `std::disable_sized_sentinel_for` impede que especializações de `move_iterator` satisfaçam `sized_sentinel_for` se seus iteradores subjacentes não satisfizerem o concept.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_move_iterator_concept`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | Torna `std::move_iterator<T*>` um iterador de acesso aleatório

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iomanip>
    #include <iostream>
    #include <iterator>
    #include <ranges>
    #include <string>
    #include <string_view>
    #include <vector>
    
    void print(const std::string_view rem, const auto& v)
    {
        std::cout << rem;
        for (const auto& s : v)
            std::cout << std::quoted(s) << ' ';
        std::cout << '\n';
    };
    
    int main()
    {
        std::vector<std::string> v{"this", "_", "is", "_", "an", "_", "example"};
        print("Old contents of the vector: ", v);
        std::string concat;
        for (auto begin = std::make_move_iterator(v.begin()),
                  end = std::make_move_iterator(v.end());
             begin != end; ++begin)
        {
            std::string temp{*begin}; // moves the contents of *begin to temp
            concat += temp;
        }
    
        // A partir do C++17, que introduziu a dedução de argumentos de modelo de classe,
        // o construtor de std::move_iterator pode ser usado diretamente:
        // std::string concat = std::accumulate(std::move_iterator(v.begin()),
        //                                      std::move_iterator(v.end()),
        //                                      std::string());
    
        print("New contents of the vector: ", v);
        print("Concatenated as string: ", std::ranges::single_view(concat));
    }
```

Saída possível:
```
    Old contents of the vector: "this" "_" "is" "_" "an" "_" "example"
    New contents of the vector: "" "" "" "" "" "" ""
    Concatenated as string: "this_is_an_example"
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2106](<https://cplusplus.github.io/LWG/issue2106>) | C++11 | a desreferenciação de um `move_iterator` poderia retornar uma referência pendente se a desreferenciação do iterador subjacente retornasse um prvalue | retorna o objeto em vez disso
[LWG 3736](<https://cplusplus.github.io/LWG/issue3736>) | C++20 | `move_iterator` estava faltando a especialização `disable_sized_sentinel_for` | adicionado
[P2259R1](<https://wg21.link/P2259R1>) | C++20 | o membro `iterator_category` era definido mesmo que [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;Iter&gt;::iterator_category não fosse definido | `iterator_category` não é definido neste caso

### Veja também

[ make_move_iterator](<#/doc/iterator/make_move_iterator>)(C++11) | cria um **std::move_iterator** do tipo inferido a partir do argumento
(modelo de função)
[ move_sentinel](<#/doc/iterator/move_sentinel>)(C++20) | adaptador sentinel para **std::move_iterator**
(modelo de classe)