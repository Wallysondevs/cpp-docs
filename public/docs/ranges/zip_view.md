# std::ranges::views::zip, std::ranges::zip_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< ranges::input_range... Views >
requires (ranges::view<Views> && ...) && (sizeof...(Views) > 0)
class zip_view
: public ranges::view_interface<zip_view<Views...>>
namespace views {
inline constexpr /*unspecified*/ zip = /*unspecified*/;
}
Assinatura da chamada
template< ranges::viewable_range... Rs >
requires /* see below */
constexpr ranges::view auto zip( Rs&&... rs );
```

1) `zip_view` é um adaptador de range que recebe um ou mais [`view`s](<#/doc/ranges/view>), e produz um [`view`](<#/doc/ranges/view>) cujo _i_-ésimo elemento é um valor tipo-tupla consistindo dos _i_-ésimos elementos de todos os views. O tamanho do view produzido é o mínimo dos tamanhos de todos os views adaptados.

2) `views::zip` é um objeto de ponto de customização.

Ao chamar sem argumentos, views::zip() é [expression-equivalent](<#/doc/language/expressions>) a auto([views::empty](<#/doc/ranges/empty_view>)<[std::tuple](<#/doc/utility/tuple>)<>>).

Caso contrário, views::zip(rs...) é _expression-equivalent_ a ranges::zip_view<[views::all_t](<#/doc/ranges/all_view>)<decltype((rs))>...>(rs...).

`zip_view` sempre modela [`input_range`](<#/doc/ranges/input_range>), e modela [`forward_range`](<#/doc/ranges/forward_range>), [`bidirectional_range`](<#/doc/ranges/bidirectional_range>), [`random_access_range`](<#/doc/ranges/random_access_range>), ou [`sized_range`](<#/doc/ranges/sized_range>) se todos os tipos de [`view`](<#/doc/ranges/view>) adaptados modelam o concept correspondente.

`zip_view` modela [`common_range`](<#/doc/ranges/common_range>) se

* sizeof...(Views) é igual a 1, e o único tipo de view adaptado modela [`common_range`](<#/doc/ranges/common_range>), ou
* pelo menos um tipo de view adaptado não modela [`bidirectional_range`](<#/doc/ranges/bidirectional_range>), e todo tipo de view adaptado modela [`common_range`](<#/doc/ranges/common_range>), ou
* todo tipo de view adaptado modela tanto [`random_access_range`](<#/doc/ranges/random_access_range>) quanto [`sized_range`](<#/doc/ranges/sized_range>).

### Objetos de Ponto de Customização

O nome `views::zip` denota um _objeto de ponto de customização_, que é um [function object](<#/doc/named_req/FunctionObject>) `const` de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [semiregular](<#/doc/concepts/semiregular>). Para fins de exposição, a versão cv-unqualified de seu tipo é denotada como `___zip_fn_`.

Todas as instâncias de `___zip_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___zip_fn_` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser const-qualified ou não (no entanto, uma instância volatile-qualified não é exigida para ser invocável). Assim, `views::zip` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atendem aos requisitos para argumentos de `views::zip` acima, `___zip_fn_` modela

* [std::invocable](<#/doc/concepts/invocable>)<__zip_fn, Args...>,
* [std::invocable](<#/doc/concepts/invocable>)&lt;const __zip_fn, Args...&gt;,
* [std::invocable](<#/doc/concepts/invocable>)<__zip_fn&, Args...>, e
* [std::invocable](<#/doc/concepts/invocable>)&lt;const __zip_fn&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `___zip_fn_` participa da resolução de sobrecarga.

### Membros de Dados

Membro | Descrição
---|---
[std::tuple](<#/doc/utility/tuple>)<Views...> `_views__` | todos os objetos de view adaptados
(objeto membro apenas para exposição*)

### Funções Membro

[ (construtor)](<#/doc/ranges/zip_view/zip_view>) | constrói um `zip_view`
(função membro pública)
[ begin](<#/doc/ranges/zip_view/begin>) | retorna um iterator para o início
(função membro pública)
[ end](<#/doc/ranges/zip_view/end>) | retorna um iterator ou um sentinel para o fim
(função membro pública)
[ size](<#/doc/ranges/zip_view/size>) | retorna o número de elementos. Fornecido apenas se cada range subjacente (adaptado) satisfaz [`sized_range`](<#/doc/ranges/sized_range>).
(função membro pública)

##### Herdado de [std::ranges::view_interface](<#/doc/ranges/view_interface>)

[ empty](<#/doc/ranges/view_interface/empty>) | retorna se o view derivado está vazio. Fornecido se ele satisfaz [`sized_range`](<#/doc/ranges/sized_range>) ou [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ cbegin](<#/doc/ranges/view_interface/cbegin>)(C++23) | retorna um iterator constante para o início do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ cend](<#/doc/ranges/view_interface/cend>)(C++23) | retorna um sentinel para o iterator constante do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ operator bool](<#/doc/ranges/view_interface/operator_bool>) | retorna se o view derivado não está vazio. Fornecido se [ranges::empty](<#/doc/ranges/empty>) é aplicável a ele.
(função membro pública de `std::ranges::view_interface<D>`)
[ front](<#/doc/ranges/view_interface/front>) | retorna o primeiro elemento no view derivado. Fornecido se ele satisfaz [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ back](<#/doc/ranges/view_interface/back>) | retorna o último elemento no view derivado. Fornecido se ele satisfaz [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) e [`common_range`](<#/doc/ranges/common_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ operator[]](<#/doc/ranges/view_interface/operator_at>) | retorna o `n`-ésimo elemento no view derivado. Fornecido se ele satisfaz [`random_access_range`](<#/doc/ranges/random_access_range>).
(função membro pública de `std::ranges::view_interface<D>`)

### [Guias de Dedução](<#/doc/ranges/zip_view/deduction_guides>)

### Classes Aninhadas

[_iterator_](<#/doc/ranges/zip_view/iterator>) | o tipo do iterator
(template de classe membro apenas para exposição*)
[_sentinel_](<#/doc/ranges/zip_view/sentinel>) | o tipo do sentinel usado quando `zip_view` não é um [`common_range`](<#/doc/ranges/common_range>)
(template de classe membro apenas para exposição*)

### Templates Auxiliares

```cpp
template< class... Views >
constexpr bool enable_borrowed_range<ranges::zip_view<Views...>> =
(ranges::enable_borrowed_range<Views> && ...);  // (desde C++23)
```

Esta especialização de [`ranges::enable_borrowed_range`](<#/doc/ranges/borrowed_range>) faz com que [`zip_view`](<#/doc/ranges/zip_view>) satisfaça [`borrowed_range`](<#/doc/ranges/borrowed_range>) quando cada view subjacente o satisfaz.

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_ranges_zip`](<#/doc/feature_test>) | [`202110L`](<#/>) | (C++23) | `ranges::zip_view`,
[ranges::zip_transform_view](<#/doc/ranges/zip_transform_view>),
[ranges::adjacent_view](<#/doc/ranges/adjacent_view>),
[ranges::adjacent_transform_view](<#/doc/ranges/adjacent_transform_view>)

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <iostream>
    #include <list>
    #include <ranges>
    #include <string>
    #include <tuple>
    #include <vector>
    
    void print(auto const rem, auto const& range)
    {
        for (std::cout << rem; auto const& elem : range)
            std::cout << elem << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        auto x = std::vector{1, 2, 3, 4};
        auto y = std::list<std::string>{"α", "β", "γ", "δ", "ε"};
        auto z = std::array{'A', 'B', 'C', 'D', 'E', 'F'};
    
        print("Source views:", "");
        print("x: ", x);
        print("y: ", y);
        print("z: ", z);
    
        print("\nzip(x,y,z):", "");
    
        for (std::tuple<int&, std::string&, char&> elem : std::views::zip(x, y, z))
        {
            std::cout << std::get<0>(elem) << ' '
                      << std::get<1>(elem) << ' '
                      << std::get<2>(elem) << '\n';
    
            std::get<char&>(elem) += ('a' - 'A'); // modifies the element of z
        }
    
        print("\nAfter modification, z: ", z);
    }
```

Saída:
```
    Source views:
    x: 1 2 3 4 
    y: α β γ δ ε 
    z: A B C D E F 
    
    zip(x,y,z):
    1 α A
    2 β B
    3 γ C
    4 δ D
    
    After modification, z: a b c d E F 
```

### Veja também

[ ranges::zip_transform_viewviews::zip_transform](<#/doc/ranges/zip_transform_view>)(C++23) | um [`view`](<#/doc/ranges/view>) consistindo dos resultados da aplicação de uma função de transformação aos elementos correspondentes dos views adaptados
(template de classe) (objeto de ponto de customização)
[ ranges::elements_viewviews::elements](<#/doc/ranges/elements_view>)(C++20) | recebe um [`view`](<#/doc/ranges/view>) consistindo de valores [`_tipo-tupla_`](<#/doc/utility/tuple/tuple-like>) e um número N e produz um [`view`](<#/doc/ranges/view>) do N-ésimo elemento de cada tupla
(template de classe) (objeto adaptador de range)