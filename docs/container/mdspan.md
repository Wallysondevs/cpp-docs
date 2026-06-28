# std::mdspan

Definido no cabeçalho `[<mdspan>](<#/doc/header/mdspan>)`

```c
template<
class T,
class Extents,
class LayoutPolicy = std::layout_right,
class AccessorPolicy = std::default_accessor<T>
> class mdspan;
```

`std::mdspan` é uma view de array multidimensional que mapeia um índice multidimensional para um elemento do array. As políticas de mapeamento e acesso a elementos são configuráveis, e o array subjacente não precisa ser contíguo ou sequer existir na memória.

Cada especialização `MDS` de `mdspan` modela [`copyable`](<#/doc/concepts/copyable>) e satisfaz:

*   [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;MDS&gt; é verdadeiro,
*   [std::is_nothrow_move_assignable_v](<#/doc/types/is_move_assignable>)&lt;MDS&gt; é verdadeiro, e
*   [std::is_nothrow_swappable_v](<#/doc/types/is_swappable>)&lt;MDS&gt; é verdadeiro.

Uma especialização de `mdspan` é um tipo [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) se seus `accessor_type`, `mapping_type` e `data_handle_type` forem tipos [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>).

### Parâmetros de template

T | \- | tipo do elemento; um tipo de objeto completo que não é um tipo de classe abstrata nem um tipo de array.
---|---|---
Extents | \- | especifica o número de dimensões, seus tamanhos e quais são conhecidos em tempo de compilação. Deve ser uma especialização de std::extents.
LayoutPolicy | \- | especifica como converter um índice multidimensional para um índice 1D subjacente (array 3D column-major, matriz 2D triangular simétrica, etc). Deve satisfazer os requisitos de [LayoutMappingPolicy](<#/doc/named_req/LayoutMappingPolicy>).
AccessorPolicy | \- | especifica como converter um índice 1D subjacente para uma referência a T. Deve satisfazer a restrição de que [std::is_same_v](<#/doc/types/is_same>)<T, typename AccessorPolicy​::​element_type> é verdadeiro. Deve satisfazer os requisitos de [AccessorPolicy](<#/doc/named_req/AccessorPolicy>).

### Tipos de membros

Membro | Definição
---|---
`extents_type` | `Extents`
`layout_type` | `LayoutPolicy`
`accessor_type` | `AccessorPolicy`
`mapping_type` | LayoutPolicy::mapping&lt;Extents&gt;
`element_type` | `T`
`value_type` | [std::remove_cv_t](<#/doc/types/remove_cv>)&lt;T&gt;
`index_type` | Extents::index_type
`size_type` | Extents::size_type
`rank_type` | Extents::rank_type
`data_handle_type` | AccessorPolicy::data_handle_type
`reference` | AccessorPolicy::reference

### Membros de dados

Membro | Descrição
---|---
`accessor_type` `_acc__` (private) | o accessor
(objeto membro apenas para exposição*)
`mapping_type` `_map__` (private) | o mapeamento de layout
(objeto membro apenas para exposição*)
`data_handle_type` `_ptr__` (private) | o manipulador de dados subjacente
(objeto membro apenas para exposição*)

### Funções membro

[ (constructor)](<#/doc/container/mdspan/mdspan>) | constrói um `mdspan`
(função membro pública)
[ operator=](<#/>) | atribui um `mdspan`
(função membro pública)

##### Acesso a elementos

[ operator[]](<#/doc/container/mdspan/operator_at>) | acessa um elemento no índice multidimensional especificado
(função membro pública)

##### Observadores

[ rank](<#/doc/container/mdspan/rank>)[static] | retorna o rank de um `mdspan`
(função membro estática pública)
[ rank_dynamic](<#/doc/container/mdspan/rank_dynamic>)[static] | retorna o rank dinâmico de um `mdspan`
(função membro estática pública)
[ static_extent](<#/doc/container/mdspan/static_extent>)[static] | retorna o tamanho da extensão estática de um `mdspan` em um dado índice de rank
(função membro estática pública)
[ extent](<#/doc/container/mdspan/extent>) | retorna a extensão de um `mdspan` em um dado índice de rank
(função membro pública)
[ size](<#/doc/container/mdspan/size>) | retorna o tamanho do espaço de índice multidimensional
(função membro pública)
[ empty](<#/doc/container/mdspan/empty>) | verifica se o tamanho do espaço de índice é zero
(função membro pública)
[ stride](<#/doc/container/mdspan/stride>) | obtém o stride ao longo da dimensão especificada
(função membro pública)
[ extents](<#/doc/container/mdspan/extents_mfun>) | obtém o objeto extents
(função membro pública)
[ data_handle](<#/doc/container/mdspan/data_handle>) | obtém o ponteiro para a sequência 1D subjacente
(função membro pública)
[ mapping](<#/doc/container/mdspan/mapping>) | obtém o objeto de mapeamento
(função membro pública)
[ accessor](<#/doc/container/mdspan/accessor>) | obtém o objeto de política de accessor
(função membro pública)
[ is_unique](<#/doc/container/mdspan/mapping_traits>) | determina se o mapeamento deste mdspan é único (cada combinação de índices mapeia para um elemento subjacente diferente)
(função membro pública)
[ is_exhaustive](<#/doc/container/mdspan/mapping_traits>) | determina se o mapeamento deste mdspan é exaustivo (cada elemento subjacente pode ser acessado com alguma combinação de índices)
(função membro pública)
[ is_strided](<#/doc/container/mdspan/mapping_traits>) | determina se o mapeamento deste mdspan é strided (em cada dimensão, incrementar um índice salta sobre o mesmo número de elementos subjacentes a cada vez)
(função membro pública)
[ is_always_unique](<#/doc/container/mdspan/mapping_traits>)[static] | determina se o mapeamento de layout deste mdspan é sempre único
(função membro estática pública)
[ is_always_exhaustive](<#/doc/container/mdspan/mapping_traits>)[static] | determina se o mapeamento de layout deste mdspan é sempre exaustivo
(função membro estática pública)
[ is_always_strided](<#/doc/container/mdspan/mapping_traits>)[static] | determina se o mapeamento de layout deste mdspan é sempre strided
(função membro estática pública)

### Funções não-membro

[ std::swap(std::mdspan)](<#/doc/container/mdspan/swap2>)(C++23) | especializa o algoritmo [std::swap](<#/doc/utility/swap>) para mdspan
(template de função)

##### Subviews

[ submdspan](<https://en.cppreference.com/mwiki/index.php?title=cpp/container/mdspan/submdspan&action=edit&redlink=1> "cpp/container/mdspan/submdspan \(page does not exist\)")(C++26) | retorna uma view de um subconjunto de um `mdspan` existente
(template de função)
[ submdspan_extents](<https://en.cppreference.com/mwiki/index.php?title=cpp/container/mdspan/submdspan_extents&action=edit&redlink=1> "cpp/container/mdspan/submdspan extents \(page does not exist\)")(C++26) | cria novas extents a partir das extents existentes e especificadores de slice
(template de função)

### Tipos e templates auxiliares

[ extents](<#/doc/container/mdspan/extents>)(C++23) | um descritor de um espaço de índice multidimensional de algum rank
(template de classe)
[ dextentsdims](<#/doc/container/mdspan/extents>)(C++23)(C++26) | template de alias de conveniência para um std::extents totalmente dinâmico
(template de alias)
[ default_accessor](<#/doc/container/mdspan/default_accessor>)(C++23) | um tipo para acesso indexado a elementos de `mdspan`
(template de classe)
[ aligned_accessor](<https://en.cppreference.com/mwiki/index.php?title=cpp/container/mdspan/aligned_accessor&action=edit&redlink=1> "cpp/container/mdspan/aligned accessor \(page does not exist\)")(C++26) | um tipo para acesso alinhado a elementos de `mdspan`
(template de classe)

##### Políticas de mapeamento de layout

[ layout_left](<#/doc/container/mdspan/layout_left>)(C++23) | política de mapeamento de layout de array multidimensional column-major; a extensão mais à esquerda tem stride `1`
(classe)
[ layout_right](<#/doc/container/mdspan/layout_right>)(C++23) | política de mapeamento de layout de array multidimensional row-major; a extensão mais à direita tem stride `1`
(classe)
[ layout_stride](<#/doc/container/mdspan/layout_stride>)(C++23) | uma política de mapeamento de layout com strides definidos pelo usuário
(classe)
[ layout_left_padded](<#/doc/container/mdspan/layout_left_padded>)(C++26) | política de mapeamento de layout column-major com stride de preenchimento que pode ser maior ou igual à extensão mais à esquerda
(template de classe)
[ layout_right_padded](<#/doc/container/mdspan/layout_right_padded>)(C++26) | política de mapeamento de layout row-major com stride de preenchimento que pode ser maior ou igual à extensão mais à direita
(template de classe)

##### Auxiliares de Subviews

[ full_extentfull_extent_t](<#/doc/container/mdspan/full_extent>)(C++26) | uma tag especificadora de slice que descreve o range completo de índices na extensão especificada.
(tag)
[ strided_slice](<#/doc/container/mdspan/strided_slice>)(C++26) | um especificador de slice que representa um conjunto de índices regularmente espaçados, conforme indicado por um offset, uma extensão e um stride
(template de classe)
[ submdspan_mapping_result](<#/doc/container/mdspan/submdspan_mapping_result>)(C++26) | um tipo de retorno das sobrecargas de `submdspan_mapping`
(template de classe)

### [Guias de dedução](<#/doc/container/mdspan/deduction_guides>)

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_mdspan`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | `std::mdspan`
[`__cpp_lib_submdspan`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | std::submdspan
[`202403L`](<#/>) | (C++26) | layouts preenchidos de `std::mdspan`
[`__cpp_lib_aligned_accessor`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | std::aligned_accessor

### Exemplo

Pode ser visualizado no [Compiler Explorer](<https://godbolt.org/z/6WqGonPTn>).

Run this code
```cpp
    #include <cstddef>
    #include <mdspan>
    #include <print>
    #include <vector>
    
    int main()
    {
        std::vector v{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12};
    
        // View data as contiguous memory representing 2 rows of 6 ints each
        auto ms2 = std::mdspan(v.data(), 2, 6);
        // View the same data as a 3D array 2 x 3 x 2
        auto ms3 = std::mdspan(v.data(), 2, 3, 2);
    
        // Write data using 2D view
        for (std::size_t i = 0; i != ms2.extent(0); i++)
            for (std::size_t j = 0; j != ms2.extent(1); j++)
                ms2[i, j] = i * 1000 + j;
    
        // Read back using 3D view
        for (std::size_t i = 0; i != ms3.extent(0); i++)
        {
            std::println("slice @ i = {}", i);
            for (std::size_t j = 0; j != ms3.extent(1); j++)
            {
                for (std::size_t k = 0; k != ms3.extent(2); k++)
                    std::print("{} ", ms3[i, j, k]);
                std::println("");
            }
        }
    }
```

Output:
```
    slice @ i = 0
    0 1
    2 3
    4 5
    slice @ i = 1
    1000 1001
    1002 1003
    1004 1005
```

### Veja também

[ span](<#/doc/container/span>)(C++20) | uma view não-proprietária sobre uma sequência contígua de objetos
(template de classe)
[ valarray](<#/doc/numeric/valarray>) | arrays numéricos, máscaras de array e slices de array
(template de classe)
\* [Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
\* [Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão.