# std::move_sentinel&lt;S&gt;::move_sentinel

```cpp
constexpr move_sentinel();  // (1) (desde C++20)
constexpr explicit move_sentinel( S x );  // (2) (desde C++20)
template< class S2 >
requires std::convertible_to<const S2&, S>
constexpr move_sentinel( const std::move_sentinel<S2>& other );  // (3) (desde C++20)
```

Constrói um novo adaptador de sentinel.

1) Construtor padrão. O sentinel subjacente é inicializado por valor.

2) O sentinel subjacente é inicializado com x.

3) O sentinel subjacente é inicializado com o de other.

### Parâmetros

- **x** — sentinel a ser adaptado
- **other** — adaptador de sentinel a ser copiado

### Exemplo

| Esta seção está incompleta
Reason: nenhum exemplo

### Veja também

[ (construtor)](<#/doc/iterator/move_iterator/move_iterator>)(C++11) | constrói um novo adaptador de iterador
(função membro pública de `std::move_iterator<Iter>`)