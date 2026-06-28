# Cache não-propagante (C++20)

```cpp
template< class T >
requires std::is_object_v<T>
class /*non-propagating-cache*/;  // (desde C++20)
(apenas para exposição*)
```

  
Alguns adaptadores de range, como [`ranges::join_view`](<#/doc/ranges/join_view>) e [`ranges::lazy_split_view`](<#/doc/ranges/lazy_split_view>), armazenam condicionalmente um valor (por exemplo, um iterator) que é especificado em termos de um template de classe apenas para exposição `_non-propagating-cache_`. 

O wrapper se comporta exatamente como [std::optional](<#/doc/utility/optional>)&lt;T&gt;, exceto que: 

  * ele não copia o valor da origem quando é construído por cópia ou atribuído, 
  * ele reinicia o valor da origem quando é movido de, 
  * ele reinicia seu valor quando é atribuído de, e 
  * ele adicionalmente fornece um template de função membro para permitir que um input view armazene temporariamente valores em cache enquanto é iterado. 

O wrapper encapsula um cache contendo um valor. Limpar o cache é uma operação equivalente a reiniciar um valor contido. Tal operação é realizada ao copiar ou mover um wrapper. 

### Parâmetros de template

T  |  \-  |  o tipo do valor contido, deve ser um tipo de objeto   
  
### Funções membro

##  Construtores de cópia e movimento

```cpp
constexpr /*non-propagating-cache*/
( const /*non-propagating-cache*/& ) noexcept {}  // (1) (desde C++20)
constexpr /*non-propagating-cache*/
( /*non-propagating-cache*/&& other ) noexcept { other.reset(); }  // (2) (desde C++20)
```

  
1) O construtor de cópia não tem efeito.

2) O construtor de movimento limpa o cache de other.

##  Operadores de atribuição de cópia e movimento

```cpp
constexpr /*non-propagating-cache*/&
operator=( const /*non-propagating-cache*/& other ) noexcept
{
if (std::addressof(other) != this)
reset();
return *this;
}  // (1) (desde C++20)
constexpr /*non-propagating-cache*/&
operator=( /*non-propagating-cache*/&& other ) noexcept
{
reset();
other.reset();
return *this;
}  // (2) (desde C++20)
```

  
1) O operador de atribuição de cópia limpa o cache de *this.

2) O operador de atribuição de movimento limpa os caches de *this e other.

##  `_non-propagating-cache_ <T>::_emplace-deref_`

```cpp
template< class I >
constexpr T& /*emplace-deref*/( const I& i );  // (desde C++20)
(apenas para exposição*)
```

  
Inicializa o valor contido por [inicialização direta](<#/doc/language/direct_initialization>) (mas não inicialização direta por lista) com *i. Se *this já contiver um valor antes da chamada, reset() é chamado. 

Retorna uma referência para o novo valor contido. 

O programa é malformado a menos que a declaração T t(*i); seja bem-formada para alguma variável t inventada. Se *i for um prvalue de `T` possivelmente cv-qualificado, então não é necessário que seja movível. 

##  Membros idênticos a std::optional 

###  Funções membro

[ (construtor)](<#/doc/utility/optional/optional>) |  constrói o objeto `optional`   
(função membro pública de `std::optional<T>`)  
[ (destrutor)](<#/doc/utility/optional/~optional>) |  destrói o valor contido, se houver um   
(função membro pública de `std::optional<T>`)  
[ operator=](<#/>) |  atribui conteúdo   
(função membro pública de `std::optional<T>`)  
  
#####  Observadores   
  
[ operator->operator*](<#/doc/utility/optional/operator_star_>) |  acessa o valor contido   
(função membro pública de `std::optional<T>`)  
[ operator boolhas_value](<#/doc/utility/optional/operator_bool>) |  verifica se o objeto contém um valor   
(função membro pública de `std::optional<T>`)  
  
#####  Modificadores   
  
[ reset](<#/doc/utility/optional/reset>) |  destrói qualquer valor contido   
(função membro pública de `std::optional<T>`)  
[ emplace](<#/doc/utility/optional/emplace>) |  constrói o valor contido no local   
(função membro pública de `std::optional<T>`)  
  
### Notas

`_non-propagating-cache_` é usado em implementações para armazenar em cache o resultado de begin() para fornecer uma complexidade de tempo constante amortizada do método. 

### Veja também

[ ranges::join_viewviews::join](<#/doc/ranges/join_view>)(C++20) |  um [`view`](<#/doc/ranges/view>) consistindo na sequência obtida ao achatar um [`view`](<#/doc/ranges/view>) de [`range`s](<#/doc/ranges/range>)  
(class template) (range adaptor object)  
[ ranges::join_with_viewviews::join_with](<#/doc/ranges/join_with_view>)(C++23) |  um [`view`](<#/doc/ranges/view>) consistindo na sequência obtida ao achatar um view de ranges, com o delimitador entre os elementos  
(class template) (range adaptor object)  
[ ranges::split_viewviews::split](<#/doc/ranges/split_view>)(C++20) |  um [`view`](<#/doc/ranges/view>) sobre os subranges obtidos ao dividir outro [`view`](<#/doc/ranges/view>) usando um delimitador  
(class template) (range adaptor object)  
[ ranges::lazy_split_viewviews::lazy_split](<#/doc/ranges/lazy_split_view>)(C++20) |  um [`view`](<#/doc/ranges/view>) sobre os subranges obtidos ao dividir outro [`view`](<#/doc/ranges/view>) usando um delimitador  
(class template) (range adaptor object)  
[ ranges::chunk_viewviews::chunk](<#/doc/ranges/chunk_view>)(C++23) |  um range de [`view`s](<#/doc/ranges/view>) que são blocos sucessivos não sobrepostos de tamanho `N` dos elementos de outro [`view`](<#/doc/ranges/view>)  
(class template) (range adaptor object)