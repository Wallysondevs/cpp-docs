# Wrapper atribuível (C++20)

```cpp
template< class T >
requires std::copy_constructible<T> && std::is_object_v<T>
class /*copyable-box*/;  // (desde C++20)
(até C++23)
(apenas para exposição*)
template< class T >
requires std::move_constructible<T> && std::is_object_v<T>
class /*movable-box*/;  // (desde C++23)
(apenas para exposição*)
```

  
[`ranges::single_view`](<#/doc/ranges/single_view>), [`ranges::repeat_view`](<#/doc/ranges/repeat_view>),(desde C++23) e adaptadores de range que armazenam um objeto invocável são especificados em termos de um template de classe apenas para exposição `_copyable-box_`(até C++23)`_movable-box_`(desde C++23). O nome mostrado aqui é apenas para fins de exposição. 

O wrapper se comporta exatamente como [std::optional](<#/doc/utility/optional>)&lt;T&gt;, exceto que o construtor padrão, o operador de atribuição de cópia e o operador de atribuição de movimento são (condicionalmente) diferentes daqueles de [std::optional](<#/doc/utility/optional>), o que aumenta `T` com atribuibilidade quando necessário e o faz sempre satisfazer [`copyable`](<#/doc/concepts/copyable>) ou [`movable`](<#/doc/concepts/movable>)(desde C++23). 

Se `T` já é [`copyable`](<#/doc/concepts/copyable>), ou ambos [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;T&gt; e [std::is_nothrow_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;T&gt; são verdadeiros, /*copyable-box*/&lt;T&gt; pode armazenar apenas um objeto `T`, porque ele sempre contém um valor.  | (até C++23)  
Se `T`

  * já é [`copyable`](<#/doc/concepts/copyable>), ou 
  * é [`copy_constructible`](<#/doc/concepts/copy_constructible>) e ambos [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;T&gt; e [std::is_nothrow_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;T&gt; são verdadeiros, ou 
  * não satisfaz [`copy_constructible`](<#/doc/concepts/copy_constructible>) mas satisfaz [`movable`](<#/doc/concepts/movable>), ou 
  * não satisfaz [`copy_constructible`](<#/doc/concepts/copy_constructible>) mas [std::is_nothrow_move_constructible_v](<#/>)&lt;T&gt; é verdadeiro, 

/*movable-box*/&lt;T&gt; pode armazenar apenas um objeto `T`, porque ele sempre contém um valor.  | (desde C++23)  
  
### Parâmetros de template

T  |  \-  |  o tipo do valor contido, deve ser um tipo de objeto que modela [`copy_constructible`](<#/doc/concepts/copy_constructible>)(até C++23)[`move_constructible`](<#/doc/concepts/move_constructible>)(desde C++23)  
  
### Funções membro

## Construtor padrão

```cpp
constexpr /*copyable-box*/() noexcept(std::is_nothrow_default_constructible_v<T>)
requires std::default_initializable<T>
: /*copyable-box*/(std::in_place) { }  // (desde C++20)
(até C++23)
constexpr /*movable-box*/() noexcept(std::is_nothrow_default_constructible_v<T>)
requires std::default_initializable<T>
: /*movable-box*/(std::in_place) { }  // (desde C++23)
```

  
O construtor padrão é fornecido se e somente se `T` modela [`default_initializable`](<#/doc/concepts/default_initializable>). 

Um wrapper construído por padrão contém um objeto `T` inicializado por valor. 

## Operadores de atribuição

```cpp
  // (1)
constexpr /*copyable-box*/& operator=(const /*copyable-box*/& other);
noexcept(/* see below */);  // (desde C++20)
(até C++23)
constexpr /*movable-box*/& operator=(const /*movable-box*/& other);
noexcept(/* see below */) requires std::copy_constructible<T>;  // (desde C++23)
  // (2)
constexpr /*copyable-box*/& operator=(/*copyable-box*/&& other)
noexcept(std::is_nothrow_move_constructible_v<T>);  // (desde C++20)
(até C++23)
constexpr /*movable-box*/& operator=(/*movable-box*/&& other)
noexcept(std::is_nothrow_move_constructible_v<T>);  // (desde C++23)
```

  
1) Se [std::copyable](<#/doc/concepts/copyable>)&lt;T&gt; não é modelado, o operador de atribuição de cópia é equivalentemente definido como:  constexpr /*copyable-box*/& operator=(const /*copyable-box*/& other)  
noexcept([std::is_nothrow_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;T&gt;)  
{  
if (this != [std::addressof](<#/doc/memory/addressof>)(other))  
if (other)  
emplace(*other);  
else  
reset();  
  
```cpp
return *this;
}  // (até C++23)
constexpr /*movable-box*/& operator=(const /*movable-box*/& other)
noexcept(std::is_nothrow_copy_constructible_v<T>)
requires std::copy_constructible<T>
{
if (this != std::addressof(other))
if (other)
emplace(*other);
else
reset();
```
  
return *this;  
} | (desde C++23)  
Caso contrário, é idêntico ao [operador de atribuição de cópia de `std::optional`](<#/>).

2) Se [std::movable](<#/doc/concepts/movable>)&lt;T&gt; não é modelado, o operador de atribuição de movimento é equivalentemente definido como:  constexpr /*copyable-box*/& operator=(/*copyable-box*/&& other)  
noexcept([std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;T&gt;)  
{  
if (this != [std::addressof](<#/doc/memory/addressof>)(other))  
if (other)  
emplace(std::move(*other));  
else  
reset();  
  
```cpp
return *this;
}  // (até C++23)
constexpr /*movable-box*/& operator=(/*movable-box*/&& other)
noexcept(std::is_nothrow_move_constructible_v<T>)
{
if (this != std::addressof(other))
if (other)
emplace(std::move(*other));
else
reset();
```
  
return *this;  
} | (desde C++23)  
Caso contrário, é idêntico ao [operador de atribuição de movimento de `std::optional`](<#/>).

## Membros idênticos a std::optional 

### Funções membro

[ (construtor)](<#/doc/utility/optional/optional>) |  constrói o objeto `optional`   
(função membro pública de `std::optional<T>`)  
[ (destrutor)](<#/doc/utility/optional/~optional>) |  destrói o valor contido, se houver um   
(função membro pública de `std::optional<T>`)  
[ operator=](<#/>) |  atribui conteúdo   
(função membro pública de `std::optional<T>`)  
  
##### Observadores   
  
[ operator->operator*](<#/doc/utility/optional/operator_star_>) |  acessa o valor contido   
(função membro pública de `std::optional<T>`)  
[ operator boolhas_value](<#/doc/utility/optional/operator_bool>) |  verifica se o objeto contém um valor   
(função membro pública de `std::optional<T>`)  
  
##### Modificadores   
  
[ reset](<#/doc/utility/optional/reset>) |  destrói qualquer valor contido   
(função membro pública de `std::optional<T>`)  
[ emplace](<#/doc/utility/optional/emplace>) |  constrói o valor contido no local   
(função membro pública de `std::optional<T>`)  
  
### Notas

Um `_copyable-box_`(até C++23)`_movable-box_`(desde C++23) não contém um valor somente se 

  * `T` não modela [`movable`](<#/doc/concepts/movable>) ou [`copyable`](<#/doc/concepts/copyable>), e uma exceção é lançada na atribuição de movimento ou atribuição de cópia, respectivamente, ou 
  * ele é inicializado/atribuído a partir de outro wrapper sem valor. 

Antes de [P2325R3](<https://wg21.link/P2325R3>), o wrapper era chamado `_semiregular-box_` no padrão e sempre satisfazia [`semiregular`](<#/doc/concepts/semiregular>), pois o construtor padrão era sempre fornecido (o que poderia construir um wrapper sem valor). 

Macro de teste de recurso  | Valor | Padrão | Recurso   
[`__cpp_lib_ranges`](<#/doc/feature_test>) | [`201911L`](<#/>) | (C++20) | [Biblioteca Ranges](<#/doc/ranges>) e [algoritmos restritos](<#/doc/algorithm/ranges>)  
[`202106L`](<#/>) | (C++20)  
(DR) | Views não [default-initializable](<#/doc/concepts/default_initializable>)  
[`202207L`](<#/>) | (C++23) | Flexibilizando [adaptadores de range](<#/doc/ranges>) para permitir tipos apenas de movimento   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[P2325R3](<https://wg21.link/P2325R3>) | C++20  | se `T` não é [`default_initializable`](<#/doc/concepts/default_initializable>), o construtor padrão constrói um wrapper que não contém um valor  | o wrapper também não é [`default_initializable`](<#/doc/concepts/default_initializable>)  
[LWG 3572](<https://cplusplus.github.io/LWG/issue3572>) | C++20  | operadores de atribuição condicionalmente diferentes não eram constexpr  | tornados constexpr   
  
### Veja também

[ ranges::single_viewviews::single](<#/doc/ranges/single_view>)(C++20) |  uma [`view`](<#/doc/ranges/view>) que contém um único elemento de um valor especificado  
(template de classe) (objeto de ponto de customização)  
[ ranges::repeat_viewviews::repeat](<#/doc/ranges/repeat_view>)(C++23) |  uma [`view`](<#/doc/ranges/view>) consistindo de uma sequência gerada pela produção repetida do mesmo valor  
(template de classe) (objeto de ponto de customização)  
[ ranges::filter_viewviews::filter](<#/doc/ranges/filter_view>)(C++20) |  uma [`view`](<#/doc/ranges/view>) que consiste nos elementos de um [`range`](<#/doc/ranges/range>) que satisfaz um predicado  
(template de classe) (objeto adaptador de range)  
[ ranges::transform_viewviews::transform](<#/doc/ranges/transform_view>)(C++20) |  uma [`view`](<#/doc/ranges/view>) de uma sequência que aplica uma função de transformação a cada elemento  
(template de classe) (objeto adaptador de range)  
[ ranges::take_while_viewviews::take_while](<#/doc/ranges/take_while_view>)(C++20) |  uma [`view`](<#/doc/ranges/view>) consistindo dos elementos iniciais de outra [`view`](<#/doc/ranges/view>), até o primeiro elemento no qual um predicado retorna falso  
(template de classe) (objeto adaptador de range)  
[ ranges::drop_while_viewviews::drop_while](<#/doc/ranges/drop_while_view>)(C++20) |  uma [`view`](<#/doc/ranges/view>) consistindo dos elementos de outra [`view`](<#/doc/ranges/view>), pulando a subsequência inicial de elementos até o primeiro elemento onde o predicado retorna falso  
(template de classe) (objeto adaptador de range)  
[ ranges::zip_transform_viewviews::zip_transform](<#/doc/ranges/zip_transform_view>)(C++23) |  uma [`view`](<#/doc/ranges/view>) consistindo dos resultados da aplicação de uma função de transformação aos elementos correspondentes das views adaptadas  
(template de classe) (objeto de ponto de customização)  
[ ranges::adjacent_transform_viewviews::adjacent_transform](<#/doc/ranges/adjacent_transform_view>)(C++23) |  uma [`view`](<#/doc/ranges/view>) consistindo dos resultados da aplicação de uma função de transformação aos elementos adjacentes da view adaptada  
(template de classe) (objeto adaptador de range)