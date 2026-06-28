# decay-copy

```cpp
template< class T >
typename std::decay<T>::type decay-copy( T&& value );  // (desde C++11)
(ate C++20)
(apenas para exposição*)
template< class T >
requires std::convertible_to<T, std::decay_t<T>>
constexpr std::decay_t<T> decay-copy( T&& value )
noexcept(std::is_nothrow_convertible_v<T, std::decay_t<T>>);  // (desde C++20)
(apenas para exposição*)
```

  
Retorna [std::forward](<#/doc/utility/forward>)&lt;T&gt;(value) (implicitamente convertido para o tipo decaído), uma cópia prvalue decaída de value. 

### Parâmetros

value  |  \-  |  o valor a ser copiado   
  
### Valor de retorno

Uma cópia decaída de value como um prvalue. 

### Notas

`_decay-copy_` foi introduzido pela resolução de [LWG issue 929](<https://cplusplus.github.io/LWG/issue929>). É inicialmente usado na [biblioteca de suporte à concorrência](<#/doc/atomic>) para garantir que os argumentos sejam decaídos ao passar por valor, e é posteriormente usado na [biblioteca de ranges](<#/doc/ranges>). 

O recurso da linguagem [`auto`](<#/doc/language/explicit_cast>)(x) introduzido em C++23 também permite que cópias decaídas sejam criadas como prvalues. A única diferença é que `_decay-copy_` sempre [materializa](<#/doc/language/implicit_cast>) value e produz uma cópia, enquanto auto(expr) é uma operação nula (no-op) se expr for um prvalue. 

Todos os usos de `_decay-copy_` na standard library (veja abaixo) exceto [`views::all`](<#/doc/ranges/all_view>), [`ranges::take_view`](<#/doc/ranges/take_view>) e [`ranges::drop_view`](<#/doc/ranges/drop_view>) são substituídos por auto(x) desde C++23. 

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
---|---|---|---
[LWG 3724](<https://cplusplus.github.io/LWG/issue3724>) | C++20  | `_decay-copy_` não era restrito  | restrito   
  
### Veja também

[ (constructor)](<#/doc/thread/thread/thread>) |  constrói um novo objeto `thread`   
(função membro pública de `std::thread`)  
[ (constructor)](<#/doc/thread/jthread/jthread>) |  constrói um novo objeto `jthread`   
(função membro pública de `std::jthread`)  
[ async](<#/doc/thread/async>)(C++11) |  executa uma função assincronamente (potencialmente em uma nova thread) e retorna um [std::future](<#/doc/thread/future>) que conterá o resultado   
(modelo de função)  
[ ranges::begin](<#/doc/ranges/begin>)(C++20) |  retorna um iterator para o início de um range  
(objeto de ponto de customização)  
[ ranges::end](<#/doc/ranges/end>)(C++20) |  retorna um sentinel indicando o fim de um range  
(objeto de ponto de customização)  
[ ranges::rbegin](<#/doc/ranges/rbegin>)(C++20) |  retorna um reverse iterator para um range  
(objeto de ponto de customização)  
[ ranges::rend](<#/doc/ranges/rend>)(C++20) |  retorna um reverse end iterator para um range  
(objeto de ponto de customização)  
[ ranges::size](<#/doc/ranges/size>)(C++20) |  retorna um inteiro igual ao tamanho de um range  
(objeto de ponto de customização)  
[ ranges::data](<#/doc/ranges/data>)(C++20) |  obtém um ponteiro para o início de um range contíguo  
(objeto de ponto de customização)  
[ views::all_tviews::all](<#/doc/ranges/all_view>)(C++20) |  um [`view`](<#/doc/ranges/view>) que inclui todos os elementos de um [`range`](<#/doc/ranges/range>)  
(modelo de alias) (objeto adaptador de range)  
[ ranges::take_viewviews::take](<#/doc/ranges/take_view>)(C++20) |  um [`view`](<#/doc/ranges/view>) consistindo dos primeiros N elementos de outro [`view`](<#/doc/ranges/view>)  
(modelo de classe) (objeto adaptador de range)  
[ ranges::drop_viewviews::drop](<#/doc/ranges/drop_view>)(C++20) |  um [`view`](<#/doc/ranges/view>) consistindo de elementos de outro [`view`](<#/doc/ranges/view>), pulando os primeiros N elementos  
(modelo de classe) (objeto adaptador de range)