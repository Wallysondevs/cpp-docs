# Cabeçalho da biblioteca experimental &lt;experimental/ranges/functional&gt;

Este cabeçalho faz parte da biblioteca [ranges](<#/doc/experimental/ranges>).

### Objetos de função

Definido no namespace `std::experimental::ranges`
---
[ invoke](<#/doc/experimental/ranges/functional/invoke>) | invoca um objeto [Callable](<#/doc/named_req/Callable>) com os argumentos fornecidos
(modelo de função)
[ equal_to](<#/doc/experimental/ranges/functional/equal_to>) | objeto de função que implementa x == y
(modelo de classe)
[ not_equal_to](<#/doc/experimental/ranges/functional/not_equal_to>) | objeto de função que implementa x != y
(modelo de classe)
[ greater](<#/doc/experimental/ranges/functional/greater>) | objeto de função que implementa x > y
(modelo de classe)
[ less](<#/doc/experimental/ranges/functional/less>) | objeto de função que implementa x < y
(modelo de classe)
[ greater_equal](<#/doc/experimental/ranges/functional/greater_equal>) | objeto de função que implementa x >= y
(modelo de classe)
[ less_equal](<#/doc/experimental/ranges/functional/less_equal>) | objeto de função que implementa x <= y
(modelo de classe)
[ identity](<#/doc/experimental/ranges/functional/identity>) | objeto de função que retorna seu argumento inalterado
(classe)

### Sinopse
```cpp
    namespace std { namespace experimental { namespace ranges { inline namespace v1 {
    
    template <class F, class... Args>
    std::result_of_t<F&&(Args&&...)> invoke(F&& f, Args&&... args);
    
    template <class T = void>
      requires /* see definition */
    struct equal_to;
    
    template <class T = void>
      requires /* see definition */
    struct not_equal_to;
    
    template <class T = void>
      requires /* see definition */
    struct greater;
    
    template <class T = void>
      requires /* see definition */
    struct less;
    
    template <class T = void>
      requires /* see definition */
    struct greater_equal;
    
    template <class T = void>
      requires /* see definition */
    struct less_equal;
    
    template <> struct equal_to<void>;
    template <> struct not_equal_to<void>;
    template <> struct greater<void>;
    template <> struct less<void>;
    template <> struct greater_equal<void>;
    template <> struct less_equal<void>;
    
    struct identity;
    
    }}}}
```