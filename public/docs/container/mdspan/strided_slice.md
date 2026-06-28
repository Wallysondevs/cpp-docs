# std::strided_slice

Definido no cabeçalho `[<mdspan>](<#/doc/header/mdspan>)`

```c
template< class OffsetType, class ExtentType, class StrideType >
struct strided_slice;
```

Uma instância de cada especialização de `strided_slice` é um especificador de fatia (slice specifier) usado em std::submdspan para selecionar um subconjunto de elementos usando um conjunto de índices regularmente espaçados em uma dimensão especificada em [`std::mdspan`](<#/doc/container/mdspan>).

Cada objeto `strided_slice` s é caracterizado por três membros de dados: o índice de deslocamento s.offset, a extensão s.extent e o passo s.stride.

Dado que s.stride é maior que zero, o número de índices selecionados denotado por N é determinado por 1 + (s.extent - 1) / s.stride se s.extent for diferente de zero, caso contrário ​0​. O intervalo semiaberto do qual os índices serão selecionados é dado por `[`s.offset`, `s.offset + s.extent`)`. A sequência de índices selecionados é produzida da seguinte forma: s.offset, ..., s.offset + (N - 1) * s.stride.

Este template de classe não possui classes base ou membros declarados além dos mostrados abaixo.

### Parâmetros de template

- **OffsetType** — o tipo de deslocamento
- **ExtentType** — o tipo de extensão
- **StrideType** — o tipo de passo
Requisitos de tipo
-Todos os parâmetros de template devem ser tipos inteiros sem sinal ou com sinal, ou devem satisfazer [`_integral-constant-like_`](<#/doc/header/span>)

O programa é malformado se o requisito de tipo não for satisfeito.

### Tipos de membros

Tipo de membro | Definição
---|---
`offset_type` | `OffsetType`
`extent_type` | `ExtentType`
`stride_type` | `StrideType`

### Membros de dados

Nome do membro | Definição
---|---
offset | um índice inicial do tipo `offset_type`
(objeto membro público)
extent | um valor do tipo `extent_type` adicionado ao offset usado para definir o limite superior dos índices
(objeto membro público)
stride | um valor de incremento do tipo `stride_type` que é equivalente à distância entre dois índices
(objeto membro público)

Todos esses membros são declarados com o atributo `[[[no_unique_address](<#/doc/language/attributes/no_unique_address>)]]` e possuem inicializadores de membro padrão onde cada membro de dados é inicializado por valor.

### Notas

Cada especialização de `strided_slice` é uma classe agregada que permite a [inicialização agregada](<#/doc/language/aggregate_initialization>) (incluindo inicialização designada) de membros de dados (por exemplo, std::strided_slice{.offset = 2, .extent = 10, .stride = 3}).

A especificação de fatia de `strided_slice` tira vantagem do membro de dados extent, em oposição a outras especificações de fatia que usam end para indicar o valor do limite superior. Isso ocorre porque ele pode gerar diretamente uma extensão estática para subviews de std::mdspan se tanto extent quanto stride forem de tipos que satisfazem [`_integral-constant-like_`](<#/doc/header/span>). Isso permite a extração eficiente de subviews com extensões estáticas misturando valores de tempo de compilação com um valor de tempo de execução de `offset`.

### Exemplo

Execute este código
```cpp
    #include <mdspan>
    #include <print>
    
    template <typename View, typename O = int, typename E = int, typename S = int>
        requires (View::extents_type::rank() == 1)
    void print_sliced_view(View v, std::strided_slice<O, E, S> s)
    {
        using index_type = View::index_type;
        auto subview = std::submdspan(v, s);
        const auto& submap = subview.mapping();
    
        std::print("[");
        bool uses_comma = false;
        for (index_type i = 0; i != subview.extent(0); ++i)
        {
            if (uses_comma)
                std::print(", ");
            std::print("{}", subview[i]);
            uses_comma = true;
        }
        uses_comma = false;
        std::print("] extracted from indices [");
        for (index_type i = 0; i != subview.extent(0); ++i)
        {
            if (uses_comma)
                std::print(", ");
            std::print("{}", submap(i) + s.offset);
            uses_comma = true;
        }
        std::println("]");
    }
    
    int main()
    {
        static constexpr char letters[]
        {
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
            'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
            'U', 'V', 'W', 'X', 'Y', 'Z'
        };
        constexpr std::mdspan md(letters, 26);
        print_sliced_view(md, {.offset = 0, .extent = 10, .stride = 1});
        print_sliced_view(md, {.offset = 2, .extent = 10, .stride = 1});
        print_sliced_view(md, {.offset = 0, .extent = 5,  .stride = 1});
        print_sliced_view(md, {.offset = 2, .extent = 5,  .stride = 1});
        print_sliced_view(md, {.offset = 0, .extent = 10, .stride = 2});
        print_sliced_view(md, {.offset = 2, .extent = 10, .stride = 3});
        print_sliced_view(md, {.offset = 0, .extent = 15, .stride = 5});
        print_sliced_view(md, {.offset = 6, .extent = 15, .stride = 5});
    }
```

Saída:
```
    [A, B, C, D, E, F, G, H, I, J] extracted from indices [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    [C, D, E, F, G, H, I, J, K, L] extracted from indices [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    [A, B, C, D, E] extracted from indices [0, 1, 2, 3, 4]
    [C, D, E, F, G] extracted from indices [2, 3, 4, 5, 6]
    [A, C, E, G, I] extracted from indices [0, 2, 4, 6, 8]
    [C, F, I, L] extracted from indices [2, 5, 8, 11]
    [A, F, K] extracted from indices [0, 5, 10]
    [G, L, Q] extracted from indices [6, 11, 16]
```

### Veja também

[ slice](<#/doc/numeric/valarray/slice>) | Fatia (slice) tipo BLAS de um valarray: índice inicial, comprimento, passo
(classe)
[ submdspan](<https://en.cppreference.com/mwiki/index.php?title=cpp/container/mdspan/submdspan&action=edit&redlink=1> "cpp/container/mdspan/submdspan \(page does not exist\)") (C++26) | retorna uma view de um subconjunto de um `mdspan` existente
(template de função)