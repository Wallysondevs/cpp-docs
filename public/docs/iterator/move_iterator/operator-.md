# operator-(std::move_iterator)

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class Iter1, class Iter2 >
auto operator-( const move_iterator<Iter1>& lhs,
const move_iterator<Iter2>& rhs )
-> decltype(lhs.base() - rhs.base());
(constexpr desde C++17)
```

  
Retorna a distância entre dois adaptadores de iterador.

### Parâmetros

lhs, rhs  |  \-  |  adaptadores de iterador para calcular a diferença   
  
### Valor de retorno

lhs.base() - rhs.base()

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator++operator++(int)operator+=operator+operator--operator--(int)operator-=operator-](<#/doc/iterator/move_iterator/operator_arith>)(C++11) |  avança ou decrementa o iterador   
(função membro pública)  
[ operator+](<#/>)(C++11) |  avança o iterador   
(modelo de função)