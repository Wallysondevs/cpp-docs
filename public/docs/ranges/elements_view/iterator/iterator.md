# std::ranges::elements_view&lt;V,F&gt;::iterator&lt;Const&gt;::iterator

```cpp
/*iterator*/() requires std::default_initializable<ranges::iterator_t<Base>>
= default;  // (1) (desde C++20)
constexpr explicit /*iterator*/( ranges::iterator_t<Base> current );  // (2) (desde C++20)
constexpr /*iterator*/( /*iterator*/<!Const> i ) requires Const &&
std::convertible_to<ranges::iterator_t<V>, ranges::iterator_t<Base>>;  // (3) (desde C++20)
```

  
Constrói um iterator.

1) [Inicializa por valor](<#/doc/language/value_initialization>) o iterator subjacente `_current__` através de seu inicializador de membro padrão (= [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;Base&gt;()).

2) Inicializa o iterator subjacente `_current__` com std::move(current).

3) Conversão de /*iterator*/&lt;false&gt; para /*iterator*/&lt;true&gt;. Inicializa o iterator subjacente `_current__` com std::move(i.current).

### Parâmetros

current  |  \-  |  um iterator para (possivelmente qualificado como const) `V`  
---|---|---
i  |  \-  |  um /*iterator*/&lt;false&gt;  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   