# Biblioteca Ranges (desde C++20)

A biblioteca ranges é uma extensão e generalização das bibliotecas de algoritmos e iteradores que as torna mais poderosas ao torná-las composíveis e menos propensas a erros.

A biblioteca cria e manipula _views_ de range, objetos leves que representam indiretamente sequências iteráveis (_ranges_). Ranges são uma abstração sobre

  * `[`begin`, `end`)` – pares de iteradores, por exemplo, ranges criados por conversão implícita de containers. Todos os algoritmos que aceitam pares de iteradores agora têm sobrecargas que aceitam ranges (por exemplo, [`ranges::sort`](<#/doc/algorithm/ranges/sort>))
  * begin` + `[`​0​`, `size`)` – sequências contadas, por exemplo, range retornado por [`views::counted`](<#/doc/ranges/counted_view>)
  * `[`begin`, ` _predicate_`)` – sequências terminadas condicionalmente, por exemplo, range retornado por [`views::take_while`](<#/doc/ranges/take_while_view>)
  * `[`begin`, `..`)` – sequências ilimitadas, por exemplo, range retornado por [`views::iota`](<#/doc/ranges/iota_view>)

A biblioteca ranges inclui [algoritmos de range](<#/doc/algorithm/ranges>), que são aplicados a ranges de forma _eager_ (imediatamente), e [adaptadores de range](<#/doc/ranges>), que são aplicados a views de forma _lazy_ (sob demanda). Adaptadores podem ser compostos em pipelines, de modo que suas ações ocorram à medida que a view é iterada.

Definido no header `[<ranges>](<#/doc/header/ranges>)`

```cpp
namespace std {
namespace views = ranges::views;
}  // (desde C++20)
```

O alias de namespace `std::views` é fornecido como uma abreviação para `std::ranges::views`.

Definido no namespace `std::ranges`
---

##### Acesso a Range

Definido no header `[<ranges>](<#/doc/header/ranges>)`

```cpp
Definido no header `<iterator>`
 ranges::begin(C++20)
(objeto de ponto de customização)
 ranges::end(C++20)
(objeto de ponto de customização)
 ranges::cbegin(C++20)
(objeto de ponto de customização)
 ranges::cend(C++20)
(objeto de ponto de customização)
 ranges::rbegin(C++20)
(objeto de ponto de customização)
 ranges::rend(C++20)
(objeto de ponto de customização)
 ranges::crbegin(C++20)
(objeto de ponto de customização)
 ranges::crend(C++20)
(objeto de ponto de customização)
 ranges::size(C++20)
(objeto de ponto de customização)
 ranges::ssize(C++20)
(objeto de ponto de customização)
 ranges::empty(C++20)
(objeto de ponto de customização)
 ranges::data(C++20)
(objeto de ponto de customização)
 ranges::cdata(C++20)
(objeto de ponto de customização)
```

##### Primitivas de Range

Definido no header `[<ranges>](<#/doc/header/ranges>)`

```cpp
 ranges::iterator_tranges::const_iterator_tranges::sentinel_tranges::const_sentinel_t(C++20)(C++23)(C++20)(C++23)
(alias template)
 ranges::range_difference_tranges::range_size_tranges::range_value_t(C++20)(C++20)(C++20)
(alias template)
 ranges::range_reference_tranges::range_const_reference_tranges::range_rvalue_reference_tranges::range_common_reference_t(C++20)(C++23)(C++20)(C++20)
(alias template)
```

##### Tratamento de iteradores dangling

Definido no header `[<ranges>](<#/doc/header/ranges>)`

```cpp
 ranges::dangling(C++20)
(classe)
 ranges::borrowed_iterator_tranges::borrowed_subrange_t(C++20)
(alias template)
```

##### Outras utilidades

Definido no header `[<ranges>](<#/doc/header/ranges>)`

```cpp
 ranges::elements_of(C++23)
(modelo de classe)
```

##### Concepts de Range

Definido no header `[<ranges>](<#/doc/header/ranges>)`

```cpp
 ranges::range(C++20)
(concept)
 ranges::borrowed_range(C++20)
(concept)
 ranges::sized_range(C++20)
(concept)
 ranges::view(C++20)
(concept)
 ranges::input_range(C++20)
(concept)
 ranges::output_range(C++20)
(concept)
 ranges::forward_range(C++20)
(concept)
 ranges::bidirectional_range(C++20)
(concept)
 ranges::random_access_range(C++20)
(concept)
 ranges::contiguous_range(C++20)
(concept)
 ranges::common_range(C++20)
(concept)
 ranges::viewable_range(C++20)
(concept)
 ranges::constant_range(C++23)
(concept)
```

##### Conversões de Range

Definido no header `[<ranges>](<#/doc/header/ranges>)`

```cpp
 ranges::to(C++23)
(modelo de função)
```

##### Views

Definido no header `[<ranges>](<#/doc/header/ranges>)`

```cpp
 ranges::view_interface(C++20)
(modelo de classe)
 ranges::subrange(C++20)
(modelo de classe)
```

### Fábricas de Range

Definido no header `[<ranges>](<#/doc/header/ranges>)`
---
Definido no namespace `std::ranges`

```cpp
 ranges::empty_viewviews::empty(C++20)
(modelo de classe) (modelo de variável)
 ranges::single_viewviews::single(C++20)
(modelo de classe) (objeto de ponto de customização)
 ranges::iota_viewviews::iota(C++20)
(modelo de classe) (objeto de ponto de customização)
 ranges::repeat_viewviews::repeat(C++23)
(modelo de classe) (objeto de ponto de customização)
 ranges::basic_istream_viewviews::istream(C++20)
(modelo de classe) (objeto de ponto de customização)
```

### Adaptadores de Range

Definido no header `[<ranges>](<#/doc/header/ranges>)`
---
Definido no namespace `std::ranges`

```cpp
 ranges::range_adaptor_closure(C++23)
(modelo de classe)
 views::all_tviews::all(C++20)
(alias template) (objeto adaptador de range)
 ranges::ref_view(C++20)
(modelo de classe)
 ranges::owning_view(C++20)
(modelo de classe)
 ranges::as_rvalue_viewviews::as_rvalue(C++23)
(modelo de classe) (objeto adaptador de range)
 ranges::filter_viewviews::filter(C++20)
(modelo de classe) (objeto adaptador de range)
 ranges::transform_viewviews::transform(C++20)
(modelo de classe) (objeto adaptador de range)
 ranges::take_viewviews::take(C++20)
(modelo de classe) (objeto adaptador de range)
 ranges::take_while_viewviews::take_while(C++20)
(modelo de classe) (objeto adaptador de range)
 ranges::drop_viewviews::drop(C++20)
(modelo de classe) (objeto adaptador de range)
 ranges::drop_while_viewviews::drop_while(C++20)
(modelo de classe) (objeto adaptador de range)
 ranges::join_viewviews::join(C++20)
(modelo de classe) (objeto adaptador de range)
 ranges::join_with_viewviews::join_with(C++23)
(modelo de classe) (objeto adaptador de range)
 ranges::lazy_split_viewviews::lazy_split(C++20)
(modelo de classe) (objeto adaptador de range)
 ranges::split_viewviews::split(C++20)
(modelo de classe) (objeto adaptador de range)
 ranges::concat_viewviews::concat(C++26)
(modelo de classe) (objeto de ponto de customização)
 views::counted(C++20)
(objeto de ponto de customização)
 ranges::common_viewviews::common(C++20)
(modelo de classe) (objeto adaptador de range)
 ranges::reverse_viewviews::reverse(C++20)
(modelo de classe) (objeto adaptador de range)
 ranges::as_const_viewviews::as_const(C++23)
(modelo de classe) (objeto adaptador de range)
 ranges::elements_viewviews::elements(C++20)
(modelo de classe) (objeto adaptador de range)
 ranges::keys_viewviews::keys(C++20)
(modelo de classe) (objeto adaptador de range)
 ranges::values_viewviews::values(C++20)
(modelo de classe) (objeto adaptador de range)
 ranges::enumerate_viewviews::enumerate(C++23)
(modelo de classe) (objeto adaptador de range)
 ranges::zip_viewviews::zip(C++23)
(modelo de classe) (objeto de ponto de customização)
 ranges::zip_transform_viewviews::zip_transform(C++23)
(modelo de classe) (objeto de ponto de customização)
 ranges::adjacent_viewviews::adjacent(C++23)
(modelo de classe) (objeto adaptador de range)
 ranges::adjacent_transform_viewviews::adjacent_transform(C++23)
(modelo de classe) (objeto adaptador de range)
 ranges::chunk_viewviews::chunk(C++23)
(modelo de classe) (objeto adaptador de range)
 ranges::slide_viewviews::slide(C++23)
(modelo de classe) (objeto adaptador de range)
 ranges::chunk_by_viewviews::chunk_by(C++23)
(modelo de classe) (objeto adaptador de range)
 ranges::stride_viewviews::stride(C++23)
(modelo de classe) (objeto adaptador de range)
 ranges::cartesian_product_viewviews::cartesian_product(C++23)
(modelo de classe) (objeto de ponto de customização)
 ranges::cache_latest_viewviews::cache_latest(C++26)
(modelo de classe) (objeto adaptador de range)
```

### Geradores de Range (desde C++23)

Definido no header `[<generator>](<#/doc/header/generator>)`
---
Definido no namespace `std`

```cpp
 generator(C++23)
(modelo de classe)
```

### Itens Auxiliares

#### Objetos adaptadores de Range

Veja [RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>) (RAO).

#### Objetos de fechamento de adaptador de Range

Veja [RangeAdaptorClosureObject](<#/doc/named_req/RangeAdaptorClosureObject>) (RACO).

#### Objetos de ponto de customização

Veja [Customization point object](<#/doc/ranges/cpo>) (CPO).

#### Wrapper atribuível

Alguns adaptadores de range envolvem seus elementos ou objetos de função com o [`_copyable-box_`](<#/doc/ranges/copyable_wrapper>)(até C++23)[`_movable-box_`](<#/doc/ranges/copyable_wrapper>)(desde C++23). O wrapper aumenta o objeto envolvido com capacidade de atribuição quando necessário.

#### Cache não propagador

Alguns adaptadores de range são especificados em termos de um modelo de classe [`_non-propagating-cache_`](<#/doc/ranges/non-propagating-cache>) apenas para exposição, que se comporta quase como [std::optional](<#/doc/utility/optional>)&lt;T&gt; (veja a descrição para as diferenças).

#### Tipo condicionalmente `const`

```cpp
template< bool Const, class T >
using /*maybe-const*/ = std::conditional_t<Const, const T, T>;  // (apenas para exposição*)
```

O alias template /*maybe-const*/ é uma abreviação usada para aplicar condicionalmente um qualificador const ao tipo `T`.

#### Modelos auxiliares de tipo inteiro-like

```cpp
template< /*is-integer-like*/ T >
using /*make-signed-like-t*/<T> = /* see description */;  // (1) (apenas para exposição*)
template< /*is-integer-like*/ T >
using /*make-unsigned-like-t*/<T> = /* see description */;  // (2) (apenas para exposição*)
template< /*is-integer-like*/ T >
/*make-unsigned-like-t*/<T> /*to-unsigned-like*/( T t )
{
return static_cast</*make-unsigned-like-t*/<T>>(t);
}  // (3) (apenas para exposição*)
```

1) Para um [tipo inteiro-like](<#/doc/iterator/is-integer-like>) `T`:

  * Se `T` é um tipo inteiro, /*make-signed-like-t*/&lt;T&gt; é [std::make_signed_t](<#/doc/types/make_signed>)&lt;T&gt;.
  * Caso contrário, /*make-signed-like-t*/&lt;T&gt; é um tipo inteiro-like assinado não especificado correspondente da mesma largura que `T`.

2) Para um tipo inteiro-like `T`:

  * Se `T` é um tipo inteiro, /*make-unsigned-like-t*/&lt;T&gt; é [std::make_unsigned_t](<#/doc/types/make_unsigned>)&lt;T&gt;.
  * Caso contrário, /*make-signed-like-t*/&lt;T&gt; é um tipo inteiro-like não assinado não especificado correspondente da mesma largura que `T`.

3) Converte explicitamente t para /*make-unsigned-like-t*/&lt;T&gt;.

#### Auxiliares de objeto de ponto de customização

```cpp
template< ranges::input_range R >
constexpr auto& /*possibly-const-range*/(R& r) noexcept
{
if constexpr (ranges::input_range<const R>)
return const_cast<const R&>(r);
else
return r;
}  // (1) (apenas para exposição*)
template< class T >
constexpr auto /*as-const-pointer*/( const T* p ) noexcept
{
return p;
}  // (2) (apenas para exposição*)
```

Alguns objetos de ponto de customização de acesso a range são especificados em termos desses modelos de função apenas para exposição.

1) /*possibly-const-range*/ retorna a versão qualificada como const de r se const R modela [`input_range`](<#/doc/ranges/input_range>); caso contrário, retorna r sem nenhuma conversão.

2) /*as-const-pointer*/ retorna um ponteiro para um objeto de tipo constante.

#### Auxiliares de adaptador de Range

```cpp
template< class F, class Tuple >
constexpr auto /*tuple-transform*/( F&& f, Tuple&& tuple )
{
return std::apply([&]<class... Ts>(Ts&&... args)
{
return std::tuple<std::invoke_result_t<F&, Ts>...>
(std::invoke(f, std::forward<Ts>(args))...);
}, std::forward<Tuple>(tuple));
}  // (1) (apenas para exposição*)
template< class F, class Tuple >
constexpr void /*tuple-for-each*/( F&& f, Tuple&& tuple )
{
std::apply([&]<class... Ts>(Ts&&... args)
{
(static_cast<void>(std::invoke(f, std::forward<Ts>(args))), ...);
}, std::forward<Tuple>(tuple));
}  // (2) (apenas para exposição*)
template< class T >
constexpr T& /*as-lvalue*/( T&& t )
{
return static_cast<T&>(t);
}  // (3) (apenas para exposição*)
```

Alguns adaptadores de range são especificados em termos desses modelos de função apenas para exposição.

1) /*tuple-transform*/ retorna uma nova tupla construída aplicando f a cada elemento da tupla.

2) /*tuple-for-each*/ aplica f a cada elemento da tupla e não retorna nada.

3) /*as-lvalue*/ encaminha o rvalue t como lvalue.

#### Concepts auxiliares

Os seguintes concepts apenas para exposição são usados para vários tipos, mas não fazem parte da interface da standard library.

```cpp
template< class R >
concept /*simple-view*/ =
ranges::view<R> && ranges::range<const R> &&
std::same_as<ranges::iterator_t<R>, ranges::iterator_t<const R>> &&
std::same_as<ranges::sentinel_t<R>, ranges::sentinel_t<const R>>;  // (1) (apenas para exposição*)
template< class I >
concept /*has-arrow*/ =
ranges::input_iterator<I> &&
(std::is_pointer_v<I> || requires(I i) { i.operator->(); });  // (2) (apenas para exposição*)
template< class T, class U >
concept /*different-from*/ =
!std::same_as<std::remove_cvref_t<T>, std::remove_cvref_t<U>>;  // (3) (apenas para exposição*)
template< class R >
concept /*range-with-movable-references*/ =
ranges::input_range<R> &&
std::move_constructible<ranges::range_reference_t<R>> &&
std::move_constructible<ranges::range_rvalue_reference_t<R>>;  // (4) (apenas para exposição*)
template< bool C, class... Views >
concept /*all-random-access*/ =
(ranges::random_access_range
<std::conditional_t<C, const Views, Views>> && ...);  // (5) (apenas para exposição*)
template< bool C, class... Views >
concept /*all-bidirectional*/ =
(ranges::bidirectional_range
<std::conditional_t<C, const Views, Views>> && ...);  // (6) (apenas para exposição*)
template< bool C, class... Views >
concept /*all-forward*/ =
(ranges::forward_range
<std::conditional_t<C, const Views, Views>> && ...);  // (7) (apenas para exposição*)
```

### Notas

Macro de teste de funcionalidade | Valor | Padrão | Funcionalidade
---|---|---|---
[`__cpp_lib_generator`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | [std::generator](<#/doc/coroutine/generator>) – gerador de coroutine síncrono para ranges
[`__cpp_lib_ranges`](<#/doc/feature_test>) | [`201911L`](<#/>) | (C++20) | Biblioteca Ranges e [algoritmos restritos](<#/doc/algorithm/ranges>)
[`202106L`](<#/>) | (C++23)
(DR20) | [Views](<#/doc/ranges/view>) não [default-initializable](<#/doc/concepts/default_initializable>)
[`202110L`](<#/>) | (C++23)
(DR20) | [Views](<#/doc/ranges/view>) com [propriedade](<#/doc/ranges/owning_view>)
[`202202L`](<#/>) | (C++23) | [ranges::range_adaptor_closure](<#/doc/ranges/range_adaptor_closure>)
[`202207L`](<#/>) | (C++23) | Flexibilizando [adaptadores de range](<#/doc/ranges>) para permitir tipos move-only
[`202211L`](<#/>) | (C++23) | Removendo sobrecargas "poison pills" [(P2602)](<https://wg21.link/p2602>) em [ranges::begin](<#/doc/ranges/begin>) etc
[`202302L`](<#/>) | (C++23) | Flexibilizando ranges para permitir certas projeções
[`202406L`](<#/>) | (C++26)
(DR20) | Removendo o requisito de referência comum dos concepts invocáveis indiretamente
[`__cpp_lib_ranges_as_const`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | [std::const_iterator](<#/doc/iterator/const_iterator>), [ranges::as_const_view](<#/doc/ranges/as_const_view>)
[`__cpp_lib_ranges_as_rvalue`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | [ranges::as_rvalue_view](<#/doc/ranges/as_rvalue_view>)
[`__cpp_lib_ranges_cache_latest`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | ranges::cache_latest_view
[`__cpp_lib_ranges_cartesian_product`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | [ranges::cartesian_product_view](<#/doc/ranges/cartesian_product_view>)
[`__cpp_lib_ranges_chunk`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | [ranges::chunk_view](<#/doc/ranges/chunk_view>)
[`__cpp_lib_ranges_chunk_by`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | [ranges::chunk_by_view](<#/doc/ranges/chunk_by_view>)
[`__cpp_lib_ranges_concat`](<#/doc/feature_test>) | [`202403L`](<#/>) | (C++26) | [ranges::concat_view](<#/doc/ranges/concat_view>)  
[`__cpp_lib_ranges_enumerate`](<#/doc/feature_test>) | [`202302L`](<#/>) | (C++23) | ranges::enumerate_view  
[`__cpp_lib_ranges_join_with`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | [ranges::join_with_view](<#/doc/ranges/join_with_view>)  
[`__cpp_lib_ranges_repeat`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | [ranges::repeat_view](<#/doc/ranges/repeat_view>)  
[`__cpp_lib_ranges_slide`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | [ranges::slide_view](<#/doc/ranges/slide_view>)  
[`__cpp_lib_ranges_stride`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | [ranges::stride_view](<#/doc/ranges/stride_view>)  
[`__cpp_lib_ranges_to_container`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | [ranges::to](<#/doc/ranges/to>)  
[`__cpp_lib_ranges_zip`](<#/doc/feature_test>) | [`202110L`](<#/>) | (C++23) | [ranges::zip_view](<#/doc/ranges/zip_view>),  
[ranges::zip_transform_view](<#/doc/ranges/zip_transform_view>),  
[ranges::adjacent_view](<#/doc/ranges/adjacent_view>),  
[ranges::adjacent_transform_view](<#/doc/ranges/adjacent_transform_view>)  
  
### Exemplo

Run this code
```
    #include <iostream>
    #include <ranges>
     
    int main()
    {
        auto const ints = {0, 1, 2, 3, 4, 5};
        auto even =  { return 0 == i % 2; };
        auto square =  { return i * i; };
     
        // a sintaxe "pipe" para compor as views:
        for (int i : ints | std::views::filter(even) | std::views::transform(square))
            std::cout << i << ' ';
     
        std::cout << '\n';
     
        // uma sintaxe de composição "funcional" tradicional:
        for (int i : std::views::transform(std::views::filter(ints, even), square))
            std::cout << i << ' ';
    }
```

Saída: 
```
    0 4 16
    0 4 16
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 3509](<https://cplusplus.github.io/LWG/issue3509>)  
([P2281R1](<https://wg21.link/P2281R1>))  | C++20  | não estava claro como os objetos adaptadores de range vinculavam argumentos finais  | eles são vinculados por valor   
[LWG 3948](<https://cplusplus.github.io/LWG/issue3948>) | C++23  | `_possibly-const-range_` e `_as-const-pointer_`  
não eram declarados noexcept | declarados noexcept  
[LWG 4027](<https://cplusplus.github.io/LWG/issue4027>) | C++23  | `_possibly-const-range_` não adicionaria qualificação const  
para ranges que já modelavam [`constant_range`](<#/doc/ranges/constant_range>) | adiciona qualificação const  
para tais ranges   
  
### Ver também

  * [Biblioteca de iteradores](<#/doc/iterator>)
  * [Algoritmos restritos](<#/doc/algorithm/ranges>)
