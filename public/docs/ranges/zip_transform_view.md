# std::ranges::views::zip_transform, std::ranges::zip_transform_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< std::move_constructible F, ranges::input_range... Views >
requires (ranges::view<Views> && ...) && (sizeof...(Views) > 0) &&
std::is_object_v<F> && std::regular_invocable<
F&, ranges::range_reference_t<Views>...> &&
/*can-reference*/<std::invoke_result_t<
F&, ranges::range_reference_t<Views>...>>
class zip_transform_view
: public ranges::view_interface<zip_transform_view<F, Views...>>
namespace views {
inline constexpr /*unspecified*/ zip_transform = /*unspecified*/;
}
Assinatura da chamada
template< class F, ranges::viewable_range... Rs >
requires /* veja abaixo */
constexpr auto zip_transform( F&& f, Rs&&... rs );
```

1) `zip_transform_view` é um adaptador de range que recebe um objeto invocável e uma ou mais [`view`s](<#/doc/ranges/view>), e produz uma [`view`](<#/doc/ranges/view>) cujo `_i_`-ésimo elemento é o resultado da aplicação do objeto invocável aos `_i_`-ésimos elementos de todas as views.
Um tipo `T` modela o conceito apenas para exposição /*can-reference*/ se e somente se `T&` for um tipo válido.

2) `views::zip_transform` é um objeto de ponto de customização.

Ao chamar com um argumento f, seja `FD` [std::decay_t](<#/doc/types/decay>)<decltype(f)>, se:

  * `FD` modela [`copy_constructible`](<#/doc/concepts/copy_constructible>),
  * FD& modela [`regular_invocable`](<#/doc/concepts/invocable>), e
  * [std::invoke_result_t](<#/doc/types/result_of>)<FD&> é um tipo de objeto,

então views::zip_transform(f) é [expression-equivalent](<#/doc/language/expressions>) a ((void)f, auto([views::empty](<#/doc/ranges/empty_view>)<[std::decay_t](<#/doc/types/decay>)<[std::invoke_result_t](<#/doc/types/result_of>)<FD&>>>)). Caso contrário, a chamada para `views::zip_transform` é malformada.

Ao chamar com mais de um argumento f e rs..., views::zip_transform(f, rs...) é [expression-equivalent](<#/doc/language/expressions>) a ranges::zip_transform_view(f, rs...).

`zip_transform_view` modela os concepts [`random_access_range`](<#/doc/ranges/random_access_range>), [`bidirectional_range`](<#/doc/ranges/bidirectional_range>), [`forward_range`](<#/doc/ranges/forward_range>), [`input_range`](<#/doc/ranges/input_range>), [`common_range`](<#/doc/ranges/common_range>), e [`sized_range`](<#/doc/ranges/sized_range>) quando o [ranges::zip_view](<#/doc/ranges/zip_view>)<Views...> subjacente modela os concepts respectivos.

### Objetos de Ponto de Customização

O nome `views::zip_transform` denota um _objeto de ponto de customização_, que é um [function object](<#/doc/named_req/FunctionObject>) const de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`semiregular`](<#/doc/concepts/semiregular>). Para fins de exposição, a versão cv-não qualificada de seu tipo é denotada como `___zip_transform_fn_`.

Todas as instâncias de `___zip_transform_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___zip_transform_fn_` nos mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser const-qualified ou não (no entanto, uma instância volatile-qualified não é exigida para ser invocável). Assim, `views::zip_transform` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atenderem aos requisitos para argumentos de `views::zip_transform` acima, `___zip_transform_fn_` modela

  * [std::invocable](<#/doc/concepts/invocable>)<__zip_transform_fn, Args...>,
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __zip_transform_fn, Args...&gt;,
  * [std::invocable](<#/doc/concepts/invocable>)<__zip_transform_fn&, Args...>, e
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __zip_transform_fn&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `___zip_transform_fn_` participa da resolução de sobrecarga.

### Funções Membro

[ (construtor)](<#/doc/ranges/zip_transform_view/zip_transform_view>) | constrói uma `zip_transform_view`
(função membro pública)
[ begin](<#/doc/ranges/zip_transform_view/begin>) | retorna um iterator para o início
(função membro pública)
[ end](<#/doc/ranges/zip_transform_view/end>) | retorna um iterator ou um sentinel para o fim
(função membro pública)
[ size](<#/doc/ranges/zip_transform_view/size>) | retorna o número de elementos. Fornecido apenas se cada range subjacente (adaptado) satisfizer [`sized_range`](<#/doc/ranges/sized_range>).
(função membro pública)

##### Herdado de [std::ranges::view_interface](<#/doc/ranges/view_interface>)

[ empty](<#/doc/ranges/view_interface/empty>) | retorna se a view derivada está vazia. Fornecido se ela satisfizer [`sized_range`](<#/doc/ranges/sized_range>) ou [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ cbegin](<#/doc/ranges/view_interface/cbegin>)(C++23) | retorna um iterator constante para o início do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ cend](<#/doc/ranges/view_interface/cend>)(C++23) | retorna um sentinel para o iterator constante do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ operator bool](<#/doc/ranges/view_interface/operator_bool>) | retorna se a view derivada não está vazia. Fornecido se [ranges::empty](<#/doc/ranges/empty>) for aplicável a ela.
(função membro pública de `std::ranges::view_interface<D>`)
[ front](<#/doc/ranges/view_interface/front>) | retorna o primeiro elemento na view derivada. Fornecido se ela satisfizer [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ back](<#/doc/ranges/view_interface/back>) | retorna o último elemento na view derivada. Fornecido se ela satisfizer [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) e [`common_range`](<#/doc/ranges/common_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ operator[]](<#/doc/ranges/view_interface/operator_at>) | retorna o `n`-ésimo elemento na view derivada. Fornecido se ela satisfizer [`random_access_range`](<#/doc/ranges/random_access_range>).
(função membro pública de `std::ranges::view_interface<D>`)

### [Guias de Dedução](<#/doc/ranges/zip_transform_view/deduction_guides>)

### Tipos Membro

Tipo Membro | Definição
---|---
`_InnerView_` (privado) | [ranges::zip_view](<#/doc/ranges/zip_view>)<Views...>.
(tipo membro apenas para exposição*)
`_ziperator_` (privado) |

  * [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;const InnerView&gt; se Const for true, caso contrário
  * [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;InnerView&gt;.
(tipo membro apenas para exposição*)

`_zentinel_` (privado) |

  * [ranges::sentinel_t](<#/doc/ranges/iterator_t>)&lt;const InnerView&gt; se Const for true, caso contrário
  * [ranges::sentinel_t](<#/doc/ranges/iterator_t>)&lt;InnerView&gt;.
(tipo membro apenas para exposição*)

### Membros de Dados

Objeto Membro | Definição
---|---
`_zip__` (privado) | Um objeto view subjacente do tipo `_InnerView_`
(objeto membro apenas para exposição*)
`_fun__` (privado) | Um objeto invocável encapsulado do tipo [`_movable-box_`](<#/doc/ranges/copyable_wrapper>)`<F>`
(objeto membro apenas para exposição*)

### Classes Aninhadas

[_iterator_](<#/doc/ranges/zip_transform_view/iterator>) | o tipo iterator
(template de classe membro apenas para exposição*)
[_sentinel_](<#/doc/ranges/zip_transform_view/sentinel>) | o tipo sentinel usado quando a `zip_view` subjacente não é um [`common_range`](<#/doc/ranges/common_range>)
(template de classe membro apenas para exposição*)

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_ranges_zip`](<#/doc/feature_test>) | [`202110L`](<#/>) | (desde C++23) | [ranges::zip_view](<#/doc/ranges/zip_view>),
`std::ranges::zip_transform_view`,
[ranges::adjacent_view](<#/doc/ranges/adjacent_view>),
[ranges::adjacent_transform_view](<#/doc/ranges/adjacent_transform_view>)

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <iostream>
    #include <list>
    #include <ranges>
    #include <vector>
     
    void print(auto const rem, auto const& r)
    {
        std::cout << rem << '{'; 
        for (char o[]{0,' ',0}; auto const& e : r)
            std::cout << o << e, *o = ',';
        std::cout << "}\n";
    }
     
    int main()
    {
        auto v1 = std::vector<float>{1, 2, 3};
        auto v2 = std::list<short>{1, 2, 3, 4};
        auto v3 = std::to_array({1, 2, 3, 4, 5});
     
        auto add =  { return a + b + c; };
     
        auto sum = std::views::zip_transform(add, v1, v2, v3);
     
        print("v1:  ", v1);
        print("v2:  ", v2);
        print("v3:  ", v3);
        print("sum: ", sum);
    }
```

Saída:
```
    v1:  {1, 2, 3}
    v2:  {1, 2, 3, 4}
    v3:  {1, 2, 3, 4, 5}
    sum: {3, 6, 9}
```

### Veja também

[ ranges::zip_viewviews::zip](<#/doc/ranges/zip_view>)(desde C++23) | uma [`view`](<#/doc/ranges/view>) que consiste em tuplas de referências a elementos correspondentes das views adaptadas
(template de classe) (objeto de ponto de customização)
[ ranges::transform_viewviews::transform](<#/doc/ranges/transform_view>)(desde C++20) | uma [`view`](<#/doc/ranges/view>) de uma sequência que aplica uma função de transformação a cada elemento
(template de classe) (objeto adaptador de range)
[ ranges::elements_viewviews::elements](<#/doc/ranges/elements_view>)(desde C++20) | recebe uma [`view`](<#/doc/ranges/view>) que consiste em valores [`_tuple-like_`](<#/doc/utility/tuple/tuple-like>) e um número N e produz uma [`view`](<#/doc/ranges/view>) do N-ésimo elemento de cada tupla
(template de classe) (objeto adaptador de range)