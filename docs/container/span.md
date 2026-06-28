# std::span

Definido no cabeçalho `[<span>](<#/doc/header/span>)`

```c
template<
class T,
std::size_t Extent = std::dynamic_extent
> class span;
```

O template de classe `span` descreve um objeto que pode se referir a uma sequência contígua de objetos com o primeiro elemento da sequência na posição zero. Um `span` pode ter uma extensão _estática_, caso em que o número de elementos na sequência é conhecido em tempo de compilação e codificado no tipo, ou uma extensão _dinâmica_.

Para um `span` s, ponteiros, iteradores e referências a elementos de s são invalidados quando uma operação invalida um ponteiro no range `[`s.data()`, `s.data() + s.size()`).

Toda especialização de `std::span` é um tipo [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>). | (desde C++23)

Uma implementação típica mantém um ponteiro para `T`; se a extensão for dinâmica, a implementação também mantém um tamanho.

### Parâmetros de template

- **T** — tipo do elemento; deve ser um tipo de objeto completo que não seja um tipo de classe abstrata
- **Extent** — o número de elementos na sequência, ou `std::dynamic_extent` se dinâmico

### Tipos membro

Tipo membro | Definição
---|---
`element_type` | `T`
`value_type` | [std::remove_cv_t](<#/doc/types/remove_cv>)<T>
`size_type` | [std::size_t](<#/doc/types/size_t>)
`difference_type` | [std::ptrdiff_t](<#/doc/types/ptrdiff_t>)
`pointer` | T*
`const_pointer` | const T*
`reference` | T&
`const_reference` | const T&
`iterator` | LegacyRandomAccessIterator, ConstexprIterator e `contiguous_iterator` definidos pela implementação, cujo `value_type` é `value_type`
`const_iterator` (desde C++23) | [std::const_iterator](<#/doc/iterator/const_iterator>)<iterator>
`reverse_iterator` | [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)<iterator>
`const_reverse_iterator` (desde C++23) | [std::const_iterator](<#/doc/iterator/const_iterator>)<reverse_iterator>

Nota: `iterator` é um iterador mutável se `T` não for qualificado como const.

Todos os requisitos para os tipos de iteradores de um [Container](<#/doc/named_req/Container>) também se aplicam ao tipo `iterator` de `span`.

### Constante membro

Nome | Valor
---|---
constexpr [std::size_t](<#/doc/types/size_t>) extent[static] | Extent
(constante membro estática pública)

### Funções membro

[ (constructor)](<#/doc/container/span/span>) | constrói um `span`
(função membro pública)
[ operator=](<#/>) | atribui um `span`
(função membro pública)
(destructor)(declarado implicitamente) | destrói um `span`
(função membro pública)

##### Iteradores

[ begincbegin](<#/doc/container/span/begin>)(C++23) | retorna um iterador para o início
(função membro pública)
[ endcend](<#/doc/container/span/end>)(C++23) | retorna um iterador para o fim
(função membro pública)
[ rbegincrbegin](<#/doc/container/span/rbegin>)(C++23) | retorna um iterador reverso para o início
(função membro pública)
[ rendcrend](<#/doc/container/span/rend>)(C++23) | retorna um iterador reverso para o fim
(função membro pública)

##### Acesso a elementos

[ front](<#/doc/container/span/front>) | acessa o primeiro elemento
(função membro pública)
[ back](<#/doc/container/span/back>) | acessa o último elemento
(função membro pública)
[ at](<#/doc/container/span/at>)(C++26) | acessa o elemento especificado com verificação de limites
(função membro pública)
[ operator[]](<#/doc/container/span/operator_at>) | acessa o elemento especificado
(função membro pública)
[ data](<#/doc/container/span/data>) | acesso direto ao armazenamento contíguo subjacente
(função membro pública)

##### Observadores

[ size](<#/doc/container/span/size>) | retorna o número de elementos
(função membro pública)
[ size_bytes](<#/doc/container/span/size_bytes>) | retorna o tamanho da sequência em bytes
(função membro pública)
[ empty](<#/doc/container/span/empty>) | verifica se a sequência está vazia
(função membro pública)

##### Sub-visualizações

[ first](<#/doc/container/span/first>) | obtém um subspan consistindo dos primeiros `N` elementos da sequência
(função membro pública)
[ last](<#/doc/container/span/last>) | obtém um subspan consistindo dos últimos `N` elementos da sequência
(função membro pública)
[ subspan](<#/doc/container/span/subspan>) | obtém um subspan
(função membro pública)

### Funções não-membro

[ as_bytesas_writable_bytes](<#/doc/container/span/as_bytes>)(C++20) | converte um `span` em uma view de seus bytes subjacentes
(template de função)

### Constante não-membro

[ dynamic_extent](<#/doc/container/span/dynamic_extent>)(C++20) | uma constante do tipo [std::size_t](<#/doc/types/size_t>) que significa que o `span` tem extensão dinâmica
(constante)

### Templates auxiliares

```cpp
template< class T, std::size_t Extent >
constexpr bool ranges::enable_borrowed_range<std::span<T, Extent>> = true;  // (desde C++20)
```

Esta especialização de [ranges::enable_borrowed_range](<#/doc/ranges/borrowed_range>) faz com que `span` satisfaça [`borrowed_range`](<#/doc/ranges/borrowed_range>).

```cpp
template< class T, std::size_t Extent >
constexpr bool ranges::enable_view<std::span<T, Extent>> = true;  // (desde C++20)
```

Esta especialização de [ranges::enable_view](<#/doc/ranges/view>) faz com que `span` satisfaça [`view`](<#/doc/ranges/view>).

### [Guias de dedução](<#/doc/container/span/deduction_guides>)

### Notas

Especializações de `std::span` já são tipos trivially copyable em todas as implementações existentes, mesmo antes do requisito formal introduzido em C++23.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_span`](<#/doc/feature_test>) | [`202002L`](<#/>) | (C++20) | `std::span`
[`202311L`](<#/>) | (C++26) | std::span::at
[`__cpp_lib_span_initializer_list`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | Construindo `std::span` a partir de um [std::initializer_list](<#/doc/utility/initializer_list>)

### Exemplo

O exemplo usa `std::span` para implementar alguns algoritmos em ranges contíguos.

Run this code
```cpp
    #include <algorithm>
    #include <cstddef>
    #include <iostream>
    #include <span>
    
    template<class T, std::size_t N>
    [[nodiscard]]
    constexpr auto slide(std::span<T, N> s, std::size_t offset, std::size_t width)
    {
        return s.subspan(offset, offset + width <= s.size() ? width : 0U);
    }
    
    template<class T, std::size_t N, std::size_t M>
    constexpr bool starts_with(std::span<T, N> data, std::span<T, M> prefix)
    {
        return data.size() >= prefix.size()
            && std::equal(prefix.begin(), prefix.end(), data.begin());
    }
    
    template<class T, std::size_t N, std::size_t M>
    constexpr bool ends_with(std::span<T, N> data, std::span<T, M> suffix)
    {
        return data.size() >= suffix.size()
            && std::equal(data.end() - suffix.size(), data.end(),
                          suffix.end() - suffix.size());
    }
    
    template<class T, std::size_t N, std::size_t M>
    constexpr bool contains(std::span<T, N> span, std::span<T, M> sub)
    {
        return std::ranges::search(span, sub).begin() != span.end();
    }
    
    void println(const auto& seq)
    {
        for (const auto& elem : seq)
            std::cout << elem << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        constexpr int a[]{0, 1, 2, 3, 4, 5, 6, 7, 8};
        constexpr int b[]{8, 7, 6};
        constexpr static std::size_t width{6};
    
        for (std::size_t offset{}; ; ++offset)
            if (auto s = slide(std::span{a}, offset, width); !s.empty())
                println(s);
            else
                break;
    
        static_assert(""
            && starts_with(std::span{a}, std::span{a, 4})
            && starts_with(std::span{a + 1, 4}, std::span{a + 1, 3})
            && !starts_with(std::span{a}, std::span{b})
            && !starts_with(std::span{a, 8}, std::span{a + 1, 3})
            && ends_with(std::span{a}, std::span{a + 6, 3})
            && !ends_with(std::span{a}, std::span{a + 6, 2})
            && contains(std::span{a}, std::span{a + 1, 4})
            && !contains(std::span{a, 8}, std::span{a, 9})
        );
    }
```

Saída:
```
    0 1 2 3 4 5
    1 2 3 4 5 6
    2 3 4 5 6 7
    3 4 5 6 7 8
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3203](<https://cplusplus.github.io/LWG/issue3203>) | C++20 | não estava claro quando os ponteiros, iteradores e
referências a elementos de `span` são invalidados | esclarecido
[LWG 3903](<https://cplusplus.github.io/LWG/issue3903>) | C++20 | a declaração do destrutor de `span` era desnecessária | declaração removida
[P2325R3](<https://wg21.link/P2325R3>) | C++20 | um `span` com extensões estáticas não-zero não era uma `view` | qualquer `span` é uma `view`

### Ver também

[ mdspan](<#/doc/container/mdspan>)(C++23) | uma view de array multi-dimensional que não possui os dados
(template de classe)
[ ranges::subrange](<#/doc/ranges/subrange>)(C++20) | combina um par iterador-sentinela em uma [`view`](<#/doc/ranges/view>)
(template de classe)
[ initializer_list](<#/doc/utility/initializer_list>)(C++11) | referencia um array temporário criado em [list-initialization](<#/doc/language/list_initialization>)
(template de classe)
[ basic_string_view](<#/doc/string/basic_string_view>)(C++17) | view de string somente leitura
(template de classe)